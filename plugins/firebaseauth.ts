import { auth , db } from '@/plugins/firebase'
/*
export default (context:any) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      // here is you would want to build your user
      // object, but for now we'll just take everything
      if (user !== null && user !== undefined) {
       
       let email= user.email
       let userId = user.uid
        let username = user.displayName
        let choice = null
        store.commit('users/SET_USER', {email,userId,username,choice})
        resolve()
     
      }
      else{ 

        store.commit('users/SET_USER', user)
        resolve()
      }
    })
  })
}
*/
