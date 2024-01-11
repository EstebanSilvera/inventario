import React from 'react'
import { Navbar, Nav, Container, Button, Modal, Popover, OverlayTrigger } from 'react-bootstrap'
import { Outlet, Link } from "react-router-dom"
import { useState } from 'react'
import { BsFillHouseFill, BsBoxArrowLeft, BsPersonCircle } from "react-icons/bs"
import circuito from '../imagen/circuito.jpg'

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Sesion = () => {
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("USER")
    sessionStorage.removeItem("INFORMACION")
    localStorage.removeItem("@DMIÑ")
    window.location.href = '/'
  }

  const popover = (
    <Popover size="lg" id='popover-positioned-bottom'>
      <Popover.Header as="h3"> Sesion de:<strong> {sessionStorage.getItem("INFORMACION")}</strong></Popover.Header>

      <Popover.Body>
        Este es un inventario para todos los computadores y dispositivos tecnologicos,
        para tener seguridad y control de cada uno de ellos.

        <div className="d-grid gap-2" style={{ margin: "10px" }}>
          <Button variant="dark" size='lg' onClick={handleShow}>
            <BsBoxArrowLeft style={{ fontSize: '30px', color: "white" }} />
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );


  return (
    <div>

      {
        (sessionStorage.getItem("USER") === "administrador")
        ?
        <>
          <Navbar className="navfoo" style={{ backgroundImage: `url(${circuito})`, boxShadow:"0px -5px 5px -2px black inset", transition: "5s" }}  bg="light" expand="lg">
            <Container>
              <Navbar.Brand className='logo' style={{ marginRight: "240px" }} as={Link} to="/Principal"> <BsFillHouseFill style={{ fontSize: '50px', color: "white" }} /></Navbar.Brand>
              <Navbar.Toggle style={{backgroundColor:"white"}} aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ textAlign: "center", fontSize: "15pt", margin: "10px" }} className="me-auto">
                  <Nav.Link className='button' as={Link} to="/Equiposvia40">Equipos Via 40</Nav.Link>
                  <Nav.Link className='button' as={Link} to="/Equiposcatedral">Equipos Catedral</Nav.Link>
                  <Nav.Link className='button' as={Link} to="/Equiposcartagena">Equipos Cartagena</Nav.Link>
                  <Nav.Link className='button' as={Link} to="/EquiposAlemana">Equipos Alemana</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <div className="d-grid gap-2">
                      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button className='logo' variant="light"><BsPersonCircle style={{ fontSize: "40px", color: "black" }} /></Button>
                      </OverlayTrigger>
                    </div>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      :
      <>
      <Navbar style={{ background: 'linear-gradient(white, #90A4AE)' }} bg="light" expand="lg">
          <Container>
            <Navbar.Brand className='logo' style={{ marginRight: "240px" }} as={Link} to="/PrincipalUser"> <BsFillHouseFill style={{ fontSize: '50px', color: "black" }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <div className="d-grid gap-2">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                      <Button className='logo' variant="dark"><BsPersonCircle style={{ fontSize: "40px", color: "white" }} /></Button>
                    </OverlayTrigger>
                  </div>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      
      </>
      }


      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cerrar sesion</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Esta seguro que desea cerrar sesion?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="danger" onClick={() => Sesion()}>
              Si!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <section>
        <Outlet></Outlet>
      </section>

    </div>
  )
}

export default NavBar