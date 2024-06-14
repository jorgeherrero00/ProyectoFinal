<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CarritoController extends Controller
{
    public function obtenerCarrito(){
        return session()->get('carrito');
    }

    public function borrarCarrito(Request $request){
        session()->forget('carrito');
    }

    public function borrarProductoCarrito(Request $request) {
        $idProducto = $request->input('id'); // Cambiar 'username' y 'productName' por 'id'
        $carrito = $request->session()->get('carrito', []);

        foreach ($carrito as $username => &$productos) {
            foreach ($productos as $productName => $producto) {
                if ($producto['id'] == $idProducto) {
                    unset($productos[$productName]);
                    if (empty($productos)) {
                        unset($carrito[$username]);
                    }
                    $request->session()->put('carrito', $carrito);
                    return response()->json(['success' => true, 'carrito' => $carrito]);
                }
            }
        }

        return response()->json(['success' => false, 'message' => 'Producto no encontrado en el carrito']);
    }

    public function actualizarCarrito(Request $request) {
        session(['carrito' => $request->carrito]);
    }

    public function agregarCarrito(Request $request){
        $carrito = session()->get('carrito', []);
    
        $username = $request->input('username');
        $productName = $request->input('name');
        $id_product = $request->input('id_product');
        $price = $request->input('price');
        $quantity = $request->input('quantity');
        $image_path = $request->input('image_path');  // Añadir esto
        $totalPrice = $price * $quantity;
    
        if (isset($carrito[$username][$productName])) {
            $carrito[$username][$productName]['quantity'] += $quantity;
            $carrito[$username][$productName]['totalPrice'] = $carrito[$username][$productName]['quantity'] * $price;
        } else {
            $carrito[$username][$productName] = [
                "id" => $id_product,
                "name" => $productName,
                "price" => $price,
                "quantity" => $quantity,
                "totalPrice" => $totalPrice,
                "image_path" => $image_path  // Añadir esto
            ];
        }
    
        session()->put('carrito', $carrito);
        return response()->json($carrito);
    }
}
