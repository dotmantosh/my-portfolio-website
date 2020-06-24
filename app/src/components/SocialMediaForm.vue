<template>
  <div class="main">
    <div v-if="isUserLoggedIn" @click="$emit('setComponentToMount', 'main')" class="back--icon">
      <i class="fas fa-long-arrow-alt-left"></i>
    </div>
    <div class="form--title">
      <h1>Upload your social media accounts</h1>
    </div>
    <form @submit.prevent class="form">
      <div class="form-item">
        <label for="facebook">Facebook</label>
        <input
          v-model="socialMediaForm.facebook"
          type="text"
          name="facebook"
          id="facebook"
          placeholder="Facebook"
        />
      </div>
      <div class="form-item">
        <label for="linkedin">LinkedIn</label>
        <input
          v-model="socialMediaForm.linkedin"
          type="text"
          name="linkedin"
          id="linkedin"
          placeholder="LinkedIn"
        />
      </div>
      <div class="form-item">
        <label for="github">Github</label>
        <input
          v-model="socialMediaForm.github"
          type="text"
          name="github"
          id="github"
          placeholder="Github"
        />
      </div>
      <div class="form-item">
        <label for="twitter">Twitter</label>
        <input
          v-model="socialMediaForm.twitter"
          type="text"
          name="twitter"
          id="twitter"
          placeholder="Twitter"
        />
      </div>
      <div class="form-item">
        <label for="Instagram">Instagram</label>
        <input
          v-model="socialMediaForm.instagram"
          type="text"
          name="Instagram"
          id="Instagram"
          placeholder="Instagram"
        />
      </div>
      <div class="form-item">
        <label for="youtube">Youtube</label>
        <input
          v-model="socialMediaForm.youtube"
          type="text"
          name="youtube"
          id="youtube"
          placeholder="Youtube"
        />
      </div>
      <div class="form-item">
        <label for="reddit">Reddit</label>
        <input
          v-model="socialMediaForm.reddit"
          type="text"
          name="reddit"
          id="reddit"
          placeholder="Reddit"
        />
      </div>
      <div class="form-item">
        <label for="tumblr">Tumblr</label>
        <input
          v-model="socialMediaForm.tumblr"
          type="text"
          name="tumblr"
          id="tumbler"
          placeholder="Tumblr"
        />
      </div>
      <button
        v-if="!socialMedia && isUserLoggedIn"
        @click="createSocialMedia"
        type="button"
        class="work-submit"
        :disabled="createClicked"
      >{{createClicked? 'Please wait...' : 'Submit'}}</button>
      <button
        v-else-if="socialMedia && isUserLoggedIn"
        @click="updateSocialMedia"
        type="button"
        class="work-submit"
        :disabled="updateClicked"
      >{{updateClicked? 'Please wait...': 'Update'}}</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SocialMediaService from "../services/SocialMediaService";
export default {
  data() {
    return {
      socialMediaForm: {
        facebook: "",
        linkedin: "",
        github: "",
        youtube: "",
        twitter: "",
        instagram: "",
        reddit: "",
        tumblr: ""
      },
      socialMediaError: null,
      updateClicked: false,
      createClicked: false
    };
  },
  computed: {
    ...mapState(["socialMedia", "isUserLoggedIn"])
  },
  async mounted() {
    if (this.socialMedia) {
      Object.keys(this.socialMediaForm).map(
        key => (this.socialMediaForm[key] = this.socialMedia[key])
      );
      return;
    }
    const socialMedia = (
      await SocialMediaService.getSocialMedias(this.$route.params.username)
    ).data;
    if (socialMedia) {
      this.setSocialMedia(socialMedia);
    }
  },
  methods: {
    ...mapActions(["setSocialMedia"]),
    async createSocialMedia() {
      this.createClicked = true;
      try {
        await SocialMediaService.setSocialMedia(this.socialMediaForm);
        const socialMedia = (
          await SocialMediaService.getSocialMedias(this.$route.params.username)
        ).data;
        this.setSocialMedia(socialMedia);
        this.$emit("setComponentToMount", "main");
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
    async updateSocialMedia() {
      this.updateClicked = true;
      try {
        await SocialMediaService.updateSocialMedia(
          this.socialMedia._id,
          this.socialMediaForm
        );
        const socialMedia = (
          await SocialMediaService.getSocialMedias(this.$route.params.username)
        ).data;
        this.setSocialMedia(socialMedia);
        this.$emit("setComponentToMount", "main");
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
    }
  }
};
</script>


<style scoped>
.main {
  padding: 2rem 5rem 2rem 2rem;
  width: 95%;
}
.back--icon {
  width: 5rem;
  border: 1px solid transparent;
}
.back--icon i {
  font-size: 4rem;
  text-align: center;
  margin: 0 auto;
  display: block;
  color: var(--color-grey-dark-3);
}
.back--icon:hover {
  color: #222;
  cursor: pointer;
  border: 1px dashed #222;
}
.back--icon:hover i {
  color: #222;
}
.form--title {
  font-size: 2rem;
  text-align: center;
}

.form {
  margin: 0 auto;
  padding: 1rem 2rem;
  margin-top: 2rem;
  max-width: 50rem;
}

.form-item {
  margin-bottom: 2.5rem;
}

.form-item input {
  width: 100%;
  display: block;
  /* margin: 0 auto; */
  font-size: 1.3rem;
  padding: 1rem 2rem;
  font-family: inherit;
  outline: none;
  /* border: none; */
  letter-spacing: 0.15rem;
}
.form-item textarea {
  width: 100%;
  height: 12rem;
  display: block;
  /* margin: 0 auto; */
  font-size: 1.3rem;
  padding: 1rem 2rem;
  font-family: inherit;
  outline: none;
  /* border: none; */
  letter-spacing: 0.15rem;
}

.form-item input:focus {
  outline: none;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
}

.form-item label {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  display: block;
  font-weight: 500;
  margin-left: 2rem;
}

.work-ui {
  display: block;
  position: absolute;
  top: -9999%;
}
.work-ui-label {
  border: 1px solid rgba(119, 119, 119, 0.75);
  display: block;
  padding: 2rem 0;
  position: relative;
}
.work-ui-label:hover {
  cursor: pointer;
}
.work-ui-label p {
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-grey-dark-2);
}

small {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-left: 2rem;
  display: block;
}

.work-ui-icon {
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 4rem;
  color: var(--color-grey-dark-2);
}
.work-submit {
  display: block;
  text-align: center;
  background-image: linear-gradient(
    to right bottom,
    var(--color-secondary-light),
    var(--color-secondary-dark)
  );
  padding: 1rem 0;
  font-size: 1.5rem;
  width: 100%;
  border: none;
  margin-top: 2rem;
  color: var(--color-grey-light-1);
  border-radius: 2px;
}
.form-item-ui {
  margin-bottom: 2.5rem;
}
</style>