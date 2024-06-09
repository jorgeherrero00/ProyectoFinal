<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reviews;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
            'order_id' => 'required|exists:order,id_order',
            'title' => 'required|string|max:50',
            'description' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review = new Reviews();
        $review->order_id = $request->order_id;
        $review->customer_id = Auth::id();
        $review->title = $request->title;
        $review->description = $request->description;
        $review->rating = $request->rating;
        $review->save();

        return Inertia::render('Pedidos');
    }
}
