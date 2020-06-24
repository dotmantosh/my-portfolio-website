<template>
  <header>
    <div class="container app-header">
      <div class="app-logo">
        <a class="app-logo__link">MPW</a>
      </div>
      <div class="app-search">
        <input
          @keyup.enter="searchUsername"
          v-model="search"
          type="text"
          placeholder="search username"
        />
        <button @click="searchUsername">search</button>
      </div>
      <div v-if="!isUserLoggedIn" class="login">
        <div class="username">
          <label for="username">Username</label>
          <input v-model="userInfo.username" type="text" id="username" />
        </div>
        <div class="password">
          <label for="password">
            Password
            <a href="/forgotpassword" class="forgot">Forgot password?</a>
          </label>
          <input v-model="userInfo.password" @keyup.enter="signin" type="password" id="password" />
        </div>
        <button
          :disabled="this.isLoggingIn"
          @click.prevent="signin"
        >{{!this.isLoggingIn ? 'Log in' : 'Logging in ...'}}</button>
        <span class="danger login-error">{{loginError}}</span>
      </div>
      <div v-if="isUserLoggedIn" class="navbar__user logout">
        <div v-if="user && user.profilePic" class="navbar__user--image">
          <img
            :src="`http://localhost:3000/storage/profilepic/${user.profilePic}`"
            alt="profilepic"
          />
        </div>
        <div v-else-if="!user.profile_pic" class="navbar__user--photo">
          <p>{{userLogo}}</p>
        </div>
        <div class="navbar__user--name">
          <p>{{user.username}}</p>
        </div>

        <button @click.prevent="logout()">logout</button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "LandingHeader",
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      loggingIn: {
        message: "Log in",
        clicked: false
      },
      search: "",
      loginError: "",
      isLoggingIn: false
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
    userLogo() {
      if (this.user.username) {
        return this.user.username[0].toUpperCase();
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions([
      "setToken",
      "setUser",
      "setPersonalInfo",
      "setWorkInfo",
      "setSocialMedia"
    ]),
    logout() {
      this.setToken(null);
      this.setUser(null);
      this.setPersonalInfo(null);
      this.setWorkInfo(null);
      this.setSocialMedia(null);
      this.$router.push("/");
    },
    async signin() {
      this.isLoggingIn = true;
      try {
        const response = await AuthenticationService.signIn(this.userInfo);
        /* this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user); */
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        this.isLoggingIn = false;
        this.$router.push("/portfolio");
      } catch (error) {
        if (error.response.data.error) {
          this.isLoggingIn = false;
          return (this.loginError = error.response.data.error);
        }
        if (error.response.data) {
          this.isLoggingIn = false;
          return (this.loginError = error.response.data);
        }
        if (error.message) {
          this.isLoggingIn = false;
          return (this.loginError = error.message);
        }

        if (error) {
          this.isLoggingIn = false;
          return (this.loginError = error);
        }
      }
    },
    searchUsername() {
      if (this.search.length < 1) {
        return;
      }
      if (this.$route.name === "publicPortfolio") {
        this.$emit("searchUsername", this.search);
        return;
      }
      /* this.$emit("searchUsername") */
      this.$router.push(`/portfolio/${this.search}`);
    }
  },
  watch: {
    loginError() {
      if (this.loginError) {
        this.loggingIn.clicked = false;
      }
    }
  }
};
</script>

<style scoped>
header {
  background: var(--color-secondary);
  padding: 1rem 0;
  color: var(--color-grey-light-1);
  font-size: 1.3rem;
  box-shadow: 0px 4px 10px rgba(71, 71, 71, 0.1),
    0px 8px 10px rgba(71, 71, 71, 0.1);
  z-index: 5;
  /* position: relative; */
  max-width: 100%;
}
.app-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;
}
@media only screen and (max-width: 75em) {
  .app-header {
    padding: 0 4rem;
  }
}

.app-logo__link {
  font-size: 2rem;
  color: var(--color-grey-light-1);
  font-weight: 700;
}
.app-search {
  display: flex;
  align-items: flex-end;
}
@media only screen and (max-width: 37.5em) {
  .app-search {
    order: 1;
    width: 100%;
  }
}
.app-search input {
  margin-right: 10px;
  padding: 0.4rem 0 0.4rem 0.8rem;
  color: var(--color-grey-dark-2);
  border: none;
  font-family: inherit;
  font-size: 1.3rem;
  border-radius: 50px;
}
@media only screen and (max-width: 37.5em) {
  .app-search input {
    width: 100%;
    margin-top: 1rem;
  }
}

.app-search input::-webkit-input-placeholder {
  color: var(--color-grey-light-4);
  font-weight: 100;
  font-size: 1.2rem;
}

.login,
.logout {
  display: flex;
  align-items: flex-end;
  position: relative;
}
.logout button {
  align-self: center;
  margin-left: 20px;
}

.login label {
  display: block;
}

.login input {
  margin-right: 10px;
  padding: 0.2rem 0 0.2rem 0.5rem;
  font-family: inherit;
  font-size: 1.3rem;
  border: none;
  border-radius: 3px;
}
.login-error {
  position: absolute;
  bottom: -25px;
  left: 30%;
}
button {
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  background: var(--color-grey-light-1);
  border: none;
  border-radius: 2px;
}
.navbar__user {
  display: flex;
  align-self: center;
  margin-right: 30px;
}

.navbar__user--photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-grey-dark-2);
  position: relative;
  margin-right: 10px;
}
.navbar__user--image img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  margin-right: 10px;
  object-fit: cover;
  object-position: top;
}
.navbar__user--photo p {
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.navbar__user--name {
  font-size: 14px;
  align-self: center;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
}
.forgot {
  font-size: 1rem;
  color: #000;
  display: inline-block;
  margin-left: 1.5rem;
  text-decoration: none;
}
</style>