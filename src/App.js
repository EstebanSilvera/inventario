import Principal from './componentes/pages/Principal';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './componentes/menu/NavBar';
import Login from './componentes/pages/Login';
import Footer from './componentes/menu/Footer';
import Equiposvia40 from './componentes/pages/Equiposvia40';
import Equiposcatedral from './componentes/pages/Equiposcatedral';
import Equiposcartagena from './componentes/pages/Equiposcartagena';
import EquiposAlemana from './componentes/pages/EquiposAlemana';
import Agregar from './componentes/crud/Agregar';
import ProgramaE from './componentes/crud/ProgramaE';
import Agregarimp from './componentes/crud/Agregarimp';
import { Protection } from './componentes/protection/Protection';
import { ProtectionUser } from './componentes/protection/ProtectionUser';
import DocumentoAlePDF from './componentes/document/DocumentoAlePDF';
import Bodega from './componentes/pages/Bodega';
import PrincipalUser from './componentes/pages/PrincipalUser';
import { PDFViewer } from '@react-pdf/renderer';
import './componentes/style/style.css';

function App() {

  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route index element={
            (sessionStorage.getItem("TOKEN")) ? <NavBar /> : <Login />} />

          <Route path='/' element={<NavBar />}>

            <Route path='Principal' element={
              //<Protection >
              <Principal />
              //</Protection>
            }></Route>

            <Route path='PrincipalUser' element={
              //<ProtectionUser >
              <PrincipalUser />
              //</ProtectionUser >  
            }></Route>

            <Route path='Agregar' element={
              //<Protection >
              <Agregar />
              //</Protection>

            }></Route>

            <Route path='Bodega' element={
              // <Protection >
              <Bodega />
              //</Protection>
            }></Route>

            <Route path='DocumentoAlePDF' element={
              //<Protection >
              <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <DocumentoAlePDF />
              </PDFViewer>
              //</Protection>
            }></Route>

            <Route path='Agregarimp' element={
              //<Protection >
              <Agregarimp />
              //</Protection>

            }></Route>
            <Route path='Programa' element={
              //<Protection >

                <ProgramaE />
              //</Protection>

            }></Route>
            <Route path='Equiposvia40' element={
              //<Protection >
                <Equiposvia40 />
              //</Protection>

            }></Route>
            <Route path='Equiposcatedral' element={
              //<Protection >

                <Equiposcatedral />

              //</Protection>

            }></Route>
            <Route path='Equiposcartagena' element={
              //<Protection >
                <Equiposcartagena />

              //</Protection>

            }></Route>
            <Route path='EquiposAlemana' element={
              //<Protection >
                <EquiposAlemana />

              //</Protection>

            }></Route>
          </Route>

        </Routes>
      </BrowserRouter>

      <Footer />

    </div>
  );
}

export default App;
