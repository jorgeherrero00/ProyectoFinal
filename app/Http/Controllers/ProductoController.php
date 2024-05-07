<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductoController extends Controller
{
    
    public function crearProducto(Request $request){
         Product::create($request->all());
         return Inertia::render('Producto/ListaProducto');
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

    public function borrarProducto(Request $request){
        
        $id = $request->all()['id_product'];
        Product::destroy($id);
        return Inertia::render('Producto/ListaProducto');
    }

    
}
