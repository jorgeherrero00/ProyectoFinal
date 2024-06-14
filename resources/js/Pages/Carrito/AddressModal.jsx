import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { router } from '@inertiajs/react';

function AddressModal({ show, closeModal, carrito, user }) {
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [pais, setPais] = useState('');
  const [seccionActual, setSeccionActual] = useState('carrito');
  const [errorMensajes, setErrorMensajes] = useState({});

  const calcularTotalCarrito = () => {
    return Object.keys(carrito).reduce((total, username) => {
      return total + Object.keys(carrito[username]).reduce((subtotal, productName) => {
        return subtotal + carrito[username][productName].totalPrice;
      }, 0);
    }, 0);
  };

  const totalCarrito = calcularTotalCarrito();
  const mostrarSeccionDireccion = () => {
    setSeccionActual('direccion');
  };

  const mostrarSeccionPago = () => {
    const nuevosErrores = {};

    if (!direccion) nuevosErrores.direccion = 'La dirección es obligatoria.';
    if (!codigoPostal) nuevosErrores.codigoPostal = 'El código postal es obligatorio.';
    else if (!/^\d+$/.test(codigoPostal)) nuevosErrores.codigoPostal = 'El código postal debe ser un número.';
    if (!ciudad) nuevosErrores.ciudad = 'La ciudad es obligatoria.';
    if (!provincia) nuevosErrores.provincia = 'La provincia es obligatoria.';
    if (!pais) nuevosErrores.pais = 'El país es obligatorio.';

    if (Object.keys(nuevosErrores).length > 0) {
      setErrorMensajes(nuevosErrores);
      return;
    }

    setErrorMensajes({});
    setSeccionActual('pago');
    loadPayPalScript(totalCarrito);
  };

  useEffect(() => {
    if (!show) {
      closeModal();
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show, closeModal]);

  const loadPayPalScript = async (total) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_SANDBOX_CLIENT_ID}&currency=EUR`;
    script.addEventListener('load', () => {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return fetch('/paypal/order', {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
              carrito: carrito,
              direccion: direccion,
              codigoPostal: codigoPostal,
              ciudad: ciudad,
              provincia: provincia,
              pais: pais,
              total: total // Enviar el total del carrito al backend
            })
          }).then(function (res) {
            return res.json();
          }).then(function (orderData) {
            return orderData.id;
          });
        },
        onApprove: function (data, actions) {
          return fetch('/paypal/capture', {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          }).then(function (res) {
            return res.json();
          }).then(function (details) {
            router.get('/pedidos');
          });
        },
        onCancel: function (data) {
          window.location.href = '/paypal/cancel';
        }
      }).render('#paypal-button-container');
    });
    document.body.appendChild(script);
  };

  return (
    <Modal show={show} onHide={closeModal} className='text-black flex mx-auto' style={{ marginTop: '10rem' }}>
      <Modal.Header closeButton>
        <Modal.Title className='text-center '>
          {seccionActual === 'carrito' ? 'Información del pedido' : seccionActual === 'direccion' ? 'Dirección de Envío' : 'Información de Pago'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {seccionActual === 'carrito' ? (
          <>
            {Object.keys(carrito).map((username, index) => (
              <div key={index} className='bg-white shadow-md rounded-lg p-4'>
                <ul>
                  {Object.keys(carrito[username]).map((productName, productIndex) => (
                    <li key={productIndex}>
                      <p>Producto: {productName}</p>
                      <p>Precio: {carrito[username][productName].price}€</p>
                      <p>Cantidad: {carrito[username][productName].quantity}</p>
                      <p>Total: {carrito[username][productName].totalPrice}€</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="text-center mt-4">
              <h5>Total del carrito: {totalCarrito.toFixed(2)}€</h5>
            </div>
          </>
        ) : seccionActual === 'direccion' ? (
          <Form>
            <Form.Group className="mb-3" controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="C/ Av. Principal"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
              {errorMensajes.direccion && <p style={{ color: 'red' }}>{errorMensajes.direccion}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCodigoPostal">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                required
              />
              {errorMensajes.codigoPostal && <p style={{ color: 'red' }}>{errorMensajes.codigoPostal}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Granada"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
              />
              {errorMensajes.ciudad && <p style={{ color: 'red' }}>{errorMensajes.ciudad}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProvincia">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Granada"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                required
              />
              {errorMensajes.provincia && <p style={{ color: 'red' }}>{errorMensajes.provincia}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPais">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                placeholder="España"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                required
              />
              {errorMensajes.pais && <p style={{ color: 'red' }}>{errorMensajes.pais}</p>}
            </Form.Group>
          </Form>
        ) : (
          <div id="paypal-button-container"></div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {seccionActual === 'carrito' ? (
          <Button variant="primary" onClick={mostrarSeccionDireccion} className='w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300'>
            Siguiente
          </Button>
        ) : seccionActual === 'direccion' ? (
          <>
            <Button variant="secondary" onClick={closeModal} className='w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300'>
              Cerrar
            </Button>
            <Button variant="primary" onClick={mostrarSeccionPago} className='w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300'>
              Siguiente
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={closeModal} className='w-auto bg-bgPrimary border-2 border-bgPrimary text-white py-2 px-4 rounded-lg hover:border-2 hover:border-primary hover:text-primary transition duration-300'>
              Cerrar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default AddressModal;
