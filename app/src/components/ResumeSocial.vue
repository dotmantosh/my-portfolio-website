<template>
  <div class="resume--social--container">
    <div class="container">
      <div class="resume--social">
        <div class="download--resume">
          <label v-if="isUserLoggedIn" for="resume" class="upload-resume-label">
            <input
              @change="uploadResume"
              type="file"
              id="resume"
              name="resume"
              class="upload-resume-input"
            />
            <i v-if="user && user.cv" class="fas fa-trash-alt tooltip upload-resume-icon">
              <span class="tooltiptext">delete resume</span>
              <span class="tooltiptext delete-resume">
                <span @click="deleteResume">Yes</span>
                <span>No</span>
              </span>
            </i>
            <i class="fas fa-upload tooltip upload-resume-icon">
              <span class="tooltiptext">upload resume</span>
            </i>
          </label>
          <a
            v-if="user && user.cv"
            :href="apiUrl"
            target="_blank"
            @click="downloadResume"
            class="resume--download__link"
          >{{`click here to download ${user.firstName? user.firstName: user.username}'s resume`}}</a>
          <span
            v-else
            class="resume--download__link"
          >{{`${user.firstName? user.firstName: user.username} has not uploaded a resume`}}</span>
          <small v-if="cvError" class="danger cv-error">An error occoured</small>
          <small v-if="resumeUploading" class="danger cv-error">uploading your resume</small>
          <small v-if="isDownloading" class="danger cv-error">Please wait...</small>
          <small v-if="isDeleted" class="danger cv-error">Resume Deleted Successfully</small>
        </div>
        <div v-if="user" class="social--media">
          <h6 v-if="socialMedia">
            <i
              v-if="isUserLoggedIn"
              @click="$emit('setComponentToMount', 'socialmediaform')"
              class="fas fa-upload tooltip social-media-upload"
            >
              <span class="tooltiptext">upload</span>
            </i>
            {{user.firstName ? user.firstName : user.username}}'s social media:
          </h6>
          <h6 v-else>
            <i
              v-if="isUserLoggedIn"
              @click="$emit('setComponentToMount', 'socialmediaform')"
              class="fas fa-upload tooltip social-media-upload"
            >
              <span class="tooltiptext">upload</span>
            </i>
            {{user.firstName ? user.firstName : user.username}} has not uploaded a social media account
          </h6>
          <a
            v-if="socialMedia && socialMedia.linkedin"
            :href="`${socialMedia.linkedin}`"
            target="_blank"
          >
            <i class="fab fa-linkedin tooltip">
              <span class="tooltiptext">linkedin</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.facebook"
            :href="`${socialMedia.facebook}`"
            target="_blank"
          >
            <i class="fab fa-facebook tooltip">
              <span class="tooltiptext">Instagram</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.instagram"
            :href="`${socialMedia.instagram}`"
            target="_blank"
          >
            <i v-if="socialMedia && socialMedia.instagram" class="fab fa-instagram tooltip">
              <span class="tooltiptext">Instagram</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.twitter"
            :href="`${socialMedia.twitter}`"
            target="_blank"
          >
            <i class="fab fa-twitter tooltip">
              <span class="tooltiptext">Twitter</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.youtube"
            :href="`${socialMedia.youtube}`"
            target="_blank"
          >
            <i class="fab fa-youtube tooltip">
              <span class="tooltiptext">Youtube</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.telegram"
            :href="`${socialMedia.telegram}`"
            target="_blank"
          >
            <i class="fab fa-telegram tooltip">
              <span class="tooltiptext">Telegram</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.github"
            :href="`${socialMedia.github}`"
            target="_blank"
          >
            <i class="fab fa-github tooltip">
              <span class="tooltiptext">Github</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.reddit"
            :href="`${socialMedia.reddit}`"
            target="_blank"
          >
            <i class="fab fa-reddit tooltip">
              <span class="tooltiptext">Reddit</span>
            </i>
          </a>
          <a
            v-if="socialMedia && socialMedia.pinterest"
            :href="`${socialMedia.pinterest}`"
            target="_blank"
          >
            <i class="fab fa-pinterest tooltip">
              <span class="tooltiptext">Pinterest</span>
            </i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SocialMediaService from "../services/SocialMediaService";
