<template>
  <subscriber :subscribers="subscribers" />
</template>

<script>
import Subscriber from '../../components/subscriber/Subscriber'
export default {
  name: 'Index',
  components: { Subscriber },
  async asyncData({ $axios }) {
    return {
      subscribers: await $axios.$get('/subscribers')
    }
  }
}
</script>

<style scoped></style>
