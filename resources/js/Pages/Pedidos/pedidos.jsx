import React from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import GraficaPedidos from './GraficaPedidos';
import GraficaPedidosPorMes from './GraficaPedidosPorMes';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { format } from 'date-fns';

export default function Pedidos({ pedidos, user, pedidosUser }) {

    const cambiarEstadoPedido = (idPedido) => {
        axios.post(`/pedidos/${idPedido}/cambiarEstado`, { estado: 'enviado' })
            .then(response => {
                if (response.status === 200) {
                    router.get('/pedidos');
                } else {
                    console.error('Hubo un error al cambiar el estado del pedido');
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });
    };

    const formatearFecha = (fecha) => {
        return format(new Date(fecha), 'dd/MM/yyyy HH:mm');
    };

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <Navigation user={user} />
            <div className="flex-1">
                <h1 className='text-3xl text-center mt-12'>Pedidos</h1>
                {user && user['role'] === 'admin' && (
                    <div className='flex w-auto gap-4 justify-center mt-12 mb-12 flex-col lg:flex-row items-center'>
                        <GraficaPedidos pedidos={pedidos} />
                        <GraficaPedidosPorMes pedidos={pedidos} />
                    </div>
                )}

                {user && user['role'] === 'admin' && (
                    <ul className="list-disc list-inside mb-8 max-h-96 flex flex-wrap flex-row justify-center gap-4 py-4">
                        {pedidos.map((pedido) => (
                            <li style={{width: '300px'}} className="mx-4 rounded-lg border bg-white border-gray-300 p-4 flex justify-center flex-col items-center text-black hover:scale-105 transition duration-300  hover:border-2 hover:border-primary" key={pedido.id_order}>
                                <strong>ID del Pedido:</strong> {pedido.id_order}<br />
                                <strong>Items:</strong> {pedido.items}<br />
                                <strong>Precio:</strong> {pedido.price}<br />
                                <strong>Dirección:</strong> {pedido.address}<br />
                                <strong>Estado:</strong> {pedido.status}<br />
                                <strong>Fecha:</strong> {formatearFecha(pedido.created_at)}<br />
                                <div className="flex gap-2">
                                    {pedido.status === 'pendiente' && (
                                        <button className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300" onClick={() => cambiarEstadoPedido(pedido.id_order)}>Marcar como enviado</button>
                                    )}
                                    {pedido.status === 'enviado' && (
                                        <a className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300" href={`/pedido/${pedido.id_order}/review`}>Escribir Reseña</a>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {user && user['role'] === 'customer' && (
                    <ul className="list-disc list-inside mb-8 max-h-96 flex flex-wrap flex-row justify-center gap-4 py-4">
                        {pedidosUser.map((pedido) => (
                            <li className="mx-4 w-auto rounded-lg border bg-white border-gray-300 p-4 flex justify-center flex-col items-center text-black hover:scale-105 transition duration-300 cursor-pointer hover:border-2 hover:border-primary" key={pedido.id_order}>
                                <strong>ID del Pedido:</strong> {pedido.id_order}<br />
                                <strong>Productos:</strong> {pedido.items}<br />
                                <strong>Precio:</strong> {pedido.price}<br />
                                <strong>Dirección:</strong> {pedido.address}<br />
                                <strong>Estado:</strong> {pedido.status}<br />
                                <strong>Fecha:</strong> {formatearFecha(pedido.created_at)}<br />
                                {pedido.status === 'enviado' && (
                                    <a className="w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300" href={`/pedido/${pedido.id_order}/review`}>Escribir Reseña</a>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
}
