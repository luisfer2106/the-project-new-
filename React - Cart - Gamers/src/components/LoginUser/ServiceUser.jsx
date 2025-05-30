import axios from 'axios';

const API_URL = 'http://localhost:8039/api/UserGamers/login';
          
export const fetchUserData = async (username, password) => {
  try {
    const body = {
      USERNAME: username,
      CONTRASEÑA_HASH: password
    };

    const response = await axios.post(API_URL, body); // Enviar datos en el cuerpo de la solicitud
    console.log("✅ Datos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};