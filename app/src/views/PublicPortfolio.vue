<template>
  <div class="portfolio">
    <LandingHeader @searchUsername="searchUsername" />
    <ResumeSocial @setComponentToMount="setComponentToMount" />
    <!-- <div class="container"> -->
    <div class="box">
      <Sidebar @setComponentToMount="setComponentToMount" />
      <div v-if="mountError">
        <h1 class="m-auto danger">No User with the given username</h1>
      </div>
      <div class="width100">
        <Main @setComponentToMount="setComponentToMount" />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>


<script>
import LandingHeader from "../components/LandingHeader.vue";
import ResumeSocial from "../components/ResumeSocial.vue";
import Sidebar from "../components/Sidebar.vue";
import Main from "../components/Main.vue";

import AuthenticationService from "../services/AuthenticationService";
import PersonalInfoService from "../services/PersonalInfoService";
import WorkService from "../services/WorkService";

import { mapActions } from "vuex";
export default {
  name: "portfolio",
  components: {
    LandingHeader,
    ResumeSocial,
    Sidebar,
    Main
  },
  data() {
    return {
      setComponent: "main",
      username: this.$route.params.username,
      mountError: null
    };
  },
  methods: {
    ...mapActions([
      "setUser",
      "setPersonalInfo",
      "setWorkInfo",
      "setSocialMedia"
    ]),
    setComponentToMount(name) {
      this.setComponent = name;
    },
    async searchUsername(username) {
      this.$route.params.fullpath = `/portfolio/${username}`;
      try {
        const user = await AuthenticationService.getUserByUsername(username);
        if (user) {
          this.setUser(user.data);
        } else {
          this.setUser(null);
        }
        const personalInfo = await PersonalInfoService.getUserByUsername(
          username
        );
        if (personalInfo) {
          this.setPersonalInfo(personalInfo);
        } else {
          this.setPersonalInfo(null);
        }
        const work = await WorkService.getUserByUsername(username);
        if (user) {
          this.setWorkInfo(work);
        } else {
          this.setUser(null);
        }
      } catch (error) {
        if (error.response.data) {
          return (this.mountError = error.response.data.error);
        }

        if (error.message) {
          return (this.mountError = error.message);
        }

        if (error) {
          return (this.mountError = error);
        }
      }
    }
  }
};
</script>

<style scoped>
.width100 {
  flex: 1 1 100%;
}
</style>