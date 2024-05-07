import { useState, useEffect } from "react";
import { router } from '@inertiajs/react'


export default function ListaProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/obtenerProductos')
            .then(response => response.json())
            .then(data => setProductos(data));
    }, []);

    const handleDeleteProduct = ( id_product ) => {
        router.post('/borrarProducto', { id_product })
    };

    const handleEditProduct = ( id_product ) => {
        router.post('/actualizarProducto', { id_product })
    }

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        Nombre: {producto.name}--------Descripción: {producto.description}------Precio: {producto.price}------Stock: {producto.stock}
                        <button id={producto.id_product} onClick={() => handleDeleteProduct(producto.id_product)}>Eliminar</button>

                    </li>
                ))}
            </ul>
        </div>
    );
    
}