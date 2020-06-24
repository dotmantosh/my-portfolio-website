<template>
  <div class="sidebar">
    <figure class="profile--img__container">
      <img
        v-if="user && user.profilePic"
        :src="`http://localhost:3000/storage/profilepic/${user.profilePic}`"
        width="100rem"
        alt="Profile-pic"
        class="profile--img"
      />
      <div
        v-else-if="isUserLoggedIn && !user.profilePic"
        class="no-profile-img text-center"
      >No image yet, hover me!</div>
      <figcaption
        v-if="isUserLoggedIn && !this.$route.params.username"
        class="change--profile--image"
      >
        <i class="fas fa-user-circle"></i>
        <p>Change profile imgage</p>
      </figcaption>
      <label
        v-if="isUserLoggedIn && !this.$route.params.username"
        for="profile-pic"
        class="profile--pic--label"
      >
        <input
          @change="onFileChange"
          type="file"
          name="profile-pic"
          id="profile-pic"
          class="profile--pic--input"
        />
      </label>
    </figure>
    <div class="danger fontsize">{{profilePicError}}</div>
    <div class="user__info">
      <div class="user__info--content">
        <div class="user__info--item">
          <h3>
            <i class="fas fa-user"></i>
            <span
              v-if="personalInfo"
            >{{ personalInfo.firstName ? personalInfo.firstName: 'Firstname' }} {{ personalInfo.lastName ? personalInfo.lastName : 'Lastname' }}</span>
          </h3>

          <h3>
            <i class="fas fa-phone-square"></i>
            <span v-if="personalInfo">{{ personalInfo.tel1 ? personalInfo.tel1 : 'Tel1' }}</span>
          </h3>
          <h3>
            <i class="fas fa-phone-square"></i>
            <span v-if="personalInfo">{{ personalInfo.tel2 ? personalInfo.tel2 : 'Tel2' }}</span>
          </h3>
          <h3>
            <i class="fas fa-envelope"></i>
            <span v-if="personalInfo">{{ user.email ? user.email : 'Email' }}</span>
          </h3>
          <h3>
            <i class="fas fa-graduation-cap"></i>
            <span
              v-if="personalInfo"
            >{{ personalInfo.h_Education ? personalInfo.h_Education : 'Education' }}</span>
          </h3>
          <button
            v-if="isUserLoggedIn"
            @click="$emit('setComponentToMount', 'updateprofile')"
            class="update-profile"
          >{{this.personalInfo ? 'Edit Profile' : 'Update Profile'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PersonalInfoService from "../services/PersonalInfoService";
import ProfilePicService from "../services/ProfilePicService";
export default {
  data() {
    return {
      personalInfoError: null,
      profilePic: null,
      profilePicError: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "personalInfo"])
  },
  async mounted() {
    const username = this.$route.params.username
      ? this.$route.params.username
      : this.user.username;
    if (this.personalInfo) {
      return;
    }
    const personalInfo = await PersonalInfoService.getPersonalInfo(username);
    this.setPersonalInfo(personalInfo.data);
  },
  methods: {
    ...mapActions(["setPersonalInfo", "setUser"]),

    async onFileChange(e) {
      let files = e.target.files[0];
      this.profilePic = e.target.files[0];
      if (!files) {
        return;
      }
      const formData = new FormData();
      formData.append("files", this.profilePic);
      try {
        const newUser = await ProfilePicService.setProfilePic(formData);
        this.setUser(newUser.data);
      } catch (error) {
        if (error.response.data.error) {
          return (this.profilePicError = error.response.data.error);
        }
        if (error.response.data.message) {
          return (this.profilePicError = error.response.data.message);
        }
        if (error.response.data) {
          return (this.profilePicError = error.response.data);
        }
        if (error.message) {
          return (this.profilePicError = error.message);
        }

        if (error) {
          return (this.profilePicError = error);
        }
      }
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 43.75em) {
  .sidebar {
    width: 90%;
    margin: 0 auto;
    height: max-content;
  }
}
.profile--img__container {
  width: 17rem;
  height: 17rem;
  border: 1px solid rgba(71, 71, 71, 0.2);
  margin-bottom: 4rem;
  margin-top: 2rem;
  cursor: pointer;
  position: relative;
  backface-visibility: hidden;
  background: grey;
  border-radius: 3px;
}
.profile--img__container:hover .no-profile-img {
  visibility: hidden;
}
.no-profile-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 1.1rem;
}

.profile--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
  object-position: top;
  transform: scale(1.05);
  transition: all 0.5s ease-out;
  backface-visibility: hidden;
}

.change--profile--image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  opacity: 0;
  transition: all 0.5s ease-out;
  backface-visibility: hidden;
}

.change--profile--image i {
  font-size: 5rem;
}
.profile--img__container:hover .change--profile--image {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.profile--img__container:hover .profile--img {
  transform: scale(1);
  filter: blur(1px) brightness(80%);
  backface-visibility: hidden;
}

.profile--pic--input,
.profile--pic--label {
  position: absolute;
}
.profile--pic--input {
  top: -9999%;
}
.profile--pic--label {
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.user__info--item h3 {
  margin-bottom: 2rem;
  font-size: 1.4rem;
}

.user__info--item h3 i {
  font-size: 1.5rem;
  margin-right: 1rem;
}
.user__info--item h3 span {
  font-weight: 400;
}
.update-profile {
  width: 100%;
  font-size: 1.4rem;
  padding: 0.5rem 0;
}
.fontsize {
  font-size: 1.2rem;
}
</style>