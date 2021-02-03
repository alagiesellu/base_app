import app from '@/store/modules/app'

const state = {
  token: null,
}

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data
  },
}

const actions = {

  post ({ commit, dispatch }, params) {
    // commit('SET_LOADING', true)
    return app.actions.api_request(
      'store',
      'login',
      params,
    )
      .then(response => {
        commit('SET_TOKEN', response)
      })
  },
}

const getters = {
  token: state => state.token,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
