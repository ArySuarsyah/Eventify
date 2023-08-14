import axios from 'axios';
// import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: 'https://ruby-buffalo-fez.cyclic.app',
    // baseURL: 'http://localhost:8888',

    headers,
  });
  return instance;
};

export default http;
