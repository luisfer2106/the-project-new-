import React from "react";

const AdminProduct = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Hola, bienvenido administrador! 👋</h1>
      <p style={styles.subtitle}>Aquí puedes gestionar los productos de la tienda.</p>
      
      <div style={styles.actions}>
        <button style={styles.button}>Agregar producto</button>
        <button style={styles.button}>Editar producto</button>
        <button style={styles.button}>Eliminar producto</button>
      </div>
    </div>
  );
};

// 📌 Estilos para mejorar la apariencia
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
};

// 📌 Exportación del componente
export default AdminProduct;
