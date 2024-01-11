import { Col, Button, Row, Container, Card, Form, FloatingLabel, InputGroup } from "react-bootstrap";
import axios from 'axios';
import gif from '../imagen/login.jpeg'
import fondo from '../imagen/fondo.jpg'
import { BsFillPersonFill, BsKey, BsFolder } from "react-icons/bs"

//import '../style/style.css'

const Login = () => {

  const url = "http://autosfujiyama.com:3050/login"

  // let request = {
  //   method: "POST",
  //   body: JSON.stringify(body),
  //   Headers: {
  //     "content-Type": "application/json",
  //   },
  // }

  const Sesion = () => {

    const correo = document.getElementById("email").value
    const password = document.getElementById("password").value

    if(correo === "esteban@gmail.com" & password === "123"){
      sessionStorage.setItem("USER", "administrador")
      window.location.href = "/Principal"
    }else{
      window.location.href = "/PrincipalUser"
    }

    // axios.post(url, {
    //   correo: correo,
    //   password: password,
    // }).then((response) => response.data)
    //   .then((response) => {
    //     if (response?.token && response.resultado[1] === "administrador") {

    //       sessionStorage.setItem("TOKEN", response.token)
    //       localStorage.setItem("@DMIÑ", JSON.stringify({ first: response.token.substring(0,21), second:response.token.substring(21,)}) )
    //       sessionStorage.setItem("USER", response.resultado[1])
    //       sessionStorage.setItem("INFORMACION", response.resultado[0])

    //       setTimeout(document.write("Bienvenido " + response.resultado[1]), 2000);

    //       window.location.href = "/Principal"

    //     } else if (response.token && response.resultado[0]?.tipo_user === "usuario" ) {

    //       sessionStorage.setItem("TOKEN", response.token)
    //       sessionStorage.setItem("USER", response.resultado[1])
    //       sessionStorage.setItem("INFORMACION", response.resultado[0])
    //       window.location.href = "/PrincipalUser"

    //     } else {
    //       window.location.href = "/"
    //     }
    //   })

    // if(sesion === true){
    //   window.location.href = '/Principal'
    // }
    //}
    // fetch(url, request).
    // then((response) => response.json()).
    // catch((error) => console.log(">>> error:", error)).
    // then((response) => console.log(response))
  }

  return (
    <div className='img-fluid' style={{ backgroundImage: `url(${fondo})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

      <Container><br />
        <div style={{ borderRadius: "50px" }}>

          <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "120px", marginBottom: "120px" }}>

            <div className="col-md-4 col-lg-4 d-none d-md-block">
              <img src={gif}
                alt="" className='sportage'
                style={{ borderRadius: "20px 80px", height: "500px", transition: "3s", marginLeft: "20px" }} />
            </div>
            <Col md={8} lg={6} xs={12}>
              <div>
                <Card style={{ borderRadius: '20px 80px', height: "500px", background: "linear-gradient(.63turn,transparent 5%, #CCD1D1 45%, #85C1E9 110%)", borderColor: "white" }}>
                  <Card.Body>
                    <div className="mt-md-4">

                      <h2 className="fw-bold mb-2 text-uppercase ">Inventario Automotores <BsFolder style={{ fontSize: "40px", color: "black" }} /></h2>

                      <hr />

                      <div style={{ margin: "30px" }}>
                        <h2 className="fw-bold mb-2 ">Session</h2><br />
                        <InputGroup style={{ boxShadow: "0px 0px 5px 1px #566573", borderRadius: "5px" }} className="mb-3">
                          <InputGroup.Text ><BsFillPersonFill style={{ fontSize: '30px', color: "black" }} /></InputGroup.Text>
                          <FloatingLabel label="Email address">
                            <Form.Control className='login' style={{ borderColor: "transparent" }} type="email" placeholder="name@example.com" id='email' />
                          </FloatingLabel>
                        </InputGroup>
                        <br />
                        <InputGroup style={{ boxShadow: "0px 0px 5px 1px #566573", borderRadius: "5px" }} className="mb-3">
                          <InputGroup.Text ><BsKey style={{ fontSize: '30px', color: "black" }} /></InputGroup.Text>
                          <FloatingLabel label="Password">
                            <Form.Control className='login' style={{ borderColor: "transparent" }} type="password" placeholder="Password" id='password' />
                          </FloatingLabel>
                        </InputGroup>
                        <br />
                        <div align="right">
                          <Button style={{ borderRadius: "20px", paddingLeft: "30px", paddingRight: "30px", boxShadow: "0px 0px 5px 1px black", fontSize: "20px", transition: "1s" }} size='lg' onClick={() => Sesion()} variant="outline-dark" type="submit">
                            Login
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Container > <br />

    </div >

  )
}

export default Login