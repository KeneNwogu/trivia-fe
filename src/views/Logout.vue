<template>
    <p style="text-align: center">You have successfully logged out. Log in <router-link to="/login">here</router-link></p>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted: function(){
        this.$store.dispatch("logoutUser");
    }
}
</script>