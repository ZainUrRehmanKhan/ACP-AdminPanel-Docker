<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      remove
      remove-route="supplier-registration-requests/$id"
      endpoint="supplier-registration-requests"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'SupplierRequest',
  components: { DataViewer },
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'CONTACT', value: 'contact' },
        { text: 'EMAIL', value: 'email' },
        { text: 'PRODUCT', value: 'product' }
      ]
    }
  }
}
</script>

<style scoped></style>
