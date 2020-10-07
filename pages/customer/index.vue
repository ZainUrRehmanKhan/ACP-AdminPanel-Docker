<template>
  <customer :persons="person" />
</template>

<script>
import Customer from '@/components/customer/Customer'
export default {
  name: 'Index',
  components: { Customer },
  async asyncData({ $axios }) {
    return {
      person: await $axios.$get('/persons/customers')
    }
  }
}
</script>

<style scoped></style>
