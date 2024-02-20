// src/services/api.js
import axios from 'axios';

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2UVpKeGtYWHB4Vm12bGRNZXp2VG5LcERkcGJXdXkxWCIsImlhdCI6MTcwNjA1NDE0OTgxNywic3ViIjoiNjViMDUyMDViMmMyNzcwMDAyODViNzc0In0.YveDrfjTkgSfP62cjX9qTy50WXkvBn4Oz8_drncGfO0p5V3MPDx8uvS-eBuW4hd9NnDpHYEaqC_eB0ZBHqF0Lw';

const axiosInstance = axios.create({
  baseURL: 'https://eshop-deve.herokuapp.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

const api = {
  getOrdenes: () => axiosInstance.get('/orders'),
};

export default api;
