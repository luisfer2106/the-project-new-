import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const idRol = parseInt(localStorage.getItem("id_rol"));
    if (idRol !== 1) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("id_rol");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Hola, bienvenido administrador! 👋</h1>
      <p style={styles.subtitle}>Aquí puedes gestionar los productos de la tienda.</p>

      <div style={styles.actions}>
        <button style={styles.button}>Agregar producto</button>
        <button style={styles.button}>Editar producto</button>
        <button style={styles.button}>Eliminar producto</button>
        <button style={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    transition: "0.3s",
  },
  logoutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    borderRadius: "5px",
    transition: "0.3s",
  },
};

export default AdminProduct;
