<template>
  <shipping-charges-form :shipping-charges="shippingCharge" is-update="true" />
</template>

<script>
import ShippingChargesForm from '../../../components/shippingcharges/ShippingChargesForm'
export default {
  name: 'Id',
  components: { ShippingChargesForm },
  async asyncData({ $axios, route }) {
    return {
      shippingCharge: await $axios.$get('shipping-charges/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
