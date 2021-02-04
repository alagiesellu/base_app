import app from '@/store/modules/app'

const state = {
  records: {},
  record: {},
  meta: {},
  roles: {},
  url: null,
  loading: false,
}

const mutations = {
  SET_RECORDS: (state, data) => {
    state.records = data
  },
  SET_RECORD: (state, data) => {
    state.record = data
  },
  SET_ROLES: (state, data) => {
    state.roles = data
  },
  SET_META: (state, data) => {
    state.meta = data
  },
  SET_URL: (state, data) => {
    state.url = data
  },
}

const actions = {
  get ({ commit, dispatch }, payload = {}) {
    return app.actions.get(
      payload.url,
      payload.params,
    )
      .then(response => {
        commit('SET_' + payload.state.toUpperCase(), response)
      })
  },
  records ({ commit, dispatch }, params) {
    return app.actions.api_request(
      'records',
      'users',
      params,
    )
      .then(response => {
        commit('SET_RECORDS', response)
      })
  },

  record ({ commit, dispatch }, params) {
    commit('SET_RECORD', {})
    return app.actions.api_request(
      'record',
      'users/' + params.id,
    )
      .then(response => {
        commit('SET_RECORD', response)
      })
  },

  store ({ commit, dispatch }, params) {
    return app.actions.api_request(
      'store',
      'users',
      params,
    )
  },

  update ({ commit, dispatch }, params) {
    return app.actions.api_request(
      'update',
      'users/' + params.id,
      params,
    )
  },

  destroy ({ commit, dispatch }, params) {
    return app.actions.api_request(
      'destroy',
      'users/' + params.id,
    )
  },

  upload ({ commit, dispatch }, { user, image }) {
    return app.actions.api_request(
      'upload',
      'users',
      { user, image },
    )
  },
}

const getters = {
  records: state => state.records,
  list (state) {
    return actions.list({}, {})
  },
  recordsTotal: state => state.meta.page.total,
  record: state => state.record,
  url: state => state.url,
  loading: state => state.loading,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
