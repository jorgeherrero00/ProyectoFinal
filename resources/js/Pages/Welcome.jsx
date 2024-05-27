import { Link, Head } from '@inertiajs/react';
import logo from '../../img/Logo.png';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="TechBox" />
                <div className='hola'>
                <div className="bg-gray-100">
                    <div className="">
                        <header className="">
                            
                            <nav className="">
                                <>
                        <div className='flex direction-row justify-evenly'>
                            
                            <Link href="/" >  <img src={logo} alt="" className='bg-black w-20 inline'/></Link>
                            
                                
                                <Link href='categorias'>
                                    Categorías
                                </Link>
                                <Link href='mi-cuenta'>
                                    Mi cuenta
                                </Link>
                                <Link href='crear-categoria'>
                                    Crear categoria
                                </Link>
                                <Link href='crear-producto'>
                                    Crear producto
                                </Link>
                                <Link href='productos'>
                                    Productos
                                </Link>
                                <Link href='carrito'>
                                    Carrito
                                </Link>
                            </div>
                                </>
                                                               
                            </nav>
                        </header>
                    </div>
                </div>
            </div>
        </>
    );
}
