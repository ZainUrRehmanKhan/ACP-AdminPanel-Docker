<template>
  <div style="margin: 25px;background-color: black">
    <v-card>
      <v-row>
        <v-col>
          <v-card-title class="md-col-8">
            Supplier Ads
          </v-card-title>
        </v-col>
        <v-col
          style="display: flex;align-items: center;justify-content: flex-end"
        >
          <v-btn style="margin-right: 10px" icon @click="getItems">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="supplierProductsLocal">
        <template v-slot:item.commission="{ item }">
          <slot name="commission" :item="item" />
          <v-text-field
            v-model="item.adminCommission"
            type="number"
            label="commission"
            outlined
            dense
            style="width: 40%;margin-top: 25px"
          ></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="actions" :item="item" />
          <v-btn small color="green" dark @click="onAccepted(item)"
            >Accept</v-btn
          >
          <!--          <v-btn small color="red" dark @click="onRejected(item)">Reject</v-btn>-->
          <v-icon large color="green" @click="editItem(item)">mdi-eye</v-icon>
        </template>
      </v-data-table>
      <v-snackbar
        v-model="snackbar"
        bottom
        :color="snackbarColor"
        :timeout="1500"
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SupplierAd',
  props: {
    supplierProducts: Array
  },
  data() {
    return {
      supplierProductsLocal: [],
      snackbarText: 'Success!',
      snackbarColor: 'green',
      snackbar: false,
      headers: [
        { text: 'Ad Name', value: 'name' },
        { text: 'Ad Details', value: 'description' },
        { text: 'Admin Commission', value: 'commission' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  mounted() {
    this.supplierProductsLocal = this.supplierProducts
  },
  methods: {
    async onAccepted(item) {
      await this.$axios.patch('/products/approve', item)
      this.snackbarColor = 'green'
      this.snackbarText = 'Product Accepted Successfully!'
      this.snackbar = true
      await this.getItems()
    },
    onRejected(item) {
      this.$axios.delete('/products-unverified', item)
      this.snackbarColor = 'red'
      this.snackbarText = 'Product Rejected Successfully!'
      this.snackbar = true
    },
    editItem(item) {
      this.$router.push('/products/edit-unverified/' + item._id)
    },
    async getItems() {
      this.supplierProductsLocal = await this.$axios.$get(
        '/products-unverified'
      )
      console.log(this.supplierProductsLocal)
    }
  }
}
</script>

<style scoped></style>
