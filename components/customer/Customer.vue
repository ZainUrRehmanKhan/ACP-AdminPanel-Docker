<template>
  <div style="background-color: #607d8b;margin: 25px">
    <v-card>
      <v-card-title>
        USERS
      </v-card-title>
      <v-data-table :headers="headers" :items="persons"> </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Customer',
  props: {
    persons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'USER NAME', value: 'username' },
        { text: 'SCOPE', value: 'scope' },
        { text: 'PHONE #', value: 'phone' },
        { text: 'WALLET POINT', value: 'walletPoints' },
        { text: 'PROVIDER', value: 'provider' }
      ]
    }
  }
}
</script>

<style scoped></style>
