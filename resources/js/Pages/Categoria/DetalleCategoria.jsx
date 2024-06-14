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
                <h1 className="text-3xl font-bold mb-4 text-center">Detalles de la Categoría</h1>
                <div className="mb-8 flex flex-col md:flex-row items-center">
                    <img src={`/storage/${categoria.photo}`} alt={categoria.name} className="md:w-1/3 rounded-lg shadow-md" />
                    <div className='md:w-2/3 md:ml-8 mt-4 md:mt-0'>
                        <p className="text-xl"><strong>Nombre:</strong> {categoria.name}</p>
                        <p className="text-xl"><strong>Descripción:</strong> {categoria.description}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Productos en esta Categoría</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoria.products.map(producto => (
                        <div key={producto.id_product} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                            <img src={`/storage/${producto.image_path}`} alt={producto.name} className="w-full h-64 object-cover" onClick={() => handleProductClick(producto.id_product)}/>
                            <div className="p-4">
                                <p className="text-lg font-semibold mb-2">{producto.name}</p>
                                <p className="text-sm text-gray-600">{producto.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => router.get('/categorias')} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Volver a la Lista de Categorías
                </button>
            </div>
            <Footer />
        </>
    );
}

export default DetalleCategoria;
