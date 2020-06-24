<template>
  <main class="main">
    <div
      v-if="isUserLoggedIn"
      @click="$emit('setComponentToMount', 'portfolioform')"
      class="upload__portfolio"
    >
      <p class="upload__portfolio--p">Click here to upload a Work</p>
    </div>
    <div
      v-if="workInfo"
      class="work__container"
      :class="{'more-than-two': workInfo.length > 2, 'less-than-two': workInfo.length<=2}"
    >
      <div
        v-for="work in workInfo"
        :key="work._id"
        @click="setOneWorkInfoById(work._id)"
        class="work"
      >
        <router-link tag="figure" :to="{name: 'show', params:{id: work._id}}">
          <figure class="work__image">
            <p v-if="!work.workUi">Haven't uploaded this Work User Interface</p>
            <img
              v-if="work.workUi"
              :src="`http://localhost:3000/storage/works/${work.workUi}`"
              alt="workImage"
            />
          </figure>
          <div v class="work__title">
            <h2 v-if="work.workTitle">{{work.workTitle.substring(0, 30)}}...</h2>
          </div>
          <div class="work__description">
            <p v-if="work.workDescription">
              {{work.workDescription.substring(0, 100)}}...
              <span>click for More</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WorkService from "../services/WorkService";
export default {
  data() {
    return {
      workInfoError: null
    };
  },
  computed: {
    ...mapState(["workInfo", "isUserLoggedIn", "user"])
  },
  async mounted() {
    if (this.personalInfo && !this.$route.params.username) {
      return;
    }
    const username = this.$route.params.username
      ? this.$route.params.username
      : this.user.username;
    try {
      const workInfo = await WorkService.getWorks(username);
      if (workInfo) {
        this.setWorkInfo(workInfo.data);
      } else {
        this.setWorkInfo(workInfo.data);
      }
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
  },
  methods: {
    ...mapActions(["setWorkInfo"]),
    ...mapActions(["setOneWorkInfo"]),
    setOneWorkInfoById(id) {
      const oneWork = this.workInfo.filter(work => {
        return work._id === id;
      });
      this.setOneWorkInfo(oneWork[0]);
    }
  }
};
</script>

<style scoped>
.main {
  padding: 2rem 5rem 2rem 3rem;
  width: 100%;
}
.upload__portfolio {
  background-color: var(--color-grey-light-4);
  color: #333; /* var(--color-secondary-dark); */
  font-size: 2rem;
  padding: 1rem 3rem;
  border-radius: 40px;
  margin: 0 auto;
  width: 35rem;
  text-align: center;
  backface-visibility: hidden;
  animation: pulsate 1.5s infinite ease;
  transition: 0.5s all ease;
}

.upload__portfolio:hover {
  animation: none;
  background: var(--color-secondary-dark);
  color: white; /* var(--color-grey-light-4); */
  border: none;
  cursor: pointer;
}
/*  .work__container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
} */
.work__container {
  display: grid;
  grid-auto-rows: max-content;

  grid-gap: 3rem;

  margin-top: 3rem;
}

.more-than-two {
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
}

.less-than-two {
  grid-template-columns: repeat(auto-fit, minmax(30rem, 30rem));
}

.work {
  /* flex: 0 0 30%; */
  border: 0.5px solid rgba(71, 71, 71, 0.1);
  border-radius: 0 0 3px 3px;
  transition: all 0.4s;
  /* margin-right: 3rem; */
}
.work:hover {
  cursor: pointer;
  transform: translateY(3px);
  box-shadow: 4px 4px 10px rgba(71, 71, 71, 0.2),
    -4px -4px 10px rgba(71, 71, 71, 0.2);
}

.work__image {
  width: 100%;
  min-height: 27rem;
  backface-visibility: hidden;
  background: var(--color-grey-dark-3);
  position: relative;
}
.work__image p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.work__image img {
  width: 100%;
  height: 27rem;
  display: block;
  object-fit: cover;
  object-position: top;
}

.work__title {
  font-size: 1.3rem;
  padding: 1rem 1.5rem 0.5rem;
}

.work__description {
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem 1rem;
  font-weight: 500;
}
.work__description span {
  font-size: 1.1rem;
  font-style: italic;
  color: rgb(59, 59, 59);
  display: inline-block;
  margin-top: 5px;
  padding: 5px 8px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
}

@keyframes pulsate {
  0% {
    transform: scale(1);
    box-shadow: none;
  }

  50% {
    transform: scale(1.03);
    backface-visibility: hidden;
  }

  100% {
    transform: scale(1);
    box-shadow: none;
  }
}
</style>  