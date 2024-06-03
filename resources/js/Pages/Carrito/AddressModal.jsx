import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { router } from '@inertiajs/react';

function AddressModal({ show, closeModal, carrito }) {
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [pais, setPais] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [seccionActual, setSeccionActual] = useState('carrito');


  const guardarDatos = () => {
    axios.post(route('add-pedido'), {
      carrito: carrito,
      direccion: direccion,
      codigoPostal: codigoPostal,
      ciudad: ciudad,
      provincia: provincia,
      pais: pais
    })
    .then(response => {
      console.log(response);
      // Manejar la respuesta del servidor
    })
    .catch(error => {
      if (error.response.status === 401) {
        // Redirigir a la página de login si el usuario no está autenticado
        router.visit('/login', { method: 'get' }, {data: 'Por favor inicia sesión para continuar'});
      } else {
        console.error(error);
      }
    });

    closeModal();
  };

  const mostrarSeccionDireccion = () => {
    setSeccionActual('direccion');
  };

  const mostrarSeccionPago = () => {
    setSeccionActual('pago');
  };

  useEffect(() => {
    if (!show) {
      closeModal();
    }
  }, [show, closeModal]);

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
          <Form>
            <Form.Group className="mb-3" controlId="formMetodoPago">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Control
                as="select"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                required
              >
                <option value="paypal">PayPal</option>
              </Form.Control>
            </Form.Group>
          </Form>
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
            <Button variant="primary" onClick={guardarDatos}>
              Comprar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default AddressModal;
