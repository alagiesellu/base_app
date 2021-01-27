<template>
  <v-app>
    <v-container class="pt-lg-16 mt-lg-16">
      <router-view :key="$route.path" />
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'PublicLayout',
  }
</script>
