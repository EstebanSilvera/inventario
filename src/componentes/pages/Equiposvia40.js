import React, { useEffect, useState } from 'react'
import { Form, Card, Button, Modal, ButtonGroup, FloatingLabel, InputGroup, Col, ListGroup, CardGroup, Spinner, CloseButton, ProgressBar } from 'react-bootstrap'
import { BsBootstrapReboot, BsPlusCircleDotted, BsArrowRepeat, BsTrash, BsFileEarmarkPdf, BsFillPersonPlusFill, BsFillTrash2Fill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import picture from '../imagen/logo.jpg'
import axios from 'axios';

const Equiposvia40 = () => {

  const url = 'http://autosfujiyama.com:3050/equipos'
  const urlimp = 'http://autosfujiyama.com:3050/equiposimp'
  const [equipos, setEquipos] = useState([])
  const [impcel, setImpcel] = useState([]);
  const [buscar, setBuscar] = useState("")

  const Equipos = async () => {
    const response = await fetch(url)
    const responseJSON = await response.json()
    setEquipos(responseJSON)
    //console.log(responseJSON)
  }

  const Impcel = async () => {
    const response = await fetch(urlimp)
    const responseJSON = await response.json()
    setImpcel(responseJSON)
    //console.log(responseJSON)
  }

  useEffect(() => {
    Equipos()
    Impcel();
  }, [])

  //modales
  const [eliminar, setEliminar] = useState(false);
  const [actualizar, setActualizar] = useState(false)
  const [eliminados, setEliminados] = React.useState(false);
  const [pdf, setPdf] = React.useState(false);
  const [registrar, setRegistrar] = React.useState(false);
  const [reporte, setReporte] = useState(false)
  const [impcelmemoria, setImpcelmemoria] = useState(false);

  const buscare = (e) => {
    setBuscar(e.target.value)
    //console.log(e.target.value)
  }

  let impresora, celular, memoria = [];

  if (impcel.message === "no hay resultados") {
  } else {
    impresora = impcel.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Impresora" && datos.eliminado === 0)
    memoria = impcel.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Memoria" && datos.eliminado === 0)
    celular = impcel.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Celulares" && datos.eliminado === 0)
  }

  //count grupo de trabajo
  let comercial, almacen, taller, colision, administracion = []
  comercial = equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0 && datos.grupo_trabajo === "COMERCIAL")
  almacen = equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0 && datos.grupo_trabajo === "ALMACEN")
  taller = equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0 && datos.grupo_trabajo === "TALLER")
  colision = equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0 && datos.grupo_trabajo === "COLISION")
  administracion = equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0 && datos.grupo_trabajo === "ADMINISTRACION")
  //

  let array_sede, buscar_sede, buscar_impresora, buscar_celular = []
  array_sede = equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0)

  if (!buscar) {
    buscar_sede = array_sede
    buscar_impresora = impresora
    buscar_celular = celular
  } else {
    buscar_sede = array_sede.filter((response) => response.nombre.toLowerCase().includes(buscar))
    buscar_impresora = impresora.filter((response) => response.marca.toLowerCase().includes(buscar))
    buscar_celular = celular.filter((response) => response.marca.toLowerCase().includes(buscar))
  }

  const [info, setInfo] = useState([])
  const [informacion, setInformacion] = React.useState(false);

  const Informacion = async (id) => {

    const data = equipos.filter(response => response.id === id)
    setInfo(data)
  }

  const [grupoTrabajo, setGrupoTrabajo] = useState([])
  const [trabajoImpCel, setTrabajoImpCel] = useState([])

  const [reportePdf, setReportePdf] = useState(false)


  const Reporte = () => {

    const grupo = document.getElementById("grupo_trabajo").value

    switch (grupo !== "undefined") {
      case grupo === "ADMINISTRACION":
        setGrupoTrabajo(administracion)
        setTrabajoImpCel(impcel.filter(datos => datos.lugar === "ADMINISTRACION" && datos.id_sede === 2 && datos.eliminado === 0))
        break;

      case grupo === "COMERCIAL":
        setGrupoTrabajo(comercial)
        setTrabajoImpCel(impcel.filter(datos => datos.lugar === "COMERCIAL" && datos.id_sede === 2 && datos.eliminado === 0))
        break;

      case grupo === "ALMACEN":
        setGrupoTrabajo(almacen)
        setTrabajoImpCel(impcel.filter(datos => datos.lugar === "ALMACEN" && datos.id_sede === 2 && datos.eliminado === 0))
        break;

      case grupo === "TALLER":
        setGrupoTrabajo(taller)
        setTrabajoImpCel(impcel.filter(datos => datos.lugar === "TALLER" && datos.id_sede === 2 && datos.eliminado === 0))
        break;

      case grupo === "COLISION":
        setGrupoTrabajo(colision)
        setTrabajoImpCel(impcel.filter(datos => datos.lugar === "COLISION" && datos.id_sede === 2 && datos.eliminado === 0))
        break;

      default:
        setGrupoTrabajo([])
        setTrabajoImpCel([])
        break;
    }
  }

  let porComercial, porAlmacen, porColision, porTaller, porAdmi = 0;

  const porcentaje = () => {

    porComercial = parseInt(comercial.length / array_sede.length * 100)
    porAlmacen = parseInt(almacen.length / array_sede.length * 100)
    porColision = parseInt(colision.length / array_sede.length * 100)
    porTaller = parseInt(taller.length / array_sede.length * 100)
    porAdmi = parseInt(administracion.length / array_sede.length * 100)

  }

  let tod = 0, por = 0, tor = 0, otro = 0;
  array_sede.forEach((element, i) => {
    switch (array_sede !== "") {
      case (array_sede[i]?.nombre.slice(0, 3) === "TOD"):
        tod += 1
        break;

      case (array_sede[i]?.nombre.slice(0, 3) === "POR"):
        por += 1
        break;

      case (array_sede[i]?.nombre.slice(0, 3) === "TOR"):
        tor += 1
        break;

      case (array_sede[i]?.nombre.slice(0, 3) !== ""):
        otro += 1
        break;

      default:
        break;
    }
  })


  const Delete = async (id) => {
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eliminado: "1",
        equipo: "comp1"
      })
    };

    const confirmacion = window.confirm("Esta seguro que desea borrarlo ?")

    if (confirmacion) {

      const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
      const data = await response.json();
      console.log(data)

      if (data.error === "e1") {
        alert(data.message)
      } else {
        alert("Equipo '" + id + "' eliminado")
        window.location.reload()
      }
    }
  }


  const HojaVida = (id) => {
    localStorage.setItem("ID", id)
  }

  const [impcelId, setImprecelId] = useState("")
  const idImpcel = (id) => {
    setImprecelId(id)
  }

  return (
    <div style={{ background: 'linear-gradient( #90A4AE, #D5D8DC , #90A4AE)' }} >

      <div style={{ background: 'linear-gradient( black, #90A4AE)' }}><br />

        <div className='container' align='center' >

          <div style={{ display: "inline-block", marginBotton: "20px" }}>
            <h1 className='letras' style={{ color: "white", font: "oblique bold 3vw cursive" }}>Equipos de computo en Via 40 </h1>
          </div><br /><br />


          <div style={{
            position: "absolute",
            left: "0%",
            top: "36%",
            width: "9vw",
            height: "60px",
            backgroundColor: "white",
            boxShadow: "0px 0px 5px 5px white"
          }} />

          <div style={{
            position: "absolute",
            left: "90%",
            top: "36%",
            width: "9.9vw",
            height: "60px",
            backgroundColor: "white",
            boxShadow: "0px 0px 5px 5px white"
          }} />
          <Card style={{ borderRadius: "80px", boxShadow: "0px 0px 5px 5px white", borderColor: "transparent" }}>
            <Card.Header><h3>Funciones</h3></Card.Header>
            <Card.Body>
              <Card.Title>Elija alguna de las opciones</Card.Title>

              <ButtonGroup size="lg" className="mb-2">
                <Button variant="success" as={Link} to="/Agregar">Agregar <BsPlusCircleDotted style={{ fontSize: '25px', color: "white" }} /> </Button>
                <Button variant="warning" onClick={() => setActualizar(true)}>Actualizar <BsArrowRepeat style={{ fontSize: '25px', color: "black" }} /></Button>
                <Button variant="danger" onClick={() => setEliminar(true)}>Eliminar <BsTrash style={{ fontSize: '25px', color: "white" }} /></Button>
              </ButtonGroup>

            </Card.Body>
          </Card>

          <div style={{
            width: "120px",
            height: "60px",
            backgroundColor: "white",
            boxShadow: "0px 0px 5px 5px white"
          }} />

        </div>
      </div>


      <div style={{ backgroundColor: "#85C1E9", boxShadow: "0px 0px 5px 1px black" }}>

        <div className='container' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

          <div align="center" style={{ width: "50%", margin: "0 auto" }}><br />

            <p>Numero de Equipos segun el <strong>GRUPO DE TRABAJO</strong>:</p>

            <CardGroup>
              <Card>
                <Card.Body>
                  <h5>Comercial: {comercial.length}</h5>
                </Card.Body>

              </Card>
              <Card>
                <Card.Body>
                  <h5>Almacen: {almacen.length}</h5>
                </Card.Body>

              </Card>
              <Card>
                <Card.Body>
                  <h5>Colision: {colision.length}</h5>
                </Card.Body>
              </Card>
            </CardGroup>

            <CardGroup>
              <Card>
                <Card.Body>
                  <h5>Taller: {taller.length}</h5>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <h5>Administracion: {administracion.length}</h5>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
          <div style={{ margin: "0 auto", marginTop: "30px", marginLeft: "30px" }}>
            <Button className="logo"
              style={{ height: "150px", backgroundColor: "#E5E7E9", color: "black", borderColor: "black", boxShadow: "0px 0px 5px 1px black", transition: "1s" }}
              onClick={() => setReporte(true)}>
              <TbReportAnalytics style={{ fontSize: '100px', color: "black" }} /><br />
              Opcion reporte
            </Button>
          </div>
        </div><hr />

        <div className='container' style={{ color: "black" }}>
          <ProgressBar style={{ height: "25px" }} onChange={porcentaje()} >
            <ProgressBar animated striped variant="success" now={porComercial} label="COMERCIAL" />
            <ProgressBar animated striped variant="info" now={porAlmacen} label="ALMACEN" />
            <ProgressBar animated striped variant="warning" now={porColision} label="COLISION" />
            <ProgressBar animated striped variant="danger" now={porTaller} label="TALLER" />
            <ProgressBar animated striped now={porAdmi} label="ADMINISTRACION" />
          </ProgressBar>
        </div><hr />

      </div><br />


      <div className='container'>
        <h3>Buscador</h3>

        <Form.Control onChange={buscare} size="lg" type="text" placeholder="Buscar computadores via 40" />
        <hr />

        <div style={{ display: "flex" }}>
          <Card style={{ borderColor: "black", width: "100%" }}>
            <Card.Header style={{ backgroundColor: "#85C1E9" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3>Equipos</h3>
                </div>
                <div style={{ backgroundColor: "#BFC9CA", borderRadius: "10px", padding: "7px", borderColor: "black" }}>
                  La cantidad de computadores: {array_sede.length}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className='row'>
                {
                  !buscar_sede
                    ?
                    <h1 align='center'>Cargando</h1>
                    :
                    <div className='col-10'>
                      {
                        buscar_sede.map(p => (
                          <ListGroup key={p.id} style={{ display: "flex", float: "left", margin: "5px" }}>
                            <div
                              style={{ cursor: "help", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
                              onClick={() => { Informacion(p.id); setInformacion(true) }}>
                              <InputGroup.Text className='info' style={{ width: "250px", transition: "1s" }} >{p.nombre}
                              </InputGroup.Text></div>
                          </ListGroup>
                        ))
                      }
                    </div>
                }

                <div className='col-2'>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className='ocultar'>
                      <Card style={{ background: "#BFC9CA" }}>
                        <Card.Body>
                          <Card.Title>Porcentaje segun equipo</Card.Title>
                          POR: Portatil<ProgressBar striped variant="success" now={por / array_sede.length * 100} label={`${parseInt(por / array_sede.length * 100)}%`} />
                          TOD: Todo en uno<ProgressBar striped now={tod / array_sede.length * 100} label={`${parseInt(tod / array_sede.length * 100)}%`} />
                          TOR: Torre<ProgressBar striped variant="warning" now={tor / array_sede.length * 100} label={`${parseInt(tor / array_sede.length * 100)}%`} />
                          Otro<ProgressBar striped variant="danger" now={otro / array_sede.length * 100} label={`${parseInt(otro / array_sede.length * 100)}%`} />
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>

              </div>
            </Card.Body>
          </Card>

        </div><hr />

        <CardGroup>
          <Card style={{ borderColor: "black" }}>
            <Card.Header style={{ backgroundColor: "#85C1E9" }}><h3>Impresoras</h3></Card.Header>
            <Card.Body>
              <Card.Title>La cantidad de Impresoras: {impresora.length}</Card.Title><hr />
              {
                !buscar_impresora
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <div>

                    {
                      buscar_impresora.map(p => (
                        <ListGroup key={p.id} style={{ display: "flex", float: "left", margin: "5px" }}>
                          <div onClick={() => { setImpcelmemoria(true); idImpcel(p.id) }}
                            style={{ cursor: "help", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                            <InputGroup.Text className='info' style={{ width: "290px", transition: "1s" }} >
                              {p.marca + " " + p.observacion} - {p.lugar}
                            </InputGroup.Text>
                          </div>
                        </ListGroup>
                      ))
                    }
                  </div>
              }
            </Card.Body>
          </Card>
          <Card style={{ borderColor: "black" }}>
            <Card.Header style={{ backgroundColor: "#85C1E9" }}><h3>Celulares</h3></Card.Header>
            <Card.Body>
              <Card.Title>La cantidad de Celulares: {celular.length}</Card.Title><hr />
              {
                !buscar_celular
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <div>
                    {
                      buscar_celular.map(p => (
                        <ListGroup key={p.id} style={{ display: "flex", float: "left", margin: "5px" }}>
                          <div onClick={() => { setImpcelmemoria(true); idImpcel(p.id) }}
                            style={{ cursor: "help", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                            <InputGroup.Text className='info' style={{ width: "290px", transition: "1s" }} >
                              {p.marca} - {p.observacion}
                            </InputGroup.Text>
                          </div>
                        </ListGroup>
                      ))
                    }
                  </div>
              }
            </Card.Body>
            <Card.Body>
              <Card.Title>La cantidad de Memorias: {memoria.length}</Card.Title><hr />
              {
                !memoria
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <div>
                    {
                      memoria.map(p => (
                        <ListGroup key={p.id} style={{ display: "flex", float: "left", margin: "5px" }}>
                          <div onClick={() => { setImpcelmemoria(true); idImpcel(p.id) }}
                            style={{ cursor: "help", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                            <InputGroup.Text className='info' style={{ width: "290px", transition: "1s" }} >
                              {p.marca + " " + p.observacion} - {p.lugar}
                            </InputGroup.Text>
                          </div>
                        </ListGroup>
                      ))
                    }
                  </div>
              }
            </Card.Body>

          </Card>
        </CardGroup><br />

      </div>

      <div style={{ background: " linear-gradient( #85C1E9 40%, whiteSmoke )", boxShadow: "0px 0px 5px 1px black" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button className="logo" style={{ height: "100px", marginTop: "15px", marginBottom: "15px" }} variant="primary" onClick={() => setPdf(true)}>
                <BsFileEarmarkPdf style={{ fontSize: '60px', color: "white" }} /><br />
                Imprimir PDF
              </Button>
            </div>
            <div>
              <Button className="logo" style={{ height: "100px", marginTop: "15px", marginBottom: "15px" }} variant="danger" onClick={() => setEliminados(true)}>
                <BsFillTrash2Fill style={{ fontSize: '60px', color: "white" }} /><br />
                Eliminados
              </Button>

            </div>
            <div>
              <Button className="logo" style={{ height: "100px", marginTop: "15px", marginBottom: "15px" }} variant="dark" onClick={() => setRegistrar(true)}>
                <BsFillPersonPlusFill style={{ fontSize: "60px", color: "white" }} /><br />
                Registrar
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/*     ***********************************************************************************************************************      */}

      {/* CALENDARIO */}
      <>
        <Modal size='lg' show={reporte} onHide={() => setReporte(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              REPORTE DE LOS COMPUTADORES
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ display: "flex", alignItem: "flex-end" }}>

              <div style={{ width: "400px" }}>

                <h3 align="center">Elija el grupo de trabajo</h3> <hr />

                <InputGroup className="mb-3">
                  <FloatingLabel
                    label="Grupo de trabajo"
                  >
                    <Form.Select onChange={() => Reporte()} aria-label="Default select example" id="grupo_trabajo" placeholder='Elija'>
                      <option></option>
                      <option value="COMERCIAL">COMERCIAL</option>
                      <option value="ALMACEN">ALMACEN</option>
                      <option value="TALLER">TALLER</option>
                      <option value="COLISION">COLISION</option>
                      <option value="ADMINISTRACION">ADMINISTRACION</option>
                    </Form.Select>
                  </FloatingLabel>
                </InputGroup>

              </div>
              <div style={{ width: "400px", margin: "5px" }}>

                <h4 align='center'>EQUIPOS</h4>

                {
                  (grupoTrabajo.length === 0 && trabajoImpCel.length === 0)
                    ?
                    <div align='center'>
                      <Spinner style={{ marginTop: "50px" }} animation="border" />
                    </div>
                    :
                    grupoTrabajo.map(p => (
                      <h6 key={p.id} align='center'>{p.nombre}</h6>
                    ))
                }
                {
                  (trabajoImpCel.length === 0)
                    ?
                    ""
                    :
                    trabajoImpCel.map(p => (
                      <h6 key={p.id} align='center'>{p.marca}</h6>
                    ))
                }

              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setReporte(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setReportePdf(true)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <br />

      {/* Mostra informacion del equipo */}
      <Modal centered show={informacion} onHide={() => setInformacion(false)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Informacion Equipo:<br /> {info[0]?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          id del compurador: <strong>{info[0]?.id}</strong><br />
          Responsable: <strong>{info[0]?.responsable}</strong><br />
          Marca : <strong>{info[0]?.marca}</strong><br />
          Modelo : <strong>{info[0]?.modelo}</strong><br />
          Color : <strong>{info[0]?.color}</strong><br />
          Procesador : <strong>{info[0]?.procesador}</strong><br />
          Serial : <strong>{info[0]?.serial}</strong><br />
          Ram : <strong>{info[0]?.ram} {info[0]?.tipo_ram}</strong><br />
          almacenamiento : <strong>{info[0]?.almacenamiento} {info[0]?.Tipo_almacenamiento}</strong><br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              Estado : <strong>{info[0]?.estado} </strong>
            </div>

            <div align='right'>
              Agregado por: <strong>{info[0]?.admin}</strong>
            </div>

          </div>

          <hr />

          <div className="d-grid gap-2">
            <ButtonGroup className="mb-2">
              <Button as={Link} to="/Principal" onClick={() => HojaVida(info[0]?.id)} variant="success">Hoja de vida</Button>


              <Button onClick={() => {
                setActualizar(true);
                setInformacion(false);
              }} variant="warning">Editar computador</Button>

              <Button onClick={() => Delete(info[0]?.id)} variant='danger'>Eliminar Equipo</Button>

            </ButtonGroup>
          </div>
          <div align='center'>
            <Button className='alargar' variant="outline-primary" style={{ borderRadius: "20px", transition: "1s" }} as={Link} to='/Agregar' >Agregar Equipo</Button>
          </div>

        </Modal.Body>
      </Modal>


      {/* BOTON MODALES */}
      <Eliminar
        show={eliminar}
        onHide={() => setEliminar(false)}
        equipos={equipos}
        equiposimp={impcel}
      />
      <Actualizar
        backdrop="static"
        show={actualizar}
        onHide={() => setActualizar(false)}
        equipos={equipos}
        equiposimp={impcel}
        buscar={info[0]?.id || ''}
      />
      <Eliminados
        show={eliminados}
        onHide={() => setEliminados(false)}
        equipos={equipos}
        equiposimp={impcel}
      />
      <Pdf
        show={pdf}
        onHide={() => setPdf(false)}
        equipos={equipos}
      />
      <Registrar
        show={registrar}
        onHide={() => setRegistrar(false)}
        equipos={equipos}
        equiposimp={impcel}
      />

      <ReportePdf
        show={reportePdf}
        onHide={() => setReportePdf(false)}
        reporte={grupoTrabajo}
        reporteimp={trabajoImpCel}
      />

      <Impcelmemoria
        show={impcelmemoria}
        onHide={() => setImpcelmemoria(false)}
        impcel={impcel}
        id={impcelId}
      />

    </div >
  )
}

function Eliminar(props) {

  const [arrayall, setArrayall] = useState([]);

  const actualizar = async () => {

    const mostrar = document.getElementById("eliminar").value


    if (mostrar === "1") {

      setArrayall(props.equipos.filter(dato => dato.eliminado === 0 && dato.id_sede === 2))
    } else if (mostrar === "2") {

      setArrayall(props.equiposimp.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Impresora" && datos.eliminado === 0))
    } else if (mostrar === "3") {

      setArrayall(props.equiposimp.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Celulares" && datos.eliminado === 0))
    } else if (mostrar === "4") {

      setArrayall(props.equiposimp.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Memoria" && datos.eliminado === 0))
    }

  }

  const Delete = async () => {

    const mostrar = document.getElementById("eliminar").value
    const id = document.getElementById('id').value

    if (mostrar === "1") {

      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eliminado: "1",
          equipo: "comp1"
        })
      };

      const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
      const data = await response.json();
      console.log(data)

      if (data.error === "e1") {
        alert(data.message)
      } else {
        alert("Equipo '" + id + "' eliminado")
        window.location.reload()
      }

    } else if (mostrar === "2") {


      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eliminado: "1",
          equipo: "imp1"
        })
      };

      const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
      const data = await response.json();
      console.log(data)

      alert("Equipo '" + id + "' eliminado")
      window.location.reload()


    } else if (mostrar === "3") {

      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eliminado: "1",
          equipo: "cel1"
        })
      };

      const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
      const data = await response.json();
      console.log(data)

      alert("Equipo '" + id + "' eliminado")
      window.location.reload()


    } else if (mostrar === "4") {


      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eliminado: "1",
          equipo: "mem1"
        })
      };

      const response = await fetch(`http://localhost:3050/delete/${id}`, request);
      const data = await response.json();
      console.log(data)

      alert("Equipo '" + id + "' eliminado")
      window.location.reload()
    }

  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Eliminar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Elija que desea eliminar</h4>

        <InputGroup className="mb-3">
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Sede del computador"
          >
            <Form.Select onChange={() => actualizar()} id="eliminar" name="eliminar" aria-label="Floating label select example">
              <option></option>
              <option value="1">Equipo</option>
              <option value="2">Impresora</option>
              <option value="3">celular</option>
              <option value="4">Memoria</option>
            </Form.Select>
          </FloatingLabel>
        </InputGroup>

        <hr />

        <FloatingLabel controlId="floatingSelect" label="Eliminar computadores">
          {
            !arrayall
              ?
              <h1 align='center'>Cargando</h1>
              :

              <Form.Select id="id" name="id" aria-label="Default select example">
                <option></option>
                {
                  arrayall.map(p => (

                    <option key={p.id} value={p.id} >{p.nombre} - {p.responsable} - {p.marca}</option>

                  ))
                }
              </Form.Select>

          }
        </FloatingLabel><br />

        <div className="d-grid gap-2">
          <Button onClick={() => Delete()} size="lg" variant="outline-danger">ELIMINAR</Button>
        </div>


      </Modal.Body>
    </Modal>
  );
}

function Actualizar(props) {

  const [equipobuscar, setEquipobuscar] = useState([]);
  const [id, setId] = useState("")

  const Buscar = () => {

    const idE = document.getElementById("id").value

    setId(idE)

    const equipo = props.equipos.filter((datos) => datos.id === parseInt(idE))

    setEquipobuscar(equipo)

  }

  const Actualizar_e = async () => {
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
    const grupo_trabajo = document.getElementById("grupo_trabajo").value
    const nombre = document.getElementById("nombre").value
    const username = document.getElementById("username").value
    const observacion = document.getElementById("observacion").value

    let array = [marca, id_sede, serial, modelo, color, almacenamiento, tipo_almacenamiento, ram, tipo_ram, procesador, cargo, estado, grupo_trabajo, nombre, username]

    let vacio = array.filter(response => response !== "")

    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
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
        grupo_trabajo: grupo_trabajo,
        nombre: nombre,
        responsable: username,
        observacion: observacion,
      })
    };


    if (id !== '') {
      if (vacio.length === 15) {
        const response = await fetch(`http://autosfujiyama.com:3050/equipos`, request);
        const data = await response.json();
        console.log(data)
        alert("Equipo actualizado")
        window.location.reload();
      } else {
        alert("llene todos los campos")
      }
    } else {
      alert("Tiene que elegir la id del equipo que quiere actualizar")
    }
  }

  const Borrar = () => {
    document.getElementById("id_sede").value = ""
    document.getElementById("marca").value = ""
    document.getElementById("serial").value = ""
    document.getElementById("modelo").value = ""
    document.getElementById("color").value = ""
    document.getElementById("almacenamiento").value = ""
    document.getElementById("tipo_almacenamiento").value = ""
    document.getElementById("ram").value = ""
    document.getElementById("tipo_ram").value = ""
    document.getElementById("procesador").value = ""
    document.getElementById("cargo").value = ""
    document.getElementById("estado").value = ""
    document.getElementById("grupo_trabajo").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("username").value = ""
    document.getElementById("observacion").value = ""
    setEquipobuscar([])
  }

  let equipo_filter = props.equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0)

  const [modificar, setModificar] = React.useState(false);
  const [programa, setPrograma] = React.useState(false);

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Actualizar</h3>
        </Modal.Title>
        <>
          <Button style={{ color: "blue" }} variant="white" onClick={() => setPrograma(true)}>
            Actualizar Programa
          </Button>

          <Programas
            show={programa}
            onHide={() => setPrograma(false)}
          />
        </>
        <CloseButton onClick={
          (equipobuscar.length === 0)
            ?
            props.onHide
            :
            () => alert("Ponga los campos en blanco")
        } />
      </Modal.Header>
      <Modal.Body>
        <div align='center'>
          <Button className='alargar' style={{ borderColor: "transparent", transition: "1s" }} variant="outline-danger" onClick={() => Borrar()}>Borrar campos</Button>
        </div><hr />
        <h4>Coloque la id del equipo que desea Actualizar</h4>
        {
          !equipo_filter
            ?
            <h1 align='center'>Cargando</h1>
            :
            <div align="center">
              <InputGroup className="mb-3">
                <Form.Select onChange={() => Buscar()} id="id" >
                  <option value={props.buscar} >{props.buscar}</option>
                  {
                    equipo_filter.map(p => (
                      <option key={p.id} value={p.id} >{p.nombre} - {p.responsable}</option>
                    ))
                  }
                </Form.Select>
                <Button onClick={() => Buscar()} variant="primary">Buscar</Button>
              </InputGroup>
            </div>
        }
        <hr />

        <Card>
          <Card.Header as="h3">Actualizar Equipos </Card.Header>
          <Card.Body>
            <Card.Title>Por favor llenar todos los campos</Card.Title>
            <InputGroup className="mb-3">
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Sede del computador"
                >
                  <Form.Select id="id_sede" name="id_sede" aria-label="Floating label select example">
                    <option>{equipobuscar[0]?.id_sede}</option>
                    <option value="1">Catedral</option>
                    <option value="2">Via 40</option>
                    <option value="3">Cartagena</option>
                    <option value="4">Alemana automotriz</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Marca del computador</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="marca"
                defaultValue={equipobuscar[0]?.marca}
              />
            </InputGroup>


            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Serial</InputGroup.Text>
              <Form.Control
                id="serial"
                defaultValue={equipobuscar[0]?.serial}
              />
              <InputGroup.Text id="basic-addon1">Modelo</InputGroup.Text>
              <Form.Control
                id="modelo"
                defaultValue={equipobuscar[0]?.modelo}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Color de computador</InputGroup.Text>
              <Form.Control
                id="color"
                defaultValue={equipobuscar[0]?.color}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Almacenamiento</InputGroup.Text>
              <Form.Control
                defaultValue={equipobuscar[0]?.almacenamiento}
                id="almacenamiento"
              />
              <InputGroup.Text id="basic-addon1">Tipo</InputGroup.Text>
              <Form.Select id="tipo_almacenamiento" name="tipo_almacenamiento" aria-label="Default select example">
                <option>{equipobuscar[0]?.Tipo_almacenamiento}</option>
                <option value="HDD">HDD</option>
                <option value="SSD">SSD</option>
                <option value="M.2">M.2</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ram</InputGroup.Text>
              <Form.Select id="ram" name="ram" aria-label="Default select example">
                <option>
                  {equipobuscar[0]?.ram}
                </option>
                <option value="2Gb">2Gb</option>
                <option value="4Gb">4Gb</option>
                <option value="6Gb">6Gb</option>
                <option value="8Gb">8Gb</option>
                <option value="12Gb">12Gb</option>
                <option value="16Gb">16Gb</option>
                <option value="32Gb">32Gb</option>
                <option value="64Gb">64Gb</option>
              </Form.Select>
              <InputGroup.Text id="basic-addon1">Tipo de Ram </InputGroup.Text>
              <Form.Select id="tipo_ram" name="tipo_ram" aria-label="Default select example">
                <option>{equipobuscar[0]?.tipo_ram}</option>
                <option value="DDR2">DDR2</option>
                <option value="DDR3">DDR3</option>
                <option value="DDR4">DDR4</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Procesador del equipo</InputGroup.Text>
              <Form.Control
                defaultValue={equipobuscar[0]?.procesador}
                id="procesador"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Nombre Pc</InputGroup.Text>
              <Form.Control
                defaultValue={equipobuscar[0]?.nombre}
                id="nombre"
              />
              <InputGroup.Text id="basic-addon1">Grupo de trabajo</InputGroup.Text>
              <Form.Select id="grupo_trabajo" name="grupo_trabajo" aria-label="Default select example">
                <option>{equipobuscar[0]?.grupo_trabajo}</option>
                <option value="COMERCIAL">COMERCIAL</option>
                <option value="ALMACEN">ALMACEN</option>
                <option value="TALLER">TALLER</option>
                <option value="COLISION">COLISION</option>
                <option value="ADMINISTRACION">ADMINISTRACION</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Username del responsable del equipo</InputGroup.Text>
              <Form.Control defaultValue={equipobuscar[0]?.responsable} id='username' name='username' />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Observacion</InputGroup.Text>
              <Form.Control defaultValue={equipobuscar[0]?.observacion} id='observacion' name='observacion' />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Cargo</InputGroup.Text>
              <Form.Select id='cargo' name='cargo' aria-label="Default select example">
                <option>{equipobuscar[0]?.cargo}</option>
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

                <option value="AUX MERCADEO">AUX MERCADEO</option>
                <option value="AUX CONTABLE">AUX CONTABLE</option>
                <option value="AUX SISTEMA">AUX SISTEMA</option>

              </Form.Select>
              <InputGroup.Text id="basic-addon1">Estado</InputGroup.Text>
              <Form.Select id="estado" name="estado" aria-label="Default select example">
                <option>{equipobuscar[0]?.estado}</option>
                <option value="Funcionando">Funcionando</option>
                <option value="Dañado">Dañado</option>
              </Form.Select>
            </InputGroup><hr />
            <div className="d-grid gap-2">
              <Button onClick={() => Actualizar_e()} size="lg" variant="outline-success">Actualizar Equipo</Button>{' '}
            </div>
          </Card.Body>
        </Card>

      </Modal.Body>
      <Modal.Footer>
        <>
          <Button variant="secondary" size='lg' onClick={() => setModificar(true)}>
            Modificar
          </Button>

          <Modificar
            show={modificar}
            onHide={() => setModificar(false)}
            equipos={props.equipos}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
}

