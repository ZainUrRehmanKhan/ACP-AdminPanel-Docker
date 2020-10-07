<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm return>
      <template v-slot:header>
        <v-row>
          <v-col
            style="display: flex; align-items: center; justify-content: center"
            cols="12"
            md="1"
            sm="1"
          >
          </v-col>
          <v-col cols="12" md="11" sm="11">
            <v-card-title>Send Email</v-card-title>
          </v-col>
        </v-row>
      </template>
      <div class="span-2">
        <v-text-field outlined dense label="Subject"></v-text-field>
      </div>
      <div class="span-2">
        <v-textarea outlined dense label="Subject"></v-textarea>
      </div>
    </SimpleForm>
  </div>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
export default {
  name: 'Email',
  components: { SimpleForm }
}
</script>

<style scoped></style>
