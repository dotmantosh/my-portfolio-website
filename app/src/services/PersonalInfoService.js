import Api from '../services/Api'

export default {
  getPersonalInfo(username) {
    return Api().get(`personalInfo/${username}`)
  },
  setPersonalInfo(credentials) {
    return Api().post('personalInfo', credentials)
  },
  updatePersonalInfo(personalInfoId, credentials) {
    return Api().put(`personalInfo/${personalInfoId}`, credentials)
  }
}