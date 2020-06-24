import Api from '../services/Api'

export default {
  downloadCv(username, userCv) {
    return Api().get(`user/${username}/cv/${userCv}`)
  },
  setCv(credentials) {
    return Api().put('user/cv', credentials)
  },
  deleteCv() {
    return Api().patch('user/cv')
  }
}