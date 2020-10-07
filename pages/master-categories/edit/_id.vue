<template>
  <main-category-form :master-category="masterCategories" :is-update="true" />
</template>

<script>
import MainCategoryForm from '../../../components/maincategory/MianCategoryForm'
export default {
  name: 'Id',
  components: { MainCategoryForm },
  async asyncData({ $axios, route }) {
    return {
      // mainCategory: await $axios.$get('master-categories/' + route.params.id),

      masterCategories: await $axios.$get(
        'master-categories/' + route.params.id
      )
    }
  }
}
</script>

<style scoped></style>
