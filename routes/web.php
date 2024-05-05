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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('crearCategoria', [\App\Http\Controllers\CategoriaController::class, 'crearCategoria'])->name('crear-categoria');
Route::get('obtenerCategorias', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategorias'])->name('obtener-categorias');
Route::get('crearProducto', [\App\Http\Controllers\ProductoController::class, 'crearProducto'])->name('crear-producto');
require __DIR__.'/auth.php';
