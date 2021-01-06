import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'
import {db} from '@/plugins/firebase'

export const strict = false // ????????????????????????


export const state = {
  state: {
    loading: false,
    error: null,
  },
}
export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return

    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token

    if (!accessTokenCookie) return

    const decoded = JWTDecode(accessTokenCookie)

    if (decoded) {
      //read from firestore username and choice 
      let choice = ''
      let username = ''
      const firestore_data = await db.collection('users').where('userId','==',decoded.user_id).get()
      if(!firestore_data.empty){
        firestore_data.forEach(user => {
          choice = user.data().choice
          username = user.data().username
        })
      }
      commit('users/SET_USER', {
        id: decoded.user_id,
        email: decoded.email,
        username: username,
        choice: choice
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
