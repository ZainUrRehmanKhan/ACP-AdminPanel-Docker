<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="/main-categories/form"
      remove
      remove-route="main-categories/$id"
      change
      change-route="/main-categories/edit/$id"
      endpoint="/main-categories"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'Category',
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
