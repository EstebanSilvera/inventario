import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Carousel, Card, CardGroup, Table, ListGroup, Modal, Button, Form, InputGroup, FloatingLabel, Row, Spinner, ButtonGroup, Tab, Tabs, Badge } from 'react-bootstrap'
import { BsArchive, BsCalendarCheck, BsFillPeopleFill } from 'react-icons/bs'
import { GrDocumentPdf } from 'react-icons/gr'
import { MdPictureAsPdf, MdOutlineCancel } from 'react-icons/md'
import { FcAddDatabase } from 'react-icons/fc'
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import picture from '../imagen/carro.jpg'
import picture2 from '../imagen/kia.jpg'
import picture3 from '../imagen/via40.jpeg'
import picture4 from '../imagen/barranquilla.jpeg'
import picture5 from '../imagen/cartagena.jpeg'
import picture6 from '../imagen/alemana.jpg'
import picture7 from '../imagen/sportage.jpg'
import logo from '../imagen/logo.jpg'
import mercedes from '../imagen/mercedes.jpg'
import axios from 'axios'

const Principal = () => {

  const [bodega, setBodega] = useState([])
  const [equipos, setEquipos] = useState([])

  useEffect(() => {
    axios.get("http://autosfujiyama.com:3050/equipos")
      .then((response) => {
        setEquipos(response.data)
      })
    axios.get("http://autosfujiyama.com:3050/bodega")
      .then((response) => {
        setBodega(response.data)
      })
  }, [])

  let via, catedral, cartagena, alemana = [];

  catedral = equipos.filter(response => response.id_sede === 1 && response.eliminado === 0)
  via = equipos.filter(response => response.id_sede === 2 && response.eliminado === 0)
  cartagena = equipos.filter(response => response.id_sede === 3 && response.eliminado === 0)
  alemana = equipos.filter(response => response.id_sede === 4 && response.eliminado === 0)


  // const [contador, setContador] = useState(10)

  // const time = setInterval(() => {
  //   document.onmouseover = () => {
  //     setContador(10)
  //   }
  //   console.log(contador)
  //   setContador(contador - 1)
  //   if (contador < 1) {
  //     console.log("YA")
  //     clearInterval(time)
  //   }
  //   clearInterval(time)
  // }, 1000)

  const [hojaVida, setHojaVida] = useState(false)
  const [imprimirEntrega, setImprimirEntrega] = useState(false)
  const [entrega, setEntrega] = useState(false)
  const [personal, setPersonal] = useState(false);

  const [contador, setContador] = useState(0)
  const [element, setElement] = useState([])
  const [person, setPerson] = useState([])
  const [img, setImg] = useState("")

  const eliminar = () => {
    element.pop()
    setElement(element)
    setContador(contador - 1)
  }

  const enviar = () => {

    const nombre = document.getElementById("nombre").value
    const cedula = document.getElementById("cedula").value
    const cargo = document.getElementById("cargo").value

    setPerson([nombre, cedula, cargo])

    if (document.getElementById("ALEMANA").checked === true) {
      setImg(mercedes)
    } else {
      setImg(logo)
    }

  }

  
  return (

    <div style={{ background: 'linear-gradient(#90A4AE, #D5D8DC , #90A4AE)' }}>

      <div>
        <Carousel style={{ boxShadow: "0px 0px 5px 2px black" }}>

          <Carousel.Item style={{posititon:"absolute"}}>
            <img
              style={{ width: '100%', height: '25vw', filter: "blur(5px)" }}
              src={picture}
              alt="First slide"
            />
            <Carousel.Caption>
              <img
              style={{ width: '100%', height: '20vw', borderRadius:"20px"  }}
              src={picture}
              alt="First slide"
            />
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{posititon:"absolute"}}>
            <img
              style={{ width: '100%', height: '25vw', filter: "blur(5px)" }}
              src={picture2}
              alt="First slide"
            />
            <Carousel.Caption>
              <img
              style={{ width: '100%', height: '20vw', borderRadius:"20px"  }}
              src={picture2}
              alt="First slide"
            />
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{posititon:"absolute"}}>
            <img
              style={{ width: '100%', height: '25vw', filter: "blur(5px)" }}
              src={picture7}
              alt="First slide"
            />
            <Carousel.Caption>
              <img
              style={{ width: '100%', height: '20vw', borderRadius:"20px"  }}
              src={picture7}
              alt="First slide"
            />
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div style={{ background: "linear-gradient(45deg, #85C1E9, #3498DB, #85C1E9)" }}><br />
        <div className='container'>
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }} xs={2} md={4}>

            <div
              style={{
                backgroundColor: "#D5D8DC",
                width: "300px",
                height: "120px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px white",
                margin: "15px",
              }} >

              <div align='center' style={{ font: "70px Fantasy" }}>
                {catedral.length}
              </div>
              <div align='center'>
                <h5>Computadores en Catedral</h5>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#D5D8DC",
                width: "300px",
                height: "120px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px white",
                margin: "15px",
              }} >

              <div align='center' style={{ font: "70px Fantasy" }}>
                {via.length}
              </div>
              <div align='center'>
                <h5>Computadores en Via 40</h5>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#D5D8DC",
                width: "300px",
                height: "120px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px white",
                margin: "15px",
              }} >

              <div align='center' style={{ font: "70px Fantasy" }}>
                {cartagena.length}
              </div>
              <div align='center'>
                <h5>Computadores en Cartagena</h5>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#D5D8DC",
                width: "300px",
                height: "120px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px white",
                margin: "15px",
              }} >

              <div align='center' style={{ font: "70px Fantasy" }}>
                {alemana.length}
              </div>
              <div align='center'>
                <h5>Computadores en Alemana</h5>
              </div>
            </div>

            {/******************* TONERS *******************/}
              
            <div
              style={{
                backgroundColor: "#D5D8DC",
                width: "300px",
                height: "120px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px white",
                margin: "15px",
              }} >

              <div align='center' style={{ font: "25px Fantasy", marginBottom: "5px", marginTop: "9px" }}>
                {bodega[1]?.nombre.substring(6,)}:   {bodega[1]?.cantidad}
              </div>
              <div align='center' style={{ font: "25px Fantasy", marginBottom: "5px" }}>
                {bodega[2]?.nombre.substring(6,)}:   {bodega[2]?.cantidad}
              </div>
              <div align='center' style={{ font: "25px Fantasy" }}>
                {bodega[0]?.nombre.substring(6,)}:   {bodega[0]?.cantidad}
              </div>

            </div>
            <div
              style={{
                backgroundColor: "#D5D8DC",
                width: "300px",
                height: "120px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px white",
                margin: "15px",
              }} >

              <div align='center' style={{ font: "25px Fantasy", marginBottom: "5px", marginTop: "9px" }}>
                {bodega[3]?.nombre.substring(6,)}:   {bodega[3]?.cantidad}
              </div>
              <div align='center' style={{ font: "25px Fantasy", marginBottom: "5px" }}>
                {bodega[4]?.nombre.substring(6, 14)}:   {bodega[4]?.cantidad}
              </div>
              <div align='center' style={{ font: "25px Fantasy" }}>
                {bodega[5]?.nombre.substring(6,)}:   {bodega[5]?.cantidad}
              </div>

            </div>
          </Row>
        </div><br />
      </div>
      <hr />

      <div className='container'>
        <Card>
          <h1 align='center'>Computador recien agregado en cada sede </h1>
        </Card>

        <CardGroup>
          <Card>
            <Card.Img variant="top" className='movimientoRev' src={picture3} width={180}
              height={300} />
            <Card.Body>
              <Card.Title>Sede Via 40</Card.Title>

              <ListGroup.Item>id: <strong>{via[via.length - 1]?.id}</strong></ListGroup.Item>
              <ListGroup.Item>nombre: <strong>{via[via.length - 1]?.nombre}</strong></ListGroup.Item>
              <ListGroup.Item>cargo: <strong>{via[via.length - 1]?.cargo}</strong></ListGroup.Item>
              <ListGroup.Item>responsable: <strong>{via[via.length - 1]?.responsable}</strong></ListGroup.Item>

            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" className='movimientoRev' src={picture4} width={180}
              height={300} />
            <Card.Body>
              <Card.Title>Sede Catedral</Card.Title>

              <ListGroup.Item>id: <strong>{catedral[catedral.length - 1]?.id}</strong></ListGroup.Item>
              <ListGroup.Item>nombre: <strong>{catedral[catedral.length - 1]?.nombre}</strong></ListGroup.Item>
              <ListGroup.Item>cargo: <strong>{catedral[catedral.length - 1]?.cargo}</strong></ListGroup.Item>
              <ListGroup.Item>responsable: <strong>{catedral[catedral.length - 1]?.responsable}</strong></ListGroup.Item>

            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" className='movimiento' src={picture5} width={180}
              height={300} />
            <Card.Body>
              <Card.Title>Sede Cartagena</Card.Title>

              <ListGroup.Item>id: <strong>{cartagena[cartagena.length - 1]?.id}</strong></ListGroup.Item>
              <ListGroup.Item>nombre: <strong>{cartagena[cartagena.length - 1]?.nombre}</strong></ListGroup.Item>
              <ListGroup.Item>cargo: <strong>{cartagena[cartagena.length - 1]?.cargo}</strong></ListGroup.Item>
              <ListGroup.Item>responsable: <strong>{cartagena[cartagena.length - 1]?.responsable}</strong></ListGroup.Item>

            </Card.Body>
          </Card>
          <Card>

            <Card.Img variant="top" className='movimiento' src={picture6} width={180}
              height={300} />
            <Card.Body>
              <Card.Title>Alemana Automotriz</Card.Title>

              <ListGroup.Item>id: <strong>{alemana[alemana.length - 1]?.id}</strong></ListGroup.Item>
              <ListGroup.Item>nombre: <strong>{alemana[alemana.length - 1]?.nombre}</strong></ListGroup.Item>
              <ListGroup.Item>cargo: <strong>{alemana[alemana.length - 1]?.cargo}</strong></ListGroup.Item>
              <ListGroup.Item>responsable: <strong>{alemana[alemana.length - 1]?.responsable}</strong></ListGroup.Item>

            </Card.Body>
          </Card>
        </CardGroup>
        <br />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }} xs={2} md={5}>
            <div
              style={{
                backgroundColor: "#52BE80",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #82E0AA",
                margin: "15px"
              }} >
              <Button as={Link} to="/Bodega" style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }}>
                <BsArchive style={{ fontSize: "150px", marginTop: "10px" }} />
                <p align="center">BODEGA</p>
              </Button>
            </div>

            <div onClick={() => setHojaVida(true)}
              style={{
                backgroundColor: "#C39BD3",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #A569BD",
                margin: "15px",
                cursor: "pointer"
              }} >
              <BsCalendarCheck style={{ fontSize: "150px", marginLeft: "15px", marginTop: "10px", color: "black" }} />
              <p style={{ color: "black" }} align="center">HOJA DE VIDA</p>
            </div>

            <div
              style={{
                backgroundColor: "#E59866",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #D35400",
                margin: "15px"
              }} >
              <Button as={Link} to="/DocumentoAlePDF" style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }}>
                <GrDocumentPdf style={{ fontSize: "140px", color: "black" }} />
                <p style={{ color: "black" }} align="center">MANTENIMIENTO TECNOLOGIA (PDF)</p>
              </Button>
            </div>

            <div onClick={() => setEntrega(true)}
              style={{
                backgroundColor: "#48C9B0",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #1ABC9C",
                margin: "15px",
                cursor: "pointer"
              }} >
              <MdPictureAsPdf style={{ fontSize: "150px", marginLeft: "15px", marginTop: "10px", color: "black" }} />
              <p style={{ color: "black" }} align="center">ENTREGA PDF</p>
            </div>

            <div onClick={() => setPersonal(true)}
              style={{
                backgroundColor: "#5D6D7E",
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                boxShadow: "0px 0px 5px 2px #5D6D7E",
                margin: "15px",
                cursor: "pointer"
              }} >
              <BsFillPeopleFill style={{ fontSize: "150px", marginLeft: "15px", marginTop: "10px", color: "black" }} />
              <p style={{ color: "black" }} align="center">PERSONAL REGISTRADO</p>
            </div>

          </Row>
        </div>

        {/* ENTREGA PDF */}
        <>
          <Modal size='lg' show={entrega} onHide={() => setEntrega(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                ENTREGAR CUALQUIER ARCHIVO EN PDF  <p style={{ fontSize: "10px" }}>LLENE TODOS LOS FORMULARIO QUE APAREZCAN</p>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div style={{ display: "flex", alignItem: "flex-end" }}>

                <div style={{ width: "400px" }}>

                  <h5>Informacion del empleado</h5>

                  <InputGroup className="mb-3">
                    <FloatingLabel
                      label="Nombre">
                      <Form.Control type="text" id="nombre" />
                    </FloatingLabel>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <FloatingLabel
                      label="Cedula">
                      <Form.Control type="number" id="cedula" />
                    </FloatingLabel>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <FloatingLabel
                      label="Cargo">
                      <Form.Control type="text" id="cargo" />
                    </FloatingLabel>
                  </InputGroup>

                  <div style={{ backgroundColor: "rgb(118, 178, 255)", borderRadius: "10px" }}>

                    <h5 align="center">Logo del PDF</h5>

                    <Form.Check
                      onClick={() => document.getElementById("ALEMANA").checked = false}
                      style={{ margin: "5px" }}
                      type="switch"
                      id="KIA"
                      label="KIA"
                    />
                    <Form.Check
                      onClick={() => document.getElementById("KIA").checked = false}
                      style={{ margin: "5px" }}
                      type="switch"
                      id="ALEMANA"
                      label="ALEMANA"
                    />
                  </div>


                </div>
                <div style={{ width: "400px", margin: "5px" }} >
                  <h5 align='center'>Elementos</h5>

                  <div className="d-grid gap-2">
                    <InputGroup className="elementos">

                      <Form.Control type="text" id="elemento" />

                      <Button onClick={() => {
                        setElement([...element, document.getElementById("elemento").value]);
                        document.getElementById("elemento").value = ""
                      }}
                        variant="outline-dark"><FcAddDatabase style={{ fontSize: "30px" }} /></Button>

                    </InputGroup>
                  </div><hr />

                  {
                    (!element)
                      ?
                      <h5>Agregue un elemento</h5>
                      :
                      <div>
                        {
                          element.map((p, i) => (

                            <div className="elementos" key={i}>

                              <InputGroup className="mb-3">

                                <Form.Control type="text" defaultValue={element[i]} />

                                <Button onClick={() => eliminar()} variant="outline-dark"><MdOutlineCancel style={{ fontSize: "25px", borderColor: "transparent" }} /></Button>

                              </InputGroup>

                            </div>
                          ))
                        }
                      </div>
                  }

                </div>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEntrega(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setImprimirEntrega(true)
                enviar()
              }} variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        <hr /><br />

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
      <ImprimirEntrega
        show={imprimirEntrega}
        onHide={() => setImprimirEntrega(false)}
        persona={person}
        elemento={element}
        img={img}
      />
      <HojaDeVida
        show={hojaVida}
        onHide={() => setHojaVida(false)}
        catedral={catedral}
        via={via}
        cartagena={cartagena}
        alemana={alemana}
      />

      <Personal
        show={personal}
        onHide={() => setPersonal(false)}
      />

    </div >
  )
}

