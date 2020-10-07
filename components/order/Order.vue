<template>
  <v-container>
    <data-viewer
      :columns="headers"
      title="Order"
      detail
      detail-route="order/detail/$id"
      :remove="$auth.hasScope('admin')"
      remove-route="orders/$id"
      :endpoint="
        $auth.hasScope('admin')
          ? 'orders'
          : 'orders/getbysupplier/' + this.$auth.user._id
      "
    >
      <template #actions="{ item }">
        <v-icon
          v-if="item.hasOwnProperty('showToSupplier') && !item.showToSupplier"
          small
          color="green"
          @click="approveProduct(item)"
          >fa fa-check</v-icon
        >
      </template>
      <template #status="{ item }">
        <v-select
          v-model="item.status"
          style="margin-top: 15px;width: 160px"
          :items="items"
          label="status"
          dense
          outlined
          @change="sendStatus(item)"
        />
      </template>
      <template #remarks="{ item }">
        <v-text-field
          v-model="item.remarks"
          style="margin-top: 15px;width: 160px"
          label="Remarks"
          outlined
          dense
          ><template slot="append-outer"
            ><v-icon
              v-if="item.remarks"
              color="red"
              small
              @click="sendRemarks(item)"
              >fa fa-paper-plane remarks-button</v-icon
            >
          </template>
        </v-text-field>
      </template>
    </data-viewer>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'Order',
  components: { DataViewer },

  data() {
    return {
      status: '',
      remarks: '',
      headers: [
        { text: 'ORDER #', value: 'orderNo' },
        { text: 'USER', value: 'person.name' },
        { text: 'MOBILE', value: 'contact' },
        { text: 'PRODUCT', value: 'items[0].product.name' },
        { text: 'ORDER AMOUNT', value: 'orderAmount' },
        { text: 'TOTAL AMOUNT', value: 'total' },
        { text: 'TYPE', value: 'orderType' },
        { text: 'STATUS', value: 'status' },
        { text: 'REMARKS', value: 'remarks' }
      ],
      items: [
        'Pending',
        'On Hold',
        'Processing',
        'Delivered',
        'Cancelled',
        'Cancelled by Customer'
      ]
    }
  },
  created() {
    if (this.$auth.hasScope('supplier')) {
      this.headers = [
        { text: 'ORDER #', value: 'orderNo' },
        { text: 'PRODUCT', value: 'items' }
      ]
    }
  },
  methods: {
    sendStatus(item) {
      const res = this.$axios.patch('/orders/updatebystatus', {
        status: item.status,
        id: item._id
      })
      return res
    },
    sendRemarks(item) {
      const res = this.$axios.patch('/orders/remarks', {
        remarks: item.remarks,
        id: item._id
      })
      return res
    },

    approveProduct(item) {
      item.showToSupplier = true

      console.log(item)
      this.$axios.$patch('orders', item)
    }
  }
}
</script>

<style scoped></style>
