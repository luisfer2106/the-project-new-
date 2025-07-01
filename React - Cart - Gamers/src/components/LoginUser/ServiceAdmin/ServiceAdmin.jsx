// ✅ Servicio: fetchUserData.js
import axios from "axios";

const API_URL = "/api/UserGamers/login"; // Proxy configurado en Vite evita CORS

export const fetchUserData = async (username, password) => {
  try {
    const body = {
      USERNAME: username,
      CONTRASENA_HASH: password, // 🛡️ Sin Ñ, asegúrate que coincida con el backend
    };

    const response = await axios.post(API_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log("✅ Datos obtenidos:", response.data);

    // 📦 Retorna también el id_rol
    if (response.data.message === "¡Logueado con éxito!") {
      return {
        success: true,
        message: response.data.message,
        id_rol: response.data.id_rol, // ← Aquí está el cambio clave
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error.response) {
      console.error("❌ Error en la API:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Error en la solicitud",
      };
    } else if (error.request) {
      console.error("❌ Error de conexión: No se recibió respuesta del servidor.");
      return {
        success: false,
        message: "No hay respuesta del servidor.",
      };
    } else {
      console.error("❌ Error desconocido:", error.message);
      return {
        success: false,
        message: "Ocurrió un error inesperado.",
      };
    }
  }
};

