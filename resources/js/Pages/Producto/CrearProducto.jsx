import React, { useState } from 'react';
import { router } from '@inertiajs/react'

const CrearProducto = () => {
  const [state, setState] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock: ''
  });
  
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
      <h2>Crear Categoría</h2>
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
          <input
            type="text"
            name="category_id"
            value={state.category_id}
            onChange={handleChange}
          />
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
        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
}

export default CrearProducto;