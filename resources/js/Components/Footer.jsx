import React from 'react';
import { FaCcPaypal, FaTiktok, FaInstagram } from 'react-icons/fa'; // Example icons from react-icons
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-bgPrimary text-white py-8 px-4 mt-auto w-full">
            <div className="container mx-auto flex justify-between items-start">
                <div className="flex space-x-24">
                    <div className="flex flex-col space-y-2">
                        <a href="#" className="hover:underline">Condiciones de compra</a>
                        <a href="#" className="hover:underline">Envíos</a>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <a href="#" className="hover:underline">Quiénes somos</a>
                        <a href="#" className="hover:underline">Preguntas Frecuentes</a>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <a href="#" className="hover:underline">Contacto</a>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-4">
                    <div className="flex space-x-4">
                        <FaCcPaypal className="text-2xl" />
                        <FaXTwitter className="text-2xl" />
                    </div>
                    <div className="flex space-x-4">
                        <FaTiktok className="text-2xl" />
                        <FaInstagram className="text-2xl" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
