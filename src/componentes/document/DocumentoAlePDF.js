import React from 'react'
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import picture from '../imagen/logo.jpg'

const DocumentoAlePDF = () => {

  var hoy = new Date();
  var fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  //console.log(fecha, hora)


  return (
    <Document>
      <Page size="A4">
        <View style={{marginTop:"50px"}}>
          <Text style={{ textAlign: "center", fontSize: "20pt" }}>Formato de entrega de equipo de computo</Text>
          <Image style={{ width: "200px", height: "100px", display: "block", margin: "auto" }} src={picture} ></Image>
        </View>

        <View style={{border:"1px solid #000", marginVertical:"10px", marginLeft:"430px", marginRight:"20px", fontSize:"10px", alignItems:"center"}}>
          <Text>Fecha de entrega: {fecha}</Text>
          <Text>Hora de entrega: {hora}</Text>
        </View>

        <View style={{marginLeft:"20px", marginRight:"20px", display:"flex", flexDirection:"row", textAlign:"center" }}>
          <Text style={{ fontSize:"12pt", border:"1px", width:"35%"}}>Nombre del trabajador</Text>
          <Text style={{ fontSize:"12pt", border:"1px", width:"30%"}}>No. de Identificacion</Text>
          <Text style={{ fontSize:"12pt", border:"1px", width:"35%"}}>Cargo</Text>
        </View>
        <View style={{marginLeft:"20px", marginRight:"20px", display:"flex", flexDirection:"row", textAlign:"center"}}>
          <Text style={{ fontSize:"12pt", border:"1px", width:"35%"}}></Text>
          <Text style={{ fontSize:"12pt", border:"1px", width:"30%"}}></Text>
          <Text style={{ fontSize:"12pt", border:"1px", width:"35%"}}></Text>
        </View>

        <View style={{ border: "1px solid #000", margin: "20px" }}>
          <Text style={{ textAlign: "center", fontSize: "15pt", border:"1px" }}>USO DEL EQUIPO DE COMPUTO</Text>
          <Text style={{ fontSize: "8pt" }}>Recibí de la Empresa AUTOMOTORES FUJIYAMA S.A. los elementos de protección personal relacionados
            en la ppresente planilla. Dicho elementos se encuentra en buenas condiciones y mi resposabilidad como trabajador es mantenerlo y cuidarlo
            para que cumpla su funcion de proteccion. Por tanto, me comprometo a usarlo para desempeñas las actividades al servicio de ésta empresa, de acuerdo
            con lo estipulado en el reglamento de higiene y seguiridad Industrial y las normas de seguiridad. Soy consciente del hecho que utilizar los elementos de protección
            personal protege mi salud y estoy enterado que el no acatar las normas y el no usar los elementos de protección personal y demás implementos
            de seguridad podrá acarrearme sanciones disciplinarías, de acuerdo con el reglamento interno de trabajo y el decreto Ley 1295 de 1994, Capitulo X
          </Text>
        </View>

        <View style={{ border: "1px solid #000", fontSize: "10pt", marginLeft:"20px", marginRight:"20px" }}>
          <Text style={{ textAlign: "center", border: "1px" }}>EL EQUIPO TIENE LAS SIGUIENTES CARACTERISTICAS</Text>
        </View>
        
        <View style={{ border: "1px solid #000", margin: "20px" }}>
          <Text style={{ height: "60px", fontSize: "12pt" }}> Firma y cedula del trabajador                                            Firma del funcionario quien entrega la dotacion</Text>

          <Text style={{ height: "30px", textIndent: "5px" }}> ________________                                         _________________</Text>
        </View>
        
      </Page>
    </Document>
  )
}

export default DocumentoAlePDF