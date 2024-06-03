import { useState, useEffect } from "react";
import { router } from '@inertiajs/react'
import EditarProducto from './EditarProducto.jsx';
import axios from "axios";

export default function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [borrado, setBorrado] = useState(null);
    const [quantities, setQuantities] = useState({}); // Objeto para almacenar la cantidad de cada producto

    useEffect(() => {
        fetch('/obtenerProductos')
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                // Inicializamos las cantidades para cada producto
                const initialQuantities = {};
                data.forEach(product => {
                    initialQuantities[product.id_product] = 1; // Valor inicial de cantidad: 1
                });
                setQuantities(initialQuantities);
            });
    }, []);

    const handleDeleteProduct = (id_product) => {
        axios.post('borrarProducto/', {
            id_product: id_product,
          })
          .then(function (response) {
            setBorrado('Se ha borrado correctamente');
            router.get('/productos');
        })
          .catch(function (error) {
            setBorrado('Error al borrar el producto');
          });
    };

    const handleEditProducto = (producto) => {
        setModoEdicion(prevModoEdicion => (productoSeleccionado === producto && prevModoEdicion) ? !prevModoEdicion : true);
        setProductoSeleccionado(producto);
    }

    const handleAddCarrito = (id_product, name, price) => {
        const quantity = quantities[id_product]; // Obtenemos la cantidad del producto actual
        axios.post('agregarCarrito/', {
            id_product: id_product,
            name: name,
            price: price,
            quantity: quantity,
            totalPrice: quantity * price
        }).then(function (response) {
            router.get('/carrito');  // Redirigir al carrito después de añadir un producto

        }).catch(function (error) {
            console.log(error);
        })
    }

    const handleQuantityChange = (event, id_product) => {
        const newQuantities = { ...quantities };
        newQuantities[id_product] = parseInt(event.target.value);
        setQuantities(newQuantities);
    }

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map(product => (
                    <li key={product.id_product}>
                        <p><strong>Nombre:</strong> {product.name}</p>
                        <p><strong>Descripción:</strong> {product.description}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Precio:</strong> {product.price}</p>
                        <button onClick={() => handleDeleteProduct(product.id_product)}>Eliminar</button>
                        <br />
                        <button onClick={() => handleEditProducto(product)}>Editar</button>
                        <br />
                        <button className="mr-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleAddCarrito(product.id_product, product.name, product.price)}>Añadir al Carrito</button>
                        <input
                            type="number"
                            placeholder="1"
                            value={quantities[product.id_product] || 1}
                            onChange={(event) => handleQuantityChange(event, product.id_product)}
                        />
                    </li>
                ))}
            </ul>
            {modoEdicion && (
                <EditarProducto producto={productoSeleccionado} />
            )}

            {borrado && (
                <p>{borrado}</p>
            )}
        </div>
    );
}
