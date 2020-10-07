<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="/master-categories/form"
      remove
      remove-route="/master-categories/$id"
      change
      change-route="/master-categories/edit/$id"
      endpoint="master-categories"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'MasterCategory',
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
        // { text: '#', value: 'no' },
        { text: 'NAME', value: 'name' },
        { text: 'STATUS', value: 'status' }
      ]
    }
  }
}
</script>

<style lang="sass"></style>