function Modificar(props) {

  const [equipobuscar, setEquipobuscar] = useState([]);


  const Buscar = async () => {

    const id = document.getElementById("id_equipo").value

    setEquipobuscar(props.equipos.filter((dato) => dato.id === parseInt(id)))

  }
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  let fechahora = fecha + " " + hora
  // console.log(fechahora)

  let equipo_filter = []
  equipo_filter = props.equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 0)

  const Agregar = async () => {

    const id_sede = equipobuscar[0]?.id_sede
    const id_equipo = document.getElementById("id_equipo").value
    const username = document.getElementById("username").value
    const observacion = document.getElementById("observacion").value

    console.log(id_equipo + " " + id_sede + " " + username + " " + observacion + " " + fechahora);

    let array = [id_equipo, id_sede, username, observacion]

    let vacio = array.filter(response => response !== "")

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        id_equipo: id_equipo,
        id_sede: id_sede,
        observacion: observacion,
        fecha: fechahora,
      })
    };

    if (vacio.length === 4) {
      const response = await fetch('http://autosfujiyama.com:3050/inventario', request);
      const data = await response.json();
      console.log(data)

      if (data.validation === "a1") {
        alert(data.message);
      } else {
        alert("dato guardado correctamente");
        window.location.reload()
      }

    } else {
      alert("llene todos los campos")
    }
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modificar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header as="h3">Inventario de los computadores</Card.Header>
          <Card.Body>
            <Card.Title>Por favor llenar todos los campos</Card.Title>
            <InputGroup className="mb-3">
              <FloatingLabel controlId="floatingSelect" label="id del equipo para hacer una observacion">
                {
                  !equipo_filter
                    ?
                    <h1 align='center'>Cargando</h1>
                    :

                    <Form.Select key={equipo_filter.id} onChange={() => Buscar()} id="id_equipo" name="id_equipo" aria-label="Default select example">
                      <option></option>
                      {
                        equipo_filter.map(p => (
                          <option key={p.id} value={p.id} >{p.nombre}</option>
                        ))
                      }
                    </Form.Select>

                }
              </FloatingLabel>
            </InputGroup>
            <InputGroup className="mb-3">
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Sede del computador"
                >
                  <Form.Select id="id_sede" name="id_sede" aria-label="Floating label select example">
                    <option value={equipobuscar[0]?.id_sede}>{equipobuscar[0]?.id_sede}</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </InputGroup>


            <InputGroup className="mb-3">
              <FloatingLabel label="Escriba el username del responsable">
                <Form.Control type="username" id="username" name="username" placeholder="username" />
              </FloatingLabel>
            </InputGroup><hr />

            <Form.Group className="mb-3">
              <InputGroup.Text id="basic-addon1">Observaciones</InputGroup.Text>
              <Form.Control id='observacion' name='observacion' as="textarea" rows={3} />
            </Form.Group>


            <div className="d-grid gap-2">
              <Button onClick={() => Agregar()} size="lg" variant="outline-success">Agregar Inventario</Button>{' '}
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Programas(props) {

  const [equipo, setEquipo] = useState([]);

  const Buscar = async () => {

    const nombre = document.getElementById("nombrepc").value

    console.log(nombre)

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre,
      })
    };

    const response = await fetch('http://autosfujiyama.com:3050/programe', request);
    const data = await response.json();
    //console.log(data)
    setEquipo(data)

  }

  // console.log(fechahora)


  const Agregar = async () => {

    const id_equipo = equipo[0]?.id

    const sistema_operativo = document.getElementById("sistema_operativo").value
    const so = document.getElementById("so_licencia").value
    let so_licencia = (!so) ? equipo[0]?.so_licencia : so;
    const office = document.getElementById("office").value
    const offser = document.getElementById("so_licencia").value
    let office_serial = (!offser) ? equipo[0]?.office_serial : offser;
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


    let array = [
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

    let vacio = array.filter(response => response !== "")

    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id_equipo,
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

    if (vacio.length === 14) {
      const response = await fetch(`http://autosfujiyama.com:3050/programe`, request);
      const data = await response.json();
      console.log(data)
      alert(data.message);
      window.location.reload()

    } else {
      alert("llene todos los campos")
    }
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Actualizar programa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header as="h3">Programa de los computadores</Card.Header>
          <Card.Body>
            <Card.Title>Por favor llenar todos los campos</Card.Title>

            <InputGroup className="mb-3">
              <FloatingLabel label="Nombre del PC">
                <Form.Control id="nombrepc" name="nombrepc" />
              </FloatingLabel>
              <Button onClick={() => Buscar()} variant="primary">Buscar</Button>{' '}
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">SO</InputGroup.Text>
              <Form.Select id="sistema_operativo" name="sistema_operativo" aria-label="Floating label select example">
                <option>{equipo[0]?.sistema_operativo}</option>
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
                <option>{equipo[0]?.office}</option>
                <option value="2016">2016 </option>
                <option value="2019">2019</option>
                <option value="libre Office">libre Office</option>
                <option value="Open Office">Open Office</option>

              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Licencia de SO</InputGroup.Text>
              <Form.Control
                placeholder={equipo[0]?.so_licencia}
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="so_licencia"
                name="so_licencia"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Serial del office</InputGroup.Text>
              <Form.Control
                placeholder={equipo[0]?.office_serial}
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
                <option value={equipo[0]?.quiter}>{(equipo[0]?.quiter === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
              <InputGroup.Text id="basic-addon1">Acrobat</InputGroup.Text>
              <Form.Select id="acrobat" name="acrobat" aria-label="Default select example">
                <option value={equipo[0]?.acrobat}>{(equipo[0]?.acrobat === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Winrar</InputGroup.Text>
              <Form.Select id="winrar" name="winrar" aria-label="Default select example">
                <option value={equipo[0]?.winrar}>{(equipo[0]?.winrar === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
              <InputGroup.Text id="basic-addon1">Google Chorme</InputGroup.Text>
              <Form.Select id="google_chrome" name="google_chrome" aria-label="Default select example">
                <option value={equipo[0]?.google_chrome}>{(equipo[0]?.google_chrome === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Piramide</InputGroup.Text>
              <Form.Select id="piramide" name="piramide" aria-label="Default select example">
                <option value={equipo[0]?.piramide}>{(equipo[0]?.piramide === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
              <InputGroup.Text id="basic-addon1">Thunderbirt</InputGroup.Text>
              <Form.Select id="thunderbirt" name="thunderbirt" aria-label="Default select example">
                <option value={equipo[0]?.thunderbirt}>{(equipo[0]?.thunderbirt === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Siprock</InputGroup.Text>
              <Form.Select id="siprock" name="siprock" aria-label="Default select example">
                <option value={equipo[0]?.siprock}>{(equipo[0]?.siprock === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
              <InputGroup.Text id="basic-addon1">Socase</InputGroup.Text>
              <Form.Select id="socase" name="socase" aria-label="Default select example">
                <option value={equipo[0]?.socase}>{(equipo[0]?.socase === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Anydesk</InputGroup.Text>
              <Form.Select id="anydesk" name="anydesk" aria-label="Default select example">
                <option value={equipo[0]?.anydesk}>{(equipo[0]?.anydesk === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
              <InputGroup.Text id="basic-addon1">VPN</InputGroup.Text>
              <Form.Select id="vpn" name="vpn" aria-label="Default select example">
                <option value={equipo[0]?.vpn}>{(equipo[0]?.vpn === 1) ? "Si!" : "No!"}</option>
                <option value="1">Si!</option>
                <option value="0">No!</option>

              </Form.Select>
            </InputGroup>

            <div className="d-grid gap-2">
              <Button onClick={() => Agregar()} size="lg" variant="outline-success">Actualizar Programa </Button>{' '}
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Eliminados(props) {


  let array_eliminado = []
  array_eliminado = props.equipos.filter(datos => datos.id_sede === 2 && datos.eliminado === 1)

  let array_imp, array_cel, memoria = []

  if (props.equiposimp.message === "no hay resultados") {
  } else {
    array_imp = props.equiposimp.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Impresora" && datos.eliminado === 1)

    array_cel = props.equiposimp.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Celulares" && datos.eliminado === 1)

    memoria = props.equiposimp.filter((datos) => datos.id_sede === 2 && datos.Tipo_equipo === "Memoria" && datos.eliminado === 1)
  }

  const Restaurar = async (id) => {

    alert("la id de este equipo es:" + id)
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eliminado: "0",
        equipo: "comp1"
      })
    };

    const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
    const data = await response.json();
    console.log(data)

    if (data.error === "e1") {
      alert(data.message)
    } else {
      alert("Equipo '" + id + "' restaurado")
      window.location.reload()
    }
  }

  const RestaurarImp = async (id) => {

    alert("la id de este equipo es:" + id)
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eliminado: "0",
        equipo: "imp1"
      })
    };

    const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
    const data = await response.json();
    console.log(data)

    if (data.error === "e1") {
      alert(data.message)
    } else {
      alert("Equipo '" + id + "' restaurado")
      window.location.reload()
    }
  }

  const RestaurarCel = async (id) => {

    alert("la id de este equipo es:" + id)
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eliminado: "0",
        equipo: "cel1"
      })
    };

    const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
    const data = await response.json();
    console.log(data)

    if (data.error === "e1") {
      alert(data.message)
    } else {
      alert("Equipo '" + id + "' restaurado")
      window.location.reload()
    }
  }

  const RestaurarMem = async (id) => {

    alert("la id de este equipo es:" + id)
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eliminado: "0",
        equipo: "mem1"
      })
    };

    const response = await fetch(`http://localhost:3050/delete/${id}`, request);
    const data = await response.json();
    console.log(data)

    if (data.error === "e1") {
      alert(data.message)
    } else {
      alert("Equipo '" + id + "' restaurado")
      window.location.reload()
    }
  }


  return (

    <Modal
      {...props}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title >
          Equipos eliminados
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardGroup>
          <Card>
            <Card.Header>Equipos</Card.Header>
            <Card.Body>
              {
                !array_eliminado
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <ul>

                    {
                      array_eliminado.map(p => (

                        <li key={p.id}>
                          <ListGroup className="mb-3">
                            <div>
                              <div style={{ float: 'left' }}>
                                <InputGroup.Text >{p.nombre} - {p.responsable}</InputGroup.Text>
                              </div>
                              <div align="right">
                                <Button onClick={() => Restaurar(p.id)} variant="info"><BsBootstrapReboot style={{ fontSize: '20px', color: "black" }} /></Button>{' '}
                              </div>
                            </div>
                          </ListGroup>
                        </li>

                      ))
                    }
                  </ul>
              }

            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header>Impresoras</Card.Header>
            <Card.Body>
              {
                !array_imp
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <ul>

                    {
                      array_imp.map(p => (

                        <li key={p.id}>
                          <ListGroup className="mb-3">
                            <div>
                              <div style={{ float: 'left' }}>
                                <InputGroup.Text >{p.marca} - {p.lugar}</InputGroup.Text>
                              </div>
                              <div align="right">
                                <Button onClick={() => RestaurarImp(p.id)} variant="info"><BsBootstrapReboot style={{ fontSize: '20px', color: "black" }} /></Button>{' '}
                              </div>
                            </div>
                          </ListGroup>
                        </li>

                      ))
                    }
                  </ul>
              }
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header>Celulares</Card.Header>
            <Card.Body>
              {
                !array_cel
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <ul>

                    {
                      array_cel.map(p => (

                        <li key={p.id}>
                          <ListGroup className="mb-3">
                            <div>
                              <div style={{ float: 'left' }}>
                                <InputGroup.Text >{p.marca} - {p.lugar}</InputGroup.Text>
                              </div>
                              <div align="right">
                                <Button onClick={() => RestaurarCel(p.id)} variant="info"><BsBootstrapReboot style={{ fontSize: '20px', color: "black" }} /></Button>{' '}
                              </div>
                            </div>
                          </ListGroup>
                        </li>

                      ))
                    }
                  </ul>
              }
            </Card.Body>

            <Card.Body>
              <Card.Title>La cantidad de Memorias es de: {memoria.length}</Card.Title>
              {
                !memoria
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <ul>

                    {
                      memoria.map(p => (

                        <li key={p.id}>
                          <ListGroup className="mb-3">
                            <div>
                              <div style={{ float: 'left' }}>
                                <InputGroup.Text >{p.marca} - {p.lugar}</InputGroup.Text>
                              </div>
                              <div align="right">
                                <Button onClick={() => RestaurarMem(p.id)} variant="info"><BsBootstrapReboot style={{ fontSize: '20px', color: "black" }} /></Button>{' '}
                              </div>
                            </div>
                          </ListGroup>
                        </li>

                      ))
                    }
                  </ul>
              }
            </Card.Body>

            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Modal.Body>
    </Modal>

  );
}

function Pdf(props) {

  const [equipobuscar, setEquipobuscar] = useState([]);

  const [user, setUser] = useState([]);

  const [equiposPDF, setEquiposPDF] = useState(false);

  let array_equipo = props.equipos.filter((datos) => datos.id_sede === 2 && datos.eliminado === 0)

  const Buscar = async () => {

    const id = document.getElementById("id").value

    const equipo = props.equipos.filter((datos) => datos.id === parseInt(id))

    setEquipobuscar(equipo)

  }

  let username = equipobuscar[0]?.responsable
  //console.log(username)

  const Usuario = async () => {

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
      })
    }

    const response = await fetch("http://autosfujiyama.com:3050/users", request)
    const data = await response.json();

    if (data.message === "Usuario no encontrado") {
      alert("Usuario no encontrado")
    } else {
      setUser(data);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Imprimir equipo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Elija que equipo desea imprimir</h4>

        {
          !array_equipo
            ?
            <h1 align='center'>Cargando</h1>
            :
            <div align="center">
              <InputGroup className="mb-3">
                <Form.Select onChange={() => Buscar()} id="id" name="id" aria-label="Default select example">
                  <option ></option>
                  {
                    array_equipo.map(p => (
                      <option key={p.id} value={p.id || ''} >{p.nombre}</option>
                    ))
                  }
                </Form.Select>
              </InputGroup>
            </div>
        }

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="info" onClick={() => { Usuario(); setEquiposPDF(true); }}>
          Formato PDF
        </Button>
      </Modal.Footer>

      <EquiposPDF
        show={equiposPDF}
        onHide={() => setEquiposPDF(false)}
        equipo={equipobuscar}
        user={user}
      />

    </Modal>
  );
}

function Registrar(props) {

  const [username, setUsername] = useState("")

  const Username = () => {
    const nombre = document.getElementById("nombre").value.toUpperCase()
    const apellido = document.getElementById("apellido").value.toUpperCase()
    let apellidouser = apellido.split(" ", 1)
    setUsername(nombre.charAt(0).toLowerCase() + "" + apellidouser.toString().toLowerCase())
  }

  const Agregar = async () => {

    const cedula = document.getElementById("cedula").value
    const tipo_documento = document.getElementById("tipo_documento").value
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const telefono = document.getElementById("telefono").value
    const direccion = document.getElementById("telefono").value
    const correo = document.getElementById("correo").value
    const password = document.getElementById("password").value
    const confpassword = document.getElementById("password2").value
    const cargo = document.getElementById("cargo").value
    const tipo_user = document.getElementById("tipo_user").value

    let array = [cedula, tipo_documento, nombre, apellido, telefono, direccion, correo, password, confpassword, cargo, cargo, tipo_user]
    let vacio = array.filter(response => response !== "")

    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cedula: cedula,
        tipo_documento: tipo_documento,
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        username: username,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
        password: password,
        cargo: cargo,
        tipo_user: tipo_user,
      })
    };

    if (vacio.length === 12) {
      if (password === confpassword) {

        const response = await fetch("http://autosfujiyama.com:3050/adduser", request)
        const data = await response.json()
        console.log(data)
        alert(data.message)
        window.location.reload()

      } else {
        alert("Por favor colocar la misma contraseña en los campos")
      }

    } else {
      alert("Llene todos los campos")
    }
  }

  const [actualizarPersons, setActualizarPersons] = useState(false)
  const [empleado, setEmpleado] = useState([])

  const Actualizar = () => {

    const username = document.getElementById("username").value

    axios.post("http://autosfujiyama.com:3050/users", {
      username: username
    })
      .then((response) => response.data)
      .then(response => {
        setEmpleado(response)
      })
  }

  const ActualizarEmpleado = () => {

    const tipo_documento = document.getElementById("tipo_doc").value
    const cedula = document.getElementById("ced").value
    const username = document.getElementById("use").value
    const nombre = document.getElementById("nom").value
    const apellido = document.getElementById("ape").value
    const telefono = document.getElementById("tel").value
    const direccion = document.getElementById("dir").value
    const correo = document.getElementById("cor").value
    const password = document.getElementById("pas").value
    const cargo = document.getElementById("car").value
    const tipo_user = document.getElementById("tip_use").value

    let array = [empleado[0]?.id, tipo_documento, cedula, username, nombre, apellido, telefono, direccion, correo, password, cargo, tipo_user]
    let vacio = array.filter(response => response !== "")

    if (vacio.length === 12) {
      axios.patch("http://autosfujiyama.com:3050/users", {
        id: empleado[0]?.id,
        tipo_documento: tipo_documento,
        cedula: cedula,
        username: username,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
        password: password,
        cargo: cargo,
        tipo_user: tipo_user
      })
        .then((response) => response.data)
        .then((response) => {
          alert(response.message)
        })
      window.location.reload()
    } else {
      alert("Llene todos los campos")
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <BsFillPersonPlusFill style={{ fontSize: "40px", color: "black" }} /> Registrarse

          <Button variant="outline-dark" style={{ marginLeft: "10px" }} onClick={() => { setActualizarPersons(true); }}>
            Actualizar empleado
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: " linear-gradient( #85C1E9 70%, whiteSmoke )" }}>
        <h4>Por favor llenar todos los campos</h4><hr />

        <InputGroup className="mb-3">
          <FloatingLabel
            label="Tipo de documento">
            <Form.Select id="tipo_documento" name="tipo_documento" aria-label="Floating label select example">
              <option></option>
              <option value="Cedula ciudadana">Cédula de Ciudadanía</option>
              <option value="Tarjeta Identidad">Tarjeta de Identidad</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="No. documento">
            <Form.Control type="text" placeholder="Password" id='cedula'
              name='cedula' />
          </FloatingLabel>
        </InputGroup>

        <h5>Nombre</h5>
        <InputGroup className="mb-3">
          <FloatingLabel label="Nombres">

            <Form.Control
              onChange={() => Username()}
              placeholder="Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="nombre"
              name="nombre"
            />
          </FloatingLabel>

          <FloatingLabel label="Apellidos">
            <Form.Control
              onChange={() => Username()}
              placeholder="Primer Apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="apellido"
              name="apellido"
            />
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Username: </InputGroup.Text>
          <Form.Control
            defaultValue={username}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <h5>Informacion</h5>
        <InputGroup className="mb-3">
          <FloatingLabel label="Telefono">

            <Form.Control
              placeholder="Primer nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="telefono"
              name="telefono"
            />
          </FloatingLabel>

          <FloatingLabel label="Direccion">
            <Form.Control
              placeholder="Primer Apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="direccion"
              name="direccion"
            />
          </FloatingLabel>
        </InputGroup>

        <InputGroup className="mb-3">
          <FloatingLabel
            label="Cargo">
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
              <option value="JEFE ALMACEN">JEFE ALMACEN</option>

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
              <option value="CITAS">CITAS</option>

              <option value="AUX MERCADEO">AUX MERCADEO</option>
              <option value="AUX CONTABLE">AUX CONTABLE</option>
              <option value="AUX SISTEMA">AUX SISTEMA</option>

            </Form.Select>
          </FloatingLabel>
        </InputGroup>

        <InputGroup className="mb-3">
          <FloatingLabel
            label="Tipo de usuario">
            <Form.Select id="tipo_user" name="tipo_user" aria-label="Floating label select example">
              <option></option>
              <option value="usuario">usuario</option>
              <option value="administrador">administrador</option>
            </Form.Select>
          </FloatingLabel>
        </InputGroup>

        <h5>correo y contraseña para entrar a la pagina</h5>
        <InputGroup className="mb-3">
          <FloatingLabel label="Correo">
            <Form.Control type="email" placeholder="Enter email" id="correo" />
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-3">
          <FloatingLabel label="Contraseña">

            <Form.Control
              type="password"
              placeholder="Contraseña"
              id="password"
            />
          </FloatingLabel>

          <FloatingLabel label="Confirme contraseña">
            <Form.Control
              type="password"
              placeholder="Confirme contraseña"
              id="password2"
            />
          </FloatingLabel>
        </InputGroup>


        <div className="d-grid gap-2">
          <Button onClick={() => Agregar()} size="lg" variant="outline-success">Agregar Usuario</Button>{' '}
        </div>
      </Modal.Body>



      {/***************************** ACTUALIZAR CLIENTE *****************************/}

      <Modal show={actualizarPersons} size='lg' onHide={() => setActualizarPersons(false)}>
        <Modal.Header closeButton>
          <Modal.Title >Actualizar</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: " linear-gradient( #85C1E9 70%, whiteSmoke )" }} >

          <InputGroup className="mb-3">
            <FloatingLabel
              label="Escriba el username">
              <Form.Control placeholder="." type="text" id='username' />
            </FloatingLabel>
            <Button onClick={() => Actualizar()} variant="primary">Buscar</Button>
          </InputGroup>

          <hr />

          <InputGroup className="mb-3">
            <FloatingLabel
              label="Tipo de documento">
              <Form.Select id="tipo_doc" aria-label="Floating label select example">
                <option>{empleado[0]?.tipo_documento}</option>
                <option value="Cedula ciudadana">Cédula de Ciudadanía</option>
                <option value="Tarjeta Identidad">Tarjeta de Identidad</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="No. documento">
              <Form.Control placeholder="." type="text" defaultValue={empleado[0]?.cedula} id='ced' />
            </FloatingLabel>
          </InputGroup>

          <h5>Nombre</h5>
          <InputGroup className="mb-3">
            <FloatingLabel label="Nombres">
              <Form.Control
                placeholder="."
                defaultValue={empleado[0]?.nombre}
                id="nom"
              />
            </FloatingLabel>

            <FloatingLabel label="Apellidos">
              <Form.Control
                placeholder="."
                defaultValue={empleado[0]?.apellido}
                id="ape"
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Username: </InputGroup.Text>
            <Form.Control
              defaultValue={empleado[0]?.username}
              id="use"
            />
          </InputGroup>

          <h5>Informacion</h5>
          <InputGroup className="mb-3">
            <FloatingLabel label="Telefono">
              <Form.Control
                placeholder="."
                defaultValue={empleado[0]?.telefono}
                id="tel"
              />
            </FloatingLabel>

            <FloatingLabel label="Direccion">
              <Form.Control
                placeholder="."
                defaultValue={empleado[0]?.direccion}
                id="dir"
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3">
            <FloatingLabel
              label="Cargo">
              <Form.Select id='car' aria-label="Default select example">
                <option>{empleado[0]?.cargo}</option>
                <option value="GERENTE GENERAL">GERENTE GENERAL</option>
                <option value="GERENTE COMERCIAL">GERENTE COMERCIAL</option>
                <option value="GERENTE ADMINSTRACION Y CONTABLE">GERENTE ADMINSTRACION Y CONTABLE</option>
                <option value="GERENTE FINANCIERO">GERENTE FINANCIERO</option>
                <option value="GERENTE POSVENTA">GERENTE POSVENTA</option>
                <option value="SUBGERENTE">SUBGERENTE</option>

                <option value="JEFE TALLER">JEFE TALLER</option>
                <option value="JEFE MERCADEO">JEFE MERCADEO</option>
                <option value="JEFE ASESOR">JEFE ASESOR</option>
                <option value="JEFE ALMACEN">JEFE ALMACEN</option>

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

                <option value="AUX MERCADEO">AUX MERCADEO</option>
                <option value="AUX CONTABLE">AUX CONTABLE</option>
                <option value="AUX SISTEMA">AUX SISTEMA</option>

              </Form.Select>
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3">
            <FloatingLabel
              label="Tipo de usuario">
              <Form.Select id="tip_use" aria-label="Floating label select example">
                <option>{empleado[0]?.tipo_user}</option>
                <option value="usuario">USUARIO</option>
                <option value="administrador">ADMINSTRADOR</option>
              </Form.Select>
            </FloatingLabel>
          </InputGroup>

          <h5>Correo y contraseña para entrar a la pagina</h5>
          <InputGroup className="mb-3">
            <FloatingLabel label="Correo">
              <Form.Control placeholder="." type="email" defaultValue={empleado[0]?.correo} id="cor" />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-3">
            <FloatingLabel label="Contraseña">
              <Form.Control
                placeholder="."
                type="password"
                defaultValue={empleado[0]?.password}
                id="pas"
              />
            </FloatingLabel>

            <FloatingLabel label="Confirme contraseña">
              <Form.Control
                placeholder="."
                type="password"
                defaultValue={empleado[0]?.password}
                id="pas2"
              />
            </FloatingLabel>
          </InputGroup>

          <div className="d-grid gap-2">
            <Button onClick={() => ActualizarEmpleado()} size="lg" variant="outline-success">Actualizar Usuario</Button>{' '}
          </div>

        </Modal.Body>
      </Modal>
    </Modal>
  );
}

