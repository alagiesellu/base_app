<template>
  <v-pagination
    v-model="records.current_page"
    :length="records.last_page"
    :total-visible="6"
    class="my-4"
    @input="emit_input"
  ></v-pagination>
</template>

<script>
  export default {
    name: 'MyPagination',
    props: {
      records: Object,
    },
    methods: {
      emit_input (page) {
        this.$emit('input', page)
      },
    },
  }
</script>

<style scoped>

</style>
