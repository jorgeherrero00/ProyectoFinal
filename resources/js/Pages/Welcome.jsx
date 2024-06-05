import { Link, Head } from '@inertiajs/react';
import logo from '../../img/Logo.png';


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
            <div >
                <header >
                    <nav className="flex justify-between items-center">
                        <Link href="/">
                            <img src={logo} alt="Logo" className="bg-black w-20 inline" />
                        </Link>
                        <div className="flex space-x-4">
                            <Link href='categorias'>Categorías</Link>
                            {user ? (
                                <Link href='dashboard'>Dashboard</Link>
                            ) : (
                                <Link href='mi-cuenta'>Mi cuenta</Link>
                            )}
                            {user && user['role'] === 'admin' && (
                                <>
                                    <Link href='crear-categoria'>Crear categoría</Link>
                                    <Link href='crear-producto'>Crear producto</Link>
                                </>
                            )}
                            <Link href='productos'>Productos</Link>
                            <Link href='carrito'>Carrito</Link>
                            <Link href='pedidos'>Pedidos</Link>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}
