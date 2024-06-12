<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function crearCategoria(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('categories', 'public');
        }

        Category::create($data);
        return Inertia::render('Categoria/ListaCategoria');
    }

    public function obtenerCategorias()
    {
        return Category::all();
    }

    public function obtenerCategoria($id_category)
    {
        $categoria = Category::with('products')->find($id_category);
        if ($categoria) {
            return response()->json($categoria);
        } else {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }
    }

    public function buscarCategorias(Request $request)
    {
        $search = $request->input('search');
        $categorias = Category::where('name', 'like', '%' . $search . '%')->get();
        return response()->json($categorias);
    }

    public function actualizarCategoria(Request $request)
    {
        $datos = $request->all();
        $id = $datos['id'];
        $name = $datos['name'];
        $description = $datos['description'];
        $category = Category::find($id);
        if ($category) {
            $category->name = $name;
            $category->description = $description;
            $category->save();
            if ($category->save()) {
                return response()->json(['success' => 'Categoría actualizada'], 200);
            }
        } else {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }
    }

    public function borrarCategoria(Request $request)
    {
        $id = $request->all()['id_category'];
        Category::destroy($id);
    }
}
