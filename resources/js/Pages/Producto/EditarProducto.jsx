import { useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function EditarProducto({ producto, onUpdate }) {
    const [state, setState] = useState({
        id: producto.id_product,
        name: producto.name,
        description: producto.description,
        category_id: producto.category_id,
        price: producto.price,
        stock: producto.stock,
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
            if (response.status == 200) {
                setSuccess('Producto actualizado exitosamente.');
                router.get('/productos');
            }
        }).catch((error) => {
            console.log(error);
            setError('Error al actualizar el producto.');
        });
    }

    return (
        <div>
            {producto && (
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
                        <label>Categoría:</label>
                        <select
                            name="category_id"
                            value={state.category_id}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(category => (
                                <option key={category.id_category} value={category.id_category}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input
                            type="text"
                            name="price"
                            value={state.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Stock:</label>
                        <input
                            type="text"
                            name="stock"
                            value={state.stock}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Imagen actual:</label>
                        <img src={`/storage/${state.image_path}`} alt="Imagen actual del producto" width="100" />
                    </div>
                    <div>
                        <label>Nueva Imagen:</label>
                        <input
                            type="file"
                            name="image"
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
