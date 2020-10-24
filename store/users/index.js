import Cookie from 'js-cookie'

import { auth } from '@/plugins/firebase'

import { db } from '@/plugins/firebase'

export const state = () => ({
  user: null,
})

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account
  },
  update_email:(state,email)=>{
state.user.email = email
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
}

export const actions = {
  async login({ commit }, account) {
    try {
      // Login the user
      commit('setLoading', true)

      await auth.signInWithEmailAndPassword(account.email, account.password)
      
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken()
      const { email, uid } = auth.currentUser
      const nick= auth.currentUser.displayName
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      commit('setLoading', false)
      // Set the user locally
      commit('SET_USER', { email, uid,nick })
      console.log("commited login")
    } catch (error) {
      commit('setLoading', false)
      commit('setError', error)
      console.log(error)
      alert(error)
    }
  },
  async register({commit},account){
      commit('setLoading', true)

      const query = db.collection('users').where('username', '==', account.displayName).get()

      if ((await query).empty){

        
        await auth.createUserWithEmailAndPassword(account.email, account.password)
        .then(userCredential=> {
          commit("setLoading", false);
          
          const user = userCredential.user;  // <-- Here is the main change 
          
          auth.currentUser.getIdToken().then((token) =>{
            Cookie.set('access_token', token)
            
          })
          // Set JWT to the cookie
          commit('setLoading', false)
          
          const newUser = {
            email: user.email,
            id: user.uid,
            choice: account.choices,
            username: account.displayName
          };
          console.log(newUser)
          commit("SET_USER", newUser);
          
          return db.collection("users")
          .add({
            username: account.displayName,
            email: user.email,
            userId: user.uid,
            choice: account.choices
          });
          
        })
        .then(() => {
          console.log("New user added!");
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.log(err)
        });
      }
      else{
        commit("setLoading", false);

        alert("nazwa użytkownika już istnieje :(")
      }
      },
     
  async updateEmail ({ commit },email){
    try{

      commit('setLoading', true)
      await auth.currentUser.updateEmail(email).catch(function(error) {
        if (error.code == 'auth/requires-recent-login') {
          // The user's credential is too old. She needs to sign in again.
          commit('setLoading', false)
          alert('Musisz zalogować się ponownie, aby potwierdźić tą operacje.')
          commit('logout')
        }
      })
      commit('setLoading', false)
      commit('update_email', email)
    }catch (error){
      commit('setLoading', false)
      commit('setError', error)
      console.log(error)
    }
  },

  async logout({ commit }) {
    try {
      auth.signOut()
      await Cookie.remove('access_token')
      commit('SET_USER', null)
    } catch (error) {
      commit('setError', error)
      console.log(error)
    }
  },
}

export const getters = {
  loggedIn: (state) => {
    return !!state.user
  },
  getUser: (state) => {
    try {
      if (state.user === null) {
        return 0
      } else return state.user
    } catch (error) {
      console.log(error)
    }
  },
}
