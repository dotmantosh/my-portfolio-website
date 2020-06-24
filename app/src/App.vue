<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.getOrSetUser();
  },
  methods: {
    getOrSetUser() {
      const authUser = localStorage.getItem("authUser");
      if (authUser) {
        this.$root.authUser = JSON.parse(authUser);
      } else {
        this.$root.authUser = null;
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700&display=swap");
/* @import url("./css/style.css"); */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
:root {
  --color-primary-1: #2cb5e8;
  --color-primary-2: #1fc8db;
  --color-primary-3: #9fb8ad;

  --color-secondary: #eb2f64;
  --color-secondary-light: #ff3366;
  --color-secondary-dark: #ba265d;

  --color-grey-light-1: #faf9f9;
  --color-grey-light-2: #f4f2f2;
  --color-grey-light-3: #f0eeee;
  --color-grey-light-4: #ccc;
  --color-grey-light-5: #fdfcfc;

  --color-grey-dark-1: #333;
  --color-grey-dark-2: #777;
  --color-grey-dark-3: #999;

  --work-width: 30rem;
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

@media only screen and (max-width: 68.75em) {
  html {
    font-size: 50%;
  }
}

#app {
  font-family: "Raleway";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 114rem;
  margin: 0 auto;
}

.sidebar {
  background: var(--color-grey-light-5);
  min-height: inherit;
  padding: 2rem 3rem;
  width: 28rem;
  box-shadow: 1px 0 5px rgba(71, 71, 71, 0.1);
  flex-shrink: 0;
}

.box {
  display: flex;
  min-height: calc(100vh - 90px);
}

@media only screen and (max-width: 43.75em) {
  .box {
    flex-direction: column;
  }
}

button {
  cursor: pointer;
}
button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.2);
  border-radius: none;
}
button:focus {
  outline: 0 none;
}
// tooltip
.tooltip {
  position: relative;
  display: inline-block; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: min-content;
  background-color: var(--color-secondary-dark);
  color: #fff;
  text-align: center;
  padding: 2px 0;
  border-radius: 6px;
  opacity: 0;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  width: 8rem;
  top: 150%;
  left: 50%;
  margin-left: -40px;
  z-index: 1;
  transition: all 0.8s ease;
  font-weight: 400;
  font-size: 1.2rem;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

//utilities
.text-center {
  text-align: center !important;
}

.danger {
  color: red !important;
}

.success {
  color: rgb(0, 255, 221) !important;
}

.f-small {
  font-size: 1.2rem !important;
}
</style>
