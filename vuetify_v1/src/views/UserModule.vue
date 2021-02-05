<template>
  <v-container
    id="icons-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <material-card
          :icon="icon"
          icon-small
          :title="title"
          color="primary"
        >
          <v-row>
            <v-col cols="12">
              <v-btn
                tile
                color="primary"
                class="float-right"
                @click="doStore"
              >
                <v-icon
                  left
                  dark
                >
                  mdi-plus
                </v-icon>
                New Record
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="records.data"
                :items-per-page="records.per_page"
                single-expand
                item-key="id"
                show-expand
                hide-default-footer
                class="elevation-1"
                @item-expanded="getRecord"
              >
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <v-row>
                      <v-col cols="10">
                        <v-list>
                          <v-list-item
                            v-for="(key, index) in more_headers"
                            :key="index"
                          >
                            <v-list-item-content>
                              {{ key.text }}:
                            </v-list-item-content>
                            <v-list-item-content class="subheading font-weight-bold">
                              <span v-if="key.object">
                                <li
                                  v-for="el in record[key.value]"
                                  :key="el"
                                >
                                  {{ key.list[el] }}
                                </li>
                              </span>
                              <span v-else>
                                {{ record[key.value] }}
                              </span>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="2">
                        <v-container>
                          <v-btn
                            tile
                            :block="true"
                            color="warning"
                            @click="doUpdate"
                          >
                            <v-icon
                              left
                              dark
                            >
                              mdi-pencil
                            </v-icon>
                            Edit
                          </v-btn>
                          <v-btn
                            tile
                            :block="true"
                            color="error"
                            @click="doDestroy"
                          >
                            <v-icon
                              left
                              dark
                            >
                              mdi-delete
                            </v-icon>
                            Delete
                          </v-btn>
                          <v-btn
                            :block="true"
                            tile
                          >
                            Normal
                          </v-btn>
                        </v-container>
                      </v-col>
                    </v-row>
                  </td>
                </template>
              </v-data-table>
              <my-pagination
                :records="records"
                @input="getRecords"
              />
            </v-col>
          </v-row>
        </material-card>
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
  import MyPagination from '@/layouts/MyPagination'
  import MyFormDialog from '@/layouts/MyFormDialog'
  const model = 'users'

  export default {
    name: 'UserModuleView',
    components: { MyFormDialog, MyPagination },
    data: () => ({
      title: 'Users',
      icon: 'mdi-account-multiple',
      form: {
        dialog: false,
        loading: false,
        types: {},
        items: {}, // to auth load items like roles, etc that would be needed in the form => load_form_items ()
      },
      form_: {
        dialog: true,
        loading: false,
        inputs: {
          name: '',
          email: '',
          roles: [],
        },
        counters: {
          name: process.env.VUE_APP_MAX_CHAR_LENGTH,
          email: process.env.VUE_APP_MAX_CHAR_LENGTH,
        },
        prefixes: {},
        suffixes: {},
        multiples: {
          roles: true,
        },
        types: {
          name: 'text',
          email: 'email',
          roles: 'select',
        },
        labels: {
          name: 'Name',
          email: 'Email',
          roles: 'Roles',
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v =>
              (v && v.length <= process.env.VUE_APP_MAX_CHAR_LENGTH) ||
              `Name must be less than ${process.env.VUE_APP_MAX_CHAR_LENGTH} characters`,
          ],
          email: [
            v => !!v || 'Email is required',
            v =>
              (v && v.length <= process.env.VUE_APP_MAX_CHAR_LENGTH) ||
              `Email must be less than ${process.env.VUE_APP_MAX_CHAR_LENGTH} characters`,
          ],
          roles: [
            v => !!v || 'Roles is required',
          ],
        },
        items: {
          roles: [],
        },
        item_keys: {
          roles: {
            value: 'id',
            text: 'name',
          },
        },
      },
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Email',
          value: 'email',
        },
      ],
    }),

    computed: {
      configs: get('app/configs'),
      records: get(`${model}/records`),
      record: get(`${model}/record`),
      more_headers () {
        return [this.headers][0].concat([
          {
            text: 'Roles',
            value: 'roles',
            object: true,
            list: this.configs.roles,
          },
          {
            text: 'Created At',
            value: 'created_at',
            datetime: true,
          },
        ])
      },
    },
    mounted () {
      this.getRecords()
    },
    methods: {
      load_form_items () {
        this.form_.items.roles = []
        for (const role in this.configs.roles) {
          this.form_.items.roles.push({
            id: role,
            name: this.configs.roles[role],
          })
        }
      },
      data_input (data) {
        this.form.inputs[data.idx] = data.input
      },
      close (closeDialog = true, loading = false) {
        this.form.inputs = {}
        this.form.dialog = !closeDialog
        this.form.loading = loading
      },
      doDestroy () {
        this.form = Object.assign({}, this.form_)
        this.form.method = 'destroy'
        this.form.title = 'Delete Record'
        this.form.description = 'Are you sure you want to delete this record?'
        this.form.inputs = {
          id: this.record.id,
        }
      },
      doUpdate () {
        this.load_form_items()
        this.form = Object.assign({}, this.form_)
        this.form.method = 'update'
        this.form.title = 'Edit Record'
        this.form.description = 'Are you sure you want to edit record details?'
        this.form.inputs = this.record
      },
      doStore () {
        this.load_form_items()
        this.form = Object.assign({}, this.form_)
        this.form.method = 'store'
        this.form.title = 'Store Record'
        this.form.description = 'Add a new record'
        this.form.inputs = {
          name: '',
          email: '',
          roles: [],
        }
      },
      async submit () {
        this.form.loading = true
        await this.$store.dispatch(`${model}/${this.form.method}`, this.form.inputs)
          .then(() => {
            this.getRecords()
            this.close(false)
          })
          .catch(() => {
            this.form.loading = false
          })
      },
      getRecords (page = this.records.current + 1 || 1) {
        return this.$store.dispatch(`${model}/records`, { page: page })
      },
      getRecord (data) {
        if (data.value) {
          this.$store.dispatch(`${model}/record`, { id: data.item.id })
        }
      },
    },
  }
</script>
