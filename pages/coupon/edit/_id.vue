<template>
  <Form :coupons="coupon" :is-update="true" />
</template>

<script>
import Form from '../../../components/coupon/Form'
export default {
  name: 'Id',
  components: { Form },
  async asyncData({ $axios, route }) {
    return {
      coupon: await $axios.$get('coupons/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
