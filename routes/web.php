    <?php

    use App\Http\Controllers\ProfileController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;
    use App\Http\Controllers\Auth\FirebaseController;
    use App\Http\Controllers\PayPalController;

    Route::post('paypal/order', [PayPalController::class, 'createOrder'])->name('paypal.order');
    Route::post('paypal/capture', [PayPalController::class, 'captureOrder'])->name('paypal.capture');
    Route::get('paypal/success', [PayPalController::class, 'success'])->name('paypal.success');
    Route::get('paypal/cancel', [PayPalController::class, 'cancel'])->name('paypal.cancel');

    Route::any('auth/google', [FirebaseController::class, 'redirectToGoogle']);
    Route::any('auth/google/callback', [FirebaseController::class, 'handleGoogleCallback']);

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'user' => Auth::user(),
        ]);
    })->name('home');
    Route::get('/dashboard', function () {
        return Inertia::render('Profile/Edit', ['user' => Auth::user()]);
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register', ['user' => Auth::user()]);
    })->name('register');

    Route::get('/registerAdmin', function () {
        return Inertia::render('Auth/RegisterAdmin', ['user' => Auth::user()]);
    })->name('registerAdmin');



    Route::get('/mi-cuenta', function () {
        return Inertia::render('Auth/Login', ['user' => Auth::user()]);
    })->name('mi-cuenta');

    Route::get('/crear-categoria', function () {
        return Inertia::render('Categoria/CrearCategoria', ['user' => Auth::user()]);
    })->name('Categoria/CrearCategoria');

    Route::get('/crear-producto', function () {
        return Inertia::render('Producto/CrearProducto', ['user' => Auth::user()]);
    })->name('Producto/CrearProducto');

    Route::get('/categorias', function () {
        return Inertia::render('Categoria/ListaCategoria', ['user' => Auth::user()]);
    })->name('Categoria/ListaCategoria');

    Route::get('/categorias/{id_category}', function ($id_category) {
        return Inertia::render('Categoria/DetalleCategoria', [
            'user' => Auth::user(),
            'id_category' => $id_category,
        ]);
    })->name('Categoria/DetalleCategoria');
    Route::get('/productos', function () {
        return Inertia::render('Producto/ListaProducto', ['user' => Auth::user()]);
    })->name('Producto/ListaProducto');

    Route::get('/editar-categoria/{id_category}', function ($id_category) {
        return Inertia::render('Categoria/EditarCategoria', [
            'user' => Auth::user(),
            'id_category' => $id_category,
        ]);
    })->name('Categoria/EditarCategoria');
    

    Route::get('/carrito', function () {
        return Inertia::render('Carrito/Carrito', ['user' => Auth::user()]);
    })->name('Carrito/Carrito');

    Route::get('/pedidos', function () {
        return Inertia::render('Pedidos/pedidos', ['user' => Auth::user()]);
    })->name('Pedido/pedidos');

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
Route::post('/registerAdmin', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'registerAdmin'])->name('registerAdmin');

    Route::post('crearCategoria', [\App\Http\Controllers\CategoriaController::class, 'crearCategoria'])->name('crear-categoria');
    Route::get('obtenerCategorias', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategorias'])->name('obtener-categorias');
    Route::get('obtenerCategoria', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategoria'])->name('obtener-categoria');
    Route::post('actualizarCategoria', [\App\Http\Controllers\CategoriaController::class, 'actualizarCategoria'])->name('actualizar-categoria');
    Route::post('actualizarProducto', [\App\Http\Controllers\ProductoController::class, 'actualizarProducto'])->name('actualizar-producto');
    Route::get('/productosTrending', [\App\Http\Controllers\ProductoController::class, 'obtenerProductosTrending']);
    Route::post('crearProducto', [\App\Http\Controllers\ProductoController::class, 'crearProducto'])->name('crear-producto');
    Route::get('obtenerProductos', [\App\Http\Controllers\ProductoController::class, 'obtenerProductos'])->name('obtener-productos');
    Route::get('/producto/{id}', [\App\Http\Controllers\ProductoController::class, 'obtenerProducto'])->name('producto.detalle');
    Route::post('/buscarCategorias', [\App\Http\Controllers\CategoriaController::class, 'buscarCategorias']);
    Route::get('/obtenerCategoria/{id_category}', [\App\Http\Controllers\CategoriaController::class, 'obtenerCategoria']);
    Route::post('addPedido', [\App\Http\Controllers\PedidoController::class, 'addPedido'])->middleware('auth')->name('add-pedido');
    Route::get('pedidos', [\App\Http\Controllers\PedidoController::class, 'obtenerPedidos'])->middleware('auth')->name('obtener-pedidos');
    Route::post('/pedidos/{idPedido}/cambiarEstado', [\App\Http\Controllers\PedidoController::class, 'cambiarEstadoPedido']);


    Route::get('/pedido/{orderId}/review', [\App\Http\Controllers\ReviewController::class, 'create'])->name('review.create');
    Route::post('/pedido/review', [\App\Http\Controllers\ReviewController::class, 'store'])->name('review.store');


    Route::get('/condicionesCompra', function () {
        return Inertia::render('Legalidad/CondicionesCompra' , ['user' => Auth::user()]);
    })->name('Legalidad/CondicionesCompra');

    Route::get('/quienesSomos', function () {
        return Inertia::render('Legalidad/QuienesSomos' , ['user' => Auth::user()]);
    })->name('Legalidad/QuienesSomos');

    Route::get('/contactInfo', function () {
        return Inertia::render('Legalidad/ContactInfo' , ['user' => Auth::user()]);
    })->name('Legalidad/ContactInfo');

    Route::get('/informacionEnvios', function () {
        return Inertia::render('Legalidad/InformacionEnvios' , ['user' => Auth::user()]);
    })->name('Legalidad/informacionEnvios');

    Route::get('/FAQ', function () {
        return Inertia::render('Legalidad/FAQ' , ['user' => Auth::user()]);
    })->name('Legalidad/FAQ');



    require __DIR__.'/auth.php';
