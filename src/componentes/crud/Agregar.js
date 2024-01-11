import { Button, Card, Form, FloatingLabel, Container, Row, Col, InputGroup, Nav, Popover, OverlayTrigger } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import fondo from '../imagen/fondo_rayas.png';

const Agregar = () => {

  //   const body = {
  //     id_sede: "1",
  //     marca: "0",
  //     serial:"123456",
  //     modelo:"123456789",
  //     color:"blanco",
  //     almacenamiento:"1tb",
  //     Tipo_almacenamiento:"HDD",
  //     ram:"16gb",
  //     tipo_ram: "DDR4",
  //     procesador: " amd",
  //     cargo:"si",
  //     estado:"dañado",
  // }

  // const request = {
  //   method: "POST",
  //   body: JSON.stringify(body),
  //   Headers: {
  //     "content-Type": "application/json",
  //   }
  // }

  const Add = async () => {

    const id_sede = document.getElementById("id_sede").value
    const marca = document.getElementById("marca").value
    const serial = document.getElementById("serial").value
    const modelo = document.getElementById("modelo").value
    const color = document.getElementById("color").value
    const almacenamiento = document.getElementById("almacenamiento").value
    const tipo_almacenamiento = document.getElementById("tipo_almacenamiento").value
    const ram = document.getElementById("ram").value
    const tipo_ram = document.getElementById("tipo_ram").value
    const procesador = document.getElementById("procesador").value
    const cargo = document.getElementById("cargo").value
    const estado = document.getElementById("estado").value
    const observacion = document.getElementById("observacion").value
    const nombre = document.getElementById("nombre").value
    const grupo_trabajo = document.getElementById("grupo_trabajo").value
    const username = document.getElementById("username").value
    const admin = sessionStorage.getItem("INFO")


    //console.log(marca + " " + id_sede + " " + serial + " " + modelo + " " + color + " " + almacenamiento + " " + tipo_almacenamiento + " " + ram + " " + tipo_ram + " " + procesador + " " + cargo + " " + estado);

    let array = [marca, id_sede, serial, modelo, color, almacenamiento, tipo_almacenamiento, ram, tipo_ram, procesador, cargo, estado, nombre, grupo_trabajo, username]

    let vacio = array.filter(response => response !== "")
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        id_sede: id_sede,
        marca: marca,
        serial: serial,
        modelo: modelo,
        color: color,
        almacenamiento: almacenamiento,
        Tipo_almacenamiento: tipo_almacenamiento,
        ram: ram,
        tipo_ram: tipo_ram,
        procesador: procesador,
        cargo: cargo,
        estado: estado,
        observacion: observacion,
        nombre: nombre,
        grupo_trabajo: grupo_trabajo,
        admin: admin,
      })
    };

    if (vacio.length === 15) {
      const response = await fetch('http://autosfujiyama.com:3050/equipos', request);
      const data = await response.json();
      //console.log(data)

      if (data.validation === "a1") {
        alert(data.message);
      } else {
        alert("dato guardado correctamente");
        window.location.reload()
      }
    } else {
      alert("llene todos los campos")
    }

    // const response = await fetch('http://localhost:3050/add',request)
    // const responseJSON = await response.json()
    // console.log(responseJSON)
    // console.log("conectado")
  }

  // const Salir = () => {
  //   window.location.href = '/Principal'
  // }

  const serial = (
    <Popover>
      <Popover.Header as="h3">Codigo de Serial</Popover.Header>
      <Popover.Body>
        <strong> wmic bios get serialnumber </strong>
      </Popover.Body>
    </Popover>
  );

  const informacion = (
    <Popover>
      <Popover.Header as="h3">Informacion Equipo</Popover.Header>
      <Popover.Body>
        window + R : Ejecutar comando
        Escribir: <strong> msinfo32.exe </strong>
      </Popover.Body>
    </Popover>
  );

  const licencia = (
    <Popover>
      <Popover.Header as="h3">Licencia</Popover.Header>
      <Popover.Body>
        <strong> wmic path softwarelicensingservice get OA3xOriginalProductKey </strong>
      </Popover.Body>
    </Popover>
  );

  return (
    <div style={{ backgroundImage: `url(${fondo})` }}><br />
      <Container>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col lg={9} md={12} xs={12}>
            <div style={{ boxShadow: "0px 0px 10px 2px #85C1E9", borderRadius: "5px", marginTop: "50px", marginBottom: "80px" }}>
              <Card>
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link style={{ background: "linear-gradient( #AAB7B8, white)" }} as={Link} to="/Agregar">Equipo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/Agregarimp">Impresora/Celular/Otro</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/Programa">Programa</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Header as="h3">Agregar Equipos </Card.Header>
                <Card.Body>
                  <div align='center'>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={serial}>
                      <Button variant="outline-secondary">Serial Equipo</Button>
                    </OverlayTrigger>{' '}
                    <OverlayTrigger trigger="click" placement="bottom" overlay={informacion}>
                      <Button variant="outline-secondary">Informacion Equipo</Button>
                    </OverlayTrigger>{' '}
                    <OverlayTrigger trigger="click" placement="bottom" overlay={licencia}>
                      <Button variant="outline-secondary">Sacar licencia</Button>
                    </OverlayTrigger>{' '}
                  </div><hr />
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
                          <option value="3">Alemana automotriz</option>
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
                    <Form.Control
                      placeholder="Serial"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="serial"
                      name="serial"
                    />
                    <InputGroup.Text id="basic-addon1">Modelo</InputGroup.Text>
                    <Form.Control
                      placeholder="Modelo"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="modelo"
                      name="modelo"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Color de computador</InputGroup.Text>
                    <Form.Control
                      placeholder="Color"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="color"
                      name="color"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Almacenamiento</InputGroup.Text>
                    <Form.Control
                      placeholder="Almancenamiento"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="almacenamiento"
                      name="almacenamiento"
                    />
                    <InputGroup.Text id="basic-addon1">Tipo</InputGroup.Text>
                    <Form.Select id="tipo_almacenamiento" name="tipo_almacenamiento" aria-label="Default select example">
                      <option></option>
                      <option value="HDD">HDD</option>
                      <option value="SSD">SSD</option>
                      <option value="M.2">M.2</option>
                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Ram</InputGroup.Text>
                    <Form.Select id="ram" name="ram" aria-label="Default select example">
                      <option>
                      </option>
                      <option value="2Gb">2Gb</option>
                      <option value="4Gb">4Gb</option>
                      <option value="6Gb">6Gb</option>
                      <option value="8Gb">8Gb</option>
                      <option value="12Gb">12Gb</option>
                      <option value="16Gb">16Gb</option>
                      <option value="16Gb">32Gb</option>
                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Tipo de Ram </InputGroup.Text>
                    <Form.Select id="tipo_ram" name="tipo_ram" aria-label="Default select example">
                      <option></option>
                      <option value="DDR2">DDR2</option>
                      <option value="DDR3">DDR3</option>
                      <option value="DDR4">DDR4</option>
                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Procesador del equipo</InputGroup.Text>
                    <Form.Control
                      placeholder="Procesador"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="procesador"
                      name="procesador"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Nombre Pc</InputGroup.Text>
                    <Form.Control
                      placeholder="Nombre"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="nombre"
                      name="nombre"
                    />
                    <InputGroup.Text id="basic-addon1">Grupo de trabajo</InputGroup.Text>
                    <Form.Select id="grupo_trabajo" name="grupo_trabajo" aria-label="Default select example">
                      <option></option>
                      <option value="COMERCIAL">COMERCIAL</option>
                      <option value="ALMACEN">ALMACEN</option>
                      <option value="TALLER">TALLER</option>
                      <option value="COLISION">COLISION</option>
                      <option value="ADMINISTRACION">ADMINISTRACION</option>
                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Username del responsable del equipo</InputGroup.Text>
                    <Form.Control placeholder="Importante llenar" id='username' name='username' />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Observaciones</InputGroup.Text>
                    <Form.Control placeholder="Si es necesario, llene este campo" id='observacion' name='observacion' />
                  </InputGroup>


                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Cargo</InputGroup.Text>
                    <Form.Select id='cargo' name='cargo' aria-label="Default select example">
                      <option></option>
                      <option value="GERENTE GENERAL">GERENTE GENERAL</option>
                      <option value="GERENTE COMERCIAL">GERENTE COMERCIAL</option>
                      <option value="GERENTE ADMINSTRACION Y CONTABLE">GERENTE ADMINSTRACION Y CONTABLE</option>
                      <option value="GERENTE FINANCIERO">GERENTE FINANCIERO</option>
                      <option value="GERENTE POSVENTA">GERENTE POSVENTA</option>
                      <option value="SUBGERENTE">SUBGERENTE</option>

                      <option value="JEFE TALLER">JEFE TALLER</option>
                      <option value="JEFE MERCADEO">JEFE MERCADEO</option>
                      <option value="JEFE ASESOR">JEFE ASESOR</option>

                      <option value="ASESOR COMERCIAL">ASESOR COMERCIAL</option>
                      <option value="ASESOR REPUESTO">ASESOR REPUESTO</option>
                      <option value="ASESOR SERVICIO">ASESOR SERVICIO</option>
                      <option value="ASESOR ACCESORIO">ASESOR ACCESORIO</option>

                      <option value="INGENIERO DE SISTEMA">INGENIERO DE SISTEMA</option>
                      <option value="TALENTO HUMANO">TALENTO HUMANO</option>
                      <option value="CONTADOR">CONTADOR</option>
                      <option value="ASEGURADORA">ASEGURADORA</option>
                      <option value="FACTURACION">FACTURACION</option>
                      <option value="TESORERO">TESORERO</option>
                      <option value="CARTERA">CARTERA</option>
                      <option value="INTELIGENCIA DE NEGOCIO">INTELIGENCIA DE NEGOCIO</option>
                      <option value="OPERARIO">OPERARIO</option>
                      <option value="CAJA">CAJA</option>
                      <option value="MENSAJERO">MENSAJERO</option>
                      <option value="ANFRITION">ANFRITION</option>
                      <option value="ARCHIVO">ARCHIVO</option>
                      <option value="AUDITOR">AUDITOR</option>

                      <option value="AUX REPUESTO">AUX REPUESTO</option>
                      <option value="AUX MERCADEO">AUX MERCADEO</option>
                      <option value="AUX CONTABLE">AUX CONTABLE</option>
                      <option value="AUX SISTEMA">AUX SISTEMA</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Estado</InputGroup.Text>
                    <Form.Select id="estado" name="estado" aria-label="Default select example">
                      <option></option>
                      <option value="Funcionando">Funcionando</option>
                      <option value="Dañado">Dañado</option>
                    </Form.Select>
                  </InputGroup><hr />
                  <div className="d-grid gap-2">
                    <Button onClick={() => Add()} size="lg" variant="outline-success">Agregar Equipo</Button>{' '}
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

    </div>
  )
}

export default Agregar