import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { parseISO, format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const GraficaPedidosPorMes = ({ pedidos }) => {
    // Crear un objeto para contar los pedidos por mes
    const pedidosPorMes = pedidos.reduce((acc, pedido) => {
        const mes = format(parseISO(pedido.created_at), 'yyyy-MM-dd'); // Formatear a 'YYYY-MM'
        acc[mes] = (acc[mes] || 0) + 1;
        return acc;
    }, {});

    // Preparar los datos para la gráfica
    const labels = Object.keys(pedidosPorMes).sort(); // Ordenar los meses cronológicamente
    const data = {
        labels,
        datasets: [
            {
                label: 'Número de Pedidos',
                data: Object.values(pedidosPorMes),
                fill: false,
                backgroundColor: '#21D760',
                borderColor: '#21D760',
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{width: '500px', height: '300px'}}>
            <h2>Pedidos por Mes</h2>
            <Line data={data} />
        </div>
    );
};

export default GraficaPedidosPorMes;
