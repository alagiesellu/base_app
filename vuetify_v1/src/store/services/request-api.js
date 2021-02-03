import qs from 'qs'
import axios from 'axios'
import Jsona from 'jsona'

const baseUrl = process.env.VUE_APP_API_URL
const jsona = new Jsona()

function axiosGet (url, params = {}) {
  return axios.get(`${baseUrl}/${url}`, params)
    .then(response => {
      return response
    })
}

function axiosPost (url, record) {
  return axios.post(`${baseUrl}/${url}`, record)
    .then(response => {
      return response
    })
}

function axiosPatch (url, record) {
  return axios.patch(`${baseUrl}/${url}`, record)
    .then(response => {
      return response
    })
}

function axiosDelete (url) {
  return axios.delete(`${baseUrl}/${url}`)
    .then(response => {
      return response
    })
}

function axiosUpload (url, image) {
  const formData = new FormData()
  formData.append('attachment', image)

  return axios.post(`${baseUrl}/${url}`, formData)
    .then(response => {
      return response
    })
}

export default {
  axiosGet,
  axiosPost,
  axiosPatch,
  axiosDelete,
  axiosUpload,
}
