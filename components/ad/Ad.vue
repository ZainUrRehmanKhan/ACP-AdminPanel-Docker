<template>
  <v-container>
    <div v-if="$auth.hasScope('supplier')">
      <v-tabs v-model="tab" background-color="#313F53" color="white" dark>
        <v-tab v-for="item in tabs" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabs" :key="item.tab">
          <data-viewer
            :columns="headers"
            :title="item.title"
            :create="item.addNew"
            create-route="/products/form"
            remove
            remove-route="/products/$id"
            change
            :change-route="item.changeRoute"
            :endpoint="item.endpoint"
          >
          </data-viewer>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div v-else>
      <data-viewer
        :columns="headers"
        :title="title"
        create
        create-route="/products/form"
        remove
        remove-route="/products/$id"
        change
        change-route="/products/edit/$id"
        :endpoint="
          $auth.hasScope('admin')
            ? 'products'
            : 'products/supplier-products/' + this.$auth.user._id
        "
      >
      </data-viewer>
    </div>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'

export default {
  name: 'Ad',
  components: { DataViewer },
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          tab: 'Approved',
          title: 'Approved Products',
          addNew: true,
          changeRoute: '/products/edit/$id',
          endpoint: '/products/approve/supplier/' + this.$auth.user._id
        },
        {
          tab: 'Unapproved',
          title: 'UnApproved Products',
          addNew: false,
          changeRoute: '/products/edit-unverified/$id',
          endpoint: '/products/unapproved/supplier/' + this.$auth.user._id
        }
      ],
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'STATUS', value: 'status' },
        { text: 'PRICE', value: 'price' },
        { text: 'ADMIN COM', value: 'adminCommission' }
      ]
    }
  },
  created() {
    // const id = this.$auth.user._id
    if (this.$auth.hasScope('supplier')) {
      this.headers = [
        { text: 'NAME', value: 'name' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'PRICE', value: 'price' }
      ]
    }
  },
  methods: {
    getColor(status) {
      if (status === 'true') {
        return 'green'
      } else return 'red'
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
