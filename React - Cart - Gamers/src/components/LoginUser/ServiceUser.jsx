import axios from 'axios';

const API_URL = 'http://localhost:8039/api/UserGamers';

export const fetchUserData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Datos obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
