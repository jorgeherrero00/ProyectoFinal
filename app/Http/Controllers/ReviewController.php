<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reviews;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\OrderLines;
use App\Models\Product; // Importar el modelo correcto

class ReviewController extends Controller
{
    public function create($orderId)
    {
        $order = Order::findOrFail($orderId);
        return Inertia::render('Review/CreateReview', ['order' => $order]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:order,id_order', // Usar el nombre correcto de la tabla
            'product_name' => 'required|string|exists:products,name', // Validar que el nombre del producto exista en la tabla products
            'title' => 'required|string|max:50',
            'description' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // Buscar el producto por nombre
        $product = Product::where('name', $request->product_name)->firstOrFail();

        $review = new Reviews();
        $review->order_id = $request->order_id;
        $review->customer_id = Auth::id();
        $review->product_id = $product->id_product; // Usar el ID del producto encontrado
        $review->title = $request->title;
        $review->description = $request->description;
        $review->rating = $request->rating;
        $review->save();

        return Inertia::render('Pedidos');
    }
}
