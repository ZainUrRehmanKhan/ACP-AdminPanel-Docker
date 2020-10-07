<template>
  <sub-category-form :master-categories="mainCategories" />
</template>

<script>
import SubCategoryForm from '../../components/subcategory/SubCategoryForm'
export default {
  components: { SubCategoryForm },

  async asyncData({ $axios }) {
    return {
      mainCategories: await $axios.$get('master-categories/')
    }
  }
}
</script>

<style scoped></style>
