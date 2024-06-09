import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
const CrearProducto = ({user}) => {
  const [state, setState] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock: '',
    image: null
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in state) {
      formData.append(key, state[key]);
    }

    router.post('/crearProducto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setState({
      name: '',
      description: '',
      category_id: '',
      price: '',
      stock: '',
      image: null
    });
  };

  return (
    <div>
      <Navigation user={user} />
      <h2>Crear Producto</h2>
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
          <label>Categoria:</label>
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
          <label>Imagen:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;
