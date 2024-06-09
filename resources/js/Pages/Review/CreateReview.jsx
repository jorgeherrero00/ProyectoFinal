import React, { useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';

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
        <div>
            <Navigation user={user} />
            <h1>Escribir Reseña para el Pedido #{order.id_order}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        required
                    >
                        {[1, 2, 3, 4, 5].map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Enviar Reseña</button>
            </form>
        </div>
    );
}
