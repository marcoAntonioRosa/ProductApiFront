import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://localhost:7160/api/Product'
})

