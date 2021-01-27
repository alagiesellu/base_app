<template>
  <v-container
    id="icons-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Icons"
      link="components/icons"
    />

    <v-row>
      <v-col cols="12">
        <material-card
          icon="mdi-clipboard-text"
          icon-small
          title="Simple Table"
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
              </td>
            </template>
          </v-data-table>
          <my-pagination
            :records="records"
            @input="getRecords"
          />
        </material-card>
      </v-col>

      <v-col
        class="mx-auto"
        cols="auto"
      >
        <app-btn
          href="https://github.com/Templarian/MaterialDesign"
          large
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-icon left>
            mdi-material-design
          </v-icon>

          <span>See all icons</span>
        </app-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import MyPagination from '@/layouts/MyPagination'

  export default {
    name: 'UserModuleView',
    components: { MyPagination },
    data: () => ({
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
      records: get('users/records'),
      record: get('users/record'),
      loading: get('users/loading'),
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
      getRecords (page = this.records.current + 1 || 1) {
        this.$store.dispatch('users/records', { page: page })
      },
      getRecord (data) {
        if (data.value) { this.$store.dispatch('users/record', { id: data.item.id }) }
      },
    },
  }
</script>
