<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="11" sm="11">
        <v-card-title>Product Detail</v-card-title>
      </v-col>
    </v-row>
    <v-container>
      <v-card style="padding: 20px">
        <v-card-title>Product Information</v-card-title>
        <v-text-field
          v-model="product.name"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Product Name"
          dense
        ></v-text-field>
        <v-textarea
          v-model="product.description"
          readonly
          color="#313F53"
          outlined
          style="color: #313F53"
          label="Product Description"
          dense
        ></v-textarea>
        <v-text-field
          v-if="!product.hideWarranty"
          v-model="product.warrantyMonths"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Warranty Months"
          dense
        ></v-text-field>
      </v-card>
    </v-container>
    <v-container>
      <v-card
        v-if="product.varient === null || product.varient.length === 0"
        style="padding: 20px"
      >
        <v-card-title>Product Pricing</v-card-title>
        <v-text-field
          v-model="product.price"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Product Price"
          dense
        ></v-text-field>
      </v-card>
      <v-card v-else style="padding: 20px">
        <v-card-title>Product Variants</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columns"
          :items="product.varient"
          fixed-header
        >
        </v-data-table>
      </v-card>
    </v-container>
    <v-container>
      <v-card style="padding: 20px">
        <image-viewer-wide :image="product.images" />
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import ImageViewerWide from '../components/image-viewer-wide'
export default {
  name: 'OrderDetail',
  components: {
    ImageViewerWide
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    columns: []
  }),
  mounted() {
    if (
      this.product.varient &&
      this.product.varient !== null &&
      this.product.varient.length !== 0
    ) {
      this.varientHeader()
    }
  },
  methods: {
    returnBack() {
      this.$router.back()
    },
    varientHeader() {
      for (const key of Object.keys(this.product.varient[0])) {
        this.columns.push({ text: key.toUpperCase(), value: key })
      }
    }
  }
}
</script>

<style scoped></style>
