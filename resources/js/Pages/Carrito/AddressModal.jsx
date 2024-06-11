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

  const mostrarSeccionDireccion = () => {
    setSeccionActual('direccion');
  };

  const mostrarSeccionPago = () => {
    setSeccionActual('pago');
    loadPayPalScript();
  };

  useEffect(() => {
    if (!show) {
      closeModal();
    }
  }, [show, closeModal]);

  const loadPayPalScript = async () => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_SANDBOX_CLIENT_ID}&currency=USD`;
    script.addEventListener('load', () => {
      window.paypal.Buttons({
        createOrder: function(data, actions) {
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
              pais: pais
            })
          }).then(function(res) {
            return res.json();
          }).then(function(orderData) {
            return orderData.id;
          });
        },
        onApprove: function(data, actions) {
          return fetch('/paypal/capture', {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          }).then(function(res) {
            return res.json();
          }).then(function(details) {
            router.get('/pedidos');
          });
        },
        onCancel: function(data) {
          window.location.href = '/paypal/cancel';
        }
      }).render('#paypal-button-container');
    });
    document.body.appendChild(script);
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {seccionActual === 'carrito' ? 'Carrito de Compras' : seccionActual === 'direccion' ? 'Dirección de Envío' : 'Información de Pago'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {seccionActual === 'carrito' ? (
          // Sección de Carrito de Compras
          Object.keys(carrito).map((username, index) => (
            <div key={index}>
              <h3>Usuario: {username}</h3>
              <ul>
                {Object.keys(carrito[username]).map((productName, productIndex) => (
                  <li key={productIndex}>
                    <p>Producto: {productName}</p>
                    <p>Precio: {carrito[username][productName].price}</p>
                    <p>Cantidad: {carrito[username][productName].quantity}</p>
                    <p>Total: {carrito[username][productName].totalPrice}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : seccionActual === 'direccion' ? (
          // Sección de Dirección de Envío
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
            </Form.Group>
          </Form>
        ) : (
          // Sección de Información de Pago
          <div id="paypal-button-container"></div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {seccionActual === 'carrito' ? (
          <Button variant="primary" onClick={mostrarSeccionDireccion}>
            Siguiente
          </Button>
        ) : seccionActual === 'direccion' ? (
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={mostrarSeccionPago}>
              Siguiente
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default AddressModal;
