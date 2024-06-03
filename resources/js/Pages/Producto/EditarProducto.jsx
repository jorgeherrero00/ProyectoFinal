import { useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function EditarProducto({ producto, onUpdate }) {
    const [state, setState] = useState({
        id: producto.id_product,
        name: producto.name,
        description: producto.description
    });
    const [error, setError] = useState(null);
    const[success, setSuccess] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (producto != null) {
            setState({
                id: producto.id_product,
                name: producto.name,
                category_id: producto.category_id,
                description: producto.description,
                stock: producto.stock,
                price: producto.price
            });
        }
    }, [producto]);

    useEffect(() => {
        // Fetch categories from the server
        fetch('/obtenerCategorias')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.log(error));
      }, []);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/actualizarProducto', state).then((response) => {
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
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                        />
                        <label>Stock:</label>
                        <input
                            type="text"
                            name="stock"
                            value={state.stock}
                            onChange={handleChange}
                        />
                        <label>Precio:</label>
                        <input
                            type="text"
                            name="price"
                            value={state.price}
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