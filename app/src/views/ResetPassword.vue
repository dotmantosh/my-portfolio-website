<template>
	<div>
		<LandingHeader />
		<ResetPasswordForm/>
	</div>
  
	
</template>

<script>
import LandingHeader from "../components/LandingHeader.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue"
export default {
	name: "resetPassword",
	components:{
		LandingHeader,
		ResetPasswordForm
	}
}
</script>

<style scoped>

</style>