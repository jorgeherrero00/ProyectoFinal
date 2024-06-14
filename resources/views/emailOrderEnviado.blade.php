<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Su pedido ha sido enviado</title>
    <style>
        /* Estilos generales */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333333;
            text-align: center;
        }
        p {
            margin-bottom: 10px;
        }
        ul {
            margin-top: 10px;
            padding-left: 20px;
        }
        li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Su pedido ha sido enviado</h1>
        <p><strong>ID del Pedido:</strong> {{ $datos['orderID'] }}</p>
        <p><strong>Dirección de envío:</strong> {{ $datos['address'] }}</p>
        <p><strong>Detalles del Pedido:</strong></p>
        <ul>
            @foreach ($datos['orderDetails'] as $detalle)
                <li>{{ $detalle['name'] }} - Cantidad: {{ $detalle['quantity'] }} - Precio: {{ $detalle['price'] }}</li>
            @endforeach
        </ul>
    </div>
</body>
</html>
