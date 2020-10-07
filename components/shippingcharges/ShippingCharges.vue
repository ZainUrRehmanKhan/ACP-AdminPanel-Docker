<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="shippingcharges/form"
      remove
      remove-route="shipping-charges/$id"
      change
      change-route="shippingcharges/edit/$id"
      endpoint="/shipping-charges"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'ShippingCharges',
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
        // { text: '#', value: 'no' },
        { text: 'LOCATION', value: 'location' },
        { text: 'CHARGES', value: 'charges' }
      ]
    }
  }
}
</script>

<style scoped></style>
