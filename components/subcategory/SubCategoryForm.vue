<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Sub Category' : 'Add New Sub Category'"
      :data="subCategory"
      endpoint="sub-categories"
      return
    >
      <div class="span-2">
        <v-select
          v-model="selectedMaster"
          :items="masterCategories"
          item-text="name"
          item-value="_id"
          label="-- Master Category --"
          outlined
          :rules="[(v) => !!v || 'Select a Master Category']"
          dense
          @change="masterChanged"
        />

        <v-select
          v-model="subCategory.parents"
          :items="items"
          label="-- Main Category --"
          :disabled="!selectedMaster"
          outlined
          multiple
          item-value="_id"
          item-text="name"
          :rules="[
            (_) => subCategory.parents.length > 0 || 'Select a Main Category'
          ]"
          dense
        />

        <v-text-field
          v-model="subCategory.name"
          :rules="[(v) => !!v || 'Please Provide a value']"
          label="Title"
          outlined
          dense
        />

        <v-checkbox v-model="subCategory.status" label="Active" />
      </div>
    </SimpleForm>
  </div>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { SubCategory } from '@/models/sub-category'

export default {
  name: 'SubCategoryForm',
  components: { SimpleForm },

  props: {
    subCategory: {
      type: Object,
      default: () => new SubCategory()
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    masterCategories: {
      type: Array,
      required: true
    },
    mainCategories: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    items: [],
    selectedMaster: null
  }),

  mounted() {
    if (this.isUpdate) {
      this.items = this.mainCategories
      this.selectedMaster = this.mainCategories[0].parent
    }
  },

  methods: {
    async masterChanged() {
      this.subCategory.parents = []
      this.items = await this.$axios.$get(
        '/main-categories/getByParentId/' + this.selectedMaster
      )
    }
  }
}
</script>
