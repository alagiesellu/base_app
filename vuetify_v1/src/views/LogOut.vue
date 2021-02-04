<template>
  <v-container
    id="error-view"
    class="fill-height text-center"
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <h1 class="text-h1 mb-16 font-weight-bold">
          Log Out
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'LogOutView',
    mounted () {
      this.$store.dispatch('app/logout_auth_user')
        .then(() => {
          this.$cookies.remove(process.env.VUE_APP_BEARER_TOKEN_COOKIES_KEY)
          window.location.pathname = process.env.VUE_APP_LOGIN_URL
        })
        .catch(() => {
          this.$store.state.app.errors_notification.push('Logout fail. Try again later.')
        })
    },
  }
</script>
