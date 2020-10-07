<template>
  <category-form
    :master-categories="masterCategory"
    :main-category="mainCategory"
    :is-update="true"
  />
</template>

<script>
import CategoryForm from '../../../components/category/CategoryForm'

export default {
  name: 'Id',
  components: { CategoryForm },
  async asyncData({ $axios, route }) {
    return {
      masterCategory: await $axios.$get('/master-categories'),
      mainCategory: await $axios.$get('/main-categories/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
