<template>
  <product-detail :product="product" />
</template>

<script>
import ProductDetail from '../../components/product'
export default {
  name: 'AcpProduct',
  layout(context) {
    return 'none'
  },
  auth: false,
  components: { ProductDetail },
  async asyncData({ $axios, route }) {
    return {
      product: await $axios.$get('products/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
