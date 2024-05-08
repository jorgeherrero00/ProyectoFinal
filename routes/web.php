<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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



Route::post('borrarProducto/', [\App\Http\Controllers\ProductoController::class, 'borrarProducto'])->name('borrar-producto');
Route::post('borrarCategoria/', [\App\Http\Controllers\CategoriaController::class, 'borrarCategoria'])->name('borrar-categoria');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('crearCategoria', [\App\Http\Controllers\CategoriaController::class, 'crearCategoria'])->name('crear-categoria');
Route::get('obtenerCategorias', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategorias'])->name('obtener-categorias');
Route::get('obtenerCategoria', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategoria'])->name('obtener-categoria');
Route::post('actualizarCategoria', [\App\Http\Controllers\CategoriaController::class, 'actualizarCategoria'])->name('actualizar-categoria');
Route::post('crearProducto', [\App\Http\Controllers\ProductoController::class, 'crearProducto'])->name('crear-producto');
Route::get('obtenerProductos', [\App\Http\Controllers\ProductoController::class, 'obtenerProductos'])->name('obtener-productos');
require __DIR__.'/auth.php';
