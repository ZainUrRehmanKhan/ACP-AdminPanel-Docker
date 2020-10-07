<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="/coupon/form"
      remove
      remove-route="/coupons/$id"
      change
      change-route="/coupon/edit/$id"
      endpoint="coupons"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'Coupon',
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
        { text: 'PERCENTAGE', value: 'discount' },
        { text: 'START DATE', value: 'startDate' },
        { text: 'END DATE', value: 'endDate' },
        { text: 'USAGE', value: 'usage' }
      ]
    }
  }
}
</script>

<style lang="sass"></style>
