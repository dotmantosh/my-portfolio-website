import Api from '../services/Api'

export default {

  getWorks(username) {
    if (username) {
      return Api().get(`works/${username}`)
    } else {
      return Api().get("/works")
    }
  },
  getOneWork(id) {
    return Api().get(`works/${id}/show`)
  },
  setWork(credentials) {
    return Api().post('works', credentials)
  },
  updateWork(workId, credentials) {
    return Api().put(`works/${workId}`, credentials)
  },
  updateWorkUi(workId, credentials) {
    return Api().put(`works/${workId}/ui`, credentials)
  },
  deleteWork(workId) {
    return Api().delete(`works/${workId}`)
  }
}