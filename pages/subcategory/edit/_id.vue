<template>
  <sub-category-form
    :master-categories="masterCategories"
    :main-categories="mainCategories"
    :sub-category="subCategories"
    :is-update="true"
  />
</template>

<script>
import SubCategoryForm from '../../../components/subcategory/SubCategoryForm'
export default {
  name: 'Id',
  components: { SubCategoryForm },

  async asyncData({ $axios, route }) {
    const subCategories = await $axios.$get('sub-categories/' + route.params.id)
    const mainCategories = await Promise.all(
      subCategories.parents.map((parent) =>
        $axios.$get('main-categories/' + parent)
      )
    )

    return {
      masterCategories: await $axios.$get('/master-categories'),
      mainCategories,
      subCategories
    }
  }
}
</script>

<style scoped></style>
