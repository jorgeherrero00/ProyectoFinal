import { useState,useEffect } from "react";
import { router } from '@inertiajs/react'
export default function ListaCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('/obtenerCategorias')
            .then(response => response.json())
            .then(data => setCategorias(data));
    }, []);

 const handleDeleteCategory = ( id_category ) => {
        router.post('/borrarCategoria', { id_category })
    };
 const handleEditProduct = ( id_category ) => {
    console.log(id_category)
        router.get('/actualizar-categoria', { id_category })
 }
    return (
        <div>
            <h1>Lista de Categorías</h1>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id_category}>Nombre: {categoria.name}--------Descripción: {categoria.description}
                    <button id={categoria.id_category} onClick={() => handleDeleteCategory(categoria.id_category)}>Eliminar</button>
                    <button id={categoria.id_category} onClick={() => handleEditProduct(categoria.id_category)}>Editar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}