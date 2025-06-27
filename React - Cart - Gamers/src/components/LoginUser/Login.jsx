import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com"; // Importamos EmailJS
import "../../css/login.css";
import { FaUser, FaExclamationCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaSignInAlt } from "react-icons/fa";
import VideoFondo from "../VideoFondo/VideoFondo";
import { fetchUserData } from './ServiceAdmin';
import { useNavigate } from "react-router-dom";


function Login() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate(); // ✅ Añade esto justo aquí

  //#region MÉTODO-REGISTRAR: Para enivar parametros a api registrar
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registro:", fullName, lastName, idNumber, email, phone);
  };
//#endregion

  //#region MÉTODO-ACTUALIZAR: Para actualizar los los registros en mi api USERNAME
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    console.log("Recuperar contraseña para:", forgotEmail);

    emailjs.send(
    "service_nmd4eoo",  // Service ID
    "template_iznbf9p",  // Template ID
    { email: forgotEmail }, // Aquí se pasa el correo ingresado en el formulario
    "175MgSp03ESZTSnXE"  // Public Key
    )
    .then((response) => {
      console.log("Correo enviado correctamente", response);
      Swal.fire({
      position: "top-start",
      icon: "success",
      title: "<h3 style='font-size: 14px;'>Correo enviado correctamente</h3>",
      showConfirmButton: false,
      timer: 1700,
      width: "200px", // Ajusta el ancho de la alerta
      padding: "13px", // Reduce el espacio interno
      customClass: {
        popup: "swal-compact" // Modificación directa del tamaño del cuadro
      }
    });


    })
    .catch((error) => {
      console.error("Error al enviar el correo", error);
    });
  };
  //#endregion

  //#region MÉTODO: Para recibir y enviar parametros a mi service / LOGIN
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const data = await fetchUserData(username, password);
        console.log("Datos obtenidos:", data);

        if (data.success) {
          localStorage.setItem("id_rol", data.id_rol); // ✅ Guarda el rol para la sesión

          if (data.id_rol === 1) {
            navigate("/admin-product");
          } else {
            alert("Acceso denegado: no eres administrador.");
          }
        } else {
          alert(data.message || "Error de autenticación");
        }
      } catch (error) {
        console.error(
          "Error al consumir la API:",
          error.response ? error.response.data : error.message
        );
      }
    };
  //#endregion

  return (
    <div className="login-container flex justify-center items-center h-screen">
      
        {/* Agregamos el fondo de video */}
    <VideoFondo />
  
      <AnimatePresence mode="wait">
        {!showRegisterForm && !showForgotPasswordForm ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded shadow-lg w-80"
            onSubmit={handleSubmit}
          >
            {/* Mensaje de bienvenida */}
            <p className="text-center text-gray-600 text-sm mb-2">
              ¡Bienvenido!
               Ingrese sus datos para iniciar sesión.
            </p>

            <FaSignInAlt className="text-4xl text-blue-500 mb-4" />

            <hr className="w-full border-gray-300 mb-4" />

            <br/>

                <br/>

                    <br/>

            <h2 className="text-center text-xl mb-4">Iniciar sesión</h2>

            <div className="flex flex-col w-full mb-3">
              <label htmlFor="user" className="text-left text-sm font-semibold">Usuario</label>
              <input type="text" className="w-full p-2 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="flex flex-col w-full mb-3">
              <label htmlFor="password" className="text-left text-sm font-semibold">Contraseña</label>
              <input type="password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Ingresar</button>

            <div className="text-center mt-4">
            <button
                  type="button" // 🔒 Evita enviar el form
                  onClick={() => setShowRegisterForm(true)}
                  className="register-btn text-blue-500 hover:underline flex items-center gap-2"
                >
                  <FaUser /> Registrarse
                </button>

                <button
                  type="button" // 🔒 Evita enviar el form
                  onClick={() => setShowForgotPasswordForm(true)}
                  className="forgot-password text-gray-500 hover:underline mt-2 flex items-center gap-2"
                >
                  <FaExclamationCircle /> ¿Olvidaste tu contraseña?
                </button>
            </div>
          </motion.form>

        ) : null}

        {showRegisterForm && (
          <motion.form
            key="register"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="register-form bg-white p-6 rounded shadow-lg w-80"
            onSubmit={handleRegisterSubmit}
          >
            <h2 className="text-center text-xl mb-4">Registro de Usuario</h2>

            <input type="text" placeholder="Nombres" className="w-full p-2 mb-3 border rounded" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="text" placeholder="Apellidos" className="w-full p-2 mb-3 border rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="Cédula o RIF" className="w-full p-2 mb-3 border rounded" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            <input type="email" placeholder="Correo Electrónico" className="w-full p-2 mb-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" placeholder="Número de Teléfono" className="w-full p-2 mb-3 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Registrar</button>
            <button onClick={() => setShowRegisterForm(false)} className="w-full bg-red-500 text-white p-2 rounded mt-2">Cancelar</button>
          </motion.form>
        )}

        {showForgotPasswordForm && (
          <motion.form
            key="forgot"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded shadow-lg w-80"
            onSubmit={handleForgotSubmit} // Este evento solo se activará al presionar "Enviar"
          >
            <h2 className="text-center text-xl mb-4">Recuperar contraseña</h2>

            <input type="email" placeholder="Correo Electrónico" className="w-full p-2 mb-3 border rounded" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Enviar</button>
            <button type="button" onClick={() => setShowForgotPasswordForm(false)} className="w-full bg-red-500 text-white p-2 rounded mt-2">Cancelar</button>
          </motion.form>

        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
