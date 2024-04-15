import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:1721',
  withCredentials: true
})

export default instance
