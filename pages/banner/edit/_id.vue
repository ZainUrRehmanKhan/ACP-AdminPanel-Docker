<template>
  <banner-form :banner="banner" is-update="true" />
</template>

<script>
import BannerForm from '../../../components/banner/BannerForm'
export default {
  name: 'Id',
  components: { BannerForm },
  async asyncData({ $axios, route }) {
    return {
      banner: await $axios.$get('ads/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
