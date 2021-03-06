// import qs from 'qs'
// import Jsona from 'jsona'
import axios from 'axios'
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
    if (response.status === process.env.VUE_APP_SUCCESS_RESPONSE_CODE * 1) app.state.success_notification = response.data
    return response
  },
  error => {
    if (!error.config.headers.do_not_load) app.actions.toggle_loading(false)
    if (error.response.status === 401) {
      if (window.location.pathname !== process.env.VUE_APP_LOGIN_URL && !error.config.headers.no_redirect) {
        if (window.location.pathname !== '/logout') window.sessionStorage.setItem('redirect_pathname', window.location.pathname)
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

async function axiosGet (url, params = {}) {
  this.loadBearerToken()
  return await axios.get(`${baseUrl}/${url}`, { params: params })
    .then(response => {
      return response
    })
}

async function axiosPost (url, record, params = {}) {
  this.loadBearerToken()
  return await axios.post(`${baseUrl}/${url}`, record, { params: params })
    .then(response => {
      return response
    })
}

async function axiosPatch (url, record, params = {}) {
  this.loadBearerToken()
  return await axios.patch(`${baseUrl}/${url}`, record, { params: params })
    .then(response => {
      return response
    })
}

async function axiosDelete (url, params = {}) {
  this.loadBearerToken()
  return await axios.delete(`${baseUrl}/${url}`, { params: params })
    .then(response => {
      return response
    })
}

// async function axiosUpload (url, image) {
//   this.loadBearerToken()
//   const formData = new FormData()
//   formData.append('attachment', image)
//
//   return await axios.post(`${baseUrl}/${url}`, formData)
//     .then(response => {
//       return response
//     })
// }

export default {
  axiosGet,
  axiosPost,
  axiosPatch,
  axiosDelete,
  // axiosUpload,
  loadBearerToken,
}
