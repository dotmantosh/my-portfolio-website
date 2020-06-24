import Api from '../services/Api'

export default {
  getSocialMedias(username) {
    return Api().get(`socialmedia/${username}`)
  },
  setSocialMedia(socialMedia) {
    return Api().post('socialmedia', socialMedia)
  },
  updateSocialMedia(socialMediaId, socialMedia) {
    return Api().put(`socialmedia/${socialMediaId}`, socialMedia)
  }

}