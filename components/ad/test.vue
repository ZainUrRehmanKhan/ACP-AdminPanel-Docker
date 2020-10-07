<template>
  <v-card style="padding:20px;margin:20px">
    <v-card-title>Pricing</v-card-title>
    <v-text-field
      v-if="!allowVariants"
      v-model="product.price"
      outlined
      label="Price"
      dense
      prepend-inner-icon="mdi-cash"
    ></v-text-field>
    <v-checkbox
      v-model="allowVariants"
      label="This product has multiple variants"
    ></v-checkbox>
    <v-card v-if="allowVariants" style="padding: 20px">
      <v-card-title>Variations</v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="9" sm="9">
          <v-card-title>Options</v-card-title>
        </v-col>
        <v-col
          v-if="options.length < 3"
          cols="12"
          md="3"
          sm="3"
          style="display: flex; align-items: center"
        >
          <v-btn color="#FF974D" style="color:#ffffff" @click="addOption()"
            >Add Option
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-for="(option, i) of options" :key="i">
        <v-col cols="12" md="3" sm="3">
          <v-text-field
            v-model="option.optionName"
            :label="'Option ' + (i + 1)"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-text-field
            v-model="option.optionValues"
            dense
            outlined
            label="Separate options with comma."
            @focusout="generateVariants()"
          />
        </v-col>
        <v-col cols="12" md="1" sm="1">
          <v-btn icon @click="removeOption(i)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="variants"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.varientPrice="{ item }">
          <v-text-field
            v-model="item.varientPrice"
            style="align-items: center !important;"
            outlined
            label="Price"
            dense
            hide-details
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>
    <v-btn @click="formData">Submit</v-btn>
  </v-card>
</template>

<script>
import { Product } from '@/models/product'

export default {
  name: 'Test',
  props: {
    product: {
      type: Product,
      default: () => new Product()
    }
  },
  data: () => ({
    allowVariants: false,
    options: [{}],
    variants: [],
    headers: [
      {
        text: 'Variant',
        align: 'start',
        sortable: false,
        value: 'varientName'
      },
      { text: 'Price', value: 'varientPrice', sortable: false }
    ]
  }),
  mounted() {},
  methods: {
    addOption() {
      if (this.options.length > 0) {
        this.optionCount++
        this.options.push({})
      }
    },
    removeOption(i) {
      this.options.splice(i, 1)
      if (this.options.length <= 0) {
        this.allowVariants = false
        this.options.push({})
      }
      if (this.options.length > 0) {
        this.generateVariants()
      }
    },
    generateVariants() {
      this.variants = this._combine().map((item) => ({
        varientName: item,
        varientPrice: 0
      }))
      console.log(this.variants)
    },
    _combine(index = 0, prevData = []) {
      const variant = []
      if (!this.options[index].optionValues && !this.options[index].optionName)
        return []
      const values = this.options[index].optionValues.split(',')
      for (const value of values) {
        if (index === this.options.length - 1) {
          variant.push([...prevData, value.trim()].join('/'))
        } else {
          variant.push(...this._combine(index + 1, [...prevData, value.trim()]))
        }
      }
      return variant
    },
    _parseOptions(options) {
      return options.map((option) => ({
        optionName: option.optionName,
        optionValues: option.optionValues
      }))
    },
    _parseVariants(variants) {
      const _variants = []
      for (const variant of variants) {
        const obj = { varientName: [] }
        for (const key of Object.keys(variant)) {
          if (key === 'price') {
            obj.varientPrice = variant[key]
          } else {
            obj.varientName.push(variant[key])
          }
        }
        obj.varientName = obj.varientName.join('/')
        _variants.push(obj)
      }
      return _variants
    },
    formData() {
      const formData = new FormData()
      if (this.allowVariants) {
        for (const key of Object.keys(this.product)) {
          if (key === 'variants') {
            for (const variant of this.variants) {
              for (const key of Object.keys(variant)) {
                formData.append(variant, variant[key])
              }
            }
          } else if (key === 'options') {
            for (const option of this.options) {
              for (const key of Object.keys(option)) {
                formData.append(key, option[key])
              }
            }
          } else {
            formData.append(key, this.product[key])
          }
        }
      } else {
        for (const key of Object.keys(this.product)) {
          if (key === 'variants') {
            continue
          } else if (key === 'price') {
            formData.append(key, this.product.price)
          } else {
            formData.append(key, this.product[key])
          }
        }
      }

      formData.forEach((item) => console.log(item))
    }
  }
}
</script>

<style scoped></style>
