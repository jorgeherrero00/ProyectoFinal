import { useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function EditarCategoria({ categoria }) {
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
        <div className="max-w-lg mx-auto mt-8">
            {categoria && (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <input
                            type="text"
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Foto:</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="w-full bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg  hover:border-2 hover:border-primary hover:text-primary transition duration-300">Actualizar</button>
                </form>
            )}

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
}
