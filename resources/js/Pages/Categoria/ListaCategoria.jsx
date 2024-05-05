import { useState,useEffect } from "react";
export default function ListaCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('/obtenerCategorias')
            .then(response => response.json())
            .then(data => setCategorias(data));
    }, []);

    return (
        <div>
            <h1>Lista de Categorías</h1>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id}>Nombre: {categoria.name}--------Descripción: {categoria.description}</li>
                ))}
            </ul>
        </div>
    );
}