import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const strict = false // ????????????????????????


export const state = {
  state: {
    loading: false,
    error: null,
  },
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return

    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token

    if (!accessTokenCookie) return

    const decoded = JWTDecode(accessTokenCookie)

    if (decoded) {
      commit('users/SET_USER', {
        uid: decoded.user_id,
        email: decoded.email,
      })
    }
  },
  clearError({ commit }) {
    commit('clearError')
  },
  setError({ commit }, payload) {
    commit('setError', payload)
  },
}

export const getters = {
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
}
