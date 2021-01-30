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
              ref="form"
              v-if="form.inputs"
              v-model="form.valid"
              lazy-validation
            >
              <v-row
                v-for="(item, index) in form.types"
                :key="item.id"
              >
                <my-form-inputs
                  :idx="index"
                  :counter="form.counters[index]*1"
                  :input="{ m:form.inputs[index] }"
                  :label="form.labels[index]"
                  :rules="form.rules[index]"
                  :type="form.types[index]"
                  :suffix="form.suffixes[index]"
                  :prefix="form.prefixes[index]"
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
          color="blue darken-1"
          text
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
