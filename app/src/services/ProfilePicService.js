import Api from '../services/Api'

export default {
  setProfilePic(credentials) {
    return Api().put('user/profilepic', credentials)
  },
  updateProfilePic() {
    return Api().patch('user/profilepic')
  }
}