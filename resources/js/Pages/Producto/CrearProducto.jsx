import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const CrearProducto = () => {
  const [state, setState] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    fetch('/obtenerCategorias')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error));
  }, []);
  console.log(categories)
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', state.name);
    console.log('Categoria:', state.category_id);
    console.log('Descripción:', state.description);
    console.log('Precio:', state.price);
    console.log('Stock:', state.stock);
    router.post('/crearProducto', state)
    setState({
      name: '',
      description: '',
      category_id: '',
      price: '',
      stock: ''
    });
  }

  return (
    <div>
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
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;