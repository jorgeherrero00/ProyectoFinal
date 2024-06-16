import React, { useState, useEffect } from "react";
import axios from "axios";
import { router } from '@inertiajs/react';
import EditarProducto from './EditarProducto.jsx';
import Navigation from "@/Components/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";

export default function ListaProductos({ user }) {
    const [productos, setProductos] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [borrado, setBorrado] = useState(null);
    const [mostrarListaCategorias, setMostrarListaCategorias] = useState(true); // Estado para controlar la visibilidad de la lista de categorías

    useEffect(() => {
        fetch('/obtenerProductos')
            .then(response => response.json())
            .then(data => {
                setProductos(data);
            });
    }, []);

    const handleDeleteProduct = (id_product) => {
        axios.get('borrarProducto/', {
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
        setMostrarListaCategorias(false); // Ocultar la lista de categorías cuando se edita un producto
        setModoEdicion(true);
        setProductoSeleccionado(producto);
    }

    const handleProductClick = (id_product) => {
        router.get(`/producto/${id_product}`);
    };


    return (
        <>
            <Navigation user={user} />
            <main className="max-w-screen-xl mx-auto">
                <h1 className="text-center text-3xl font-bold mb-4 mt-8">Lista de Productos</h1>
                {mostrarListaCategorias && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {productos.map(product => (
                            <li className="bg-bgTertiary shadow-lg rounded-lg overflow-hidden" key={product.id_product} style={{ cursor: 'pointer' }}>
                                {product.image_path && (
                                    <img src={`/storage/${product.image_path}`} alt={product.name} className="w-full h-64 object-cover hover:cursor-pointer hover:scale-105 transition duration-300" onClick={() => handleProductClick(product.id_product)} />
                                )}
                                <div className="p-4" >
                                    <h2 className="text-xl font-bold mb-2 text-primary">{product.name}</h2>
                                    <p className="text-white">{product.description}</p>
                                    <p className="text-white"><strong>Precio:</strong> {product.price}</p>
                                    <p className="text-white"><strong>Stock:</strong> {product.stock}</p>
                                    <div className="mt-4 flex justify-center items-center gap-4">
                                        {user && user['role'] === 'admin' && (
                                            <>
                                                <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300" onClick={() => handleDeleteProduct(product.id_product)}>Eliminar</button>
                                                <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300" onClick={() => handleEditProducto(product)}>Editar</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {modoEdicion && (
                    <EditarProducto producto={productoSeleccionado} />
                )}
                {borrado && (
                    <p>{borrado}</p>
                )}
            </main>
            <Footer />
        </>
    );
}
