<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderLines;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Mail;

class PayPalController extends Controller
{
    public function createOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success'),
                "cancel_url" => route('paypal.cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => "100.00" // Reemplazar con la cantidad real
                    ]
                ]
            ]
        ]);

        // Guardar temporalmente los datos en la sesión
        session([
            'carrito' => $request->input('carrito'),
            'direccion' => $request->input('direccion'),
            'codigoPostal' => $request->input('codigoPostal'),
            'ciudad' => $request->input('ciudad'),
            'provincia' => $request->input('provincia'),
            'pais' => $request->input('pais')
        ]);

        return response()->json($order);
    }

    public function captureOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $capture = $provider->capturePaymentOrder($request->input('orderID'));

        // Obtener datos de la sesión
        $carrito = session('carrito');
        $direccion = session('direccion');
        $codigoPostal = session('codigoPostal');
        $ciudad = session('ciudad');
        $provincia = session('provincia');
        $pais = session('pais');

        // Almacenar el pedido en la base de datos
        if (Auth::check()) {
            $items = [];
            $totalPrice = 0;

            foreach ($carrito as $itemGroup) {
                foreach ($itemGroup as $item) {
                    $items[] = $item['name'];
                    $totalPrice += $item['totalPrice'];
                }
            }

            $itemsString = implode(', ', $items);

            $order = Order::create([
                'customer_id' => Auth::id(),
                'items' => $itemsString,
                'price' => $totalPrice,
                'address' => $direccion . ' ' . $codigoPostal . ' ' . $ciudad . ' ' . $provincia . ' ' . $pais,
            ]);

            foreach ($carrito as $itemGroup) {
                foreach ($itemGroup as $item) {
                    OrderLines::create([
                        'order_id' => $order->id_order,
                        'product_name' => $item['name'],
                        'quantity' => $item['quantity'],
                        'price' => $item['totalPrice'],
                    ]);
                }
            }

            // Enviar correo de confirmación
            Mail::to(Auth::user()->email)->send(new OrderConfirmationMail([
                'orderID' => $order->id_order,
                'orderDetails' => $carrito,
                'address' => $direccion . ' ' . $codigoPostal . ' ' . $ciudad . ' ' . $provincia . ' ' . $pais
            ]));

            // Limpiar la sesión
            session()->forget(['carrito', 'direccion', 'codigoPostal', 'ciudad', 'provincia', 'pais']);
        }

        return response()->json($capture);
    }

    public function success(Request $request)
    {
        return view('paypal.success');
    }

    public function cancel(Request $request)
    {
        return view('paypal.cancel');
    }
}
