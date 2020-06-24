<template>
  <div class="sidebar">
    <div @click="navigateBack()" class="back--icon">
      <i class="fas fa-long-arrow-alt-left"></i>
    </div>
    <a :href="`http://${oneWorkInfo.workLink1}`" target="_blank" class="work--link__link">
      <div v-if="oneWorkInfo && oneWorkInfo.workLink1" class="work--link">
        <h3 class="work--link__title">Home page</h3>
        <p>{{oneWorkInfo.workLink1}}</p>
      </div>
    </a>
    <a :href="`http://${oneWorkInfo.workLink2}`" target="_blank" class="work--link__link">
      <div v-if="oneWorkInfo && oneWorkInfo.workLink2" class="work--link">
        <h3 class="work--link__title">Work link 2</h3>
        <p>{{oneWorkInfo.workLink2}}</p>
      </div>
    </a>
    <a :href="`http://${oneWorkInfo.workLink3}`" target="_blank" class="work--link__link">
      <div v-if="oneWorkInfo && oneWorkInfo.workLink3" class="work--link">
        <h3 class="work--link__title">Work link 3</h3>
        <p>{{oneWorkInfo.workLink3}}</p>
      </div>
    </a>
    <a :href="`http://${oneWorkInfo.workLink4}`" target="_blank" class="work--link__link">
      <div v-if="oneWorkInfo && oneWorkInfo.workLink4" class="work--link">
        <h3 class="work--link__title">Work link 4</h3>
        <p>{{oneWorkInfo.workLink4}}</p>
      </div>
    </a>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["oneWorkInfo", "user"])
  },
  methods: {
    navigateBack() {
      this.$router.push(`/portfolio/${this.user.username}`);
    }
  }
};
</script>


<style scoped>
.back--icon {
  width: 3rem;
  border: 1px solid transparent;
}
.back--icon i {
  font-size: 2rem;
  text-align: center;
  margin: 0 auto;
  display: block;
}
.back--icon:hover {
  color: #222;
  cursor: pointer;
  border: 0.5px dashed #222;
}
.back--icon:hover i {
  color: #222;
}
.work--link {
  background-image: linear-gradient(
    to right bottom,
    var(--color-secondary-light),
    var(--color-secondary-dark)
  );

  color: var(--color-grey-light-1);
  padding: 0.8rem 2rem;
  margin-bottom: 1.5rem;
  border-radius: 2px;
  transition: all 0.2s;
}

.work--link:hover {
  cursor: pointer;
  transform: translateY(2px);
  box-shadow: 2px 4px 4px rgba(83, 83, 83, 0.2),
    -2px -4px 4px rgba(83, 83, 83, 0.2);
}

.work--link__title {
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.work--link__link {
  font-size: 1.2rem;
  margin-left: 0.8rem;
  text-decoration: none;
  color: currentColor;
}
</style>