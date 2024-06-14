import React from 'react';
import Navigation from '@/Components/Navigation';

const QuienesSomos = ({ user }) => {
    return (
        <>
            <Navigation user={user} />
            <div className="container mx-auto mt-12 px-4 text-black">
                <h2 className="text-2xl font-semibold mb-4 text-white">Quiénes Somos</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="mb-4">
                        Somos una tienda española dedicada a ofrecer lo último en tecnología a nuestros clientes. Fundada en 2024, nos especializamos en la venta de productos de informática, electrónica y gadgets innovadores.
                    </p>
                    <p className="mb-4">
                        En TechBox, nos esforzamos por proporcionar productos de alta calidad y un excelente servicio al cliente. Nuestro equipo está compuesto por apasionados de la tecnología, listos para asistirte en tus compras y resolver cualquier duda que puedas tener.
                    </p>
                    <p className="mb-4">
                        Valoramos la satisfacción de nuestros clientes por encima de todo, por lo que trabajamos duro para mantenernos actualizados con las últimas tendencias y ofrecer precios competitivos en nuestro catálogo de productos.
                    </p>
                    <p className="mb-4">
                        Siempre estamos buscando mejorar y crecer, manteniendo nuestros valores de transparencia, fiabilidad y compromiso con la innovación.
                    </p>
                    <p>
                        ¡Gracias por confiar en nosotros para todas tus necesidades tecnológicas!
                    </p>
                </div>
            </div>
        </>
    );
};

export default QuienesSomos;