import CvService from "../services/CvService";
export default {
  data() {
    return {
      socialMediaError: null,
      cvError: null,
      resumeUploading: false,
      isDownloading: false,
      isDeleted: false
    };
  },
  computed: {
    ...mapState(["user", "socialMedia", "isUserLoggedIn"]),
    apiUrl() {
      const url = this.user.cv
        ? `http://localhost:3000/api/user/${this.user.username}/cv`
        : "";
      return url;
    }
  },
  async mounted() {
    if (this.socialMedia && !this.$route.params.username) {
      return;
    }
    let username = "";
    if (this.$route.params.username) {
      username = this.$route.params.username;
    } else {
      username = this.user.username;
    }
    try {
      const socialMedia = (await SocialMediaService.getSocialMedias(username))
        .data;
      if (socialMedia) {
        this.setSocialMedia(socialMedia);
      } else {
        this.setSocialMedia(null);
      }
    } catch (error) {
      if (error.response.data) {
        return (this.socialMediaError = error.response.data.error);
      }

      if (error.message) {
        return (this.socialMediaError = error.message);
      }

      if (error) {
        return (this.socialMediaError = error);
      }
    }
  },
  methods: {
    ...mapActions(["setSocialMedia", "setUser"]),
    async uploadResume(e) {
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("files", file);
      this.resumeUploading = true;
      try {
        const newUser = await CvService.setCv(formData);
        this.setUser(newUser.data);
        this.resumeUploading = false;
      } catch (error) {
        this.resumeUploading = false;
        if (error.response.data) {
          return (this.cvError = error.response.data.error);
        }

        if (error.message) {
          return (this.cvError = error.message);
        }

        if (error) {
          return (this.cvError = error);
        }
      }
    },
    async deleteResume() {
      try {
        const newUser = await CvService.deleteCv();
        this.setUser(newUser.data);
        this.isDeleted = true;
        setTimeout(() => {
          this.isDeleted = false;
        }, 10000);
      } catch (error) {
        if (error.response.data) {
          return (this.cvError = error.response.data.error);
        }

        if (error.message) {
          return (this.cvError = error.message);
        }

        if (error) {
          return (this.cvError = error);
        }
      }
    },
    downloadResume() {
      this.isDownloading = true;
      setTimeout(() => {
        this.isDownloading = false;
      }, 5000);
    }
  }
};
</script>

<style scoped>
.resume--social--container {
  padding: 1rem 0;
  background: var(--color-grey-light-2);
  box-shadow: 0px 3px 10px rgba(71, 71, 71, 0.1),
    0px 6px 10px rgba(71, 71, 71, 0.1);
  position: relative;
}
.resume--social {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 62.5em) {
  .resume--social {
    margin: 0 2rem;
  }
}

.resume--download__link {
  padding: 0.4rem 0.8rem;
  position: relative;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  cursor: pointer;
}
.resume--download:active {
  transform: translateY(3px);
}

.upload-resume-icon {
  font-size: 1.3rem;
  margin-right: 10px;
}
.upload-resume-label {
  position: relative;
  cursor: pointer;
}
.upload-resume-input {
  position: absolute;
  top: -9999px;
  left: -9999px;
}

.delete-resume {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  padding: 2px 4px;
}
.delete-resume > span:hover {
  border-bottom: 1px dashed rgba(0, 0, 0);
}

.delete-resume:active {
  visibility: visible;
  opacity: 1;
}
.social--media {
  display: flex;
  align-items: center;
}

.social--media h6 {
  font-size: 1.3rem;
  margin-right: 1.5rem;
}
.social--media i {
  font-size: 1.3rem;
  margin-right: 0.6rem;
  transition: all 0.3s ease;
}
.social--media i:hover {
  transform: scale(1.3);
  cursor: pointer;
}
.social-media-upload {
  transform: scale(1) !important;
}

a,
a:active {
  text-decoration: none;
  background: none;
  color: var(--color-secondary-dark);
}

.cv-error {
  position: absolute;
  bottom: -1.5rem;
  left: 20%;
  transform: translateX(-50%);
  font-size: 1rem;
}
</style>