// src/api/index.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4700', // твой NestJS
  withCredentials: true, // ВАЖНО — шлёт куки автоматически!
});

// Опционально: глобальный обработчик ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Можно редирект на логин
      console.log('Не авторизован');
    }
    return Promise.reject(error);
  },
);

export default api;