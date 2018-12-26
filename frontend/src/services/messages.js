import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/messages'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = (id, userId) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = axios.delete(baseUrl + '/' + id, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, remove }