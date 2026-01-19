import axios from "axios";

// ✅ Nueva URL para registrar productos
const API_URL = "/api/UserGamers/api/products/register";

export const registerProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      withCredentials: true
    });

    console.log("✅ Producto registrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al registrar producto:", error.message);
    throw error;
  }
};
