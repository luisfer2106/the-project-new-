import axios from "axios";

const API_URL = "/api/UserGamers/api/users/register";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      withCredentials: true
    });

    console.log("✅ Usuario registrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.message);
    throw error;
  }
};
