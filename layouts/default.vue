<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      class="drawer scrollbar"
      :mini-variant.sync="drawer"
      permanent
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          active-class="drawer-menu-item-active"
          class="drawer-menu-item"
          dense
        >
          <v-list-item-icon>
            <v-icon size="14px" class="drawer-menu-item-icon">{{
              item.icon
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="drawer-menu-item-title">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left elevation="0" color="#ffffff" fixed app>
      <div
        style="display: flex; align-items: center; justify-content: space-between; width: 237px"
      >
        <a href="/">
          <img
            class="mx-2"
            src="~/assets/acp_logo.png"
            height="42px"
            width="90px"
        /></a>
        <v-app-bar-nav-icon
          style="color: grey;margin-left: 80px;width: 14px;height: 16px"
          @click.stop="drawer = !drawer"
        />
      </div>
      <v-spacer />
      <v-menu offset-y bottom
        ><template v-slot:activator="{ on, attrs }">
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-y="10"
            offset-x="10"
          >
            <v-avatar
              size="45"
              style="margin-left: 25px"
              v-bind="attrs"
              v-on="on"
            >
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-badge>
        </template>
        <v-list>
          <v-list-item href="/setting/">
            <v-list-item-icon>
              <v-icon dense color="#03a9f3">menu-icon fa fa-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color: #03a9f3">{{
              dropDownMenuItems[0].title
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item style="color: #03a9f3" @click="logout">
            <v-list-item-icon>
              <v-icon dense color="#03a9f3">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color: #03a9f3">{{
              dropDownMenuItems[1].title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content style="background: #eff0f5">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      dropDownMenuItems: [{ title: 'Settings' }, { title: 'LogOut' }],
      items: []
    }
  },
  created() {
    if (this.$auth.hasScope('supplier')) {
      this.items = [
        {
          icon: 'menu-icon fa fa-shopping-cart',
          title: 'Orders',
          to: '/order',
          show: true
        },
        {
          icon: 'menu-icon fa fa-tags',
          title: 'Ads',
          to: '/products',
          show: true
        }
      ]
    } else {
      this.items = [
        {
          icon: 'menu-icon fa fa-dashboard',
          title: 'Dashboard',
          to: '/',
          show: true
        },
        {
          icon: 'menu-icon fa  fa-paper-plane',
          title: 'Compose',
          to: '/compose',
          show: true
        },
        {
          icon: 'menu-icon fa  fa-user',
          title: 'Customers',
          to: '/customer',
          show: true
        },
        {
          icon: 'menu-icon fa fa-tags',
          title: 'Coupons',
          to: '/coupon',
          show: true
        },
        {
          icon: 'menu-icon fa fa-cogs',
          title: 'Settings',
          to: '/setting',
          subItems: [{ title: 'Settings Sub' }],
          show: true
        },
        {
          icon: 'menu-icon fa fa-shopping-cart',
          title: 'Orders',
          to: '/order',
          show: true
        },
        {
          icon: 'menu-icon fa fa-users',
          title: 'Subscribers',
          to: '/subscriber',
          show: true
        },
        {
          icon: 'menu-icon fa fa-photo',
          title: 'Shipping Charges',
          to: '/shippingcharges',
          show: true
        },
        {
          icon: 'menu-icon fa fa-users',
          title: 'Suppliers',
          to: '/supplier',
          show: true
        },
        {
          icon: 'menu-icon fa fa-tags',
          title: 'Supplier Ads',
          to: '/supplierad',
          show: true
        },
        {
          icon: 'menu-icon fa fa-tags',
          title: 'Supplier Request',
          to: '/supplierregistration',
          show: true
        },
        {
          icon: 'menu-icon ti-direction',
          title: 'Master Categories',
          to: '/master-categories',
          show: true
        },
        {
          icon: 'menu-icon ti-direction',
          title: 'Main Categories',
          to: '/main-categories',
          show: true
        },
        {
          icon: 'menu-icon ti-direction-alt',
          title: 'Sub Categories',
          to: '/subcategory',
          show: true
        },
        {
          icon: 'menu-icon fa fa-tags',
          title: 'Ads',
          to: '/products',
          show: true
        },
        {
          icon: 'menu-icon fa fa-photo',
          title: 'Banners',
          to: '/banner',
          show: true
        },
        {
          icon: 'menu-icon fa fa-bell-o',
          title: 'Notifications',
          to: '/notification',
          show: true
        }
      ]
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        location.reload()
      } catch (err) {}
    }
  }
}
</script>

<style lang="sass">
.v-list
  padding: 0


.drawer
  overflow-y: visible

.drawer-menu-item
  color: #607d8b
  /*border: none;*/

.drawer-menu-item-icon
  color: #607d8b

.drawer-menu-item-title
  color: #607d8b

.drawer-menu-item-icon
  margin-left: 3px

.drawer-menu-item:hover
  background-color: white

.drawer-menu-item:hover .drawer-menu-item-icon
  color: #03a9f3

.drawer-menu-item:hover .drawer-menu-item-title
  color: #03a9f3

.drawer-menu-item-active .drawer-menu-item-icon
  color: #03a9f3

.drawer-menu-item-active .drawer-menu-item-title
  color: #03a9f3
.v-data-table-header
  background: #eff0f5

.status-card
  display: flex

  &__info
    display: flex
    padding-left: 25px
    flex-direction: column
</style>