function ImprimirEntrega(props) {

  const hoy = new Date();
  const fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
  const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

  return (

    <Modal
      {...props}
      fullscreen={true}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>

        <PDFViewer style={{ width: "100%", height: "86vh" }}>

          <Document>
            <Page size="A4">
              <View style={{ marginTop: "50px" }}>
                <Text style={{ textAlign: "center", fontSize: "20pt" }}>Formato de entrega de equipo de computo</Text>
                <Image style={{ width: "200px", height: "100px", display: "block", margin: "auto" }} src={props.img}></Image>
              </View>

              <View style={{ border: "1px solid #000", marginVertical: "10px", marginLeft: "430px", marginRight: "20px", fontSize: "10px", alignItems: "center" }}>
                <Text>Fecha de entrega: {fecha} </Text>
                <Text>Hora de entrega: {hora} </Text>
              </View>

              <View style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                <Text style={{ fontSize: "12pt", border: "1px", width: "35%" }}>Nombre del trabajador</Text>
                <Text style={{ fontSize: "12pt", border: "1px", width: "30%" }}>No. de Identificacion</Text>
                <Text style={{ fontSize: "12pt", border: "1px", width: "35%" }}>Cargo</Text>
              </View>

              <View style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                <Text style={{ fontSize: "9pt", border: "1px", width: "35%" }}>{props.persona[0]}</Text>
                <Text style={{ fontSize: "9pt", border: "1px", width: "30%" }}>{props.persona[1]}</Text>
                <Text style={{ fontSize: "9pt", border: "1px", width: "35%" }}>{props.persona[2]}</Text>
              </View>

              <View style={{ border: "1px solid #000", margin: "20px" }}>
                <Text style={{ textAlign: "center", fontSize: "15pt", border: "1px" }}>USO DEL EQUIPO DE COMPUTO</Text>
                <Text style={{ fontSize: "8pt" }}>Recibí de la Empresa AUTOMOTORES FUJIYAMA S.A. los elementos de protección personal relacionados
                  en la presente planilla. Dicho elementos se encuentra en buenas condiciones y mi resposabilidad como trabajador es mantenerlo y cuidarlo
                  para que cumpla su funcion de proteccion. Por tanto, me comprometo a usarlo para desempeñas las actividades al servicio de ésta empresa, de acuerdo
                  con lo estipulado en el reglamento de higiene y seguridad Industrial y las normas de seguridad. Soy consciente del hecho que utilizar los elementos de protección
                  personal protege mi salud y estoy enterado que el no acatar las normas y el no usar los elementos de protección personal y demás implementos
                  de seguridad podrá acarrearme sanciones disciplinarías, de acuerdo con el reglamento interno de trabajo y el decreto Ley 1295 de 1994, Capitulo X
                </Text>
              </View>

              <View style={{ border: "1px solid #000", fontSize: "10pt", marginLeft: "20px", marginRight: "20px" }}>
                <Text style={{ textAlign: "center", border: "1px", padding: "3px" }}>SE ENTREGA LOS SIGUIENTES ELEMENTOS</Text>

                {
                  (!props.elemento)
                    ?
                    <Text>Vacio</Text>
                    :
                    props.elemento.map((p, i) => (
                      <Text key={i} style={{ margin: "3px" }}>{i + 1}) {props.elemento[i]}</Text>
                    ))
                }
              </View>


              <View style={{ border: "1px solid #000", margin: "20px" }}>
                <Text style={{ height: "60px", fontSize: "12pt" }}> Firma y cedula del trabajador                                            Firma del funcionario quien entrega la dotacion</Text>

                <Text style={{ height: "30px", textIndent: "5px" }}> ________________                                         _________________</Text>
              </View>

            </Page>
          </Document>

        </PDFViewer>

      </Modal.Body>
    </Modal>

  );
}

