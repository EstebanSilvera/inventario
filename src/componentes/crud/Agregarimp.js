import { Button, Card, Form, FloatingLabel, Container, Row, Col, InputGroup, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import fondo from '../imagen/fondo_rayas.png';

const Agregarimp = () => {


    const Add = async () => {

        const id_sede = document.getElementById("id_sede").value
        const tipo_equipo = document.getElementById('tipo_equipo').value
        const marca = document.getElementById("marca").value
        const serial = document.getElementById("serial").value
        const modelo = document.getElementById("modelo").value
        const observacion = document.getElementById("observacion").value
        const cargo = document.getElementById("cargo").value
        const estado = document.getElementById("estado").value
        const propietario = document.getElementById("propietario").value
        const admin = sessionStorage.getItem("INFORMACION")


        //console.log(marca + " " + id_sede + " " + serial + " " + modelo + " " + color + " " + almacenamiento + " " + tipo_almacenamiento + " " + ram + " " + tipo_ram + " " + procesador + " " + cargo + " " + estado);

        let array = [marca, tipo_equipo, id_sede, serial, modelo, observacion, cargo, estado, propietario]

        let vacio = array.filter(response => response !== "")
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_sede: id_sede,
                Tipo_equipo: tipo_equipo,
                marca: marca,
                serial: serial,
                modelo: modelo,
                observacion: observacion,
                lugar: cargo,
                estado: estado,
                propietario: propietario,
                admin: admin,
                eliminado: '0'
            })
        };
        //console.log(array)
        //console.log(vacio)

        if (vacio.length === 9 || tipo_equipo === "Memoria") {

            const response = await fetch('http://autosfujiyama.com:3050/equiposimp', request);
            const data = await response.json();
            console.log(data)

            alert("dato guardado correctamente")

            window.location.replace('/Agregarimp')

        } else {
            alert("llene todos los campos")
        }

        // const response = await fetch('http://localhost:3050/add',request)
        // const responseJSON = await response.json()
        // console.log(responseJSON)
        // console.log("conectado")
    }

    const Memoria = () => {
        const memoria = document.getElementById("tipo_equipo").value
        if (memoria === "Memoria") {
            document.getElementById("serial").disabled = true
            document.getElementById("modelo").disabled = true
            document.getElementById("observacion").placeholder = "escriba aqui el almacenamiento"
        } else {
            document.getElementById("serial").disabled = false
            document.getElementById("modelo").disabled = false
            document.getElementById("observacion").placeholder = ""
        }
    }

    // const Salir = () => {
    //   window.location.href = '/Principal'
    // }

    return (
        <div style={{ backgroundImage: `url(${fondo})` }}><br />
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col lg={9} md={12} xs={12}>
                        <div style={{ boxShadow: "0px 0px 10px 2px #85C1E9", borderRadius: "5px", marginTop: "50px", marginBottom: "80px" }}>
                            <Card>
                                <Card.Header>
                                    <Nav variant="tabs" defaultActiveKey="/home">
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/Agregar">Equipo</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link style={{ background: "linear-gradient( #AAB7B8, white)" }} as={Link} to="/Agregarimp">Impresora/Celular/Otro</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/Programa">Programa</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Header as="h3">Agregar Impresora/Celular </Card.Header>
                                <Card.Body>
                                    <Card.Title>Por favor llenar todos los campos</Card.Title>
                                    <InputGroup className="mb-3">
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingSelectGrid"
                                                label="Sede del computador"
                                            >
                                                <Form.Select id="id_sede" name="id_sede" aria-label="Floating label select example">
                                                    <option></option>
                                                    <option value="1">Catedral</option>
                                                    <option value="2">Via 40</option>
                                                    <option value="3">Cartagena</option>
                                                    <option value="4">Alemana automotriz</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingSelectGrid"
                                                label="Tipo de equipo"
                                            >
                                                <Form.Select onChange={() => Memoria()} id="tipo_equipo" name="tipo_equipo" aria-label="Floating label select example">
                                                    <option></option>
                                                    <option value="Impresora">Impresora</option>
                                                    <option value="Celulares">Celulares</option>
                                                    <option value="Memoria">Memoria</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Marca del computador</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Marca"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            id="marca"
                                            name="marca"
                                        />
                                    </InputGroup>


                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Serial</InputGroup.Text>
                                        {
                                            <Form.Control
                                                placeholder="Serial"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                id="serial"
                                                name="serial"
                                            />
                                        }
                                        <InputGroup.Text id="basic-addon1">Modelo</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Modelo"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            id="modelo"
                                            name="modelo"
                                        />
                                    </InputGroup>

                                    <Form.Group className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Observaciones</InputGroup.Text>
                                        <Form.Control id='observacion' name='observacion' as="textarea" rows={3} />
                                    </Form.Group>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Cargo</InputGroup.Text>
                                        <Form.Select id='cargo' name='cargo' aria-label="Default select example">
                                            <option></option>
                                            <option value="ADMINISTRACION">ADMINISTRACION</option>
                                            <option value="COMERCIAL">COMERCIAL</option>
                                            <option value="ALMACEN">ALMACEN</option>
                                            <option value="TALLER">TALLER</option>
                                            <option value="COLISION">COLISION</option>
                                            <option value="WEB">WEB</option>
                                            <option value="MERCADEO">MERCADEO</option>
                                        </Form.Select>
                                        <InputGroup.Text id="basic-addon1">Estado</InputGroup.Text>
                                        <Form.Select id="estado" name="estado" aria-label="Default select example">
                                            <option></option>
                                            <option value="Funcionando">Funcionando</option>
                                            <option value="Dañado">Dañado</option>
                                        </Form.Select>

                                    </InputGroup>
                                    <FloatingLabel
                                        label="Propietario"
                                    >
                                        <Form.Select id="propietario" aria-label="Floating label select example">
                                            <option></option>
                                            <option value="Fujiyama">Fujiyama</option>
                                            <option value="Arrendamiento">Arrendamiento</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <hr />
                                    <div className="d-grid gap-2">
                                        <Button onClick={() => Add()} size="lg" variant="outline-success">Agregar Impresora/Celular</Button>{' '}
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
            <br />

            <section>
                <Outlet></Outlet>
            </section>

        </div >
    )
}

export default Agregarimp