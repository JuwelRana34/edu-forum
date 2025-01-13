import axios from 'axios'

const SecureAxios = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true
})



export default SecureAxios