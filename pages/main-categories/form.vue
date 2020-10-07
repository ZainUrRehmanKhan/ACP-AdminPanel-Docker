<template>
  <category-form :master-categories="masterCategories" />
</template>

<script>
import CategoryForm from '../../components/category/CategoryForm'
export default {
  components: { CategoryForm },
  async asyncData({ $axios }) {
    return {
      masterCategories: await $axios.$get('master-categories/')
    }
  }
}
</script>

<style scoped></style>
