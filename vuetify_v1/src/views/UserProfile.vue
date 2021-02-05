<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <app-card class="mt-4 text-center">
          <v-img
            class="rounded-circle elevation-6 mt-n12 d-inline-block"
            src="/default.png"
            width="128"
          />

          <v-card-text class="text-center">
            <h4 class="text-h2 mb-3 text--primary">
              {{ $store.state.app.auth.name }}
            </h4>
            <h6 class="text-h4 mb-2 text--secondary">
              {{ $store.state.app.auth.email }}
            </h6>
            <v-card-text>
              <v-chip-group
                v-if="configs.roles"
                active-class="grey accent-4 white--text"
                column
              >
                <v-chip
                  v-for="role in $store.state.app.auth.roles"
                  :key="role"
                >
                  {{ configs.roles[role] }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
            <v-btn
              class="mr-0"
              color="primary"
              min-width="100"
              rounded
              @click="doPasswordChange"
            >
              <v-icon
                left
                dark
              >
                mdi-key
              </v-icon>
              Change Password
            </v-btn>
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
    <template>
      <v-row justify="center">
        <my-form-dialog
          :form="form"
          @close="close"
          @submit="submit"
          @data_input="data_input"
        />
      </v-row>
    </template>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import MyFormDialog from '@/layouts/MyFormDialog'
  const model = 'users'

  export default {
    name: 'UserProfileView',
    components: { MyFormDialog },
    data: () => ({
      form: {
        dialog: false,
        loading: false,
        types: {},
        items: {}, // to auth load items like roles, etc that would be needed in the form => load_form_items ()
      },
      form_: {
        dialog: true,
        loading: false,
        method: 'password',
        inputs: {
          password: '',
          confirm: '',
        },
        counters: {},
        prefixes: {},
        suffixes: {},
        multiples: {},
        types: {
          password: 'password',
          confirm: 'password',
        },
        labels: {
          password: 'Password',
          confirm: 'Confirm Password',
        },
        rules: {
          password: [
            v => !!v || 'Password is required',
          ],
          confirm: [
            v => !!v || 'Confirm password is required',
          ],
        },
        items: {},
        item_keys: {},
      },
    }),
    computed: {
      configs: get('app/configs'),
    },
    mounted () {
      this.getRecord()
    },
    methods: {
      getRecord () {
        this.$store.dispatch('app/get_auth_user')
      },
      doPasswordChange () {
        this.form = Object.assign({}, this.form_)
        this.form.title = 'Change Password'
        this.form.description = 'Change your login password.'
      },
      data_input (data) {
        this.form.inputs[data.idx] = data.input
      },
      close (closeDialog = true, loading = false) {
        this.form.inputs = {}
        this.form.dialog = !closeDialog
        this.form.loading = loading
      },
      async submit () {
        this.form.loading = true
        this.form.inputs.id = this.$store.state.app.auth.id
        await this.$store.dispatch(`${model}/${this.form.method}`, this.form.inputs)
          .then(() => {
            this.getRecord()
            this.close(false)
          })
          .catch(() => {
            this.form.loading = false
          })
      },
    },
  }
</script>
