<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Category' : 'Add New Category'"
      :data="mainCategory"
      endpoint="main-categories"
      return
    >
      <v-select
        v-model="mainCategory.parent"
        class="span-2"
        item-value="_id"
        item-text="name"
        label="Select Master Category"
        outlined
        dense
        :items="masterCategories"
        :rules="[(v) => !!v || 'Parent category is required']"
      />
      <v-text-field
        v-model="mainCategory.name"
        class="span-2"
        outlined
        dense
        label="Name of Main Category"
        :rules="[(v) => !!v || 'Name is required']"
      />
      <v-checkbox v-model="mainCategory.status" label="Active" />
    </SimpleForm>
  </div>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'

export default {
  name: 'Form',
  components: { SimpleForm },
  props: {
    masterCategories: {
      type: Array,
      default: () => []
    },

    mainCategory: {
      type: Object,
      default: () => ({})
    },

    isUpdate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
