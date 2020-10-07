<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="/subcategory/form"
      remove
      remove-route="/sub-categories/$id"
      change
      change-route="/subcategory/edit/$id"
      endpoint="sub-categories"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'SubCategory',
  components: { DataViewer },
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'STATUS', value: 'status' }
      ]
    }
  }
}
</script>

<style lang="sass"></style>
