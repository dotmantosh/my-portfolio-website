<template>
  <div class="portfolio">
    <LandingHeader />
    <ResumeSocial @setComponentToMount="setComponentToMount" />
    <!-- <div class="container"> -->
    <div class="box">
      <Sidebar @setComponentToMount="setComponentToMount" />
      <div v-if="setComponent==='main'" class="width100">
        <Main @setComponentToMount="setComponentToMount" />
      </div>
      <div v-else-if="setComponent==='portfolioform'" class="width100">
        <PortfolioForm @setComponentToMount="setComponentToMount" />
      </div>
      <div v-else-if="setComponent==='updateprofile'" class="width100">
        <UpdateProfile @setComponentToMount="setComponentToMount" />
      </div>
      <div v-else-if="setComponent==='socialmediaform'" class="width100">
        <SocialMediaForm @setComponentToMount="setComponentToMount" />
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
import PortfolioForm from "../components/PortfolioForm.vue";
import UpdateProfile from "../components/UpdateProfile.vue";
import SocialMediaForm from "../components/SocialMediaForm";

import { mapState } from "vuex";
export default {
  name: "portfolio",
  components: {
    LandingHeader,
    ResumeSocial,
    Sidebar,
    Main,
    PortfolioForm,
    UpdateProfile,
    SocialMediaForm
  },
  data() {
    return {
      setComponent: "main"
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    setComponentToMount(name) {
      this.setComponent = name;
    }
  }
};
</script>

<style scoped>
.width100 {
  flex: 1 1 100%;
}
</style>