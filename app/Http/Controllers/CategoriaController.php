<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function crearCategoria(Request $request){
        Category::create($request->all());

        return Inertia::render('Categoria/ListaCategoria');
    }

    public function obtenerCategorias(){
        return Category::all();
    }

    public function obtenerCategoria(Request $request){
        $id = $request->all()['id'];
       return   Category::find($id);
    }

    public function actualizarCategoria(Request $request){
        $datos = $request->all();
        $id = $datos['id'];
        $name = $datos['name'];
        $description = $datos['description'];
        $category = Category::find($id);
        if($category){
            $category->name = $name;
            $category->description = $description;
            $category->save(); 
            if($category->save()){
                return Category::all() && response()->json(['success' => 'Categoría actualizada'], 200);
            }
        } else {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }
    }
    

    public function borrarCategoria(Request $request){
        $id = $request->all()['id_category'];
        Category::destroy($id);
        
        return Inertia::render('Categoria/ListaCategoria');
    }
}
