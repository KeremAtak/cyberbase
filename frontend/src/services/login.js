
import axios from 'axios'
import protocol from '../Protocol'

const login = async (credentials) => {
  const response = await axios.post(protocol + '://localhost:3001/api/login', credentials)
  return response.data
}

const register = async (credentials) => {
  const response = await axios.post(protocol + '://localhost:3001/api/users', credentials)
  return response.data
}

export default { login, register }