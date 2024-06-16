import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
export default function ProductosTrending() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('/productosTrending')
            .then(response => {
                setProductos(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching random products:', error);
            });
    }, []);

    const handleProductClick = (id_product) => {
        router.get(`/producto/${id_product}`);
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-20">
               <div>
                   <h2 className="text-3xl font-bold tracking-widest font-header text-primary">TRENDING</h2>
               </div>

               <div id='random_products' className='flex flex-wrap justify-center items-center md:justify-center md:items-center sm:justify-center sm:items-center'>
                   {productos.map(producto => (
                       <div key={producto.id_product} onClick={() => handleProductClick(producto.id_product)} style={{ cursor: 'pointer' }} className="p-4 hover:scale-105 transition duration-300 cursor-pointer">
                           {producto.image_path && (
                            <div>
                                <img src={`/storage/${producto.image_path}`} alt={producto.name} style={{ width: '190px', height: '150px' }} className='bg-white p-2 mx-auto ' />
                            </div>
                        )}
                           <h3 className='mt-5'>{producto.name}</h3>
                           <p className='text-price'>{producto.price} €</p>
                       </div>
                   ))}
               </div>
            </div>
        </>
    );
}
