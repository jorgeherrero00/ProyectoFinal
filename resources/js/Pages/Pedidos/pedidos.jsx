import React from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import GraficaPedidos from './GraficaPedidos';
import GraficaPedidosPorMes from './GraficaPedidosPorMes';
import Welcome from '../Welcome';
export default function Pedidos({ pedidos, user, pedidosUser}) {

    const cambiarEstadoPedido = (idPedido) => {
        // Aquí usamos Axios para hacer la solicitud HTTP
        axios.post(`/pedidos/${idPedido}/cambiarEstado`, { estado: 'enviado' })
            .then(response => {
                // Manejar la respuesta
                if (response.status === 200) {
                    router.get('/pedidos');
                    // Si necesitas actualizar la lista de pedidos, puedes hacerlo aquí
                } else {
                    console.error('Hubo un error al cambiar el estado del pedido');
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });
    };

    return (
        <div>
            <Welcome user={user} />
            <h1>Pedidos</h1>
            {user && user['role'] === 'admin' && (
                <>
                    <GraficaPedidos pedidos={pedidos} />
                    <GraficaPedidosPorMes pedidos={pedidos} />
                </>
            )}

            {user && user['role'] === 'admin' && (
                 <ul>
                 {pedidos.map((pedido) => (
                     <li key={pedido.id_order}>
                         <strong>ID del Pedido:</strong> {pedido.id_order}<br />
                         <strong>Ítems:</strong> {pedido.items}<br />
                         <strong>Precio:</strong> {pedido.price}<br />
                         <strong>Dirección:</strong> {pedido.address}<br />
                         <strong>Estado:</strong> {pedido.status}<br />
                         <strong>Fecha:</strong> {pedido.created_at}<br />
                         {/* Agregar un botón para cambiar el estado del pedido */}
                         {pedido.status === 'pendiente' && (
                             <button onClick={() => cambiarEstadoPedido(pedido.id_order)}>Marcar como enviado</button>
                         )}
                     </li>
                 ))}
             </ul>
            )}
           

            <ul>
                {pedidosUser.map((pedido) => (
                    <li key={pedido.id_order}>
                        <strong>ID del Pedido:</strong> {pedido.id_order}<br />
                        <strong>Ítems:</strong> {pedido.items}<br />
                        <strong>Precio:</strong> {pedido.price}<br />
                        <strong>Dirección:</strong> {pedido.address}<br />
                        <strong>Estado:</strong> {pedido.status}<br />
                        <strong>Fecha:</strong> {pedido.created_at}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
}