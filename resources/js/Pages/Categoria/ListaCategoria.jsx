import { useState, useEffect } from "react";
import { router } from '@inertiajs/react'
import EditarCategoria from './EditarCategoria.jsx';
import axios from "axios";
import Navigation from "@/Components/Navigation.jsx";
export default function ListaCategorias({user}) {
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
    }

    return (
        <div>
                <Navigation user={user} />
                <h1>Lista de Categorías</h1>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id_category}>
                        <p><strong>Nombre:</strong> {categoria.name}</p>
                        <p><strong>Descripción:</strong> {categoria.description}</p>
                        <button onClick={() => handleDeleteCategory(categoria.id_category)}>Eliminar</button>
                        <br />
                        <button onClick={() => handleEditCategory(categoria)}>Editar</button>
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
