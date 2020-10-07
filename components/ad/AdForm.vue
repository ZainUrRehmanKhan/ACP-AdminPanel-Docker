<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :title="isUpdate ? 'Edit Product' : 'Add New Product'"
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="endpoint"
      return
    >
      <div
        v-if="supplierName && $auth.hasScope('admin')"
        style="text-align: center;"
        class="span-2"
      >
        <v-text-field
          v-model="supplierName.username"
          readonly
          label="Supplier Name"
          dense
          outlined
        />
      </div>
      <div class="span-2">
        <v-select
          v-model="product.masterCategoryId"
          :items="masterCategories"
          item-text="name"
          item-value="_id"
          label="-- Master Category --"
          outlined
          :rules="[(v) => !!v || 'Select a Master Category']"
          dense
          @change="masterChanged"
        />
        <v-select
          v-model="product.mainCategoryId"
          :items="items1"
          label="-- Main Category --"
          :disabled="!product.masterCategoryId"
          outlined
          item-value="_id"
          item-text="name"
          dense
          @change="mainChanged"
        />
        <v-select
          v-model="product.subCategoryId"
          :items="items2"
          label="-- Sub Category --"
          :disabled="!product.mainCategoryId"
          outlined
          item-value="_id"
          item-text="name"
          dense
        />
        <v-text-field
          v-model="product.name"
          outlined
          dense
          label="Product Name"
        />
        <v-textarea
          v-model="product.description"
          outlined
          label="Description"
        />
        <v-text-field
          v-if="$auth.hasScope('admin')"
          v-model="product.adminCommission"
          type="number"
          outlined
          dense
          label="Admin Commission"
        />

        <v-text-field
          v-model="product.warrantyMonths"
          :rules="[
            (_) => !!product.warrantyMonths || 'Please Enter Warranty Month'
          ]"
          type="number"
          outlined
          dense
          label="Warranty Months"
        />

        <v-checkbox v-model="product.active" label="Active" />
        <v-checkbox v-model="product.hideWarranty" label="Hide Warranty" />
        <v-checkbox
          v-if="$auth.hasScope('admin')"
          v-model="product.isFeatured"
          label="Featured"
        />
        <v-checkbox
          v-if="$auth.hasScope('admin')"
          v-model="product.isKillerDeal"
          label="Killer Deals"
        />

        <div v-if="isUpdate">
          <p>Uploaded Images</p>
          <div class="image-carosel">
            <div
              v-for="(image, i) of product.images"
              :key="i"
              style="width: 180px; height: 180px;cursor: pointer"
            >
              <img
                width="180"
                height="180"
                style="object-fit: cover;"
                :src="$axios.defaults.baseURL + '/uploads/' + image.name"
                alt=""
              />
              <div class="image-overlay">
                <v-btn
                  icon
                  outlined
                  color="white"
                  style="margin-right: 10px"
                  @click="deleteImage(i)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  icon
                  outlined
                  color="white"
                  @click="openImage(image.name)"
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <vue-upload-multiple-image
          :data-images="imagesData"
          @upload-success="uploadImageSuccess"
          @before-remove="beforeRemove"
          @edit-image="editImage"
        />
        <v-card style="padding:20px;margin-top:20px;margin-bottom:20px">
          <v-card-title>Pricing</v-card-title>
          <v-text-field
            v-if="!allowVariants"
            v-model="product.price"
            :rules="[(_) => !!product.price || 'Please Enter Price']"
            outlined
            type="number"
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
                <v-btn
                  color="#FF974D"
                  style="color:#ffffff"
                  @click="addOption()"
                  >Add Option
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-for="(option, i) of options" :key="i">
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="option.optionName"
                  :rules="[required]"
                  :label="'Option ' + (i + 1)"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                v-if="
                  option.optionName === 'Color' || option.optionName === 'color'
                "
                cols="12"
                md="8"
                sm="8"
              >
                <div
                  style="display: grid;grid-template-columns: auto auto;grid-column-gap: 10px"
                >
                  <v-text-field
                    v-model="option.optionImages"
                    dense
                    outlined
                    :rules="[required]"
                    label="Option Images Indexes"
                  />
                  <v-text-field
                    v-model="option.optionValues"
                    dense
                    outlined
                    :rules="[required]"
                    label="Separate options with comma."
                    @focusout="generateVariants()"
                  />
                </div>
              </v-col>
              <v-col v-else cols="12" md="8" sm="8">
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
                  type="number"
                  :rules="[(v) => v !== '' || 'Enter price']"
                  hide-details
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </div>
    </SimpleForm>
    <v-dialog v-model="imagePreview" width="50%">
      <img :src="$axios.defaults.baseURL + '/uploads/' + src" />
      <v-icon
        style="position: absolute;right: -22%;top:6%"
        large
        @click="closePreview"
        >mdi-close</v-icon
      >
    </v-dialog>
  </div>
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Product } from '~/models/product'
import { required } from '~/common/lib/validator'
import { Option } from '~/models/option'