function ReportePdf(props) {

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
              <View style={{ marginTop: "50px", display: "flex", flexDirection: "row" }}>
                <Text style={{ fontSize: "16pt", margin: "20px", marginTop: "60px" }}>REPORTE DE COMPUTADORES</Text>
                <Image style={{ width: "150px", height: "100px", margin: "20px", marginLeft: "160px" }} src={picture}></Image>
              </View>

              <View style={{ marginVertical: "5px" }}>
                <View style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "35%", }}>Nombre del Equipo</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "30%" }}>Procesador</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "15%" }}>Ram</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "15%" }}>Disco Duro</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "30%" }}>cargo</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "15%" }}>Responsable</Text>
                </View>
                {
                  (props.reporte === "undefined")
                    ?
                    <Text>NO HAY NADA</Text>
                    :
                    props.reporte.map(p => (
                      <View key={p.id} style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "35%" }}>{p.nombre}</Text>
                        <Text style={{ fontSize: "5pt", border: "1px", padding: "5px", width: "30%" }}>{p.procesador}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "15%" }}>{p.ram} {p.tipo_ram}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "15%" }}>{p.almacenamiento} {p.Tipo_almacenamiento}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "30%" }}>{p.cargo}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "15%" }}>{p.responsable}</Text>
                      </View>
                    ))
                }
              </View>

              <View>
                <View style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "35%", }}>Tipo Equipo</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "30%" }}>Marca</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "30%" }}>observacion</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "30%" }}>Lugar</Text>
                  <Text style={{ fontSize: "9pt", border: "1px", width: "15%" }}>Estado</Text>
                </View>
                {
                  (props.reporteimp === "undefined")
                    ?
                    <Text>NO HAY NADA</Text>
                    :
                    props.reporteimp.map(p => (
                      <View key={p.id} style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "35%" }}>{p.Tipo_equipo}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "30%" }}>{p.marca}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "30%" }}>{p.observacion} {p.tipo_ram}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "30%" }}>{p.lugar}</Text>
                        <Text style={{ fontSize: "7pt", border: "1px", padding: "5px", width: "15%" }}>{p.estado}</Text>
                      </View>
                    ))
                }
              </View>

            </Page>
          </Document>

        </PDFViewer>

      </Modal.Body>
    </Modal>

  );
}

