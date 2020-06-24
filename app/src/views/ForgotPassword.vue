<template>
<div>
<LandingHeader/>

  <div class="container">

    
    <form @submit.prevent class="form">
        <div class="form--title form-item">
            <h1>Reset Password</h1>
        </div>
      
      <div class="form-item">
        <label for="email">Enter E-mail</label>
        <input
          v-model="email"
          autofocus
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </div>
      
      <small v-if="resetPasswordEmailError" class="danger fontsize">{{resetPasswordEmailError}}</small>
      
      <button
        @click.prevent="verifyEmail"
        @keypress.enter="verifyEmail"
        :disabled="this.isClicked"
        type="button"
        class="submit"
      >{{isClicked? 'Please wait...': 'Send'}}</button>

      <div v-if="isSuccess" class="form--title success">
            <h3>{{ successMessage }}</h3>
        </div>

    </form>
  </div>
  </div>
</template>

<script>
import LandingHeader from '../components/LandingHeader'
import AuthenticationService from '../services/AuthenticationService'
export default {
  components:{
    LandingHeader
  },
    data(){
        return{
            email: '',
            successMessage: '',
            isSuccess: false,
            resetPasswordEmailError: null,
            isClicked: false,
            emailVerified: ''
        }
    },
    methods:{
        async verifyEmail(){
            try {
                this.isClicked = true
                const emailVerified = (await AuthenticationService.verifyEmail({email: this.email})).data
                this.emailVerified = emailVerified
                this.isClicked = false
                this.isSuccess = true
                this.successMessage = emailVerified.message
            } catch (error) {
              if(error.response.data.error){
                this.isClicked = false
                return (this.resetPasswordEmailError = error.response.data.error)
              }
        if (error.response.data) {
          this.isClicked = false;
          return (this.resetPasswordEmailError = error.response.data);
        }

        if (error.message) {
          this.isClicked = false;
          return (this.resetPasswordEmailError = error.message);
        }

        if (error) {
          this.isClicked = false;
          return (this.resetPasswordEmailError = error);
        }
      }
        }
    }
}
</script>

<style scoped>
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

.submit {
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
.fontsize{
  font-size: 1.2rem;
}
</style>