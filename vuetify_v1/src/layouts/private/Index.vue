<template>
  <v-app>
    <private-bar />

    <v-progress-linear
      color="primary"
      indeterminate
      :active="$store.state.app.loading.length !== 0"
    ></v-progress-linear>

    <private-drawer />

    <private-view />

    <private-footer />

    <private-settings />

    <private-notification />
  </v-app>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'PrivateLayout',

    components: {
      PrivateNotification: () => import(
        /* webpackChunkName: "private-app-bar" */
        './Notification'
        ),
      PrivateBar: () => import(
        /* webpackChunkName: "private-app-bar" */
        './AppBar'
        ),
      PrivateDrawer: () => import(
        /* webpackChunkName: "private-drawer" */
        './Drawer'
      ),
      PrivateFooter: () => import(
        /* webpackChunkName: "private-footer" */
        './Footer'
      ),
      PrivateSettings: () => import(
        /* webpackChunkName: "private-settings" */
        './Settings'
      ),
      PrivateView: () => import(
        /* webpackChunkName: "private-view" */
        './View'
      ),
    },
    computed: {
      auth: get('app/auth'),
    },
    mounted () {
      this.$store.dispatch('app/get_auth_user')
        .then(() => {
          this.$store.dispatch('app/load_nav_items')
          this.$store.dispatch('app/load_configs')
        })
        .catch(() => {
          window.location.pathname = process.env.VUE_APP_LOGIN_URL
        })
    },
  }
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
