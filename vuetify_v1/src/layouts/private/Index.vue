<template>
  <v-app>
    <private-bar />

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
      // console.log(this.auth)
    },
  }
</script>
