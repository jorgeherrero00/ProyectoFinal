import React, { useState, useEffect } from "react";
import Navigation from "@/Components/Navigation.jsx";
import axios from "axios";
import AddressModal from './AddressModal.jsx';
import { router } from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";

export default function Carrito({ user }) {
    const [carrito, setCarrito] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    useEffect(() => {
        fetch('/obtenerCarrito')
            .then(response => response.json())
            .then(data => {
                // Asumiendo que data es un objeto con claves de usuario
                // y productos, convertimos a un array de productos
                const productos = [];
                for (const username in data) {
                    for (const productName in data[username]) {
                        productos.push(data[username][productName]);
                    }
                }
                setCarrito(productos);
            });
    }, []);

    const calcularTotalCarrito = () => {
        return carrito.reduce((total, producto) => {
            return total + producto.totalPrice;
        }, 0);
    };

    const handleIncrement = (producto) => {
        if (producto.quantity < producto.stock) {
            const updatedCarrito = carrito.map(item => {
                if (item.id === producto.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        totalPrice: (item.quantity + 1) * item.price
                    };
                }
                return item;
            });
            setCarrito(updatedCarrito);
            axios.post('/actualizarCarrito', { carrito: updatedCarrito });
        } else {
            setMensajeError(`No hay suficiente stock disponible para ${producto.productName}, el stock actual es: ${producto.stock}`);
        }
    };

    const handleDecrement = (producto) => {
        if (producto.quantity > 1) {
            const updatedCarrito = carrito.map(item => {
                if (item.id === producto.id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                        totalPrice: (item.quantity - 1) * item.price
                    };
                }
                return item;
            });
            setCarrito(updatedCarrito);
            axios.post('/actualizarCarrito', { carrito: updatedCarrito });
        } else {
            handleEliminarProducto(producto);
        }
    };

    const handleEliminarProducto = (producto) => {
        axios.post('/borrarProductoCarrito', { id: producto.id })
            .then(response => {
                if (response.data.success) {
                    setCarrito(response.data.carrito);
                    router.get('/');
                } else {
                    console.error('Error al eliminar producto del carrito:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error al enviar solicitud para eliminar producto:', error);
            });
    };
    
    const handleBorrarCarrito = () => {
        axios.post('/borrarCarrito').then((response) => {
            console.log(response);
            setCarrito([]);
        });
    };

    const handleComprarProductos = () => {
        if (!user) {
            router.visit('/login', { method: 'get' }, { data: 'Por favor inicia sesión para continuar' });
            return;
        }

        setShowModal(true);
    };

    const totalCarrito = calcularTotalCarrito();

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navigation user={user} />
                <div className="container mx-auto p-4" style={{ minHeight: 'calc(150vh - 20px)' }}>
                    <h1 className="text-3xl font-bold mb-4 mt-8 text-center">Carrito</h1>
                    {carrito.length > 0 ? (
                        <>
                            {mensajeError && (
                                <p className="text-red-500">{mensajeError}</p>
                            )}
                            <ul className="space-y-4">
                                {carrito.map((producto, index) => (
                                    <li key={index} className="bg-white shadow-md rounded-lg p-4">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <img src={`/storage/${producto.image_path}`} alt={producto.name} width="200" className="object-cover rounded-lg" />
                                            </div>
                                            <div className="text-black">
                                                <h3 className="text-xl font-semibold">{producto.name}</h3>
                                                <p>Precio: {producto.price}€</p>
                                                <p>Cantidad: {producto.quantity}</p>
                                                <p>Total: {producto.totalPrice}€</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleIncrement(producto)} className="bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">+</button>
                                                <button onClick={() => handleDecrement(producto)} className="bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">-</button>
                                                <button onClick={() => handleEliminarProducto(producto)} className="bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">Eliminar</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between items-center mt-4">
                                <button onClick={handleBorrarCarrito} className="bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">Vaciar Carrito</button>
                                <button onClick={handleComprarProductos} className="bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-primary hover:text-primary transition duration-300">Comprar</button>
                            </div>
                            <div className="text-center mt-4">
                                <h5>Total del carrito: {totalCarrito.toFixed(2)}€</h5>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-center text-gray-500">No hay productos en el carrito.</p>
                            <p className="text-center text-gray-500 cursor-pointer hover:text-primary transition duration-300" onClick={()=> router.get('/productos')}>Empieza a comprar</p>
                            <div style={{ height: '15vw' }}></div>
                        </>
                    )}
                    <AddressModal show={showModal} closeModal={() => setShowModal(false)} carrito={carrito} user={user} />
                </div>
                <Footer />
            </div>
        </>
    );
}