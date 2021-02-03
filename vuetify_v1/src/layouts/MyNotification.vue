<template>
  <v-row justify="center">
    <v-dialog
      v-model="success_dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Success
        </v-card-title>
        <v-card-text>
          {{ success_notification }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="errors_dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Errors
        </v-card-title>
        <v-card-text>
          <li
            v-for="(error, key) in errors_notification"
            :key="key"
          >
            {{ error }}
          </li>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'MyNotification',
    computed: {
      success_notification: get('app/success_notification'),
      errors_notification: get('app/errors_notification'),
      success_dialog () {
        return this.success_notification !== undefined
      },
      errors_dialog () {
        return this.errors_notification.length !== 0
      },
    },
    methods: {
      close () {
        this.$store.dispatch('app/reset_notification')
      },
    },
  }
</script>

<style scoped>

</style>
