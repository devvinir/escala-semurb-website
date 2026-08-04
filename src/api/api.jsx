import axios from 'axios'
import.meta.env.VITE_API_URL

/*export const api = axios.create({
    baseURL:VITE_API_URL,
    timeout: 10000
})*/

export const api = axios.create({
    baseURL:'http://localhost:3000',
    timeout: 10000
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // ou AsyncStorage no React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
  //quando token expira - erro 401 = redirefciono para o login
    console.error('Erro 401: Não autorizado. Redirecionando para a página de login...');
    
    window.dispatchEvent(new Event('tokenExpired')); 
    // Dispara um evento global de logout
    //posso usar em outros componentes para saber que o token expirou
  }
  return Promise.reject(error);
  
});
export default api;