function HojaDeVida(props) {

  const [equipo, setEquipo] = useState([])

  const sede = () => {

    switch (props.equipo !== []) {
      case document.getElementById("catedral").checked === true:

        setEquipo(props.catedral)

        break;

      case document.getElementById("via_40").checked === true:

        setEquipo(props.via)

        break;

      case document.getElementById("cartagena").checked === true:

        setEquipo(props.cartagena)

        break;

      case document.getElementById("alemana").checked === true:

        setEquipo(props.alemana)

        break;

      default:
        setEquipo([])
        break;
    }
  }

  const [show, setShow] = useState(false);

  const Agregar = () => {
    const equipo = document.getElementById("equipo").value
    const fecha = document.getElementById("fecha").value
    const observacion = document.getElementById("observacion").value
    const tecnico = document.getElementById("tecnico").value
    const estado = document.getElementById("estado").value

    let pc = [equipo, fecha, observacion, tecnico, estado]
    let vacio = pc.filter(response => response !== "")

    if (vacio.length === 5) {
      axios.post("http://autosfujiyama.com:3050/hojaVida", {
        id_equipo: equipo,
        fecha: fecha,
        observaciones: observacion,
        tecnico: tecnico,
        estado: estado,
      })
        .then((response) => {
          alert(response.data.message)
          window.location.reload()
        })

    } else {
      alert("Llene todos los campos ")
    }
  }

  const [equipoBuscar, setEquipoBuscar] = useState([])

  const [boolean, setBoolean] = useState(true)

  const Buscar = () => {

    const busca = document.getElementById("id_equipo").value

    axios.put("http://autosfujiyama.com:3050/hojaVida", {
      id_equipo: busca
    })
      .then((response) => {
        if (response.data.message === "Usuario no encontrado") {
          setEquipoBuscar([])
        } else {
          setEquipoBuscar(response.data)
        }
      })

    localStorage.removeItem("ID")
    setBoolean(false)
  }


  const Estado = (propiedad, id) => {

    const option = window.confirm("¿Esta seguro que desea cambiar el estado?");

    if (option === true) {
      axios.patch("http://autosfujiyama.com:3050/hojaVida", {
        id: id,
        estado: propiedad
      })
        .then((response) => {
          alert(response.data.message)
        })
      window.location.reload()
    }
  }

  let localId
  if (!localStorage.getItem("ID")) {
    localId = ""
  } else {
    localId = localStorage.getItem("ID")
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          CALENDARIO DE MANTENIMIENTO
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ display: "flex", alignItem: "flex-end" }}>

          <div style={{ width: "400px" }}>

            <div style={{ backgroundColor: "#C39BD3", borderRadius: "10px" }}>

              <h5 align="center">Sede del computador</h5>

              <Form onChange={() => sede()}>
                <Form.Check
                  onClick={() => {
                    document.getElementById("via_40").checked = false;
                    document.getElementById("cartagena").checked = false;
                    document.getElementById("alemana").checked = false;
                  }}
                  style={{ margin: "5px" }}
                  type="switch"
                  id="catedral"
                  label="Catedral"
                />
                <Form.Check
                  onClick={() => {
                    document.getElementById("catedral").checked = false;
                    document.getElementById("cartagena").checked = false;
                    document.getElementById("alemana").checked = false;
                  }}
                  style={{ margin: "5px" }}
                  type="switch"
                  id="via_40"
                  label="Via 40"
                />
                <Form.Check
                  onClick={() => {
                    document.getElementById("via_40").checked = false;
                    document.getElementById("catedral").checked = false;
                    document.getElementById("alemana").checked = false;
                  }}
                  style={{ margin: "5px" }}
                  type="switch"
                  id="cartagena"
                  label="Cartagena"
                />
                <Form.Check
                  onClick={() => {
                    document.getElementById("via_40").checked = false;
                    document.getElementById("cartagena").checked = false;
                    document.getElementById("catedral").checked = false;
                  }}
                  style={{ margin: "5px" }}
                  type="switch"
                  id="alemana"
                  label="Alemana"
                />
              </Form>
            </div>

            {
              !equipo
                ?
                <h1 align='center'>Cargando</h1>
                :
                <div align="center">
                  <FloatingLabel
                    label="Elija el computador"
                    className="mb-3"
                  >
                    <Form.Select id="equipo" aria-label="Default select example">
                      <option ></option>
                      {
                        equipo.map(p => (
                          <option key={p.id} value={p.id || ''} >{p.nombre} / {p.responsable}</option>
                        ))
                      }
                    </Form.Select>
                  </FloatingLabel>

                </div>
            }

            <InputGroup className="mb-3">
              <InputGroup.Text >Fecha: </InputGroup.Text>
              <Form.Control type="Date" id="fecha" />
            </InputGroup>

          </div>

          <div style={{ width: "400px", margin: "5px" }} align='right'>
            <h3 align='center'>Descripcion del trabajo</h3>
            <Form.Control as="textarea" style={{ height: '100px' }} placeholder='Describa aqui que se le va hacer al computador' id="observacion" /><br />

            <Form.Control type="text" placeholder="Tecnico/Proveedor" id="tecnico" /><br />

            <Form.Select id="estado" aria-label="Default select example">
              <option value="">Estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Terminado">Terminado</option>
            </Form.Select>

          </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => setShow(true)}>
          Buscar HV del PC
        </Button>
        <Button onClick={() => Agregar()} variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>


      {/* Buscar pc */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>BUSCAR COMPUTADOR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="ID del equipo"
              id="id_equipo"
              defaultValue={localId}
            />
            <Button onClick={() => Buscar()} variant="outline-primary">Primary</Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Body>
          {
            (equipoBuscar.length === 0)
              ?
              <div align='center'>
                {
                  (boolean)
                    ?
                    <Spinner animation="grow" />
                    :
                    <h4>No hay programacion de mantenimiento</h4>
                }
              </div>
              :
              <div>
                {
                  equipoBuscar.map((p, i) => (
                    <div key={i}>
                      <ListGroup>
                        <ListGroup.Item variant="warning"><strong>Fecha:</strong> {p.fecha.substring(0, 10)}</ListGroup.Item>
                        <ListGroup.Item><strong>Observacion:</strong> {p.observaciones}</ListGroup.Item>
                        <ListGroup.Item><strong>Tecnico:</strong> {p.tecnico}</ListGroup.Item>
                        <ListGroup.Item variant={
                          (equipoBuscar[i].estado === "Pendiente") ?
                            "danger" :
                            (equipoBuscar[i].estado === "Terminado") ?
                              "success" :
                              (equipoBuscar[i].estado === "Cancelado") ?
                                "dark" :
                                "hola"
                        }>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <strong>Estado:</strong> {p.estado}
                            </div>
                            <div>
                              <ButtonGroup style={{ display: "flex", justifyContent: "right" }} aria-label="Basic example">
                                <Button size="sm" variant="outline-danger" onClick={() => Estado("Pendiente", p.id)}>Pendiente</Button>
                                <Button size="sm" variant="outline-dark" onClick={() => Estado("Cancelado", p.id)}>Cancelado</Button>
                                <Button size="sm" variant="outline-success" onClick={() => Estado("Terminado", p.id)}>Terminado</Button>
                              </ButtonGroup>
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup><hr />
                    </div>
                  ))
                }
              </div>
          }
        </Modal.Body>

      </Modal>

    </Modal >

  );
}

