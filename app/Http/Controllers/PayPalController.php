<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Http\Controllers\PedidoController;

class PayPalController extends Controller
{
    public function createOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $total = $request->input('total');

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success'),
                "cancel_url" => route('paypal.cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "EUR",
                        "value" => number_format($total, 2, '.', '') // Utiliza el total del carrito
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

        // Almacenar el pedido en la base de datos y enviar correo
        if (Auth::check()) {
            $pedidoController = new PedidoController();
            $pedidoController->addPedido($carrito, $direccion, $codigoPostal, $ciudad, $provincia, $pais);
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
