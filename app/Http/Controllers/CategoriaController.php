<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoriaController extends Controller
{
    public function crearCategoria(Request $request){
        return Category::create($request->all());
    }

    public function obtenerCategorias(){
        return Category::all();
    }

    public function obtenerCategoria($id){
        return Category::find($id);
    }

    public function actualizarCategoria(Request $request, $id){
        $category = Category::find($id);
        $category->update($request->all());
        return $category;
    }

    public function borrarCategoria(Request $request){
        $id = $request->all()['id_category'];
        return Category::destroy($id);
    }
}
