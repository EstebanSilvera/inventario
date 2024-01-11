import React, { useState } from 'react'
import { Carousel, Card, Table, Button, Modal, Form } from 'react-bootstrap'
import picture from '../imagen/carro.jpg'
import picture2 from '../imagen/kia.jpg'
import picture7 from '../imagen/sportage.jpg'
import { BsFillChatSquareTextFill, BsTools } from 'react-icons/bs'

const PrincipalUser = ({ prueba }) => {

  const [informacion, setInformacion] = useState(false);
  const [mejorar, setMejorar] = useState(false);

  console.log(prueba)
  
  return (

    <div style={{ width: '100%', background: 'linear-gradient(#90A4AE, #A9CCE3 , #90A4AE)' }}>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: '100%', height: '60vh' }}
              src={picture}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Rio Sedán</h3>
              Deja que la vida te sorprenda cada día
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={picture2}
              style={{ width: '100%', height: '60vh' }}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={picture7}
              style={{ width: '100%', height: '60vh' }}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>New Sportage</h3>

              Amplía tus horizontes. Construida para una inspiración infinita

            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

        <hr />
      <div className='container'>

        <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
          <h2 align="center">Funciones</h2>

          <div style={{ display: "flex", alignItems: "flex-end" }}>

            <div onClick={() => setInformacion(true)}
              style={{
                backgroundColor: "#F5B7B1",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #E74C3C",
                margin: "15px"
              }} >
              <BsFillChatSquareTextFill style={{ fontSize: "150px", marginLeft: "25px", marginTop: "10px" }} />
              <p align="center">Presione aqui...</p>
            </div>

            <div onClick={() => setMejorar(true)}
              style={{
                backgroundColor: "#D5D8DC",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #566573",
                margin: "15px"
              }} >
              <BsTools style={{ fontSize: "150px", marginLeft: "25px", marginTop: "10px" }} />
              <p align="center">Presione aqui...</p>
            </div>
          </div>
        </div>


        <>
          <Modal show={informacion} onHide={() => setInformacion(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Agregue el problema aquí</Modal.Title>
            </Modal.Header>
            <Modal.Body><strong>ESCRIBA AQUI EL PROBLEMA QUE TIENE CON SU COMPUTADOR</strong></Modal.Body>
            <Modal.Body>
              <Form.Control as="textarea" placeholder='Escriba aquí su problema...' />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setInformacion(false)}>
                Close
              </Button>
              <Button variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        <>
          <Modal show={mejorar} onHide={() => setMejorar(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Escriba lo que necesita o cree que le ghace falta a la pagina</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control as="textarea" placeholder='Escriba aquí su problema...' />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setMejorar(false)}>
                Close
              </Button>
              <Button variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        <br />

        <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
          <Card>
            <h1 align='center'>Observaciones de los usuarios</h1>
          </Card>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td colSpan={3}>Lorem Lorem lorem q   klflsdjkfashndnljasdjlnasflaskldf</td>
              </tr>
              <tr>
                <td>2</td>
                <td colSpan={3}>Larry the Bird</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={3}>Larry the Bird</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div><br />
    </div>
  )
}

export default PrincipalUser