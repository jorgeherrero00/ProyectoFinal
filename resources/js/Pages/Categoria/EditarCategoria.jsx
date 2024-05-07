/* Make a file to edit a category*/

import { useState, useEffect } from "react";
import { router } from '@inertiajs/react'
import { useParams } from 'react-router-dom';


export default function EditarCategoria() {
    
    const [state, setState] = useState({
        name: '',
        description: ''
    });
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        
        fetch('/obtenerCategorias')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error));
    })

    const handleChange = (e) => {
        
        setState({
            ...state,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nombre:', state.name);
        console.log('Descripción:', state.description);
        router.post('/actualizarCategoria', state)
        setState({
            name: '',
            description: ''
        });
    }

    return (
        <div>
            <h2>Editar Categoría</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input

                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}
