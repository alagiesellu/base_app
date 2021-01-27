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
                <h2>
                  <small>Name:</small>
                  {{ record.name }}
                </h2>
                <h2>
                  <small>Name:</small>
                  {{ headers }}
                </h2>
                <h2>
                  <small>Name:</small>
                  {{ record.name }}
                </h2>
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
      more_headers: [
        {
          text: 'Created At',
          value: 'created_at',
        },
      ],
    }),

    computed: {
      records: get('users/records'),
      record: get('users/record'),
      loading: get('users/loading'),
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
