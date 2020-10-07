<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="/banner/form"
      remove
      remove-route="ads/$id"
      change
      change-route="banner/edit/$id"
      endpoint="ads"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'BannerImage',
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
        { text: 'NAME', value: 'title' },
        { text: 'BANNER', value: 'image.name' }
      ]
    }
  }
}
</script>

<style scoped></style>
