import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
const CrearProducto = ({ user }) => {
  const [state, setState] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock: '',
    image: null
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!state.name) newErrors.name = 'El nombre es obligatorio.';
    if (!state.category_id) newErrors.category_id = 'La categoría es obligatoria.';
    if (!state.description) newErrors.description = 'La descripción es obligatoria.';
    if (!state.price || isNaN(state.price) || state.price <= 1) newErrors.price = 'El precio debe ser un número mayor que 1.';
    if (!state.stock || isNaN(state.stock) || state.stock <= 1) newErrors.stock = 'El stock debe ser un número mayor que 1.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    for (const key in state) {
      formData.append(key, state[key]);
    }

    router.post('/crearProducto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      setState({
        name: '',
        description: '',
        category_id: '',
        price: '',
        stock: '',
        image: null
      });
      setErrors({});
    }).catch(error => console.log(error));
  };

  if (!user || user.role !== 'admin') {
    router.get('/');
    return null;
  }
  return (
    <div className="min-h-screen bg-bgPrimary">
      <Navigation user={user} />
      {user && user['role'] === 'admin' && (
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Crear Producto</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-black font-medium mb-2">Nombre:</label>
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
              <label className="block text-black font-medium mb-2">Categoria:</label>
              <select
                name="category_id"
                value={state.category_id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-black focus:outline-none transition duration-300 ${errors.category_id ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category.id_category} value={category.id_category}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2">Descripción:</label>
              <textarea
                name="description"
                value={state.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-black focus:outline-none transition duration-300 ${errors.description ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2">Precio:</label>
              <input
                type="text"
                name="price"
                value={state.price}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-black focus:outline-none transition duration-300 ${errors.price ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2">Stock:</label>
              <input
                type="text"
                name="stock"
                value={state.stock}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-black focus:outline-none transition duration-300 ${errors.stock ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2">Imagen:</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-primary transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300"
            >
              Crear Producto
            </button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CrearProducto;
