import React from 'react';
import Navigation from '@/Components/Navigation';

const InformacionEnvios = ({ user }) => {
    return (
        <>
            <Navigation user={user} />
            <div className="container mx-auto mt-12 px-4 text-black">
                <h2 className="text-2xl font-semibold mb-4 text-white">Información de Envíos</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="mb-4">
                        En TechBox, ofrecemos los mejores envíos para que te lleguen los pedidos a casa sin problemas.
                    </p>
                    <p className="mb-4">
                        <strong>Opciones de Envío:</strong>
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Envío estándar: Entrega en 3-5 días hábiles.</li>
                    </ul>
                    <p className="mb-4">
                        <strong>Costos de Envío:</strong> Los costos de envío son gratis.
                    </p>
                    <p className="mb-4">
                        <strong>Seguimiento de Envío:</strong> Una vez que tu pedido haya sido enviado, recibirás un correo electrónico de confirmación.
                    </p>
                   
                </div>
            </div>
        </>
    );
}

export default InformacionEnvios;
