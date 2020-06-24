import Api from '../services/Api'

export default {
  getUserByUsername(username) {
    return Api().get(`user/${username}`)
  },
  signUp(credentials) {
    return Api().post('signup', credentials)
  },
  signIn(credentials) {
    return Api().post('login', credentials)
  },
  verifyEmail(email){
    return Api().post(`forgot`, email)
  },
  resetPassword(credentials, token){
    return Api().post(`resetpassword/${token}`, credentials)
  }
}