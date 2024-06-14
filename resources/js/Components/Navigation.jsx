import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import logo from '../../img/Logo.webp';

const Navigation = ({ user }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (searchTerm) {
            axios.post('/buscarCategorias', { search: searchTerm })
                .then(response => {
                    setCategorias(response.data);
                })
                .catch(error => {
                    console.error('Error al buscar categorías:', error);
                });
        } else {
            setCategorias([]);
        }
    }, [searchTerm]);

    return (
        <header className="bg-black text-white">
            <nav className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
                <Link href="/">
                    <img src={logo} alt="Logo" className="w-24 h-24 object-contain" id='logo-home' />
                </Link>
                <div className="hidden lg:flex space-x-4 items-center"> {/* Cambiado de md a lg */}
                    <Link href="/categorias" className="hover:underline">Categorías</Link>
                    <div className="relative flex items-center">
                        <button onClick={toggleSearch} className="hover:underline focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.3-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                            </svg>
                        </button>
                        {searchVisible && (
                            <div className="relative">
                                <input
                                    type="text"
                                    className="ml-2 p-2 w-48 text-black border border-gray-300 rounded transition-transform transform scale-95 origin-left animate-slide-left"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                {categorias.length > 0 && (
                                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                        <ul>
                                            {categorias.map(categoria => (
                                                <li key={categoria.id_category} className="p-2 hover:bg-gray-100 text-black">
                                                    <Link href={`/categorias/${categoria.id_category}`}>{categoria.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {user ? (
                        <Link href="/dashboard" className="hover:underline">Perfil</Link>
                    ) : (
                        <Link href="/mi-cuenta" className="hover:underline">Mi cuenta</Link>
                    )}

                    
                    
                    {user && user['role'] === 'admin' && (
                        <>
                            <Link href='/registerAdmin' className="hover:underline">Registrar usuario</Link>
                            <Link href="/crear-categoria" className="hover:underline">Crear categoría</Link>
                            <Link href="/crear-producto" className="hover:underline">Crear producto</Link>
                        </>
                    )}
                    <Link href="/productos" className="hover:underline">Productos</Link>
                    <Link href="/carrito" className="hover:underline">Mi cesta</Link>
                    <Link href="/pedidos" className="hover:underline">Pedidos</Link>
                </div>
                <div className="lg:hidden flex items-center"> {/* Cambiado de md a lg */}
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </nav>
            <div className={`lg:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${menuOpen ? 'max-h-96' : 'max-h-0'}`}> {/* Cambiado de md a lg */}
                <Link href="/categorias" className="block px-4 py-2 hover:underline">Categorías</Link>
                <div className="relative flex items-center px-4 py-2">
                    <button onClick={toggleSearch} className="hover:underline focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.3-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                        </svg>
                    </button>
                    {searchVisible && (
                        <div className="relative mt-2 w-full">
                            <input
                                type="text"
                                className="p-2 w-full text-black border border-gray-300 rounded transition-transform transform scale-95 origin-left animate-slide-left"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            {categorias.length > 0 && (
                                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                    <ul>
                                        {categorias.map(categoria => (
                                            <li key={categoria.id_category} className="p-2 hover:bg-gray-100 text-black">
                                                <Link href={`/categorias/${categoria.id_category}`}>{categoria.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {user ? (
                    <Link href="/dashboard" className="block px-4 py-2 hover:underline">Perfil</Link>
                ) : (
                    <Link href="/mi-cuenta" className="block px-4 py-2 hover:underline">Mi cuenta</Link>
                )}
                {user && user['role'] === 'admin' && (
                    <>
                        <Link href='/registerAdmin' className="block px-4 py-2 hover:underline">Registrar usuario</Link>
                        <Link href="/crear-categoria" className="block px-4 py-2 hover:underline">Crear categoría</Link>
                        <Link href="/crear-producto" className="block px-4 py-2 hover:underline">Crear producto</Link>
                    </>
                )}
                <Link href="/productos" className="block px-4 py-2 hover:underline">Productos</Link>
                <Link href="/carrito" className="block px-4 py-2 hover:underline">Mi cesta</Link>
                <Link href="/pedidos" className="block px-4 py-2 hover:underline">Pedidos</Link>
            </div>
        </header>
    );
};

export default Navigation;