function Personal(props) {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.post("http://autosfujiyama.com:3050/adduser")
      .then(response => response.data)
      .then(response => setUsuarios(response))
  }, [])

  const copiarAlPortapapeles = (id_elemento) => {
    let aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    console.log("copiado")
  }

  let kia = usuarios.filter(data => data.correo.split("@").pop() === "autosfujiyama.com")
  let alemana = usuarios.filter(data => data.correo.split("@").pop() === "alemanaautomotriz.com")

  const [personKia, setPersonKia] = useState("")

  const buscara = (e) => {
    setPersonKia(e.target.value)
    //console.log(e.target.value)
  }
  let kiaBuscar = []
  if (!personKia) {
    kiaBuscar = kia
  } else {
    kiaBuscar = kia.filter((response) => response.nombre.toLowerCase().includes(personKia))
  }


  return (
    <Modal
      {...props}
      size='xl'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Personal Registrado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          className="mb-3"
        >
          <Tab eventKey="home" title="KIA">
            <Form.Control style={{ borderColor: "lightblue" }} onChange={buscara} size="lg" type="text" placeholder="Buscar Persona (Colocar el nombre)" />
            <hr />
            {
              !kiaBuscar
                ?
                <h2>cargando</h2>
                :
                <div style={{ overflow: "scroll", height: "480px" }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Username</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Cargo</th>
                        <th>Tipo usuario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        kiaBuscar.map((p) => (
                          <tr key={p.id}>
                            <td>{p.cedula}</td>
                            <td>{p.nombre.toUpperCase()} {p.apellido.toUpperCase()}</td>
                            <td align='center'>
                              <Badge id={p.username} to='/Equiposvia40' as={Link} onClick={() => copiarAlPortapapeles(p.username)} pill bg="light" text="dark">
                                {p.username}
                              </Badge>
                            </td>
                            <td>{p.telefono}</td>
                            <td>{p.correo}</td>
                            <td>{p.cargo}</td>
                            <td>{p.tipo_user}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
            }
          </Tab>
          <Tab eventKey="profile" title="ALEMANA" >
            {
              !alemana
                ?
                <h2>cargando</h2>
                :
                <div style={{ overflow: "scroll" }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Username</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Cargo</th>
                        <th>Tipo usuario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        alemana.map((p) => (
                          <tr key={p.id}>
                            <td>{p.cedula}</td>
                            <td>{p.nombre.toUpperCase()} {p.apellido.toUpperCase()}</td>
                            <td align='center'>
                              <Badge id={p.username} to='/EquiposAlemana' as={Link} onClick={() => copiarAlPortapapeles(p.username)} pill bg="light" text="dark">
                                {p.username}
                              </Badge>
                            </td>
                            <td>{p.telefono}</td>
                            <td>{p.correo}</td>
                            <td>{p.cargo}</td>
                            <td>{p.tipo_user}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
            }
          </Tab>
        </Tabs>

      </Modal.Body>
    </Modal>
  );
}


export default Principal