function EquiposPDF(props) {

  let equipo = props.equipo
  let users = props.user

  let hoy = new Date();
  let fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
  let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

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
                <Image style={{ width: "200px", height: "100px", display: "block", margin: "auto" }} src={picture}></Image>
              </View>

              <View style={{ border: "1px solid #000", marginVertical: "10px", marginLeft: "430px", marginRight: "20px", fontSize: "10px", alignItems: "center" }}>
                <Text>Fecha de entrega: {fecha}</Text>
                <Text>Hora de entrega: {hora}</Text>
              </View>

              <View style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                <Text style={{ fontSize: "12pt", border: "1px", width: "35%" }}>Nombre del trabajador</Text>
                <Text style={{ fontSize: "12pt", border: "1px", width: "30%" }}>No. de Identificacion</Text>
                <Text style={{ fontSize: "12pt", border: "1px", width: "35%" }}>Cargo</Text>
              </View>
              <View style={{ marginLeft: "20px", marginRight: "20px", display: "flex", flexDirection: "row", textAlign: "center" }}>
                <Text style={{ fontSize: "12pt", border: "1px", width: "35%" }}>{users[0]?.nombre + " " + users[0]?.apellido}</Text>
                <Text style={{ fontSize: "12pt", border: "1px", width: "30%" }}>{users[0]?.cedula}</Text>
                <Text style={{ fontSize: "12pt", border: "1px", width: "35%" }}>{users[0]?.cargo}</Text>
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
                <Text style={{ textAlign: "center", border: "1px" }}>EL EQUIPO TIENE LAS SIGUIENTES CARACTERISTICAS</Text>
                <Text style={{ margin: "4px" }}>1) Nombre: {equipo[0]?.nombre}</Text>
                <Text style={{ margin: "4px" }}>2) Color: {equipo[0]?.color}</Text>
                <Text style={{ margin: "4px" }}>3) Marca: {equipo[0]?.marca}</Text>
                <Text style={{ margin: "4px" }}>4) Modelo: {equipo[0]?.modelo}</Text>
                <Text style={{ margin: "4px" }}>5) Serial: {equipo[0]?.serial}</Text>
                <Text style={{ margin: "4px" }}>6) Procesador: {equipo[0]?.procesador}</Text>
                <Text style={{ margin: "4px" }}>7) Ram: {equipo[0]?.ram}</Text>
                <Text style={{ margin: "4px" }}>8) Almacenamiento: {equipo[0]?.almacenamiento}</Text>
                <Text style={{ margin: "4px" }}>9) Grupo de trabajo: {equipo[0]?.grupo_trabajo}</Text>
                <Text style={{ margin: "4px" }}>10) Complementos: {equipo[0]?.observacion}</Text>
                <Text style={{ margin: "4px" }}>11) Estado: {equipo[0]?.estado}</Text>

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

