import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('test' + baseUrl)
  return request.then(response => {
    console.log(response.data)
    return response.data
  })
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  return request.then(response => response.data)
}

const updateBlog = async(id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async(id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default {
  getAll,
  create,
  update,
  setToken,
  updateBlog,
  deleteBlog
}
