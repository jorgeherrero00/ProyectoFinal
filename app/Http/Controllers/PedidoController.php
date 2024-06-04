<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderLines;
use App\Controllers\CarritoController;

class PedidoController extends Controller
{
    //

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
        $pedido->update(['status' => $request->estado]);
       
        return $this->obtenerPedidos();

    }

        public function addPedido(Request $request)
        {
            if (Auth::check()) {
                // Extract the 'name' values from 'carrito' and concatenate them
                $items = [];
                $totalPrice = 0;
                foreach ($request->carrito as $itemGroup) {
                    foreach ($itemGroup as $item) {
                        $items[] = $item['name'];
                        $totalPrice += $item['totalPrice'];
                    }
                }
                $itemsString = implode(', ', $items);
        
                // Create the main order
                $order = Order::create([
                    'customer_id' => Auth::id(),
                    'items' => $itemsString,
                    'price' => $totalPrice,
                    'address' => $request->direccion . ' ' . $request->codigoPostal . ' ' . $request->ciudad . ' ' . $request->provincia . ' ' . $request->pais,
                ]);
    
                // Create order lines for each product in the carrito
                foreach ($request->carrito as $itemGroup) {
                    foreach ($itemGroup as $item) {
                        OrderLines::create([
                            'order_id' => $order->id_order,
                            'product_name' => $item['name'],
                            'quantity' => $item['quantity'],
                            'price' => $item['totalPrice'],
                        ]);
                    }
                }

                session()->forget('carrito');
            } else {
                return response()->json(['message' => 'Tienes que iniciar sesión'], 401);
            }
        }

}
