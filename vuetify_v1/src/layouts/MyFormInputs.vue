<template>
  <v-col>
    <v-autocomplete
      v-if="type === 'select'"
      v-model="input.m"
      :items="items.list"
      :item-text="items.keys.text"
      :item-value="items.keys.value"
      :suffix="suffix"
      :prefix="prefix"
      :rules="rules"
      :label="label"
      :multiple="multiple"
      dense
      chips
      small-chips
      solo
      @input="emit_change"
    ></v-autocomplete>
    <v-text-field
      v-else
      v-model="input.m"
      :counter="counter"
      :rules="rules"
      :label="label"
      :type="type"
      :suffix="suffix"
      :prefix="prefix"
      @input="emit_change"
    ></v-text-field>
  </v-col>
</template>

<script>
  export default {
    name: 'MyFormInputs',
    props: {
      idx: String,
      input: Object,
      items: Object,
      counter: Number,
      rules: Array,
      label: String,
      type: String,
      suffix: String,
      prefix: String,
      multiple: Boolean,
    },
    methods: {
      emit_change () {
        this.$emit('data_input', { idx: this.idx, input: this.input.m })
      },
    },
  }
</script>

<style scoped>

</style>
