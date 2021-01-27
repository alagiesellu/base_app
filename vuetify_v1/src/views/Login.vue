<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="5"
      >
        <material-card
          color="primary"
          icon="mdi-account-key"
        >
          <template #title>
            Login — <small class="text-body-1">Complete your profile</small>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>

                <v-col cols="12">
                  <v-text-field
                    color="red"
                    label="Username"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    color="red"
                    label="Password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    min-width="150"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'LoginView',
    mounted () {
    },
  }
</script>
