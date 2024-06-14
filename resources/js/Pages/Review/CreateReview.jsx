import React, { useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';

export default function CreateReview({ user, order }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/pedido/review', {
            order_id: order.id_order,
            title: title,
            description: description,
            rating: rating,
        }).then(response => {
            router.get('/pedidos');
        }).catch(error => {
            console.error('Error al enviar la reseña:', error);
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation user={user} />
            <div className="flex flex-col items-center justify-center flex-grow p-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-center text-black">
                        Escribir Reseña para el Pedido #{order.id_order}
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-black font-medium mb-2">
                                Título
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className=" text-black w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-black font-medium mb-2">
                                Descripción
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="text-black w-full px-3 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-black font-medium mb-2">
                                Rating
                            </label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                                required
                                className="w-full px-3 py-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                {[1, 2, 3, 4, 5].map(r => (
                                    <option className='text-black' key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
                            >
                                Enviar Reseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
