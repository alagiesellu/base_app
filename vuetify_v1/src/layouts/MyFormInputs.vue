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
    <span
      v-else-if="type === 'file'"
    >
      <v-text-field
        v-model="filename"
        :label="label"
        :rules="rules"
        prepend-icon="mdi-file"
        @click="$refs[idx].click()"
      ></v-text-field>
      <input
        type="file"
        style="display: none"
        :ref="idx"
        :accept="accept"
        @change="onFilePicked"
      ><!-- accept="image/*" -->
    </span>
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
      accept: String,
    },
    data () {
      return {
        filename: '',
      }
    },
    methods: {
      emit_change () {
        this.$emit('data_input', { idx: this.idx, input: this.input.m })
      },
      // pickFile () {
      //   this.$refs[this.idx].click()
      // },
      onFilePicked (e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.filename = files[0].name
          if (this.filename.lastIndexOf('.') <= 0) return

          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.input.m = fr.result
            // this.input.f = files[0] // this is an image file that can be sent to server...
            this.emit_change()
          })
        } else this.filename = ''
      },
    },
  }
</script>

<style scoped>

</style>
