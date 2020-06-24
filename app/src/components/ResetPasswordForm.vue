<template>
  <div class="container">
    <form @submit.prevent class="form">
        <div class="form--title form-item">
      <h1>Reset Password</h1>
    </div>
      
      <div class="form-item">
        <label for="resetpassword">New Password</label>
        <input
          v-model="password"
          type="text"
          name="password"
          id="resetpassword"
          placeholder="New Password"
        />
      </div>
      <div class="form-item">
          <label for="resetpassword2">Confirm Password</label>
        <input
          v-model="password2"
          @keypress.enter="resetPassword"
          type="text"
          name="password2"
          id="resetpassword2"
          placeholder="confirm Password"
        />
      </div>
      <small v-if="resetPasswordError" class="danger fontsize">{{resetPasswordError}}</small>
      
      <button
        @click.prevent="resetPassword"
        :disabled="this.isClicked"
        type="button"
        class="submit"
      >{{isClicked? 'Updating...': 'Update Password'}}</button>
    </form>
    <div v-if="isSuccess" class="form--title success">
      <h2>Password was changed successfully, Please wait while we redirect you to login</h2>
    </div>
  </div>  
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
    data(){
      return {
        password: '',
        password2: '',
        resetPasswordError: null,
        isClicked: false,
        isSuccess: false
      }
    },
    methods:{
        async resetPassword(){
            const cridentials = {
                password: this.password,
                password2: this.password2
            }
            try{
              this.isClicked = true
              await AuthenticationService.resetPassword(cridentials, this.$route.params.token)
              this.isSuccess = true
              this.isClicked = false
              this.$router.push('/')
            } catch (error) {
              if(error.response.data.error){
                this.isClicked = false
                return (this.resetPasswordError = error.response.data.error)
              }
        if (error.response.data) {
          this.isClicked = false;
          return (this.resetPasswordError = error.response.data);
        }

        if (error.message) {
          this.isClicked = false;
          return (this.resetPasswordError = error.message);
        }

        if (error) {
          this.isClicked = false;
          return (this.resetPasswordError = error);
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
  font-size: 1.3rem;
}
</style>