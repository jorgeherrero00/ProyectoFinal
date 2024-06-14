import Footer from '@/Components/Footer';
import Navigation from '@/Components/Navigation';
import React from 'react';

const CondicionesCompra = ({ user }) => {
    return (
        <>
            <Navigation user={user} />
            <div className="container mx-auto mt-12 px-4 text-black">
                <h2 className="text-2xl font-semibold mb-4">Condiciones de Compra</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">1. Política de Devolución</h3>
                    <p className="mb-4">
                        En nuestra tienda de productos de informática, ofrecemos una política de devolución de 30 días a partir de la fecha de compra. Para poder realizar una devolución, el producto debe estar en su empaque original y sin haber sido usado.
                    </p>

                    <h3 className="text-lg font-semibold mb-4">2. Garantía de Productos</h3>
                    <p className="mb-4">
                        Todos nuestros productos de informática están cubiertos por una garantía estándar de 1 año. Esta garantía cubre defectos de fabricación y problemas de funcionamiento que no sean resultado de un mal uso por parte del cliente.
                    </p>

                    <h3 className="text-lg font-semibold mb-4">3. Métodos de Pago</h3>
                    <p className="mb-4">
                        Aceptamos los siguientes métodos de pago: tarjetas de crédito/débito (Visa, MasterCard, American Express) y PayPal.
                    </p>

                    <h3 className="text-lg font-semibold mb-4">4. Envíos y Tiempos de Entrega</h3>
                    <p className="mb-4">
                        Los productos se envían dentro de las 48 horas siguientes a la confirmación del pedido. Los tiempos de entrega pueden variar según la ubicación y están sujetos a las políticas de las empresas de transporte utilizadas.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CondicionesCompra;
