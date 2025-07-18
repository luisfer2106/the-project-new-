// ✅ Servicio: ServiceProduct.js
import axios from "axios";

//#region API: obtener productos
const API_URL = "/api/UserGamers/productos"; // Usa el proxy de Vite

export const fetchProductData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Accept: "application/json"
      },
      withCredentials: true
    });

    console.log("📦 Productos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    return [];
  }
};
//#endregion END function fetchProductData
