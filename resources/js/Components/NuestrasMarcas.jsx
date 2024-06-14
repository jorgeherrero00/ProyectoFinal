import React from 'react';

export default function NuestrasMarcas() {
    const marcas = [
        "AMD", "Intel", "Nvidia", "Msi", "Corsair", "Lenovo", "Samsung",
        "Apple", "Kingston", "Xiaomi", "Gigabyte"
    ];

    return (
        <div className='flex flex-col items-center mt-20'>
            <div>
                <h2 className="text-3xl font-bold text-center text-primary mb-6">
                    NUESTRAS MARCAS
                </h2>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-4'>
                {marcas.map((marca, index) => (
                    <span key={index} className="px-4 py-2 bg-primary text-gray-800 rounded-full text-sm hover:scale-105 transition duration-300">
                        {marca}
                    </span>
                ))}
            </div>
        </div>
    );
}
