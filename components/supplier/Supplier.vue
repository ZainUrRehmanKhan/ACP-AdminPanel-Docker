<template>
  <v-container>
    <data-viewer
      :columns="headers"
      :title="title"
      create
      create-route="/supplier/form"
      remove
      remove-route="suppliers/$id"
      change
      change-route="/supplier/edit/$id"
      endpoint="suppliers"
    ></data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'Supplier',
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
        { text: 'COMPANY NAME', value: 'companyName' },
        { text: 'SUPPLIER NAME', value: 'person.name' },
        { text: 'MOBILE', value: 'person.phone' },
        { text: 'EMAIL', value: 'person.username' },
        { text: 'STATUS', value: 'status' }
      ]
    }
  }
}
</script>

<style lang="sass"></style>
