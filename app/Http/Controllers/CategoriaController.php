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

    public function obtenerCategoria($id){
        return Category::find($id);
    }

    public function actualizarCategoria(Request $request, $id){

        dd($request->all());
        $category = Category::find($id);
        $category->update($request->all());
        return $category;
    }

    public function borrarCategoria(Request $request){
        $id = $request->all()['id_category'];
        Category::destroy($id);
        
        return Inertia::render('Categoria/ListaCategoria');
    }
}
