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

    public function actualizarProducto(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        $category_id = $datos['category_id'];
        $name = $datos['name'];
        $description = $datos['description'];
        $price = $datos['price'];
        $stock = $datos['stock'];
        $producto = Product::where('id_product', '=', $id)->first();;       
        if($producto){
            $producto->name = $name;
            $producto->category_id = $category_id;
            $producto->description = $description;
            $producto->price = $price;
            $producto->stock = $stock;
            $producto->save(); 
            return response()->json(['success' => 'Categoría actualizada'], 200);
        } else {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }
    }
    

    public function borrarProducto(Request $request){
        
        $id = $request->all()['id_product'];
        Product::destroy($id);
        return Inertia::render('Producto/ListaProducto');
    }
    
}
