// Pathify
import { make } from 'vuex-pathify'
import { getRoute } from '@/util/helpers'
import requestApi from '@/store/services/request-api'

// Data
const state = {
  auth: {},
  drawer: null,
  drawerImage: true,
  mini: false,
  errors_notification: [],
  success_notification: undefined,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: getRoute(),
    },
    {
      title: 'Users',
      icon: 'mdi-account-multiple',
      to: getRoute('users'),
    },
    {
      title: 'User Profile',
      icon: 'mdi-account',
      to: getRoute('profile'),
    },
    {
      title: 'Regular Tables',
      icon: 'mdi-clipboard-outline',
      to: getRoute('tables/regular'),
    },
    {
      title: 'Typography',
      icon: 'mdi-format-font',
      to: getRoute('components/typography'),
    },
    {
      title: 'Icons',
      icon: 'mdi-chart-bubble',
      to: getRoute('components/icons'),
    },
    {
      title: 'Google Maps',
      icon: 'mdi-map-marker',
      to: getRoute('maps'),
    },
    {
      title: 'Notifications',
      icon: 'mdi-bell',
      to: getRoute('components/notifications'),
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    state.auth = getters.user()
  },
  catch_axios_error (error) {
    state.errors_notification.push(error.response.statusText)
    state.errors_notification.push(error.response.data.message)
  },
  catch_axios_success (response) {
    if (response.status === process.env.VUE_APP_SUCCESS_RESPONSE_CODE) state.success_notification = response.data
  },
  reset_notification ({ commit, dispatch }) {
    state.errors_notification = []
    state.success_notification = undefined
  },
  get (url, params = {}) {
    return requestApi.axiosGet(url, params)
      .then(response => {
        return response.data
      })
      .catch(error => this.catch_axios_error(error))
  },
  api_request (method, url, record = {}) {
    switch (method) {
      case 'records':
      case 'record':
        return requestApi.axiosGet(url, record)
          .then(response => {
            this.catch_axios_success(response)
            return response.data
          })
      case 'store':
        return requestApi.axiosPost(url, record)
          .then(response => this.catch_axios_success(response))
          .catch(error => this.catch_axios_error(error))
      case 'update':
        return requestApi.axiosPatch(url, record)
          .then(response => this.catch_axios_success(response))
          .catch(error => this.catch_axios_error(error))
      case 'destroy':
        return requestApi.axiosDelete(url)
          .then(response => this.catch_axios_success(response))
      case 'upload':
        return requestApi.axiosUpload(url, record)
          .then(response => this.catch_axios_success(response))
          .catch(error => this.catch_axios_error(error))
    }
  },
}

const getters = {
  user: () => {
    // return window.axios.get('user')
    //   .then(res => {
    //     return res.data
    //   })
  },
  success_notification: state => state.success_notification,
  errors_notification: state => state.errors_notification,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
