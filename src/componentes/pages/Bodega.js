import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Popover, OverlayTrigger, InputGroup, Form, Modal, FloatingLabel, Spinner } from 'react-bootstrap'
import { AiOutlineEdit, AiOutlineFileAdd, AiOutlineDelete } from "react-icons/ai";

const Bodega = () => {

    const [bodega, setBodega] = useState([])
    const [articulo, setArticulo] = useState("")

    const [cantidad, setCantidad] = useState("")
    const [id, setId] = useState("")
    const [marca, setMarca] = useState("")
    const [nombre, setNombre] = useState("")
    const [sede, setSede] = useState("")

    useEffect(() => {
        axios.get("http://autosfujiyama.com:3050/bodega")
            .then((response) => {
                setBodega(response.data)
            })
    }, [])

    const Editar = () => {

        const cant = document.getElementById("cantidad").value
        let cant1 = (!cant) ? cantidad : cant;
        const mar = document.getElementById("marca").value
        let mar1 = (!mar) ? marca : mar;
        const nom = document.getElementById("nombre").value
        let nom1 = (!nom) ? nombre : nom;
        const id_sede = document.getElementById("id_sede").value
        let id_sede1 = (!id_sede) ? sede : id_sede;

        axios.put("http://autosfujiyama.com:3050/bodega", {
            id: id,
            cantidad: cant1,
            marca: mar1,
            nombre: nom1,
            id_sede: id_sede1,
        })
            .then((response) => {
                alert(response.data.message)
                window.location.reload()
            })
    }

    const eliminar = async (id) => {

        const opcion = window.confirm("¿Esta seguro que desea eliminar este componente?; \n Si es eliminado tendra que volverlo a agregar");

        if (opcion === true) {
            console.log(id)

            const request = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                })
            };

            await fetch("http://autosfujiyama.com:3050/bodega", request)
                .then((response) => response.json())
                .then((data) => alert(data.message))
            window.location.reload()
        }

    }

    const [bodegaBuscar, setBodegaBuscar] = useState([])

    const Sede = () => {

        const sede = document.getElementById("sede").value

        let bod = bodega.filter(response => response.id_sede === parseInt(sede))

        setBodegaBuscar(bod)

    }

    const buscara = (e) => {
        setArticulo(e.target.value)
        //console.log(e.target.value)
    }
    let bodegaArticulo = []
    if (!articulo) {
        bodegaArticulo = bodegaBuscar
    } else {
        bodegaArticulo = bodegaBuscar.filter((response) => response.nombre.toLowerCase().includes(articulo))
    }

    const [agregar, setAgregar] = React.useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Cambiar la cantidad del producto</Popover.Header>
            <Popover.Body>

                <InputGroup className="mb-3">
                    <Form.Select aria-label="Default select example" id="id_sede">
                        <option>{sede}</option>
                        <option value="1">Catedral</option>
                        <option value="2">Via 40</option>
                        <option value="3">Cartagena</option>
                        <option value="4">alemana</option>
                    </Form.Select>
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        id="nombre"
                        placeholder={nombre}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        id="marca"
                        placeholder={marca}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="number"
                        id="cantidad"
                        placeholder={cantidad}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={() => Editar()} variant="outline-secondary" id="button-addon2">
                        Editar
                    </Button>
                </InputGroup>

            </Popover.Body>
        </Popover>
    );

    return (
        <div>

            <div className="container"><br />
                <h2 align="center" >Bodega de complementos de computadores</h2><hr />

                <div style={{ width: "120px" }}>
                    <Form.Select onChange={() => Sede()} id="sede" >
                        <option></option>
                        <option value="1">Catedral</option>
                        <option value="2">Via 40</option>
                        <option value="3">Cartagena</option>
                        <option value="4">Alemana</option>
                    </Form.Select>
                </div><hr />

                <Form.Control style={{ borderColor: "lightblue" }} onChange={buscara} size="lg" type="text" placeholder="Buscar articulo" />

                <Table striped bordered hover>
                    <thead align='center'>
                        <tr>
                            <th>#</th>
                            <th>Sede</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Cantidad</th>
                            <th>Operacion</th>
                        </tr>
                    </thead>

                    {
                        bodegaBuscar.length === 0
                            ?
                            <tbody align='center'>
                                <tr>
                                    <td><Spinner animation="grow" /></td>
                                    <td><Spinner animation="grow" /></td>
                                    <td><Spinner animation="grow" /></td>
                                    <td><Spinner animation="grow" /></td>
                                    <td><Spinner animation="grow" /></td>
                                    <td><Spinner animation="grow" /></td>
                                </tr>
                            </tbody>
                            :
                            <tbody align='center'>
                                {
                                    bodegaArticulo.map(p => (

                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{
                                                (p.id_sede === 1) ? "catedral" :
                                                    (p.id_sede === 2) ? "Via 40" :
                                                        (p.id_sede === 3) ? "Cartagena" :
                                                            (p.id_sede === 4) ? "Alemana" :
                                                                "Esta sede no existe"
                                            }</td>
                                            <td>{p.nombre}</td>
                                            <td>{p.marca}</td>
                                            <td>{p.cantidad}</td>
                                            <td>
                                                <Button variant="outline-success" onClick={() => setAgregar(true)}>
                                                    <AiOutlineFileAdd />
                                                </Button>
                                                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                                    <Button onClick={() => {
                                                        setCantidad(p.cantidad);
                                                        setId(p.id);
                                                        setMarca(p.marca);
                                                        setNombre(p.nombre);
                                                        setSede(p.id_sede);
                                                    }}
                                                        variant="outline-warning"><AiOutlineEdit /></Button>
                                                </OverlayTrigger>
                                                <Button onClick={() => eliminar(p.id)} variant="outline-danger" ><AiOutlineDelete /></Button>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                    }

                </Table>
            </div>

            <Agregar
                show={agregar}
                onHide={() => setAgregar(false)}
            />
        </div>
    )
}

function Agregar(props) {

    const agregar = async () => {
        const id_sede = document.getElementById("id_sede").value
        const nombre = document.getElementById("nombre").value
        const marca = document.getElementById("marca").value
        const cantidad = document.getElementById("cantidad").value

        //alert(id_sede + " " + nombre + " " + marca + " " + cantidad)

        axios.post("http://autosfujiyama.com:3050/bodega", {
            id_sede: id_sede,
            nombre: nombre,
            marca: marca,
            cantidad: cantidad
        }).then((response) => {
            alert(response.data.message)
            window.location.reload()
        })
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar a bodega
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Sede"
                    className="mb-3"
                >
                    <Form.Select id="id_sede" name="id_sede" aria-label="Floating label select example">
                        <option></option>
                        <option value="1">Catedral</option>
                        <option value="2">Via 40</option>
                        <option value="3">Cartagena</option>
                        <option value="4">Alemana automotriz</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                    label="Nombre"
                    className="mb-3"
                >
                    <Form.Control type="text" id="nombre" placeholder="Leave a comment here" />
                </FloatingLabel>
                <FloatingLabel
                    label="Marca"
                    className="mb-3"
                >
                    <Form.Control type="text" id="marca" placeholder="Leave a comment here" />
                </FloatingLabel>
                <FloatingLabel
                    label="Cantidad"
                    className="mb-3"
                >
                    <Form.Control type="number" id="cantidad" placeholder="Leave a comment here" />
                </FloatingLabel>
                <div className="d-grid gap-2">
                    <Button onClick={() => agregar()} variant="outline-success">Agregar</Button>{' '}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Bodega