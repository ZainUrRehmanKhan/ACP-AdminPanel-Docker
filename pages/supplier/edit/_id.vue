<template>
  <supplier-form :suppliers="supplier" :is-update="true" />
</template>

<script>
import SupplierForm from '../../../components/supplier/Form'
export default {
  name: 'Id',
  components: { SupplierForm },
  async asyncData({ $axios, route }) {
    console.log(await $axios.$get('/suppliers'))
    return {
      supplier: await $axios.$get('suppliers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
