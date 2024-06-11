import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';

const CrearCategoria = ({ user }) => {
  const [state, setState] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!state.name) {
      newErrors.name = 'El nombre es requerido.';
    }
    if (!state.description) {
      newErrors.description = 'La descripción es requerida.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    router.post('/crearCategoria', state);

    setState({
      name: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <>
    <div className="min-h-screen bg-bgPrimary">
      <Navigation user={user} />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Crear Categoría</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-black focus:outline-none transition duration-300 ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Descripción:</label>
            <textarea
              name="description"
              value={state.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-black focus:outline-none transition duration-300 ${errors.description ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg  hover:border-2 hover:border-primary hover:text-primary transition duration-300"
          >
            Crear Categoría
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CrearCategoria;
