import { Button, Card, Form, Container, Row, Col, InputGroup, Nav } from 'react-bootstrap';
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

    const id_equipo = document.getElementById("id_equipo").value
    const sistema_operativo = document.getElementById("sistema_operativo").value
    const so_licencia = document.getElementById("so_licencia").value
    const office = document.getElementById("office").value
    const office_serial = document.getElementById("office_serial").value
    const quiter = document.getElementById("quiter").value
    const acrobat = document.getElementById("acrobat").value
    const winrar = document.getElementById("winrar").value
    const google_chrome = document.getElementById("google_chrome").value
    const piramide = document.getElementById("piramide").value
    const thunderbirt = document.getElementById("thunderbirt").value
    const siprock = document.getElementById("siprock").value
    const socase = document.getElementById("socase").value
    const anydesk = document.getElementById("anydesk").value
    const vpn = document.getElementById("vpn").value


    //console.log(marca + " " + id_sede + " " + serial + " " + modelo + " " + color + " " + almacenamiento + " " + tipo_almacenamiento + " " + ram + " " + tipo_ram + " " + procesador + " " + cargo + " " + estado);

    let array = [id_equipo,
      sistema_operativo,
      so_licencia,
      office,
      office_serial,
      quiter,
      acrobat,
      winrar,
      google_chrome,
      piramide,
      thunderbirt,
      siprock,
      socase,
      anydesk,
      vpn]

    let vacio = array.filter(response => response !== "");

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: id_equipo,
        sistema_operativo: sistema_operativo,
        so_licencia: so_licencia,
        office: office,
        office_serial: office_serial,
        quiter: quiter,
        acrobat: acrobat,
        winrar: winrar,
        google_chrome: google_chrome,
        piramide: piramide,
        thunderbirt: thunderbirt,
        siprock: siprock,
        socase: socase,
        anydesk: anydesk,
        vpn: vpn,
      })
    };
    console.log(array)
    console.log(vacio)

    if (vacio.length === 15) {
      const response = await fetch('http://autosfujiyama.com:3050/addProgram', request);
      const data = await response.json();
      //console.log(data)

      if (data.validation === "a1") {
        alert(data.message);
      } else if (data.validation === "a2") {
        alert(data.message);
      } else {
        alert("Dato guardado correctamente")
        window.location.replace('/Programa')
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

  return (
    <div style={{ backgroundImage: `url(${fondo})` }}><br/>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col lg={9} md={12} xs={12}>
            <div style={{ boxShadow:"0px 0px 10px 2px #85C1E9", borderRadius:"5px",marginTop:"50px", marginBottom:"80px" }}>
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                      <Nav.Link as={Link} to="/Agregar">Equipo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/Agregarimp">Impresora/Celular/Otro</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link style={{ background: "linear-gradient( #AAB7B8, white)" }} as={Link} to="/Programa">Programa</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Header as="h3">Agregar Programas del equipo</Card.Header>
                <Card.Body>
                  <Card.Title>Por favor llenar todos los campos</Card.Title>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Escriba el nombre del computador</InputGroup.Text>
                    <Form.Control
                      placeholder="Nombre"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="id_equipo"
                      name="id_equipo"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">SO</InputGroup.Text>
                    <Form.Select id="sistema_operativo" name="sistema_operativo" aria-label="Floating label select example">
                      <option></option>
                      <option value="windows 7 Home">windows 7 Home</option>
                      <option value="windows 7 Profesional">windows 7 Profesional</option>

                      <option value="windows 8 Home">windows 8 Home</option>
                      <option value="windows 8 Profesional">windows 8 Profesional</option>

                      <option value="windows 10 Home">windows 10 Home</option>
                      <option value="windows 10 Profesional">windows 10 Profesional</option>

                      <option value="windows 11 Home">windows 11 Home</option>
                      <option value="windows 11 Profesional">windows 11 Profesional</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Office</InputGroup.Text>
                    <Form.Select id="office" name="office" aria-label="Floating label select example">
                      <option></option>
                      <option value="2016">2016 </option>
                      <option value="2019">2019</option>
                      <option value="libre Office">libre Office</option>
                      <option value="Open Office">Open Office</option>

                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Licencia de SO</InputGroup.Text>
                    <Form.Control
                      placeholder="Licencia SO"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="so_licencia"
                      name="so_licencia"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Serial del office</InputGroup.Text>
                    <Form.Control
                      placeholder="Serial office"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="office_serial"
                      name="office_serial"
                    />
                  </InputGroup><hr />

                  <Card.Title>Elija si o no si tiene la aplicacion el computador</Card.Title>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Quiter</InputGroup.Text>
                    <Form.Select id="quiter" name="quiter" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Acrobat</InputGroup.Text>
                    <Form.Select id="acrobat" name="acrobat" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Winrar</InputGroup.Text>
                    <Form.Select id="winrar" name="winrar" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Google Chorme</InputGroup.Text>
                    <Form.Select id="google_chrome" name="google_chrome" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Piramide</InputGroup.Text>
                    <Form.Select id="piramide" name="piramide" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Thunderbirt</InputGroup.Text>
                    <Form.Select id="thunderbirt" name="thunderbirt" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Siprock</InputGroup.Text>
                    <Form.Select id="siprock" name="siprock" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">Socase</InputGroup.Text>
                    <Form.Select id="socase" name="socase" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Anydesk</InputGroup.Text>
                    <Form.Select id="anydesk" name="anydesk" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                    <InputGroup.Text id="basic-addon1">VPN</InputGroup.Text>
                    <Form.Select id="vpn" name="vpn" aria-label="Default select example">
                      <option></option>
                      <option value="1">Si!</option>
                      <option value="0">No!</option>

                    </Form.Select>
                  </InputGroup>

                  <hr />
                  <div className="d-grid gap-2">
                    <Button onClick={() => Add()} size="lg" variant="outline-success">Agregar Programas</Button>{' '}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <section>
        <Outlet></Outlet>
      </section>

    </div>
  )
}

export default Agregar