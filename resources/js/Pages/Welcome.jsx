import React from 'react';
import { Head } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Carrousel from '@/Components/Carrousel';
import ProductosTrending from '@/Components/ProductosTrending';
import NuestrasMarcas from '@/Components/NuestrasMarcas';
import Garantias from '@/Components/Garantias';
import Footer from '@/Components/Footer';
export default function Welcome({ auth, laravelVersion, phpVersion, user }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    return (
        <>
            <Head title="TechBox" />
            <div>
                <Navigation user={user} />
            </div>
            <Carrousel />
            <ProductosTrending />
            <NuestrasMarcas />
            <Garantias />
            <Footer />
                
        </>
    );
}
