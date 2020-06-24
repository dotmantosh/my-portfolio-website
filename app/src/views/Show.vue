<template>
  <div class="portfolio">
    <div v-if="deleteWork" class="delete__popup">
      <div class="delete__card">
        <h3>Are you sure you want to delete this work?</h3>
        <div class="delete__option">
          <button
            @click="deleteWorkInfo"
            :disabled="isDeletingWork"
          >{{isDeletingWork? 'Deleting...' : 'Yes'}}</button>
          <button @click="noDelete">No</button>
        </div>
      </div>
    </div>
    <LandingHeader />
    <ResumeSocial />
    <div class="container">
      <div class="box">
        <SidebarShow />
        <div v-if="componentToMount === 'mainshow'" class="width100">
          <MainShow @setDeleteWork="setDeleteWork" @setComponentToMount="setComponentToMount" />
        </div>
        <div v-else-if="componentToMount === 'editform'" class="width100">
          <EditForm @setComponentToMount="setComponentToMount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingHeader from "../components/LandingHeader.vue";
import ResumeSocial from "../components/ResumeSocial.vue";
import SidebarShow from "../components/SidebarShow.vue";
import MainShow from "../components/MainShow.vue";
import EditForm from "../components/EditForm.vue";
/* import { fragment } from "vue-fragment"; */
import { mapState, mapActions } from "vuex";
import WorkService from "../services/WorkService";
export default {
  name: "show",
  components: {
    LandingHeader,
    ResumeSocial,
    SidebarShow,
    MainShow,
    EditForm /* ,
    fragment */
  },
  data() {
    return {
      componentToMount: "mainshow",
      deleteWork: false,
      isDeletingWork: false,
      workId: this.$route.params.id
    };
  },
  computed: {
    ...mapState(["workInfo"])
  },

  methods: {
    ...mapActions(["setWorkInfo"]),

    setComponentToMount(name) {
      this.componentToMount = name;
    },
    setDeleteWork(param) {
      this.deleteWork = param;
    },
    noDelete() {
      this.deleteWork = false;
    },
    async deleteWorkInfo() {
      this.isDeletingWork = true;
      try {
        await WorkService.deleteWork(this.$route.params.id).data;
        const workInfo = (await WorkService.getWorks()).data;
        this.setWorkInfo(workInfo);
        this.$router.push("/portfolio");
      } catch (error) {
        if (error.response.data) {
          return (this.workInfoError = error.response.data.error);
        }

        if (error.message) {
          return (this.workInfoError = error.message);
        }

        if (error) {
          return (this.workInfoError = error);
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
.portfolio {
  position: relative;
}

.delete__popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background: black;
  z-index: 5;
}

.delete__card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -100%);
  background: white;
  color: black;
  opacity: 1;
  padding: 3rem 5rem;
  font-size: 1.4rem;
  border-radius: 2px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.8), -3px -3px 7px rgba(0, 0, 0, 0.8);
}
.delete__option {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.delete__option button {
  flex: 0 0 4rem;
  background: var(--color-secondary-dark);
  text-align: center;
  padding: 0.5rem 0;
  font-size: 1.4rem;
  border: none;
  color: white;
  border-radius: 2px;
  padding-left: 5px;
  padding-right: 5px;
}
.delete__option button:hover {
  background: var(--color-secondary-light);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.4), -3px -3px 7px rgba(0, 0, 0, 0.4);
  transform: scale(1.05);
  cursor: pointer;
}
.delete__option button:active {
  transform: translateY(2px);
}
</style>