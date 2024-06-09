import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from "@/Components/Navigation.jsx";

const DetalleCategoria = ({ user,category_id }) => {
    const { id_category } = category_id;
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

    if (!categoria) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Navigation user={user} />
            <h1>Detalles de la Categoría</h1>
            <div>
                <p><strong>Nombre:</strong> {categoria.name}</p>
                <p><strong>Descripción:</strong> {categoria.description}</p>
            </div>
            <button onClick={() => window.history.back()}>
                Volver a la Lista de Categorías
            </button>
        </div>
    );
}

export default DetalleCategoria;
