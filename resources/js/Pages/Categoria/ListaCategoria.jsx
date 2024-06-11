import { useState, useEffect } from "react";
import { router } from '@inertiajs/react';
import EditarCategoria from './EditarCategoria.jsx';
import axios from "axios";
import Navigation from "@/Components/Navigation.jsx";
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
        <div>
            <Navigation user={user} />
            <h1>Lista de Categorías</h1>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id_category} onClick={() => handleCategoryClick(categoria.id_category)} style={{ cursor: 'pointer' }}>
                        <p><strong>Nombre:</strong> {categoria.name}</p>
                        <p><strong>Descripción:</strong> {categoria.description}</p>
                        {user && user['role'] === 'admin' && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(categoria.id_category); }}>Eliminar</button>
                                <br />
                                <button onClick={(e) => { e.stopPropagation(); handleEditCategory(categoria); }}>Editar</button>
                            </>
                        )}
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
    );
}
