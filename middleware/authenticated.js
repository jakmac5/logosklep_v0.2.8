export default function ({ store, route, redirect }) {
  const user = store.state.users.user
  const blockedRoute = /\/profile\/*/g
  const homeRoute = '/'
  const blockedRoute2 = /\/dodaj_konkurs\/*/g

  if (!user && route.path.match(blockedRoute)) {
    redirect('/')
  }

  /*
  if (!user && route.path.match(blockedRoute2)) {
    redirect('/')
  }
  */

  //if (user && route.path === homeRoute) {
  //redirect('/login')
  //}
}
