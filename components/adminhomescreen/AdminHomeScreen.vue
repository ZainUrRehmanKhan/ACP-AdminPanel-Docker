<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" sm="12">
        <div class="my-card status-card">
          <i class="pe-7s-cash" style="font-size: 50px;color: #00c292"></i>
          <div class="status-card__info" style="margin-left: 25px">
            <h2 style="color: grey;font-size: 20px">
              OMR {{ orderRevenue.revenue }}
            </h2>
            <h3 style="color: grey;font-size: 15px">Revenue</h3>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <div class="my-card status-card">
          <i class="pe-7s-cart" style="font-size: 50px;color: #ab8ce4"></i>
          <div class="status-card__info" style="margin-left: 25px">
            <h2 style="color: grey;font-size: 20px">
              {{ orderRevenue.orders }}
            </h2>
            <h3 style="color: grey;font-size: 15px">Sales</h3>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <div class="my-card status-card">
          <i class="pe-7s-browser" style="font-size: 50px;color: #03a9f3"></i>
          <div class="status-card__info" style="margin-left: 25px">
            <h2 style="color: grey;font-size: 20px">{{ adsCount }}</h2>
            <h3 style="color: grey;font-size: 15px">Ads</h3>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <div class="my-card status-card">
          <i class="pe-7s-users" style="font-size: 50px;color: #fb9678"></i>
          <div class="status-card__info" style="margin-left: 25px">
            <h2 style="color: grey;font-size: 20px">{{ suppliersCount }}</h2>
            <h3 style="color: grey;font-size: 15px">Supplier(s)</h3>
          </div>
        </div>
      </v-col>
    </v-row>
    <div style="display: grid;grid-template-columns: 2fr 1fr;margin-top: 30px">
      <div class="my-card" style="padding: 0">
        <p style="padding-top: 15px;padding-left: 15px">Orders</p>
        <div style="width: 100%">
          <v-data-table
            hide-default-footer
            :headers="headers"
            :items="orders"
            height="100%"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" small dark>{{
                item.status
              }}</v-chip>
            </template>
          </v-data-table>
        </div>
      </div>
      <div>
        <div
          class="my-card"
          style="height: 220px;width: 95%;margin-left: 25px;"
        ></div>
        <div
          class="my-card"
          style="height: 220px;width: 95%;margin-left: 25px;margin-top: 35px;background-color: #4aa8e4;color:white"
        >
          {{ date }}
        </div>
      </div>
    </div>
    <div class="my-card" style="height: 100px;margin-top: 35px;display: flex">
      <p>@Copyright 2020</p>
      <v-spacer />
      <p>Designed and Developed by Sparco Tech</p>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AdminHomeScreen',

  // eslint-disable-next-line vue/require-prop-types
  props: ['orders', 'adsCount', 'orderRevenue', 'suppliersCount'],

  data() {
    return {
      headers: [
        { text: 'NAME', value: 'person.username' },
        { text: 'CONTACT', value: 'contact' },
        { text: 'ORDER AMOUNT', value: 'orderAmount' },
        { text: 'STATUS', value: 'status' }
      ],
      date: moment(Date.now()).format('dddd MMM DD, YYYY')
    }
  },
  methods: {
    getColor(status) {
      if (status === 'delivered') return 'green'
      else if (status === 'processing') return 'blue'
      else return 'red'
    }
  }
}
</script>

<style lang="sass">
.v-data-table-header
  background: #eff0f5

.status-card
  display: flex

  &__info
    display: flex
    padding-left: 25px
    flex-direction: column
</style>
