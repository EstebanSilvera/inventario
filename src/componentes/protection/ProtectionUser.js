import { Navigate } from "react-router-dom";


export const ProtectionUser = ({ children }) => {
    
    const authentication = sessionStorage.getItem("TOKEN");
    const user = sessionStorage.getItem("USER");
        
    if (authentication !== "" && user === "usuario" ) {
      return children
    }
      
    return <Navigate to="/" />
  }