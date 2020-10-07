<template>
  <notification />
</template>

<script>
import Notification from '../../components/notification/Notification'
export default {
  name: 'Index',
  components: { Notification }
  // async asyncData({ $axios }) {
  //   return {
  //     notification: await $axios.$get('/notifications')
  //   }
  // }
}
</script>

<style scoped></style>
