import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficaPedidosPorMes = ({ pedidos }) => {
    const estados = ['pendiente', 'enviado', 'cancelado'];
    const data = {
        labels: estados,
        datasets: [
            {
                label: 'Número de Pedidos',
                data: estados.map(estado => pedidos.filter(pedido => pedido.status === estado).length),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Estado de los Pedidos</h2>
            <Bar data={data} />
        </div>
    );
};

export default GraficaPedidosPorMes;
