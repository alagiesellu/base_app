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
        <v-card
          class="mx-auto"
        >
          <v-card-text>
            <div>{{ $store.state.app.name }}</div>
            <p class="display-1 text--primary">
              Log•in
            </p>
            <div class="text--primary">
              To have access to dashboard.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              block
              x-large
              @click="doLogin"
            >
              Login Form
            </v-btn>
          </v-card-actions>
        </v-card>
        <my-form-dialog
          :form="form"
          @close="close"
          @submit="submit"
          @data_input="data_input"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MyFormDialog from '@/layouts/MyFormDialog'
  import { get } from 'vuex-pathify'
  const model = 'login'
  export default {
    name: 'LoginView',
    components: { MyFormDialog },
    data: () => ({
      title: 'Login',
      form: {
        dialog: false,
        types: {},
      },
      form_: {
        dialog: true,
        method: 'post',
        title: 'Login',
        description: 'Provide your login credentials.',
        inputs: {
          email: '',
          password: '',
        },
        counters: {},
        types: {
          email: 'text',
          password: 'password',
        },
        labels: {
          email: 'Email',
          password: 'Password',
        },
        rules: {
          email: [
            v => !!v || 'Email is required',
            v => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(v) || 'Invalid e-mail.'
            },
          ],
          password: [
            v => !!v || 'Password is required',
            v =>
              (v && v.length <= process.env.VUE_APP_MAX_CHAR_LENGTH) ||
              `Password must be less than ${process.env.VUE_APP_MAX_CHAR_LENGTH} characters`,
          ],
        },
        items: {},
        item_keys: {},
        prefixes: {},
        suffixes: {},
        multiples: {},
      },
    }),
    computed: {
      token: get(`${model}/token`),
    },
    methods: {
      doLogin () {
        this.form = Object.assign({}, this.form_)
      },
      data_input (data) {
        this.form.inputs[data.idx] = data.input
      },
      close (closeDialog = true) {
        this.form.inputs = {}
        this.form.dialog = !closeDialog
      },
      async submit () {
        await this.$store.dispatch(`${model}/${this.form.method}`, this.form.inputs)
        if (this.token) {
          this.$cookies.set(process.env.VUE_APP_BEARER_TOKEN_COOKIES_KEY, this.token)
          window.location.pathname = process.env.VUE_APP_URL_START
        }
        this.close(false)
      },
    },
  }
</script>
