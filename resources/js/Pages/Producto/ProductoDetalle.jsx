import React, { useState, useEffect } from "react";
import Navigation from "@/Components/Navigation.jsx";
import { router } from "@inertiajs/react";
import axios from "axios";
import Footer from "@/Components/Footer";

export default function ProductoDetalle({ user, producto }) {
    const [quantity, setQuantity] = useState(1);
    const [categoria, setCategoria] = useState({});
    const [errorStock, setErrorStock] = useState(null);

    useEffect(() => {
        obtenerCategoriaProducto();
    }, []);

    const handleAddCarrito = () => {
        if (quantity > producto.stock) {
            setErrorStock(`No hay suficiente stock disponible. Stock actual: ${producto.stock}`);
            return;
        }

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

    const obtenerCategoriaProducto = () => {
        axios.get(`/obtenerCategoria/${producto.category_id}`)
            .then(response => {
                setCategoria(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los detalles de la categoría:", error);
            });
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
        setErrorStock(null); // Limpiar el mensaje de error cuando se cambia la cantidad
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // filled star
            } else {
                stars.push(<span key={i} className="text-gray-500">&#9734;</span>); // empty star
            }
        }
        return stars;
    };

    return (
        <>
            <Navigation user={user} />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        {producto.image_path && (
                            <img src={`/storage/${producto.image_path}`} alt={producto.name} className="rounded-lg shadow-md mx-auto md:ml-0" />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 md:ml-8">
                        <h1 className="text-3xl font-bold mb-4">{producto.name}</h1>
                        <p className="text-2xl mb-4 text-price">{producto.price}€</p>
                        <p className="mb-4">{producto.description}</p>
                        <div className="mb-4 flex items-center">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-20 px-3 py-2 border rounded-lg text-black"
                            />
                            <button onClick={handleAddCarrito} className="ml-4 bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">
                                Añadir al Carrito
                            </button>
                        </div>
                            {errorStock && (
                                <p className="text-red-500 ml-2">{errorStock}</p>
                            )}
                        <button onClick={() => router.get('/productos')} className="bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">
                            Volver a la Lista de Productos
                        </button>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8">Reseñas</h2>
                <div className="mt-4">
                    {producto.reviews && producto.reviews.length > 0 ? (
                        producto.reviews.map(review => (
                            <div key={review.id_review} className="border-b py-4">
                                <p className="text-lg font-semibold">{review.title}</p>
                                <p className="text-gray-700">{review.description}</p>
                                <div className="mt-2">
                                    <p className="text-yellow-500">{renderStars(review.rating)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay reseñas para este producto.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