export default {
  name: 'AdForm',
  components: { SimpleForm, VueUploadMultipleImage },
  props: {
    masterCategories: {
      type: Array,
      required: false
    },
    mainCategories: {
      type: Array,
      required: true
    },
    subCategories: {
      type: Array,
      required: true
    },
    product: {
      type: Object,
      default: () => new Product()
    },
    variant: {
      type: Array,
      default: () => [new Product()]
    },
    endpoint: {
      type: String,
      default: 'none'
    },
    // deletedImages: {
    //   type: Array,
    //   default: () => []
    // },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      supplierName: null,
      deletedImages: [],
      date: null,
      option: new Option(),
      selectedMaster: null,
      allowVariants: false,
      options: [{}],
      optionValues: [],
      items: [],
      items1: [],
      items2: [],
      src: '',
      imagePreview: false,
      optionCount: 0,
      selectedMain: null,
      selectedSub: null,
      variants: [],
      images: [],
      imagesData: [],
      headers: [
        {
          text: 'Variant',
          align: 'start',
          sortable: false,
          value: 'varientName'
        },
        { text: 'Price', value: 'varientPrice', sortable: false }
      ],
      variantCheck: false
    }
  },

  mounted() {
    if (this.isUpdate) {
      this.getSupplier()
    }
    if (this.product.name) {
      if (this.product.varient.length > 0 || this.product.options.length > 0) {
        this.allowVariants = true
        this.options = this._parseOptions(this.product.options)
        this.variants = this._parseVariants(this.product.varient)
      }
      this.selectedMaster = this.product.masterCategoryId
      this.selectedMain = this.product.mainCategoryId
      this.selectedSub = this.product.subCategoryId

      this.masterChanged()
      this.mainChanged()
    }
  },
  methods: {
    required,
    async getSupplier() {
      if (this.product && this.product.supplierId) {
        this.supplierName = await this.$axios.$get(
          'persons/' + this.product.supplierId
        )
      }
    },
    openImage(i) {
      if (i) {
        this.src = i
        this.imagePreview = true
      }
    },
    closePreview() {
      this.imagePreview = false
    },
    formData() {
      const formData = new FormData()
      if (this.allowVariants) {
        for (const key of Object.keys(this.product)) {
          if (key === 'variants') {
            for (const variant of this.variants) {
              for (const key of Object.keys(variant)) {
                formData.append(key, variant[key])
              }
            }
          } else if (key === 'varient') {
            for (const variant of this.variants) {
              for (const key of Object.keys(variant)) {
                formData.append(key, variant[key])
              }
            }
          } else if (key === 'options') {
            for (const option of this.options) {
              for (const key of Object.keys(this.option)) {
                if (key === 'optionImages') {
                  if (option[key]) {
                    formData.append(key, option[key])
                  } else {
                    formData.append(key, null)
                  }
                } else {
                  formData.append(key, option[key])
                }
              }
            }
          } else if (key === 'supplierId') {
            if (this.product.supplierId) {
              formData.append('supplierId', this.product.supplierId)
            } else if (this.$auth.hasScope('supplier')) {
              const supplierId = this.$auth.user._id
              formData.append('supplierId', supplierId)
            }
          } else if (key === 'price') {
            continue
          } else if (key === 'active') {
            formData.append('active', (this.product.active || false).toString())
          } else if (key === 'isFeatured') {
            formData.append(
              'isFeatured',
              (this.product.isFeatured || false).toString()
            )
          } else if (key === 'hideWarranty') {
            formData.append(
              'hideWarranty',
              (this.product.hideWarranty || false).toString()
            )
          } else if (key === 'isKillerDeal') {
            formData.append(
              'isKillerDeal',
              (this.product.isKillerDeal || false).toString()
            )
          }
          // } else if (key === 'deletedImages') {
          //   for (const image of this.deletedImages) {
          //     formData.append('deletedImages', image.path)
          //   }}
          else if (key === 'images') {
            for (const image of this.images) {
              formData.append('images', image)
            }
            // } else if (
            //   key === 'uploadedImageNames' &&
            //   key === 'uploadedImagePaths'
            // ) {
            //   for (const image of this.product.images) {
            //     formData.append('uploadedImageNames', image.name)
            //     formData.append('uploadedImagePaths', image.path)
            //   }
          } else if (key === 'status') {
            if (this.$auth.hasScope('admin')) {
              formData.append('status', 'approved')
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
          } else if (key === 'supplierId') {
            if (this.product.supplierId) {
              formData.append('supplierId', this.product.supplierId)
            } else if (this.$auth.hasScope('supplier')) {
              const supplierId = this.$auth.user._id
              formData.append('supplierId', supplierId)
            }
          } else if (key === 'active') {
            formData.append('active', (this.product.active || false).toString())
          } else if (key === 'isFeatured') {
            formData.append(
              'isFeatured',
              (this.product.isFeatured || false).toString()
            )
          } else if (key === 'hideWarranty') {
            formData.append(
              'hideWarranty',
              (this.product.hideWarranty || false).toString()
            )
          } else if (key === 'isKillerDeal') {
            formData.append(
              'isKillerDeal',
              (this.product.isKillerDeal || false).toString()
            )
          } else if (key === 'images') {
            for (const image of this.images) {
              formData.append('images', image)
            }
          } else if (key === 'status') {
            if (this.$auth.hasScope('admin')) {
              formData.append('status', 'approved')
            }
          } else {
            formData.append(key, this.product[key])
          }
        }
      }
      if (this.isUpdate) {
        for (const item of this.deletedImages) {
          formData.append('deletedImages', item)
        }
        for (const item of this.product.images) {
          formData.append('uploadedImagePaths', item.path)
        }
        for (const item of this.product.images) {
          formData.append('uploadedImageNames', item.name)
        }
      }
      // formData.forEach((item) => console.log(item))
      return formData
    },
    uploadImageSuccess(formData) {
      formData.forEach((item) => this.images.push(item))
    },
    beforeRemove(index, done, fileList) {
      const r = confirm('remove image')
      if (r === true) {
        done()
      } else {
      }
    },
    editImage(fileList) {},

    deleteImage(index) {
      this.deletedImages.push(this.product.images[index].path)
      this.product.images.splice(index, 1)
    },
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
        varientPrice: '0'
      }))
    },
    _combine(index = 0, prevData = []) {
      const variant = []
      if (!this.options[index].optionValues || !this.options[index].optionName)
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
        optionValues: option.optionValues,
        optionImages: option.optionImages
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
    async masterChanged() {
      this.items1 = await this.$axios.$get(
        '/main-categories/getByParentId/' + this.product.masterCategoryId
      )
    },
    async mainChanged() {
      this.items2 = await this.$axios.$get(
        '/sub-categories/getbyparent/' + this.product.mainCategoryId
      )
    }
  }
}
</script>

<style>
.image-overlay {
  top: 0;
  left: 0;
  z-index: 5;
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  border-right: 4px;
  position: absolute !important;
  transition: all 0.2s;
  align-items: center;
  margin: 0 !important;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}

.image-carosel {
  padding: 10px 5px;
  height: 200px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
}
.image-carosel::-webkit-scrollbar {
  display: block !important;
}
.image-carosel::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}
.image-carosel::-webkit-scrollbar-track {
  background-color: #fff;
}

.image-carosel::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}
.image-carosel::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 5px solid #fff;
}
.image-carosel::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}
.image-carosel div {
  margin: 0 5px;
  position: relative;
}

.image-carosel div img {
  top: 0;
  /*position: absolute;*/
}

.image-carosel div:hover .image-overlay {
  transform: scale(1);
  opacity: 1;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
