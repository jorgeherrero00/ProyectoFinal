import { useState, useEffect } from "react";
import { router } from '@inertiajs/react';
import EditarCategoria from './EditarCategoria.jsx';
import axios from "axios";
import Navigation from "@/Components/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";
export default function ListaCategorias({ user }) {
    const [categorias, setCategorias] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [borrado, setBorrado] = useState(null);

    useEffect(() => {
        fetch('/obtenerCategorias')
            .then(response => response.json())
            .then(data => setCategorias(data));
    }, []);

    const handleDeleteCategory = (id_category) => {
        axios.post('borrarCategoria/', {
            id_category: id_category,
        })
        .then(function (response) {
            setBorrado('Se ha borrado correctamente');
            router.get('/categorias');
        })
        .catch(function (error) {
            console.log(error);
            setBorrado('Error al borrar la categoría');
        });
    };

    const handleEditCategory = (categoria) => {
        setModoEdicion(prevModoEdicion => (categoriaSeleccionada === categoria && prevModoEdicion) ? !prevModoEdicion : true);
        setCategoriaSeleccionada(categoria);
    };

    const handleCategoryClick = (id_category) => {
        router.get(`/categorias/${id_category}`);
    };

    return (
        <>
        <div>
            <Navigation user={user} />
            <h1 className="text-center text-3xl font-bold mb-4 mt-8">Lista de Categorías</h1>
            <ul className="list-disc list-inside mb-8 max-h-96 overflow-auto flex flex-wrap flex-row justify-center gap-4 py-4 m">
                {categorias.map(categoria => (
                    <li className="w-auto rounded-lg border bg-white border-gray-300 p-4 flex justify-center flex-col items-center text-black" key={categoria.id_category} onClick={() => handleCategoryClick(categoria.id_category)} style={{ cursor: 'pointer' }}>
                        <img src={`/storage/${categoria.photo}`} alt={categoria.name} width="200" />
                        <p>{categoria.name}</p>
                        <p>{categoria.description}</p>
                        <div className="flex gap-2">
                        {user && user['role'] === 'admin' && (
                            <>
                                <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg  hover:border-2 hover:border-primary hover:text-primary transition duration-300" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(categoria.id_category); }}>Eliminar</button>
                                <br />
                                <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg  hover:border-2 hover:border-primary hover:text-primary transition duration-300"onClick={(e) => { e.stopPropagation(); handleEditCategory(categoria); }}>Editar</button>
                            </>
                        )}
                        </div>
                       
                    </li>
                ))}
            </ul>
            {modoEdicion && (
                <EditarCategoria categoria={categoriaSeleccionada} />
            )}
            {borrado && (
                <p>{borrado}</p>
            )}
        </div>
        <Footer />
        </>
    );
}
