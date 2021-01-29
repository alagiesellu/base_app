<template>
  <v-col>
    <v-text-field
      v-model="input.m"
      :counter="counter"
      :rules="rules"
      :label="label"
      :type="type"
      :suffix="suffix"
      :prefix="prefix"
      @change="$emit('data_input', { idx: idx, input: input.m })"
    ></v-text-field>
  </v-col>
</template>

<script>
  export default {
    name: 'MyFormInputs',
    props: {
      idx: String,
      input: Object,
      counter: Number,
      rules: Array,
      label: String,
      type: String,
      suffix: String,
      prefix: String,
    },
  }
</script>

<style scoped>

</style>
