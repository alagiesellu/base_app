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
                :loading="loading"
                single-expand
                item-key="id"
                show-expand
                hide-default-footer
                @item-expanded="getRecord"
                class="elevation-1"
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
                              {{ record[key.value] }}
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
        method: null,
        inputs: null,
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
      records: get(`${model}/records`),
      record: get(`${model}/record`),
      loading: get(`${model}/loading`),
      more_headers () {
        return [this.headers][0].concat([
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
      data_input (data) {
        this.form.inputs[data.idx] = data.input
      },
      close () {
        this.form = {
          dialog: false,
        }
      },
      doDestroy () {
        this.form = {
          dialog: true,
          method: 'destroy',
          title: 'Delete Record',
          description: 'Are you sure you want to delete this record?',
          inputs: {
            id: this.record.id,
          },
          rules: {},
          counters: {},
          suffixes: {},
          prefixes: {},
          types: {},
          labels: {},
        }
      },
      doUpdate () {
        this.form = {
          dialog: true,
          method: 'upload',
          title: `Edit ${this.title}`,
          description: 'Edit record details',
          inputs: this.record,
          counters: {
            name: process.env.VUE_APP_MAX_CHAR_LENGTH,
            email: process.env.VUE_APP_MAX_CHAR_LENGTH,
          },
          prefixes: {},
          suffixes: {},
          types: {
            name: 'text',
            email: 'email',
          },
          labels: {
            name: 'Name',
            email: 'Email',
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
          },
        }
      },
      doStore () {
        this.form = {
          dialog: true,
          method: 'store',
          title: 'Store Record',
          description: 'Add a new record',
          inputs: {
            name: '',
            email: '',
          },
          counters: {
            name: process.env.VUE_APP_MAX_CHAR_LENGTH,
            email: process.env.VUE_APP_MAX_CHAR_LENGTH,
          },
          prefixes: {},
          suffixes: {},
          types: {
            name: 'text',
            email: 'email',
          },
          labels: {
            name: 'Name',
            email: 'Email',
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
          },
        }
      },
      submit () {
        this.$store.dispatch(`${model}/${this.form.method}`, this.form.inputs)
        this.getRecords()
        this.close()
      },
      getRecords (page = this.records.current + 1 || 1) {
        this.$store.dispatch(`${model}/records`, { page: page })
      },
      getRecord (data) {
        if (data.value) {
          this.$store.dispatch(`${model}/record`, { id: data.item.id })
        }
      },
    },
  }
</script>
