<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;


class ProductoController extends Controller
{
    public function crearProducto(Request $request) {
        $data = $request->all();
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('images', 'public');
        }
        Product::create($data);
        return Inertia::render('Producto/ListaProducto');
    }

    public function actualizarProducto(Request $request) {
        $datos = $request->all();
        $producto = Product::where('id_product', '=', $datos['id'])->first();

        if ($producto) {
            if ($request->hasFile('image')) {
                $datos['image_path'] = $request->file('image')->store('images', 'public');
            }

            $producto->update($datos);
            return response()->json(['success' => 'Producto actualizado'], 200);
        } else {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }
    }

    public function obtenerProductos()
    {
        return Product::all();
    }

    public function obtenerProductosTrending()
    {
        $productos = Product::inRandomOrder()->take(3)->get();
        return response()->json($productos);
    }

    public function obtenerProducto($id)
    {
        $producto = Product::with('reviews')->where('id_product', '=', $id)->first();
        return Inertia::render('Producto/ProductoDetalle', ['producto' => $producto, 'user' => Auth::user()]);
    }


    public function borrarProducto(Request $request)
    {
        $id = $request->all()['id_product'];
        Product::destroy($id);
        return Inertia::render('Producto/ListaProducto');
    }
}
