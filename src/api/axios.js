import axios from 'axios';

const baseURL = 'https://givbox.ru/givbox/';

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