function Impcelmemoria(props) {

  const info = props.impcel.filter(response => response.id === props.id)

  const Delete = async (id) => {

    let equipo = ""
    if (info[0]?.Tipo_equipo === "Impresora") {
      equipo = "imp1"
    } else if (info[0]?.Tipo_equipo === "Celulares") {
      equipo = "cel1"
    } else {
      equipo = "mem1"
    }

    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eliminado: "1",
        equipo: equipo
      })
    };

    const confirmacion = window.confirm("Esta seguro que desea borrarlo ?")

    if (confirmacion) {

      const response = await fetch(`http://autosfujiyama.com:3050/delete/${id}`, request);
      const data = await response.json();
      console.log(data)

      if (data.error === "e1") {
        alert(data.message)
      } else {
        alert("Equipo '" + id + "' eliminado")
        window.location.reload()
      }
    }
  }

  const [editar, setEditar] = useState(false);

  const Edit = async () => {

    const id_sede = document.getElementById("id_sede").value
    const tipo_equipo = document.getElementById('tipo_equipo').value
    const marca = document.getElementById("marca").value
    const serial = document.getElementById("serial").value
    const modelo = document.getElementById("modelo").value
    const observacion = document.getElementById("observacion").value
    const lugar = document.getElementById("lugar").value
    const estado = document.getElementById("estado").value
    const propietario = document.getElementById("propietario").value

    let array = [marca, tipo_equipo, id_sede, serial, modelo, observacion, lugar, estado, propietario]

    let vacio = array.filter(response => response !== "")

    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: props.id ,
        id_sede: id_sede,
        Tipo_equipo: tipo_equipo,
        marca: marca,
        serial: serial,
        modelo: modelo,
        observacion: observacion,
        lugar: lugar,
        estado: estado,
        propietario: propietario,
      })
    };

    if (vacio.length === 9 || tipo_equipo === "Memoria") {

      const response = await fetch('http://localhost:3050/equiposimp', request);
      const data = await response.json();
      console.log(data)

      alert("dato guardado correctamente")

      window.location.replace('/Equiposvia40')

    } else {
      alert("llene todos los campos")
    }
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Informacion del equipo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        id del compurador: <strong>{info[0]?.id}</strong><br />
        Tipo de equipo: <strong>{info[0]?.Tipo_equipo}</strong><br />
        Marca : <strong>{info[0]?.marca}</strong><br />
        Modelo : <strong>{info[0]?.modelo}</strong><br />
        Serial : <strong>{info[0]?.serial}</strong><br />
        Observacion : <strong>{info[0]?.observacion}</strong><br />
        Lugar : <strong>{info[0]?.ram} {info[0]?.lugar}</strong><br />
        Propietario : <strong>{info[0]?.ram} {info[0]?.propietario}</strong><br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            Estado : <strong>{info[0]?.estado} </strong>
          </div>

          <div align='right'>
            Agregado por: <strong>{info[0]?.admin}</strong>
          </div>

        </div>

        <hr />

        <div className="d-grid gap-2">
          <ButtonGroup className="mb-2">

            <Button onClick={() => setEditar(true)} variant="warning">Editar computador</Button>

            <Button variant="outline-primary" as={Link} to='/Agregarimp' >Agregar {info[0]?.Tipo_equipo} </Button>

            <Button onClick={() => Delete(props.id)} variant='danger'>Eliminar Equipo</Button>

          </ButtonGroup>
        </div>

      </Modal.Body>

      {/* EDITAR IMPCEL */}

      <Modal size='lg' show={editar} onHide={() => setEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>EDITAR EQUIPO</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <InputGroup className="mb-3">
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Sede del computador"
              >
                <Form.Select id="id_sede" name="id_sede" aria-label="Floating label select example">
                  <option>{info[0]?.id_sede}</option>
                  <option value="1">Catedral</option>
                  <option value="2">Via 40</option>
                  <option value="3">Cartagena</option>
                  <option value="4">Alemana automotriz</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </InputGroup>

          <InputGroup className="mb-3">

            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Sede del computador"
            >
              <Form.Select id="tipo_equipo" name="id_sede" aria-label="Floating label select example">
                <option>{info[0]?.Tipo_equipo}</option>
                <option value="Impresora">Impresora</option>
                <option value="Celulares">Celulares</option>
                <option value="Memoria">Memoria</option>
              </Form.Select>
            </FloatingLabel>

          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Marca del computador</InputGroup.Text>
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="marca"
              defaultValue={info[0]?.marca}
            />
          </InputGroup>


          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Serial</InputGroup.Text>
            <Form.Control
              id="serial"
              defaultValue={info[0]?.serial}
            />
            <InputGroup.Text id="basic-addon1">Modelo</InputGroup.Text>
            <Form.Control
              id="modelo"
              defaultValue={info[0]?.modelo}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Grupo de trabajo</InputGroup.Text>
            <Form.Select id="lugar" aria-label="Default select example">
              <option>{info[0]?.lugar}</option>
              <option value="ADMINISTRACION">ADMINISTRACION</option>
              <option value="COMERCIAL">COMERCIAL</option>
              <option value="ALMACEN">ALMACEN</option>
              <option value="TALLER">TALLER</option>
              <option value="COLISION">COLISION</option>
              <option value="WEB">WEB</option>
              <option value="MERCADEO">MERCADEO</option>
            </Form.Select>
          </InputGroup>


          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Observacion</InputGroup.Text>
            <Form.Control defaultValue={info[0]?.observacion} id='observacion' name='observacion' />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Estado</InputGroup.Text>
            <Form.Select id="estado" name="estado" aria-label="Default select example">
              <option>{info[0]?.estado}</option>
              <option value="Funcionando">Funcionando</option>
              <option value="Dañado">Dañado</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">

            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Sede del computador"
            >
              <Form.Select id="propietario" name="propietario" aria-label="Floating label select example">
                <option>{info[0]?.propietario}</option>
                <option value="Fujiyama">Fujiyama</option>
                <option value="Arrendamiento">Arrendamiento</option>
              </Form.Select>
            </FloatingLabel>

          </InputGroup>

          <hr />
          <div className="d-grid gap-2">
            <Button onClick={() => Edit()} size="lg" variant="outline-success">Editar Equipo</Button>
          </div>

        </Modal.Body>
      </Modal>

    </Modal>
  );
}

export default Equiposvia40