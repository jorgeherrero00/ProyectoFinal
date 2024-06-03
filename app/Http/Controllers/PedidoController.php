<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Redirector;

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
        
    }
    
}
