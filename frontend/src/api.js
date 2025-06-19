import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.31.191:5000',
});

export default instance;
