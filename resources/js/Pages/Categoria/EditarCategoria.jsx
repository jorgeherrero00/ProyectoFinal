import { useState, useEffect } from "react";
import axios from "axios";

export default function EditarCategoria({ categoria, onUpdate }) {
    const [state, setState] = useState({
        id: categoria.id_category,
        name: categoria.name,
        description: categoria.description
    });
    const [error, setError] = useState(null);
    const[success, setSuccess] = useState(null);
    useEffect(() => {
        if (categoria != null) {
            setState({
                id: categoria.id_category,
                name: categoria.name,
                description: categoria.description
            });
        }
    }, [categoria]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/actualizarCategoria', state).then((response) => {
            if (response.status == 200) {
                setSuccess('Categoría actualizada exitosamente.');
                    window.location.reload();
            }
           
        }).catch((error) => {
        setError('Error al actualizar la categoría.');
        });
}

    return (
        <div>
            {categoria && (
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
            )}

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    )
}
