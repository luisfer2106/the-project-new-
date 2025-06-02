import axios from "axios";

const API_URL = "/api/UserGamers/login"; // Proxy configurado en Vite evita el problema de CORS

export const fetchUserData = async (username, password) => {
  try {
    const body = {
      USERNAME: username,
      CONTRASEÑA_HASH: password,
    };

    const response = await axios.post(API_URL, body, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      withCredentials: true, // Útil si el backend usa autenticación con cookies
    });

    console.log("✅ Datos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("❌ Error en la API:", error.response.data);
    } else if (error.request) {
      console.error("❌ Error de conexión: No se recibió respuesta del servidor.");
    } else {
      console.error("❌ Error desconocido:", error.message);
    }
    throw error;
  }
};
