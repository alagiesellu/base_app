<template>
  <v-dialog
    v-model="form.dialog"
    max-width="600px"
  >
    <v-card>
      <v-card-title class="headline">{{ form.title }}</v-card-title>
      <v-card-text>{{ form.description }}</v-card-text>
      <v-card-text>
        <v-container>
          <template>
            <v-form
              v-if="form.inputs"
              ref="form"
              v-model="form.valid"
              lazy-validation
            >
              <v-row
                v-for="(item, index) in form.types"
                :key="item.id"
              >
                <my-form-inputs
                  v-if="typeof form.inputs[index] !== 'undefined'"
                  :idx="index"
                  :counter="form.counters[index]*1"
                  :input="{ m: form.inputs[index] }"
                  :items="{ list: form.items[index], keys: form.item_keys[index] }"
                  :label="form.labels[index]"
                  :rules="form.rules[index]"
                  :type="form.types[index]"
                  :multiple="form.multiples[index]"
                  :suffix="form.suffixes[index]"
                  :prefix="form.prefixes[index]"
                  :accept="form.accepts[index]"
                  @data_input="data => $emit('data_input', data)"
                />
              </v-row>
            </v-form>
          </template>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-btn
          v-if="Object.keys(form.inputs || {}).length !== 0"
          color="primary"
          :loading="form.loading"
          @click="submit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import MyFormInputs from '@/layouts/MyFormInputs'
  export default {
    name: 'MyFormDialog',
    components: { MyFormInputs },
    props: {
      form: Object,
    },
    data () {
      return {
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) this.$emit('submit')
      },
    },
  }
</script>

<style scoped>

</style>
