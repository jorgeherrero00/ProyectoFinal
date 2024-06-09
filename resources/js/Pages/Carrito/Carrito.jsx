import { useState, useEffect } from "react";
import axios from "axios";
import AddressModal from './AddressModal.jsx';
import { router } from '@inertiajs/react';
import Navigation from "@/Components/Navigation.jsx";

export default function Carrito({ user }) {
    const [carrito, setCarrito] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('/obtenerCarrito')
            .then(response => response.json())
            .then(data => {
                setCarrito(data);
            });
    }, []);
    
    const handleIncrement = (username, productName) => {
        const updatedCarrito = { ...carrito };
        updatedCarrito[username][productName].quantity += 1;
        updatedCarrito[username][productName].totalPrice = updatedCarrito[username][productName].quantity * updatedCarrito[username][productName].price;
        setCarrito(updatedCarrito);
        axios.post('/actualizarCarrito', { carrito: updatedCarrito });
    };

    const handleDecrement = (username, productName) => {
        const updatedCarrito = { ...carrito };
        updatedCarrito[username][productName].quantity -= 1;
        if (updatedCarrito[username][productName].quantity === 0) {
            delete updatedCarrito[username][productName];
            if (Object.keys(updatedCarrito[username]).length === 0) {
                delete updatedCarrito[username];
            }
            axios.post('/borrarProductoCarrito', { username: username, productName: productName });
        } else {
            updatedCarrito[username][productName].totalPrice = updatedCarrito[username][productName].quantity * updatedCarrito[username][productName].price;
            axios.post('/actualizarCarrito', { carrito: updatedCarrito });
        }
        setCarrito(updatedCarrito);
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
        const productos = [];

        for (const username in carrito) {
            for (const productName in carrito[username]) {
                const producto = carrito[username][productName];
                productos.push({
                    username: username,
                    productName: productName,
                    id: producto.id,
                    price: producto.price,
                    quantity: producto.quantity,
                    totalPrice: producto.totalPrice
                });
            }
        }

        axios.post('/addPedido', { productos: productos })
            .then(response => {
                console.log(response.data);
                setCarrito([]);
            })
            .catch(error => {
                console.error('Error al comprar productos:', error);
            });
    };

    return (
        <>
            <div>
                <Navigation user={user} />
                <h1 className="text-3xl">Carrito</h1>
                {Object.keys(carrito).length > 0 ? (
                    <ul>
                        {Object.keys(carrito).map((username, index) => (
                            <li key={index}>
                                {Object.keys(carrito[username]).map((productName, productIndex) => (
                                    <div key={productIndex}>
                                        <h3>Producto: {productName}</h3>
                                        <img src={`/storage/${carrito[username][productName].image_path}`} alt={productName} width="100" />
                                        <p>ID: {carrito[username][productName].id}</p>
                                        <p>Precio: {carrito[username][productName].price}</p>
                                        <p>Cantidad: {carrito[username][productName].quantity}</p>
                                        <p>Total: {carrito[username][productName].totalPrice}</p>
                                        <button onClick={() => handleIncrement(username, productName)}>+</button>
                                        <button onClick={() => handleDecrement(username, productName)}>-</button>
                                        <hr /><hr />
                                    </div>
                                ))}
                                <button onClick={handleBorrarCarrito}>Borrar Carrito</button>
                                <button onClick={handleComprarProductos}>Añadir al pedido</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
                <AddressModal show={showModal} closeModal={() => setShowModal(false)} carrito={carrito} user={user} />
            </div>
        </>
    );
}
