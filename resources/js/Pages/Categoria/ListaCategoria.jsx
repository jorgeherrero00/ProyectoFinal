import { useState, useEffect } from "react";
import axios from "axios";
import { router } from '@inertiajs/react';
import EditarCategoria from './EditarCategoria.jsx';
import Navigation from "@/Components/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";

export default function ListaCategorias({ user }) {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [borrado, setBorrado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        fetch('/obtenerCategorias')
            .then(response => response.json())
            .then(data => setCategorias(data));
    }, []);

    const handleDeleteCategory = (id_category) => {
        axios.get('borrarCategoria/', {
            params: {
                id_category: id_category,
            }
        })
        .then(function (response) {
            setBorrado('Se ha borrado correctamente');
            // Optionally refresh the categories list or navigate to a different route
            router.get('/categorias');
        })
        .catch(function (error) {
            console.log(error);
            setBorrado('Error al borrar la categoría');
        });
        
    };

    const handleEditCategory = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setModoEdicion(true);
    };

    const handleCategoryClick = (id_category) => {
        router.get(`/categorias/${id_category}`);
    };

    return (
        <>
            <Navigation user={user} />
            <main className="max-w-screen-xl mx-auto">
                <h1 className="text-center text-3xl font-bold mb-4 mt-8">Lista de Categorías</h1>
                {modoEdicion ? (
                    <EditarCategoria categoria={categoriaSeleccionada} />
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categorias.map(categoria => (
                            <li key={categoria.id_category} className="bg-bgTertiary shadow-lg rounded-lg overflow-hidden">
                                <img src={`/storage/${categoria.photo}`} alt={categoria.name} className="w-full h-64 object-cover hover:cursor-pointer hover:scale-105 transition duration-300" onClick={() => handleCategoryClick(categoria.id_category)}/>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2 text-primary">{categoria.name}</h2>
                                    <p className="text-white">{categoria.description}</p>
                                    {user && user['role'] === 'admin' && (
                                        <div className="mt-4 flex justify-center items-center gap-4">
                                            <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg  hover:border-2 hover:border-primary hover:text-primary transition duration-300" onClick={() => handleDeleteCategory(categoria.id_category)}>Eliminar</button>
                                            <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg  hover:border-2 hover:border-primary hover:text-primary transition duration-300" onClick={() => handleEditCategory(categoria)}>Editar</button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <Footer />
            </main>
        </>
    );
}
