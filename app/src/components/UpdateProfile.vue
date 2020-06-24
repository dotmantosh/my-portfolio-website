<template>
  <div class="main">
    <div @click="$emit('setComponentToMount', 'main')" class="back--icon">
      <i class="fas fa-long-arrow-alt-left"></i>
    </div>
    <div class="form--title">
      <h1>Update your personal profile</h1>
    </div>
    <div class="form">
      <div class="form-item">
        <label for="first_name">First name</label>
        <input
          v-model="userInfo.firstName"
          type="text"
          name="first_name"
          id="first_name"
          placeholder="First Name"
        />
      </div>
      <div class="form-item">
        <label for="last_name">Last Name</label>
        <input
          v-model="userInfo.lastName"
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
        />
      </div>
      <div class="form-item">
        <label for="tel_1">Telephone 1</label>
        <input v-model="userInfo.tel1" type="text" name="tel_1" id="tel_1" placeholder="Tel 1" />
      </div>
      <div class="form-item">
        <label for="Tel_2">Telephone 2</label>
        <input v-model="userInfo.tel2" type="text" name="tel_2" id="tel_2" placeholder="Tel 2" />
      </div>

      <div class="form-item">
        <label for="education">Highest level of education</label>
        <input
          v-model="userInfo.h_Education"
          type="text"
          name="education"
          id="education"
          placeholder="Highest level of education"
        />
      </div>
      <button
        v-if="!this.personalInfo && isUserLoggedIn"
        @click.prevent="setBioData"
        type="buton"
        class="work-submit"
        :disabled="setBioDataClicked"
      >{{setBioDataClicked ? 'Please wait...': 'Submit'}}</button>
      <button
        v-else-if="this.personalInfo"
        @click.prevent="updateBiodata"
        type="buton"
        class="work-submit"
        :disabled="updateBiodataClicked"
      >{{updateBiodataClicked ? 'Please wait...' : 'Submit'}}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PersonalInfoService from "../services/PersonalInfoService";
export default {
  data() {
    return {
      userInfo: {
        firstName: "",
        lastName: "",
        tel1: "",
        tel2: "",
        email: "",
        h_Education: ""
      },
      personalInfoError: null,
      setBioDataClicked: false,
      updateBiodataClicked: false
    };
  },
  computed: {
    ...mapState(["personalInfo", "isUserLoggedIn"])
  },
  mounted() {
    if (!this.personalInfo) {
      return;
    }
    Object.keys(this.personalInfo).map(
      key => (this.userInfo[key] = this.personalInfo[key])
    );

    /* this.userInfo.firstName = this.personalInfo.firstName;
    this.userInfo.lastName = this.personalInfo.lastName;
    this.userInfo.tel1 = this.personalInfo.tel1;
    this.userInfo.tel2 = this.personalInfo.tel2;
    this.userInfo.email = this.personalInfo.email;
    this.userInfo.education = this.personalInfo.education; */
  },
  methods: {
    ...mapActions(["setPersonalInfo"]),
    async setBioData() {
      this.setBioDataClicked = true;
      try {
        const bioData = (
          await PersonalInfoService.setPersonalInfo(this.userInfo)
        ).data;
        this.setPersonalInfo(bioData);
        this.setBioDataClicked = false;
        this.$emit("setComponentToMount", "main");
      } catch (error) {
        if (error.response.data) {
          this.setBioDataClicked = false;
          return (this.personalInfoError = error.response.data.error);
        }

        if (error.message) {
          this.setBioDataClicked = false;
          return (this.personalInfoError = error.message);
        }

        if (error) {
          this.setBioDataClicked = false;
          return (this.personalInfoError = error);
        }
      }
    },
    async updateBiodata() {
      this.updateBiodataClicked = true;
      try {
        const bioData = (
          await PersonalInfoService.updatePersonalInfo(
            this.personalInfo._id,
            this.userInfo
          )
        ).data;
        this.setPersonalInfo(bioData);
        this.updateBiodataClicked = false;
        this.$emit("setComponentToMount", "main");
      } catch (error) {
        if (error.response.data) {
          this.updateBiodataClicked = false;
          return (this.personalInfoError = error.response.data.error);
        }

        if (error.message) {
          this.updateBiodataClicked = false;
          return (this.personalInfoError = error.message);
        }

        if (error) {
          this.updateBiodataClicked = false;
          return (this.personalInfoError = error);
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
</style>