import { useState, useEffect } from "react";
import { router } from '@inertiajs/react';
import EditarProducto from './EditarProducto.jsx';
import axios from "axios";
import Navigation from "@/Components/Navigation.jsx";

export default function ListaProductos({ user }) {
    const [productos, setProductos] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [borrado, setBorrado] = useState(null);

    useEffect(() => {
        fetch('/obtenerProductos')
            .then(response => response.json())
            .then(data => {
                setProductos(data);
            });
    }, []);

    const handleDeleteProduct = (id_product) => {
        axios.post('borrarProducto/', {
            id_product: id_product,
        })
            .then(function (response) {
                setBorrado('Se ha borrado correctamente');
                router.get('/productos');
            })
            .catch(function (error) {
                setBorrado('Error al borrar el producto');
            });
    };

    const handleEditProducto = (producto) => {
        setModoEdicion(prevModoEdicion => (productoSeleccionado === producto && prevModoEdicion) ? !prevModoEdicion : true);
        setProductoSeleccionado(producto);
    }

    const handleProductClick = (id_product) => {
        router.get(`/producto/${id_product}`);
    }

    return (
        <div>
            <Navigation user={user} />
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map(product => (
                    <li key={product.id_product} onClick={() => handleProductClick(product.id_product)} style={{ cursor: 'pointer' }}>
                        <p><strong>Nombre:</strong> {product.name}</p>
                        <p><strong>Descripción:</strong> {product.description}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Precio:</strong> {product.price}</p>
                        {product.image_path && (
                            <div>
                                <img src={`/storage/${product.image_path}`} alt={product.name} width="100" />
                            </div>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id_product); }}>Eliminar</button>
                        <br />
                        <button onClick={(e) => { e.stopPropagation(); handleEditProducto(product); }}>Editar</button>
                    </li>
                ))}
            </ul>
            {modoEdicion && (
                <EditarProducto producto={productoSeleccionado} />
            )}

            {borrado && (
                <p>{borrado}</p>
            )}
        </div>
    );
}
