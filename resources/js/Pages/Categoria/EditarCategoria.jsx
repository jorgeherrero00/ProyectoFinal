import { useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function EditarCategoria({ categoria, onUpdate }) {
    const [state, setState] = useState({
        id: categoria.id_category,
        name: categoria.name,
        description: categoria.description,
        photo: null
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (categoria != null) {
            setState({
                id: categoria.id_category,
                name: categoria.name,
                description: categoria.description,
                photo: null
            });
        }
    }, [categoria]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files.length > 0) {
            setState({
                ...state,
                photo: files[0]
            });
        } else {
            setState({
                ...state,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', state.id);
        formData.append('name', state.name);
        formData.append('description', state.description);
        if (state.photo) {
            formData.append('photo', state.photo);
        }

        axios.post('/actualizarCategoria', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.status === 200) {
                setSuccess('Categoría actualizada exitosamente.');
                router.get('/categorias');
            }
        }).catch((error) => {
            console.log(error);
            setError('Error al actualizar la categoría.');
        });
    };

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
                    <div>
                        <label>Foto:</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            )}

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
}
