<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Master Categories' : 'Create Master Category'"
      :data="masterCategory"
      endpoint="/master-categories"
      return
    >
      <v-text-field
        v-model="masterCategory.name"
        :rules="[(v) => !!v || 'Please Provide a value']"
        class="span-2"
        label="Title"
        outlined
        dense
      ></v-text-field>
      <v-checkbox v-model="masterCategory.status" label="Active"></v-checkbox>
    </SimpleForm>
  </div>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { MasterCategory } from '@/models/master-category'

export default {
  name: 'MainCategoryForm',
  components: { SimpleForm },

  props: {
    masterCategory: {
      type: Object,
      default: () => new MasterCategory()
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
