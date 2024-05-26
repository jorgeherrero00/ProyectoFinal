import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddressModal({ show, closeModal, carrito }) {
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [pais, setPais] = useState('');
  const [seccionActual, setSeccionActual] = useState('carrito');

  const guardarDatos = () => {
    if (seccionActual === 'direccion') {
      console.log('Dirección:', direccion);
      console.log('Código Postal:', codigoPostal);
      console.log('Ciudad:', ciudad);
      console.log('Provincia:', provincia);
      console.log('País:', pais);
    }
    closeModal();
  };

  const mostrarSeccionDireccion = () => {
    setSeccionActual('direccion');
  };

  useEffect(() => {
    if (!show) {
      closeModal();
    }
  }, [show, closeModal]);

  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{seccionActual === 'carrito' ? 'Carrito de Compras' : 'Dirección de Envío'}</Modal.Title>
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
          ) : (
            // Sección de Dirección de Envío
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="C/ Av. Principal"
                  autoFocus
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1234"
                  autoFocus
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Granada"
                  autoFocus
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Granada"
                  autoFocus
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="España"
                  autoFocus
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {seccionActual === 'carrito' ? (
            // Botón para mostrar la sección de Dirección de Envío
            <Button variant="primary" onClick={mostrarSeccionDireccion}>
              Siguiente
            </Button>
          ) : (
            // Botones de Cerrar y Guardar en la sección de Dirección de Envío
            <>
              <Button variant="secondary" onClick={closeModal}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={guardarDatos}>
                Guardar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddressModal;
