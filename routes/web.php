<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleController;

Route::get('auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/mi-cuenta', function () {
    return Inertia::render('Auth/Login');
})->name('Auth/Login');

Route::get('/crear-categoria', function () {
    return Inertia::render('Categoria/CrearCategoria');
})->name('Categoria/CrearCategoria');

Route::get('/crear-producto', function () {
    return Inertia::render('Producto/CrearProducto');
})->name('Producto/CrearProducto');

Route::get('/categorias', function () {
    return Inertia::render('Categoria/ListaCategoria');
})->name('Categoria/ListaCategoria');

Route::get('/productos', function () {
    
    return Inertia::render('Producto/ListaProducto');
})->name('Producto/ListaProducto');

Route::get('/carrito', function () {
    return Inertia::render('Carrito/Carrito');
})->name('Carrito/Carrito');


Route::post('borrarProducto/', [\App\Http\Controllers\ProductoController::class, 'borrarProducto'])->name('borrar-producto');
Route::post('agregarCarrito/', [\App\Http\Controllers\CarritoController::class, 'agregarCarrito'])->name('agregar-carrito');
Route::get('obtenerCarrito/', [\App\Http\Controllers\CarritoController::class, 'obtenerCarrito'])->name('obtener-carrito');
Route::post('actualizarCarrito/', [\App\Http\Controllers\CarritoController::class, 'actualizarCarrito'])->name('actualizar-carrito');
Route::post('borrarCategoria/', [\App\Http\Controllers\CategoriaController::class, 'borrarCategoria'])->name('borrar-categoria');
Route::post('borrarProductoCarrito/', [\App\Http\Controllers\CarritoController::class, 'borrarProductoCarrito'])->name('borrar-producto-carrito');
Route::post('borrarCarrito/', [\App\Http\Controllers\CarritoController::class, 'borrarCarrito'])->name('borrar-carrito');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('crearCategoria', [\App\Http\Controllers\CategoriaController::class, 'crearCategoria'])->name('crear-categoria');
Route::get('obtenerCategorias', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategorias'])->name('obtener-categorias');
Route::get('obtenerCategoria', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategoria'])->name('obtener-categoria');
Route::post('actualizarCategoria', [\App\Http\Controllers\CategoriaController::class, 'actualizarCategoria'])->name('actualizar-categoria');
Route::post('actualizarProducto', [\App\Http\Controllers\ProductoController::class, 'actualizarProducto'])->name('actualizar-producto');
Route::post('crearProducto', [\App\Http\Controllers\ProductoController::class, 'crearProducto'])->name('crear-producto');
Route::get('obtenerProductos', [\App\Http\Controllers\ProductoController::class, 'obtenerProductos'])->name('obtener-productos');


Route::post('addPedido', [\App\Http\Controllers\PedidoController::class, 'addPedido'])->name('add-pedido');
require __DIR__.'/auth.php';
