import React from 'react';
import { FaCcPaypal, FaTiktok, FaInstagram } from 'react-icons/fa'; // Example icons from react-icons
import { FaXTwitter } from "react-icons/fa6";
import { router } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="text-white py-8 px-4 w-full bottom-0 left-0">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
                <div className="flex flex-wrap justify-between w-full md:w-auto mb-4 md:mb-0 space-y-4 md:space-y-0">
                    <div className="flex flex-col space-y-2 w-1/2 md:w-auto">
                        <a onClick={() => router.get("/condicionesCompra")} className="text-center hover:underline hover:cursor-pointer hover:text-primary">Condiciones de compra</a>
                        <a onClick={() => router.get("/informacionEnvios")} className="text-center hover:underline hover:cursor-pointer hover:text-primary">Envíos</a>
                        <a onClick={() => router.get("/quienesSomos")} className="text-center hover:underline hover:cursor-pointer hover:text-primary">Quiénes somos</a>
                    </div>
                    <div className="flex flex-col space-y-2 w-1/2 md:w-auto">
                        <a onClick={() => router.get("/contactInfo")} className="text-center hover:underline hover:cursor-pointer hover:text-primary">Contacto</a>
                        <a onClick={() => router.get("/FAQ")} className="text-center hover:underline hover:cursor-pointer hover:text-primary">Preguntas Frecuentes</a>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-around md:justify-around w-full lg:w-auto space-x-6 mt-4 md:mt-4">
                    <FaCcPaypal className="text-2xl" />
                    <FaXTwitter className="text-2xl" />
                    <FaTiktok className="text-2xl" />
                    <FaInstagram className="text-2xl" />
                </div>
            </div>
        </footer>
    );
}
