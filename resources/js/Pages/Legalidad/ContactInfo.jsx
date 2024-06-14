// src/ContactInfo.js

import React from 'react';
import Navigation from '@/Components/Navigation';
const ContactInfo = ({ user }) => {
    return (
        <>
            <Navigation user={user}/>
        <div className="container mx-auto mt-12 px-4 text-black">
            <h2 className="text-2xl font-semibold mb-4 text-white">Contacto</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="mb-4">
                    <strong>Dirección:</strong> Calle de la Tecnología, 123, Ciudad Tecno
                </p>
                <p className="mb-4">
                    <strong>Teléfono:</strong> +34 912 345 678
                </p>
                <p className="mb-4">
                    <strong>Correo Electrónico:</strong> contacto@techbox.com
                </p>
            </div>
        </div>
        </>
    );
}

export default ContactInfo;
