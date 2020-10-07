<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Banner' : 'Add New Banner'"
      :data="formData"
      endpoint="/ads"
      return
    >
      <div>
        <v-text-field
          v-model="banner.title"
          outlined
          dense
          label="Title"
        ></v-text-field>
        <v-file-input
          v-model="banner.image"
          outlined
          :rules="[required]"
          dense
          multiple
          label="Select Banner"
        ></v-file-input>
        <v-checkbox v-model="banner.status" label="Active" />
      </div>
    </SimpleForm>
  </div>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Banner } from '@/models/banner'
import { required } from '@/common/lib/validator'

export default {
  name: 'BannerForm',
  components: { SimpleForm },

  props: {
    banner: {
      type: Object,
      default: () => new Banner()
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    required,
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.banner)) {
        if (key === 'image') {
          for (const item of this.banner[key]) {
            formData.append(key, item)
          }
        } else {
          formData.append(key, this.banner[key])
        }
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    }
  }
}
</script>

<style scoped></style>
