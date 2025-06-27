import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const idRol = parseInt(localStorage.getItem("id_rol"));

  if (idRol === 1) {
    return children; // ✅ Usuario válido
  } else {
    return <Navigate to="/login" replace />; // 🚫 No hay sesión
  }
};

export default PrivateRoute;
