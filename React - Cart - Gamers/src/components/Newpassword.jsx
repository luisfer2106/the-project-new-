import React, { useState } from "react";
import { motion } from "framer-motion"; // Importamos Framer Motion
import "../css/NewPassword.css"; // Importamos los estilos

function Newpassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Nueva Contraseña:", newPassword);
    alert("Contraseña actualizada correctamente!");
  };

  return (
    <div className="new-password-container">
      <motion.form
        initial={{ x: -10 }} // Posición inicial del temblor
        animate={{ x: [ -10, 10, -10, 10, -5, 5, 0 ] }} // Secuencia de movimiento tipo "shake"
        transition={{ duration: 1 }} // Duración del temblor
        className="new-password-form"
        onSubmit={handleSubmit}
      >
        <h2>Cambiar Contraseña</h2>

        <input 
          type="password" 
          placeholder="Nueva Contraseña" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirmar Contraseña" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">Actualizar Contraseña</button>
      </motion.form>
    </div>
  );
}

export default Newpassword;
