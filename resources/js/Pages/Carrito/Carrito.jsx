import { useState, useEffect } from "react";
import axios from "axios";

export default function Carrito() {
    
    const [carrito, setCarrito] = useState([]);

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
        // Actualizar la sesión con el nuevo carrito
        axios.post('/actualizarCarrito', { carrito: updatedCarrito });
    };

    const handleDecrement = (username, productName) => {
        const updatedCarrito = { ...carrito };
        updatedCarrito[username][productName].quantity -= 1;
        if (updatedCarrito[username][productName].quantity === 0) {
            delete updatedCarrito[username][productName];
            axios.post('/borrarProductoCarrito', { username: username, productName: productName });
        } else {
            updatedCarrito[username][productName].totalPrice = updatedCarrito[username][productName].quantity * updatedCarrito[username][productName].price;
        }
        setCarrito(updatedCarrito);
        // Actualizar la sesión con el nuevo carrito
        axios.post('/actualizarCarrito', { carrito: updatedCarrito });
    };

    const handleBorrarCarrito = () => {
        axios.post('/borrarCarrito').then((response) => {
            console.log(response)
        })
    }

    console.log(carrito);

    return (
        <>
            <div>
                <h1 className="text-3xl">Carrito</h1>
                <ul>
                    {Object.keys(carrito).map((username, index) => (
                        <li key={index}>
                            {Object.keys(carrito[username]).map((productName, productIndex) => (
                                <div key={productIndex}>
                                    <h3>Producto: {productName}</h3>
                                    <p>ID: {carrito[username][productName].id}</p>
                                    <p>Precio: {carrito[username][productName].price}</p>
                                    <p>Cantidad: {carrito[username][productName].quantity}</p>
                                    <p>Total: {carrito[username][productName].totalPrice}</p>
                                    <button onClick={() => handleIncrement(username, productName)}>+</button>
                                    <button onClick={() => handleDecrement(username, productName)}>-</button>
                                    <hr /><hr />
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>

                <button onClick={() => handleBorrarCarrito()}>Borrar Carrito</button>
            </div>
        </>
    );
}
