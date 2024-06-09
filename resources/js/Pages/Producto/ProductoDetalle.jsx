import React, { useState } from "react";
import Navigation from "@/Components/Navigation.jsx";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function ProductoDetalle({ user, producto }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddCarrito = () => {
        axios.post('/agregarCarrito', {
            id_product: producto.id_product,
            name: producto.name,
            price: producto.price,
            quantity: quantity,
            totalPrice: quantity * producto.price,
            image_path: producto.image_path
        }).then(function (response) {
            router.get('/carrito');
        }).catch(function (error) {
            console.log(error);
        });
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    return (
        <div>
            <Navigation user={user} />
            <h1>Detalles del Producto</h1>
            <div>
                <p><strong>Nombre:</strong> {producto.name}</p>
                <p><strong>Descripción:</strong> {producto.description}</p>
                <p><strong>Stock:</strong> {producto.stock}</p>
                <p><strong>Precio:</strong> {producto.price}</p>
                {producto.image_path && (
                    <div>
                        <img src={`/storage/${producto.image_path}`} alt={producto.name} width="200" />
                    </div>
                )}
            </div>
            <h2>Reseñas</h2>
            <div>
                {producto.reviews && producto.reviews.length > 0 ? (
                    producto.reviews.map(review => (
                        <div key={review.id_review}>
                            <p><strong>Título:</strong> {review.title}</p>
                            <p><strong>Descripción:</strong> {review.description}</p>
                            <p><strong>Calificación:</strong> {review.rating}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay reseñas para este producto.</p>
                )}
            </div>
            <div>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <button onClick={handleAddCarrito}>
                    Añadir al Carrito
                </button>
            </div>
            <button onClick={() => router.get('/productos')}>
                Volver a la Lista de Productos
            </button>
        </div>
    );
}
