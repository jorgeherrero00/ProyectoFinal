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
            $request->session()->put('carrito', $carrito);
        }
    }
    
    

    public function actualizarCarrito(Request $request) {
        dd($request->all());
        session(['carrito' => $request->carrito]);
    }
    

    public function agregarCarrito(Request $request){
        $carrito[$request->name] = [
            "id" => $request->id_product,
            "name" => $request->name,
            "price" => $request->price,
            "quantity" => $request->quantity,
            "totalPrice" => $request->totalPrice
        ];
        session()->push('carrito', $carrito);
        return ;
    }
}
