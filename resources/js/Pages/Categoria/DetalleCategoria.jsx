import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from "@/Components/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";
import { router } from '@inertiajs/react';
const DetalleCategoria = ({ user, id_category }) => {
    const { categoria_id } = useParams();
    const [categoria, setCategoria] = useState(null);

    useEffect(() => {
        axios.get(`/obtenerCategoria/${id_category}`)
            .then(response => {
                setCategoria(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los detalles de la categoría:", error);
            });
    }, [id_category]);


    const handleProductClick = (id_product) => {
        router.get(`/producto/${id_product}`);
    }

    if (!categoria) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Navigation user={user} />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Detalles de la Categoría</h1>
                <div className="mb-8">
                    <img src={`/storage/${categoria.photo}`} alt={categoria.name} width="200" />
                    <p><strong>Nombre:</strong> {categoria.name}</p>
                    <p><strong>Descripción:</strong> {categoria.description}</p>
                </div>
                <h2 className="text-xl font-bold mb-4">Productos en esta Categoría</h2>
                <ul className="list-disc list-inside">
                    {categoria.products.map(producto => (
                    <li key={producto.id_product} onClick={() => handleProductClick(producto.id_product)} style={{ cursor: 'pointer' }}>
                            <img src={`/storage/${producto.image_path}`} alt={producto.name} width="500" />
                            <p><strong>Nombre:</strong> {producto.name}</p>
                            <p><strong>Descripción:</strong> {producto.description}</p>
                        </li>
                    ))}
                </ul>
                <button onClick={() => window.history.back()} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Volver a la Lista de Categorías
                </button>
            </div>
            <Footer />
        </>
    );
}

export default DetalleCategoria;
