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
  reset_notification ({ commit, dispatch }) {
    state.errors_notification = []
    state.success_notification = undefined
  },
  api_request (method, url, record = {}) {
    switch (method) {
      case 'records':
        return requestApi.records(url, record)
          .then(response => {
            return response
          })
      case 'record':
        return requestApi.record(url, record)
          .then(response => {
            return response
          })
      case 'store':
        return requestApi.store(url, record)
          .then(response => {
            state.success_notification = response
          })
      case 'update':
        return requestApi.update(url, record)
          .then(response => {
            // state.success_notification = response
            state.errors_notification = [1, 2, 3, 4, 5]
          })
      case 'destroy':
        return requestApi.destroy(url, record)
          .then(response => {
            state.success_notification = response
          })
      case 'upload':
        return requestApi.upload(url, record)
          .then(response => {
            state.success_notification = response
          })
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
