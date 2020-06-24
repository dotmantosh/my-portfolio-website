<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <LandingHeader />
    <div class="container">
      <div class="app-box">
        <div class="app-box__left">
          <h4 class="site-info">
            Store your works here.
            <br />Send a link to your potential Employees to see your works
            <br />or download your resume
          </h4>
        </div>
        <div class="app-box__right">
          <div class="app-box__right--content">
            <h1>Create an account</h1>
            <p>It's quick and easy.</p>
            <div class="form">
              <div class="form-item">
                <input v-model="signupUsername" type="text" placeholder="Username" />
                <label for>Username</label>
              </div>
              <div class="form-item">
                <input v-model="signupEmail" type="text" placeholder="Email" />
                <label for>Email</label>
              </div>
              <div class="form-item">
                <input
                  v-model="signupPassword"
                  @keyup.enter="signup()"
                  type="password"
                  placeholder="Password"
                />
                <label for>Password</label>
              </div>
              <button
                :disabled="isSignUpClicked"
                @click.prevent="signup()"
              >{{isSignUpClicked? 'Please wait': 'Sign Up'}}</button>
              <p v-if="signupError" class="danger text-center f-small">{{ signupError }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthenticationService from "../services/AuthenticationService";
import LandingHeader from "@/components/LandingHeader.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "home",
  components: {
    LandingHeader
  },
  data() {
    return {
      signupError: null,
      loginError: null,
      loginUsername: "",
      loginPassword: "",
      signupUsername: "",
      signupPassword: "",
      signupEmail: "",
      isSignUpClicked: false,
      isLoggingIn: false
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.$router.push("/portfolio");
    }
  },
  methods: {
    ...mapActions(["setToken", "setUser"]),
    async signup() {
      this.isSignUpClicked = true;
      try {
        const response = await AuthenticationService.signUp({
          username: this.signupUsername,
          email: this.signupEmail,
          password: this.signupPassword
        });
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        this.isSignUpClicked = false;
        this.$router.push("/portfolio");
      } catch (error) {
        if (error.response.data.error) {
          this.isSignUpClicked = false;
          return (this.signupError = error.response.data.error);
        }
        if (error.response.data) {
          this.isSignUpClicked = false;
          return (this.signupError = error.response.data);
        }

        if (error.message) {
          this.isSignUpClicked = false;
          return (this.signupError = error.message);
        }

        if (error) {
          this.isSignUpClicked = false;
          return (this.signupError = error);
        }
      }

      /* .then(response => {
          if (response.data.name) {
            this.signupError = response.data;
          } else {
            this.$root.authUser = response.data;
            localStorage.setItem("authUser", JSON.stringify(response.data));
            this.signupError = null;
            this.$router.push("portfolio");
          }
        })
        .catch(err => {
          this.signupError = err;
        }); */
    }
  }
};
</script>

<style scoped>
.home {
  background-image: linear-gradient(
    to right bottom,
    var(--color-grey-light-4),
    var(--color-primary-3)
  );
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.app-box {
  display: flex;
  justify-content: space-between;
  padding-top: 4rem;
}
@media only screen and (max-width: 40.67em) {
  .app-box {
    flex-direction: column;
    align-items: center;
    padding-top: 0;
  }
}

.app-box__left {
  width: 45%;
}
@media only screen and (max-width: 75em) {
  .app-box__left {
    margin-left: 3rem;
  }
}
@media only screen and (max-width: 40.67em) {
  .app-box__left {
    width: 100%;
    text-align: center;
    padding: 2rem;
  }
}

.app-box__left h4 {
  width: 80%;
  font-size: 2rem;
  line-height: 4rem;
  margin-top: 3rem;
}

@media only screen and (max-width: 40.67em) {
  .app-box__left h4 {
    width: 100%;
  }
}
.app-box__right {
  width: 45%;
  justify-self: flex-end;
}

@media only screen and (max-width: 43.75em) {
  .app-box__right {
    margin-right: 3rem;
  }
}
.app-box__right--content {
  width: 30rem;
  margin: 0 auto;
}
.app-box__right h1 {
  font-size: 3rem;
}

.app-box__right p {
  font-size: 1.4rem;
  font-weight: 300;
}
/* @media only screen and (max-width: 40.67em) {
  .app-box__right p {
    text-align: center;
  }
} */
.form {
  margin-top: 2rem;
}

.form-item {
  margin-bottom: 1rem;
}

.form-item input {
  width: 100%;
  display: block;
  /* margin: 0 auto; */
  font-size: 1.3rem;
  padding: 1rem 2rem;
  font-family: inherit;
  outline: none;
  border: none;
  letter-spacing: 0.15rem;
  border-radius: 3px;
}

.form-item input:focus {
  outline: none;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
}
.form-item label {
  margin-left: 2rem;
  margin-top: 0.5rem;
  display: block;
  transition: all 0.3s;
  letter-spacing: 0.1rem;
}

.form-item input:placeholder-shown + label {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4rem);
}

.form button {
  width: 100%;
  display: inline-block;
  border: none;
  border-radius: 3px;
  padding: 1rem 0;
}

.form button:hover {
  background-image: linear-gradient(
    to bottom right,
    var(--color-secondary-light),
    var(--color-secondary-dark)
  );
}
</style>