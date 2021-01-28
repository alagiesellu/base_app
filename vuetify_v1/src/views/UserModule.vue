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
          color="success"
        >
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
                        @click="doEdit"
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
                        @click="doDelete"
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
        </material-card>
      </v-col>
    </v-row>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ form.title }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <template>
                  <v-form
                    ref="form"
                    v-model="form.valid"
                    lazy-validation
                    v-if="form.inputs"
                  >
                    <v-text-field
                      v-model="form.inputs.name"
                      :counter="10"
                      :rules="form.rules.name"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-form>
                </template>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="submit"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import MyPagination from '@/layouts/MyPagination'
  const model = 'users'

  export default {
    name: 'UserModuleView',
    components: { MyPagination },
    data: () => ({
      title: 'Users',
      icon: 'mdi-clipboard-text',
      dialog: false,
      form: {
        valid: true,
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
      doDelete () {
        this.form = {
          title: `Delete ${this.title}`,
          inputs: {
            id: this.record.id,
          },
        }
        this.dialog = true
      },
      doEdit () {
        this.form = {
          title: `Edit ${this.title}`,
          inputs: this.record,
          rules: {
            name: [
              v => !!v || 'Name is required',
              v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
          },
        }
        this.dialog = true
      },
      submit () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      getRecords (page = this.records.current + 1 || 1) {
        this.$store.dispatch(`${model}/records`, { page: page })
      },
      getRecord (data) {
        if (data.value) { this.$store.dispatch(`${model}/record`, { id: data.item.id }) }
      },
    },
  }
</script>
