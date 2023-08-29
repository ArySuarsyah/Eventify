import axios from 'axios';
// import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: 'https://fw15-backend-hazel.vercel.app',

    headers,
  });
  return instance;
};

export default http;
