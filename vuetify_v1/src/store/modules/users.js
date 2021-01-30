import requestApi from '@/store/services/request-api'
import app from '@/store/modules/app'

const state = {
  records: {},
  record: {},
  meta: {},
  url: null,
  loading: false,
}

const mutations = {
  SET_RECORDS: (state, records) => {
    state.records = records
  },
  SET_RECORD: (state, record) => {
    state.record = record
  },
  SET_META: (state, meta) => {
    state.meta = meta
  },
  SET_URL: (state, url) => {
    state.url = url
  },
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
}

const actions = {
  records ({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    return app.actions.api_request(
      'records',
      'users',
      params,
    )
      .then(response => {
        commit('SET_RECORDS', response)
        commit('SET_LOADING', false)
      })
  },

  record ({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    commit('SET_RECORD', {})
    return app.actions.api_request(
      'record',
      'users/' + params.id,
    )
      .then(response => {
        commit('SET_RECORD', response)
        commit('SET_LOADING', false)
      })
  },

  store ({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    return app.actions.api_request(
      'store',
      'users',
      params,
    )
      .then(() => {
        commit('SET_LOADING', false)
      })
  },

  update ({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    return app.actions.api_request(
      'update',
      'users/' + params.id,
      params,
    )
      .then(() => {
        commit('SET_LOADING', false)
      })
  },

  destroy ({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    return app.actions.api_request(
      'destroy',
      'users/' + params.id,
    )
      .then(() => {
        commit('SET_LOADING', false)
      })
  },

  upload ({ commit, dispatch }, { user, image }) {
    commit('SET_LOADING', true)
    return app.actions.api_request(
      'upload',
      'users',
      { user, image },
    )
      .then(() => {
        commit('SET_LOADING', false)
      })
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
