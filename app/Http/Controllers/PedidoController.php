<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderLines;
use App\Models\Product; // Importar el modelo Product
use App\Mail\OrderConfirmationMail;
use App\Mail\OrderEnviadoMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class PedidoController extends Controller
{
    public function obtenerPedidos(){
        $pedidos =  Order::all();
        $pedidosUser = Order::where('customer_id', Auth::id())->get();
        return Inertia::render('Pedidos/pedidos', ['pedidos' => $pedidos, 'user' => Auth::user(), 'pedidosUser' => $pedidosUser]);
    }

    public function borrarPedido(Request $request){
        session()->forget('pedidos');
    }

    public function cambiarEstadoPedido(Request $request, $idPedido)
    {
        $pedido = Order::findOrFail($idPedido);
        $user = User::findOrFail($pedido->customer_id);
        $orderLines = OrderLines::where('order_id', $pedido->id_order)->get();
        $pedido->update(['status' => $request->estado]);
        // Si el estado cambia a 'enviado', enviar un correo de confirmación de envío
        if ($request->estado === 'enviado') {
            $datos = [
                'orderID' => $pedido->id_order,
                'orderDetails' => [],
                'address' => $pedido->address,
            ];

            foreach ($orderLines as $line) {
                $datos['orderDetails'][] = [
                    'name' => $line->product_name,
                    'quantity' => $line->quantity,
                    'price' => $line->price,
                ];
            }

            Mail::to($user->email)->send(new OrderEnviadoMail($datos));
        }

        return $this->obtenerPedidos();
    }

    public function addPedido($carrito, $direccion, $codigoPostal, $ciudad, $provincia, $pais)
    {
        $items = [];
        $totalPrice = 0;

        foreach ($carrito as $itemGroup) {
                $items[] = $itemGroup['name'];
                $totalPrice += $itemGroup['totalPrice'];
        }

        $itemsString = implode(', ', $items);

        $order = Order::create([
            'customer_id' => Auth::id(),
            'items' => $itemsString,
            'price' => $totalPrice,
            'address' => $direccion . ' ' . $codigoPostal . ' ' . $ciudad . ' ' . $provincia . ' ' . $pais,
        ]);

        $datos['orderID'] = $order->id_order;
        $datos['orderDetails'] = [];
        $datos['address'] = $direccion . ' ' . $codigoPostal . ' ' . $ciudad . ' ' . $provincia . ' ' . $pais;

        foreach ($carrito as $itemGroup) {
            
                // Actualizar el stock del producto
                $product = Product::where('id_product', $itemGroup['id'])->first();
                if ($product) {
                    $product->stock -= $itemGroup['quantity'];
                    $product->save();
                }

                OrderLines::create([
                    'order_id' => $order->id_order,
                    'product_name' => $itemGroup['name'],
                    'quantity' => $itemGroup['quantity'],
                    'price' => $itemGroup['totalPrice'],
                ]);

                $datos['orderDetails'][] = [
                    'name' => $itemGroup['name'],
                    'quantity' => $itemGroup['quantity'],
                    'price' => $itemGroup['totalPrice'],
                ];
            
        }

        Mail::to(Auth::user()->email)->send(new OrderConfirmationMail($datos));
        session()->forget('carrito');
    }
}
