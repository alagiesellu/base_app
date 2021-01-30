import qs from 'qs'
import axios from 'axios'
import Jsona from 'jsona'

const baseUrl = process.env.VUE_APP_API_URL
const jsona = new Jsona()

function records (url, params = {}) {
  const options = {
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { encode: false })
    },
  }

  return axios.get(`${baseUrl}/${url}`, options)
    .then(response => {
      return response.data
    })
}

function record (url, params = {}) {
  // const options = {
  //   params: params,
  //   headers: {
  //     Accept: 'application/vnd.api+json',
  //     'Content-Type': 'application/vnd.api+json',
  //   },
  // }

  return axios.get(`${baseUrl}/${url}`, params)
    .then(response => {
      // const user = response.data
      // delete user.links
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}

function store (url, record) {
  // const payload = jsona.serialize({
  //   data: record,
  //   includeNames: null,
  // })
  //
  // const options = {
  //   headers: {
  //     Accept: 'application/vnd.api+json',
  //     'Content-Type': 'application/vnd.api+json',
  //   },
  // }

  return axios.post(`${baseUrl}/${url}`, record)
    .then(response => {
      return response.data
    })
}

function update (url, record) {
  // const payload = jsona.serialize({
  //   data: record,
  //   includeNames: [],
  // })
  //
  // const options = {
  //   headers: {
  //     Accept: 'application/vnd.api+json',
  //     'Content-Type': 'application/vnd.api+json',
  //   },
  // }

  return axios.patch(`${baseUrl}/${url}`, record)
    .then(response => {
      return response.data
    })
}

function destroy (url) {
  // const options = {
  //   headers: {
  //     Accept: 'application/vnd.api+json',
  //     'Content-Type': 'application/vnd.api+json',
  //   },
  // }

  return axios.delete(`${baseUrl}/${url}`)
    .then(response => {
      return response.data
    })
}

function upload (url, image) {
  const formData = new FormData()
  formData.append('attachment', image)

  return axios.post(`${baseUrl}/${url}`, formData)
    .then(response => {
      return response.data.url
    })
}

export default {
  records,
  record,
  store,
  update,
  destroy,
  upload,
}
