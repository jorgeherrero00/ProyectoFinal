import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import Navigation from '@/Components/Navigation';
const CrearCategoria = ({user}) => {
  const [state, setState] = useState({
    name: '',
    description: ''
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
    console.log('Descripción:', state.description);
    router.post('/crearCategoria', state)
    setState({
      name: '',
      description: ''
    });
  }

  return (

    <div>
      <Navigation user={user} />
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
          <label>Descripción:</label>
          <textarea
            name="description"
            value={state.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
}

export default CrearCategoria;