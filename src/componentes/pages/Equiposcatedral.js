import React, { useEffect, useState } from 'react'
import { Form, Card, Button, Modal, ButtonGroup, FloatingLabel, InputGroup, Col, ListGroup, CardGroup } from 'react-bootstrap'
import { BsBootstrapReboot, BsPlusCircleDotted, BsArrowRepeat, BsTrash, BsFileEarmarkPdf, BsFillPersonPlusFill, BsFillTrash2Fill, BsInfoCircle } from "react-icons/bs";

const Equiposcatedral = () => {

  const url = 'http://autosfujiyama.com:3050/equipos'
  const urlimp = 'http://autosfujiyama.com:3050/equiposimp'
  const [equipos, setEquipos] = useState([]);
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
    Equipos();
    Impcel();
  }, [])

  //modales
  const [eliminar, setEliminar] = useState(false);
  const [actualizar, setActualizar] = useState(false)
  const [eliminados, setEliminados] = React.useState(false);
  const [pdf, setPdf] = React.useState(false);
  const [registrar, setRegistrar] = React.useState(false);
  const buscare = (e) => {
    setBuscar(e.target.value)
    //console.log(e.target.value)
  }

  let impresora, celular, memoria = [];

  if (impcel.message === "no hay resultados") {
  } else {
    impresora = impcel.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Impresora" && datos.eliminado === 0)
    memoria = impcel.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Memoria" && datos.eliminado === 0)
    celular = impcel.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Celulares" && datos.eliminado === 0)
  }

  const Agregar = () => {
    window.location.replace('/Agregar');
  }

  //count grupo de trabajo
  let comercial, almacen, taller, colision, administracion = 0
  comercial = equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0 && datos.grupo_trabajo === "COMERCIAL")
  almacen = equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0 && datos.grupo_trabajo === "ALMACEN")
  taller = equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0 && datos.grupo_trabajo === "TALLER")
  colision = equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0 && datos.grupo_trabajo === "COLISION")
  administracion = equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0 && datos.grupo_trabajo === "ADMINISTRACION")
  //

  let array_sede, buscar_sede, buscar_impresora, buscar_celular = []
  array_sede = equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0)

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

    const response = await fetch(`http://autosfujiyama.com:3050/equipos/${id}`);
    const data = await response.json();
    setInfo(data)
  }

  return (
    <div style={{ background: 'linear-gradient( #90A4AE, #A9CCE3 , #90A4AE)' }} ><br />

      <div className='container'>

        <h1 align='center'>Equipos de computo en Catedral </h1><br />
        <div align='center'>
          <Card>
            <Card.Header><h3>Funciones</h3></Card.Header>
            <Card.Body>
              <Card.Title>Elija alguna de las opciones</Card.Title>

              <ButtonGroup size="lg" className="mb-2">
                <Button variant="success" onClick={() => Agregar()}>Agregar <BsPlusCircleDotted style={{ fontSize: '25px', color: "white" }} /> </Button>
                <Button variant="warning" onClick={() => setActualizar(true)}>Actualizar <BsArrowRepeat style={{ fontSize: '25px', color: "black" }} /></Button>
                <Button variant="danger" onClick={() => setEliminar(true)}>Eliminar <BsTrash style={{ fontSize: '25px', color: "white" }} /></Button>
              </ButtonGroup>

            </Card.Body>
          </Card>
        </div>  <br />
        <h3>Buscador</h3>

        <Form.Control onChange={buscare} size="lg" type="text" placeholder="Buscar computadores via 40" /><hr />

        <CardGroup>
          <Card>
            <Card.Header><h3>Equipos</h3></Card.Header>
            <Card.Body>
              <Card.Title>La cantidad de computadores es de: {array_sede.length}</Card.Title><hr />
              <Card.Title>
                Grupo de trabajo:
              </Card.Title>
              <div align="center">
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
                </CardGroup>

                <CardGroup>
                  <Card>
                    <Card.Body>
                      <h5>Colision: {colision.length}</h5>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <h5>Taller: {taller.length}</h5>
                    </Card.Body>
                  </Card>
                </CardGroup>
                <Card>
                  <Card.Body>
                    <h5>Administracion: {administracion.length}</h5>
                  </Card.Body>
                </Card>
              </div><hr />

              {
                !buscar_sede
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <div>
                    {
                      buscar_sede.map(p => (
                        <ListGroup key={p.id} className="mb-3">
                          <div>
                            <div style={{ float: 'left' }}>
                              <InputGroup.Text >{p.nombre}</InputGroup.Text>
                            </div>
                            <div align="right">
                              <Button
                                className="info"
                                style={{ borderColor: "white", borderRadius: "50%", background: "transparent", fontSize: "10px" }}
                                onClick={() => { Informacion(p.id); setInformacion(true) }}>
                                <BsInfoCircle style={{ fontSize: '18px', color: "black" }} />
                              </Button>
                            </div>
                          </div>
                        </ListGroup>
                      ))
                    }
                  </div>
              }

            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header><h3>Impresoras</h3></Card.Header>
            <Card.Body>
              <Card.Title>La cantidad de Impresoras es de: {impresora.length}</Card.Title>
              {
                !buscar_impresora
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <ul>

                    {
                      buscar_impresora.map(p => (

                        <li key={p.id}>
                          <ListGroup variant="flush">
                            <ListGroup.Item>{p.marca} - {p.lugar} </ListGroup.Item>

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
            <Card.Header><h3>Celulares</h3></Card.Header>
            <Card.Body>
              <Card.Title>La cantidad de Celulares es de: {celular.length}</Card.Title>
              {
                !buscar_celular
                  ?
                  <h1 align='center'>Cargando</h1>
                  :
                  <ul>

                    {
                      buscar_celular.map(p => (

                        <li key={p.id}>
                          <ListGroup variant="flush">
                            <ListGroup.Item>{p.marca} - {p.lugar} </ListGroup.Item>

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
                          <ListGroup variant="flush">
                            <ListGroup.Item>{p.marca} - {p.observacion} </ListGroup.Item>

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
        </CardGroup><br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button variant="primary" onClick={() => setPdf(true)}>
              Imprimir PDF <BsFileEarmarkPdf style={{ fontSize: '30px', color: "white" }} />
            </Button>
          </div>
          <div >
            <Button variant="danger" onClick={() => setEliminados(true)}>
              Equipos Eliminados <BsFillTrash2Fill style={{ fontSize: '30px', color: "white" }} />
            </Button>
          </div>
          <div>
            <Button variant="dark" onClick={() => setRegistrar(true)}>
              Registrar <BsFillPersonPlusFill style={{ fontSize: "30px", color: "white" }} />
            </Button>
          </div>

        </div>

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
            Estado : <strong>{info[0]?.estado} </strong><hr />

            <div className="d-grid gap-2">
              <Button onClick={() => setActualizar(true)} variant="warning">Editar computador</Button>{' '}
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
          show={actualizar}
          onHide={() => setActualizar(false)}
          equipos={equipos}
          equiposimp={impcel}
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

      </div>
    </div>
  )
}

function Eliminar(props) {

  const [arrayall, setArrayall] = useState([]);

  const actualizar = async () => {

    const mostrar = document.getElementById("eliminar").value


    if (mostrar === "1") {

      setArrayall(props.equipos.filter(dato => dato.eliminado === 0 && dato.id_sede === 1))
    } else if (mostrar === "2") {

      setArrayall(props.equiposimp.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Impresora" && datos.eliminado === 0))
    } else if (mostrar === "3") {

      setArrayall(props.equiposimp.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Celulares" && datos.eliminado === 0))
    } else if (mostrar === "4") {

      setArrayall(props.equiposimp.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Memoria" && datos.eliminado === 0))
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
      centered
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

                    <option key={p.id} value={p.id} >{p.nombre} - {p.responsable} - {p.Tipo_equipo}</option>

                  ))
                }
              </Form.Select>

          }
        </FloatingLabel><br />

        <div className="d-grid gap-2">
          <Button onClick={() => Delete()} size="lg" variant="outline-danger">ELIMINAR</Button>
        </div>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Actualizar(props) {

  const [equipobuscar, setEquipobuscar] = useState([]);
  const [id, setId] = useState("")

  const Buscar = async () => {

    const id = document.getElementById("id").value

    setId(id)

    const response = await fetch(`http://autosfujiyama.com:3050/equipos/${id}`);
    const data = await response.json();
    //console.log(data)
    setEquipobuscar(data)

  }

  const Actualizar_e = async () => {
    const id_sede = document.getElementById("id_sede").value
    const marca = document.getElementById("marca").value
    const serial = document.getElementById("serial").value
    const modelo = document.getElementById("modelo").value
    const color = document.getElementById("color").value
    const alm = document.getElementById("almacenamiento").value
    let almacenamiento = (!alm) ? equipobuscar[0]?.almacenamiento : alm;
    const tipo_almacenamiento = document.getElementById("tipo_almacenamiento").value
    const ram = document.getElementById("ram").value
    const tipo_ram = document.getElementById("tipo_ram").value
    const pro = document.getElementById("procesador").value
    let procesador = (!pro) ? equipobuscar[0]?.procesador : pro;
    const cargo = document.getElementById("cargo").value
    const estado = document.getElementById("estado").value
    const grupo_trabajo = document.getElementById("grupo_trabajo").value
    const nom = document.getElementById("nombre").value
    let nombre = (!nom) ? equipobuscar[0]?.nombre : nom;
    const user = document.getElementById("username").value
    let username = (!user) ? equipobuscar[0]?.responsable : user;
    const obs = document.getElementById("observacion").value
    let observacion = (!obs) ? equipobuscar[0]?.observacion : obs;

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

  let equipo_filter = []
  equipo_filter = props.equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0)

  const [modificar, setModificar] = React.useState(false);
  const [programa, setPrograma] = React.useState(false);

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
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
      </Modal.Header>
      <Modal.Body>
        <h4>Coloque la id del equipo que desea Actualizar</h4>
        {
          !equipo_filter
            ?
            <h1 align='center'>Cargando</h1>
            :
            <div align="center">
              <InputGroup className="mb-3">
                <Form.Select onChange={() => Buscar()} id="id" name="id" aria-label="Default select example">
                  <option ></option>
                  {
                    equipo_filter.map(p => (
                      <option key={p.id} value={p.id} >{p.nombre} - {p.responsable}</option>
                    ))
                  }
                </Form.Select>
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
                placeholder="Marca"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="marca"
                name="marca"
                value={equipobuscar[0]?.marca}
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
                value={equipobuscar[0]?.serial}
              />
              <InputGroup.Text id="basic-addon1">Modelo</InputGroup.Text>
              <Form.Control
                placeholder="Modelo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="modelo"
                name="modelo"
                value={equipobuscar[0]?.modelo}
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
                value={equipobuscar[0]?.color}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Almacenamiento</InputGroup.Text>
              <Form.Control
                placeholder={equipobuscar[0]?.almacenamiento}
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="almacenamiento"
                name="almacenamiento"
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
                placeholder={equipobuscar[0]?.procesador}
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="procesador"
                name="procesador"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Nombre Pc</InputGroup.Text>
              <Form.Control
                placeholder={equipobuscar[0]?.nombre}
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="nombre"
                name="nombre"
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
              <Form.Control placeholder={equipobuscar[0]?.responsable} id='username' name='username' />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Observacion</InputGroup.Text>
              <Form.Control placeholder={equipobuscar[0]?.observacion} id='observacion' name='observacion' />
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

    const response = await fetch(`http://autosfujiyama.com:3050/equipos/${id}`);
    const data = await response.json();
    //console.log(data)
    setEquipobuscar(data)

  }
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  let fechahora = fecha + " " + hora
  // console.log(fechahora)

  let equipo_filter = []
  equipo_filter = props.equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 0)

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
  array_eliminado = props.equipos.filter(datos => datos.id_sede === 1 && datos.eliminado === 1)

  let array_imp, array_cel, memoria = []

  if (props.equiposimp.message === "no hay resultados") {
  } else {
    array_imp = props.equiposimp.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Impresora" && datos.eliminado === 1)

    array_cel = props.equiposimp.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Celulares" && datos.eliminado === 1)

    memoria = props.equiposimp.filter((datos) => datos.id_sede === 1 && datos.Tipo_equipo === "Memoria" && datos.eliminado === 1)
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

  // const Equipos = async () => {
  //   const response = await fetch(url)
  //   const responseJSON = await response.json()
  //   setEquipos(responseJSON)
  //   //console.log(responseJSON)
  // }
  let array_equipo = props.equipos.filter((datos) => datos.id_sede === 1 && datos.eliminado === 0)

  // useEffect(() => {
  //   Equipos();
  // }, [])

  const Buscar = async () => {

    const id = document.getElementById("id").value

    const response = await fetch(`http://autosfujiyama.com:3050/equipos/${id}`);
    const data = await response.json();
    setEquipobuscar(data)
    localStorage.setItem("equipo", JSON.stringify(data));

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
    console.log(data)
    if (data.message === "Usuario no encontrado") {
      alert("Usuario no encontrado")
    } else {
      localStorage.setItem("users", JSON.stringify(data));
      alert("Usuario:" + data[0]?.nombre + " " + data[0]?.apellido)
      window.location.replace('/DocumentoPDF');
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
        <Button variant="info" onClick={() => Usuario()}>
          Formato PDF
        </Button>
      </Modal.Footer>
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

    console.log(nombre, apellido, apellidouser)
    console.log(username)
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
      method: 'POST',
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
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            placeholder={username}
            aria-label="Username"
            aria-describedby="basic-addon1"
            disabled
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

        <h5>correo y contraseña para entrar a la pagina</h5>
        <InputGroup className="mb-3">
          <FloatingLabel label="Correo">
            <Form.Control type="email" placeholder="Enter email" id="correo" name="correo" />
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-3">
          <FloatingLabel label="Contraseña">

            <Form.Control
              type="password"
              placeholder="Contraseña"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="password"
              name="password"
            />
          </FloatingLabel>

          <FloatingLabel label="Confirme contraseña">
            <Form.Control
              type="password"
              placeholder="Confirme contraseña"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="password2"
              name="password2"
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

        <div className="d-grid gap-2">
          <Button onClick={() => Agregar()} size="lg" variant="outline-success">Agregar Usuario</Button>{' '}
        </div>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Equiposcatedral