<template>
  <v-container>
    <admin-home-screen
      v-if="this.$auth.hasScope('admin')"
      :orders="orders"
      :ads-count="adsCount"
      :order-revenue="orderRevenue"
      :suppliers-count="suppliersCount"
    />
    <supplier-home-screen
      v-else
      :orders="orders"
      :ads-count="adsCount"
      :order-revenue="orderRevenue"
      :suppliers-count="suppliersCount"
    />
  </v-container>
</template>

<script>
import AdminHomeScreen from '../components/adminhomescreen/AdminHomeScreen'
import SupplierHomeScreen from '../components/supplierhomescreen/SupplierHomeScreen'
export default {
  components: { SupplierHomeScreen, AdminHomeScreen },

  async asyncData({ $axios, route }) {
    return {
      orders: await $axios.$get('orders'),
      adsCount: await $axios.$get('products/count'),
      orderRevenue: await $axios.$get('orders/count'),
      suppliersCount: await $axios.$get('suppliers/count'),
      supplierorders: await $axios.$get(
        'orders/getbysupplier/' + route.params.id
      )
    }
  }
}
</script>

<style lang="sass">
.v-data-table-header
  background: #eff0f5

.status-card
  display: flex

  &__info
    display: flex
    padding-left: 25px
    flex-direction: column
</style>
