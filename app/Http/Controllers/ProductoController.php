<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductoController extends Controller
{
    
    public function crearProducto(Request $request){
        return Product::create($request->all());
    }

    public function obtenerProductos(){
        
        return Product::all();

    }

    public function obtenerProducto($id){

        return Product::find($id);
    }

    public function actualizarProducto(Request $request, $id){

        $product = Product::find($id);
        $product->update($request->all());
        return $product;
    }

    public function borrarProducto($id){

        return Product::destroy($id);
    }

    
}
