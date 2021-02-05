<template>
  <v-app>
    <v-progress-linear
      color="primary"
      indeterminate
      :active="$store.state.app.loading.length !== 0"
    />
    <v-container class="pt-lg-16 mt-lg-16">
      <router-view :key="$route.path" />
    </v-container>
    <my-notification />
  </v-app>
</template>

<script>
  import MyNotification from '@/layouts/MyNotification'
  export default {
    name: 'PublicLayout',
    components: { MyNotification },
    mounted () {
      this.$store.dispatch('app/get_auth_user')
        .then(() => {
          window.location.pathname = process.env.VUE_APP_URL_START
        })
    },
  }
</script>
