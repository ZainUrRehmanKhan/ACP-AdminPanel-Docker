<template>
  <product-detail :product="product" />
</template>

<script>
import ProductDetail from '../../components/product'
export default {
  name: 'SharedProduct',
  layout(context) {
    return 'none'
  },
  auth: false,
  components: { ProductDetail },
  async asyncData({ $axios, route }) {
    return {
      product: await $axios.$get('products/shared-product/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
