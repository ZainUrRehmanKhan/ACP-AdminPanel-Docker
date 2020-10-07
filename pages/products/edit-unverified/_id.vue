<template>
  <ad-form
    :product="product"
    :main-categories="mainCategory"
    :sub-categories="subCategory"
    :master-categories="masterCategories"
    :is-update="true"
    endpoint="/products-unverified"
  /> </template
>masterCategories

<script>
import AdForm from '@/components/ad/AdForm'
export default {
  name: 'Id',
  components: { AdForm },
  async asyncData({ $axios, route }) {
    return {
      product: await $axios.$get('products-unverified/' + route.params.id),
      mainCategory: await $axios.$get('/main-categories/'),
      subCategory: await $axios.$get('/sub-categories'),
      masterCategories: await $axios.$get('/master-categories')
    }
  }
}
</script>

<style scoped></style>
