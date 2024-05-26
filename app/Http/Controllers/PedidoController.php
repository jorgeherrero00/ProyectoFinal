<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    //

    public function obtenerPedidos(){
        
        return session()->get('pedidos');
    }

    public function borrarPedido(Request $request){
        session()->forget('pedidos');
    }

    public function addPedido(Request $request){
        
        $id_user = auth()->user()->id;
        
        if($id_user){
            var_dump($request->all());
        }else{
            return Inertia::render('Login');
        }

    }
}
