<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de Pedido</title>
</head>
<body>
    <h1>¡Gracias por tu pedido, {{ Auth::user()->name }}!</h1>

    <p>Tu pedido ha sido recibido y está siendo procesado. Aquí están los detalles de tu pedido:</p>

    <h2>Detalles del Pedido</h2>
    <p><strong>Número de Pedido:</strong> {{ $orderID }}</p>

    <h3>Productos</h3>
    <ul>
        @foreach ($orderDetails as $item)
            <li>
                <strong>Producto:</strong> {{ $item['name'] }} <br>
                <strong>Cantidad:</strong> {{ $item['quantity'] }} <br>
                <strong>Precio:</strong> {{ $item['price'] }} €
            </li>
        @endforeach
    </ul>

    <p><strong>Total:</strong> {{ array_sum(array_column($orderDetails, 'price')) }} €</p>

    <h3>Dirección de Envío</h3>
    <p>{{ $direccion }}</p>

    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>

    <p>Gracias por comprar con nosotros.</p>

    <p>Saludos,</p>
    <p>El equipo de TechBox</p>
</body>
</html>
