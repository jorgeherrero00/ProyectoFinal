import { useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";

export default function EditarProducto({ producto }) {
    const [state, setState] = useState({
        id: producto.id_product,
        name: producto.name,
        category_id: producto.category_id,
        description: producto.description,
        stock: producto.stock,
        price: producto.price,
        image: null,
        image_path: producto.image_path
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (producto != null) {
            setState({
                id: producto.id_product,
                name: producto.name,
                category_id: producto.category_id,
                description: producto.description,
                stock: producto.stock,
                price: producto.price,
                image: null,
                image_path: producto.image_path
            });
        }
    }, [producto]);

    useEffect(() => {
        fetch('/obtenerCategorias')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setState({
                ...state,
                image: files[0]
            });
        } else {
            setState({
                ...state,
                [name]: value
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in state) {
            if (key !== 'image' || (key === 'image' && state.image !== null)) {
                formData.append(key, state[key]);
            }
        }

        axios.post('/actualizarProducto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.status === 200) {
                setSuccess('Producto actualizado exitosamente.');
                router.get('/productos');
            }
        }).catch((error) => {
            console.log(error);
            setError('Error al actualizar el producto.');
        });
    }

    if (!user || user.role !== 'admin') {
        router.get('/');
        return null;
      }
    return (
        <>
              {user && user['role'] === 'admin' && (
            <main className="max-w-lg mx-auto mt-8">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
                        <select
                            name="category_id"
                            value={state.category_id}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(category => (
                                <option key={category.id_category} value={category.id_category}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <textarea
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                        <input
                            type="text"
                            name="price"
                            value={state.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                        <input
                            type="text"
                            name="stock"
                            value={state.stock}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Imagen actual:</label>
                        {state.image_path && (
                            <img src={`/storage/${state.image_path}`} alt="Imagen actual del producto" className="mb-4" style={{ maxWidth: '200px' }} />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nueva Imagen:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="w-full bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300">Actualizar</button>
                </form>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </main>
        )}
        </>
    );
}
