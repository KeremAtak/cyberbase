
import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post('http://localhost:3001/api/login', credentials)
  return response.data
}

const register = async (credentials) => {
  const response = await axios.post('http://localhost:3001/api/users', credentials)
  return response.data
}

export default { login, register }