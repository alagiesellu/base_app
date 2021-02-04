import qs from 'qs'
import axios from 'axios'
import Jsona from 'jsona'
import app from '@/store/modules/app'
import { jsonParse } from 'jsona/lib/utils'

const baseUrl = process.env.VUE_APP_API_URL

axios.interceptors.request.use(
  request => {
    if (!request.headers.do_not_load) app.actions.toggle_loading(true)
    return request
  },
)

axios.interceptors.response.use(
  response => {
    if (!response.config.headers.do_not_load) app.actions.toggle_loading(false)
    if (response.status === process.env.VUE_APP_SUCCESS_RESPONSE_CODE) app.state.success_notification = response.data
    return response
  },
  error => {
    if (error.response.status === 401) {
      if (window.location.pathname !== process.env.VUE_APP_LOGIN_URL) {
        window.location.pathname = process.env.VUE_APP_LOGIN_URL
      }
    } else if (error.response.status * 1 === process.env.VUE_APP_ERROR_RESPONSE_CODE * 1) {
      for (const messages of jsonParse(error.response.data.message)) {
        for (const err of messages) {
          app.state.errors_notification.push(err)
        }
      }
    } else {
      app.state.errors_notification.push(error.response.statusText)
    }
    return Promise.reject(error)
  },
)

function loadBearerToken () {
  axios.defaults.headers.common.Authorization = window.bearer_token
}

function axiosGet (url, params = {}) {
  axios.defaults.headers.common.Authorization = window.bearer_token
  return axios.get(`${baseUrl}/${url}`, params)
    .then(response => {
      return response
    })
}

function axiosPost (url, record = {}) {
  axios.defaults.headers.common.Authorization = window.bearer_token
  return axios.post(`${baseUrl}/${url}`, record)
    .then(response => {
      return response
    })
}

function axiosPatch (url, record) {
  axios.defaults.headers.common.Authorization = window.bearer_token
  return axios.patch(`${baseUrl}/${url}`, record)
    .then(response => {
      return response
    })
}

function axiosDelete (url) {
  axios.defaults.headers.common.Authorization = window.bearer_token
  return axios.delete(`${baseUrl}/${url}`)
    .then(response => {
      return response
    })
}

function axiosUpload (url, image) {
  axios.defaults.headers.common.Authorization = window.bearer_token
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
  loadBearerToken,
}
