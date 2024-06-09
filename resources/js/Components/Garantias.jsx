import React from 'react';
import { FaHeadset, FaTruck, FaMedal } from 'react-icons/fa'; // Example icons from react-icons

export default function Garantias() {
    return (
        <div className="bg-bgPrimary text-white py-4 flex justify-center items-center space-x-8 mt-20">
            <div className="border-l-4 border-white h-12"></div>
            <div className="flex items-center space-x-2">
                <FaHeadset className="text-2xl" />
                <span>Atención al cliente inmediata</span>
            </div>
            <div className="border-l-4 border-white h-12"></div>
            <div className="flex items-center space-x-2">
                <FaTruck className="text-2xl" />
                <span>Envío rápido</span>
            </div>
            <div className="border-l-4 border-white h-12"></div>
            <div className="flex items-center space-x-2">
                <FaMedal className="text-2xl" />
                <span>Productos originales</span>
            </div>
            <div className="border-l-4 border-white h-12"></div>
        </div>
    );
}
