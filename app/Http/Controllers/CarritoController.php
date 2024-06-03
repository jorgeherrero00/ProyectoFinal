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
        $username = $request->input('username');
        $productName = $request->input('productName');
        $carrito = $request->session()->get('carrito', []);
    
        if (isset($carrito[$username][$productName])) {
            unset($carrito[$username][$productName]);
            // Si el carrito del usuario está vacío, elimínalo
            if (empty($carrito[$username])) {
                unset($carrito[$username]);
            }
            $request->session()->put('carrito', $carrito);
        }
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
        $totalPrice = $price * $quantity;
    
        // Si el producto ya está en el carrito, actualizar la cantidad y el precio total
        if (isset($carrito[$username][$productName])) {
            $carrito[$username][$productName]['quantity'] += $quantity;
            $carrito[$username][$productName]['totalPrice'] = $carrito[$username][$productName]['quantity'] * $price;
        } else {
            // Si no está, agregarlo como nuevo producto
            $carrito[$username][$productName] = [
                "id" => $id_product,
                "name" => $productName,
                "price" => $price,
                "quantity" => $quantity,
                "totalPrice" => $totalPrice
            ];
        }
    
        session()->put('carrito', $carrito);
        return response()->json($carrito);
    }
    
}
