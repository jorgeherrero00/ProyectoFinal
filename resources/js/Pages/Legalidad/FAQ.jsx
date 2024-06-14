// src/FAQ.js

import React from 'react';
import Navigation from '@/Components/Navigation';

const FAQ = ({ user }) => {
    return (
        <>
            <Navigation user={user} />
            <div className="container mx-auto mt-12 px-4 text-black">
                <h2 className="text-2xl font-semibold mb-4 text-white">Preguntas Frecuentes</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <h3 className="font-semibold">¿Cuánto tiempo tardan en procesar mi pedido?</h3>
                        <p>Normalmente procesamos todos los pedidos dentro de las 24-48 horas hábiles después de recibir el pago.</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold">¿Cuáles son los métodos de pago aceptados?</h3>
                        <p>Aceptamos pagos con tarjeta de crédito, PayPal.</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold">¿Hacen envíos internacionales?</h3>
                        <p>Sí, realizamos envíos internacionales a la mayoría de los países. Los tiempos de entrega y costos de envío varían según el destino.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">¿Qué debo hacer si recibo un producto defectuoso?</h3>
                        <p>Si recibes un producto defectuoso, por favor contáctanos inmediatamente con una descripción del problema y, si es posible, adjunta fotos del defecto. Nos encargaremos de resolver el problema lo antes posible.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQ;
