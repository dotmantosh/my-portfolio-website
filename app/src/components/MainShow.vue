<template>
  <main class="main--show">
    <div class="work--show">
      <figure class="work--show__image">
        <div
          v-if="isUserLoggedIn"
          @click="$emit('setComponentToMount','editform')"
          class="work--edit tooltip"
        >
          <div class="tooltiptext-work">Edit</div>
          <i class="fas fa-edit"></i>
        </div>
        <div
          v-if="isUserLoggedIn"
          @click="$emit('setDeleteWork', true)"
          class="work--delete tooltip"
        >
          <div class="tooltiptext-work">Delete</div>
          <i class="fas fa-trash-alt"></i>
        </div>
        <img :src="`http://localhost:3000/storage/works/${oneWorkInfo.workUi}`" alt="workImage" />
      </figure>
      <figcaption class="figcaption">
        <div class="work--show__caption">
          <h2 class="work--show__title">{{oneWorkInfo.workTitle}}</h2>
          <p class="work--show__date">{{workDate}}</p>
        </div>
        <div class="work--show__description">
          <p>{{oneWorkInfo.workDescription}}</p>
        </div>
      </figcaption>
    </div>
  </main>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["oneWorkInfo", "isUserLoggedIn"]),
    workDate() {
      return moment(this.oneWorkInfo.created).format("D/MMM/YYYY");
    }
  }
};
</script>

<style scoped>
.main--show {
  padding: 2rem 1rem 2rem 2rem;
  width: 100%;
}

.work--show__image {
  width: 100%;
  height: 78vh;
  position: relative;
}

.work--show__image:hover .work--edit,
.work--show__image.work--show__image:hover .work--delete {
  opacity: 0.75;
  display: block;
}

.work--show__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.work--show__caption {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.figcaption {
  background: var(--color-grey-light-5);
  /* margin: 2rem 0; */
  padding: 2rem;
}

.work--show__title {
  font-size: 1.8rem;
}

.work--show__date {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-grey-dark-3);
}

.work--show__description {
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: 0.1rem;
}

.work--edit,
.work--delete {
  position: absolute;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  color: white;
  background: black;
  font-size: 2rem;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.5s;
  cursor: pointer;
}

.work--edit i,
.work--delete i {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.work--edit {
  top: 3rem;
}
.work--delete {
  top: 7rem;
}

/* Tooltip text */
.tooltip .tooltiptext-work {
  visibility: hidden;
  width: min-content;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 3px 0;
  border-radius: 2px;
  opacity: 0;
  font-size: 1.6rem;
  font-weight: 500;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  width: 10rem;
  height: 3.5rem;
  top: 0%;
  left: -101%;
  margin-left: -63px;
  padding-top: 0.8rem;
  transform: translateX(40%);
  z-index: 1;
  transition: all 0.3s ease;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext-work {
  visibility: visible;
  transform: translateX(0%);
  opacity: 1;
}
</style>