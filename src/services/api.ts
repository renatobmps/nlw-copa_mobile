import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://192.168.15.6:3333'
});
