import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const CrearProducto = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  
  const onSubmit = async (data) => {
    console.log(data);
    // Aquí puedes enviar los datos del formulario a tu backend, por ejemplo:
    try {
      const response = await fetch('/crearProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Redirigir a la página de éxito o hacer cualquier otra cosa necesaria
        router.push('/exito');
      } else {
        // Manejar errores
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            {...register('name')}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            {...register('description')}
          ></textarea>
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            {...register('category')}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            {...register('price')}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            {...register('stock')}
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;
