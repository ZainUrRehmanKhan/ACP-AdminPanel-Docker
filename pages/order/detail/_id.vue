<template>
  <!--  <h1>Detail</h1>-->
  <order-detail :orders="detail" :names="names" />
</template>

<script>
import OrderDetail from '../../../components/order/OrderDetail'
export default {
  name: 'Index',
  components: { OrderDetail },
  async asyncData({ $axios, route }) {
    const names = []
    const detail = await $axios.$get('orders/' + route.params.id)
    for (const item of detail.items) {
      console.log(item)
      if (item.product.supplierId) {
        const supplier = await $axios.$get('persons/' + item.product.supplierId)
        names.push(supplier.name)
      } else {
        names.push('No Supplier')
      }
    }
    return {
      names,
      detail
    }
  }
}
</script>

<style scoped></style>
