// Pathify
import { make } from 'vuex-pathify'
import { getRoute } from '@/util/helpers'
import requestApi from '@/store/services/request-api'

// Data
const state = {
  name: '',
  auth: {},
  configs: {},
  bearer: null,
  drawer: null,
  drawerImage: true,
  mini: false,
  loading: [],
  errors_notification: [],
  success_notification: undefined,
  items: [],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    requestApi.loadBearerToken()
    state.name = process.env.VUE_APP_NAME
  },
  async load_configs () {
    await requestApi.axiosGet('get/configs')
      .then(response => {
        state.configs = response.data
      })
  },
  load_nav_items ({ commit, dispatch }) {
    state.items = [
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        to: getRoute(),
      },
      {
        title: 'Users',
        icon: 'mdi-account-multiple',
        to: getRoute('users'),
        hide: !actions.check_if_has_role('u_a'),
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
    ]
  },
  check_if_has_role (role) {
    return state.auth.roles.includes(role)
  },
  async get_auth_user ({ commit, dispatch }) {
    state.auth = await requestApi.axiosGet('user')
      .then(response => {
        return response.data
      })
    return state.auth
  },
  async logout_auth_user ({ commit, dispatch }) {
    return await requestApi.axiosPost('logout')
  },
  toggle_loading (truth = true, message = 'loading...') {
    if (truth) state.loading.push(message)
    else state.loading.pop()
  },
  // catch_axios_error (error) {
  //   state.errors_notification.push(error.response.statusText)
  //   state.errors_notification.push(error.response.data.message)
  // },
  // catch_axios_success (response) {
  //   if (response.status === process.env.VUE_APP_SUCCESS_RESPONSE_CODE) state.success_notification = response.data
  // },
  reset_notification ({ commit, dispatch }) {
    state.errors_notification = []
    state.success_notification = undefined
  },
  get (url, params = {}) {
    return requestApi.axiosGet(url, params)
      .then(response => {
        return response.data
      })
      // .catch(error => this.catch_axios_error(error))
  },
  api_request (method, url, params = {}) {
    switch (method) {
      case 'records':
      case 'record':
        return requestApi.axiosGet(url, params)
          .then(response => {
            return response.data
          })
      case 'store':
        return requestApi.axiosPost(url, params)
          .then(response => {
            return response.data
          })
          // .then(response => this.catch_axios_success(response))
          // .catch(error => this.catch_axios_error(error))
      case 'update':
        return requestApi.axiosPatch(url, params)
          .then(response => {
            return response.data
          })
          // .then(response => this.catch_axios_success(response))
          // .catch(error => this.catch_axios_error(error))
      case 'destroy':
        return requestApi.axiosDelete(url)
          .then(response => {
            return response.data
          })
          // .then(response => this.catch_axios_success(response))
      case 'upload':
        return requestApi.axiosUpload(url, params)
          .then(response => {
            return response.data
          })
          // .then(response => this.catch_axios_success(response))
          // .catch(error => this.catch_axios_error(error))
    }
  },
}

const getters = {
  auth: state => state.auth,
  bearer: state => state.bearer,
  success_notification: state => state.success_notification,
  errors_notification: state => state.errors_notification,
  hasRole: (role) => {
    return actions.hasRole(role)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
