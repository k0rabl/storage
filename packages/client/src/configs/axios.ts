import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
})


instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')

    if (config.headers?.['isToken']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  });
