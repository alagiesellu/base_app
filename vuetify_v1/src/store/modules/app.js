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
  notifications: {
    errors: [],
    success: [],
  },
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: getRoute(),
    },
    {
      title: 'Users',
      icon: 'mdi-account',
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
  api_request (method, url, params = {}) {
    switch (method) {
      case 'records':
        return requestApi.records(url, params)
          .then(response => {
            return response.data
          })
      case 'record':
        return requestApi.record(url, params)
          .then(response => {
            return response.data
          })
      case 'store':
        return requestApi.store(url, params)
          .then(response => {
            return response.data
          })
      case 'update':
        return requestApi.update(url, params)
          .then(response => {
            return response.data
          })
      case 'destroy':
        return requestApi.destroy(url, params)
          .then(response => {
            return response.data
          })
      case 'upload':
        return requestApi.upload(url, params)
          .then(response => {
            return response.data
          })
    }
    console.log(method)
    console.log(url)
    console.log(params)
  },
}

const getters = {
  user: () => {
    // return window.axios.get('user')
    //   .then(res => {
    //     return res.data
    //   })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
