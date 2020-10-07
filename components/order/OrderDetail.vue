<template>
  <div style="margin: 15px">
    <v-card>
      <div style="background-color: #eff0f5;height: 30px">
        <div>
          <p>ORDER# {{ orders.orderNo }}</p>
        </div>
      </div>
      <div>
        <div
          style="display: flex;align-items: center;flex-direction: column;justify-content: center;margin-top: 25px"
        >
          <p v-if="orders.reason && $auth.hasScope('admin')">
            <v-icon color="red"> fa fa-times</v-icon
            ><strong style="margin-right: 10px;margin-left: 10px;color: red"
              >Cancellation Reason:</strong
            >
            {{ orders.reason }}
          </p>
          <v-avatar size="100px"
            ><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="john"
          /></v-avatar>
          <p v-if="$auth.hasScope('admin')">
            <v-icon color="black"> fa fa-user</v-icon
            ><strong style="margin-right: 10px;margin-left: 10px">Name:</strong>
            {{ orders.person.name }}
          </p>
          <p v-if="orders.address && $auth.hasScope('admin')">
            <v-icon color="black"> fa fa-tag</v-icon
            ><strong style="margin-right: 10px;margin-left: 10px"
              >Address:</strong
            >
            {{ orders.address }}
          </p>
          <p>
            <v-icon color="black">fa fa-calendar</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Order Date :
            </strong>
            {{ orders.createdAt }}
          </p>
          <p v-if="$auth.hasScope('admin')">
            <v-icon color="black">fa fa-money</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Wallet Amount Used :
            </strong>
            {{ orders.walletAmountUsed }}
          </p>
          <p v-if="$auth.hasScope('admin')">
            <v-icon color="black"> fa fa-phone</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Contact:
            </strong>
            {{ orders.contact }}
          </p>
          <p v-if="orders.shipping && $auth.hasScope('admin')">
            <v-icon color="black">fa fa-map-marker</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Shipping Location:
            </strong>
            {{ orders.shipping.location }}
          </p>
          <p v-if="orders.shipping && $auth.hasScope('admin')">
            <v-icon color="black">fa fa-money</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Shipping Charges:
            </strong>

            {{ orders.shipping.charges }}
          </p>
          <p v-if="$auth.hasScope('admin')">
            <v-icon color="black">fa fa-money</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Total Amount:
            </strong>
            {{ orders.total }}
          </p>
          <p v-if="orders.outletName && $auth.hasScope('admin')">
            <v-icon color="black">fa fa-money</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Outlet Name:
            </strong>
            {{ orders.outletName }}
          </p>
          <p v-if="orders.coupon">
            <v-icon color="black">fa fa-gift</v-icon>
            <strong style="margin-right: 10px;margin-left: 10px">
              Coupon:
            </strong>
            {{ orders.coupon.name }}
            <span
              ><strong>Discount: {{ orders.coupon.discount }} %</strong></span
            >
          </p>
        </div>
        <div>
          <v-data-table
            :headers="headers"
            :expanded.sync="expanded"
            show-expand
            :items="$auth.hasScope('supplier') ? orderItems : orders.items"
          >
            <template v-slot:item.product.description="{ item }">
              {{ item.product.description.substring(0, 100) }}
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td v-if="item.varient" :colspan="headers.length">
                Selected Variants {{ item.varient }}
              </td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small color="green" @click="editItem(item)"
                >mdi-eye</v-icon
              >
            </template>
            <template v-slot:item.supplier="{ item }">
              <div v-if="$auth.hasScope('supplier')">
                {{ names[orderItems.indexOf(item)] }}
              </div>
              <div v-else>
                {{ names[orders.items.indexOf(item)] }}
              </div>
            </template>
            <template v-slot:item.saqibprice="{ item }">
              <p
                v-if="item.varient && item.varient.price"
                style="margin-bottom: 0"
              >
                {{ Number(item.varient.price.toFixed(1)) }}
              </p>
              <p v-else style="margin-bottom: 0">
                {{ Number(item.product.price.toFixed(1)) }}
              </p>
              <!--        <div v-for="(orderItem, i) of item.items" :key="i">-->
              <!--          <p-->
              <!--            style="margin-bottom: 0"-->
              <!--            v-if="-->
              <!--              $auth.hasScope('supplier') &&-->
              <!--                $auth.user._id === orderItem.product.supplierId-->
              <!--            "-->
              <!--          >-->
              <!--            {{ orderItem.product.name }}-->
              <!--          </p>-->
              <!--        </div>-->
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  props: {
    orders: {
      type: Object,
      default: null
    },
    names: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      desserts: [],
      orderItems: [],
      headers: [
        { text: 'Name', value: 'product.name' },
        { text: 'Admin com', value: 'product.adminCommission' },
        { text: 'Price', value: 'saqibprice' },
        { text: 'Supplier', value: 'supplier' },
        { text: 'Quantity', value: 'count' },
        { text: 'Action', value: 'actions' }
      ]
    }
  },
  mounted() {
    // console.log(this.orders)
  },
  created() {
    console.log(this.orders)
    if (this.$auth.hasScope('supplier')) {
      // for (const order of this.orders) {
      for (const item of this.orders.items) {
        if (item.product.supplierId === this.$auth.user._id) {
          this.orderItems.push(item)
          console.log('matched')
        } else {
          console.log('not matched')
          continue
        }
      }
      //   }
      console.log(this.orderItems)
      this.headers = [
        { text: 'Product', value: 'product.name' },
        { text: 'Quantity', value: 'count' },
        { text: 'Cost Price', value: 'saqibprice' },
        { text: 'Action', value: 'actions' }
      ]
    }
  },
  methods: {
    editItem(item) {
      console.log(item)
      this.$router.push('/products/edit/' + item.product._id)
    },
    async getSupplierName(id) {
      const supplier = await this.$axios.$get('/persons/' + id)
      console.log(supplier.name)
      return supplier.name
    }
  }
}
</script>

<style scoped></style>
