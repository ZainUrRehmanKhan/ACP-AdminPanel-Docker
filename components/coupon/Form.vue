<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Coupon' : 'Add New Coupon'"
      :data="coupons"
      endpoint="/coupons"
      return
    >
      <div class="span-2">
        <v-text-field
          v-model="coupons.name"
          outlined
          dense
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="coupons.discount"
          :rules="[maxNumber]"
          outlined
          dense
          type="number"
          label="Percentage"
          hint=" Write Discount in %age here"
        ></v-text-field>
        <v-checkbox
          v-model="coupons.oneTimeUse"
          label="One time use"
        ></v-checkbox>
        <v-text-field
          v-model="coupons.startDate"
          type="date"
          label="Start Date"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="coupons.endDate"
          type="date"
          label="End Date"
          outlined
          dense
        ></v-text-field>
      </div>
    </SimpleForm>
  </div>
</template>

<script>
import * as moment from 'moment'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Coupon } from '@/models/coupon'
import { maxNumber } from '@/common/utils/validators'

export default {
  name: 'Form',
  components: { SimpleForm },

  props: {
    coupons: {
      type: Object,
      default: () => new Coupon()
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      date: null,
      toDateText: '',
      rules: {
        max: [
          function(v) {
            if (v > 100) {
              return 'discount cant exceed 100'
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.coupons.date = moment(this.coupons.date).format('YYYY-MM-DD')
    this.coupons.startDate = moment(this.coupons.startDate).format('YYYY-MM-DD')
    this.coupons.endDate = moment(this.coupons.endDate).format('YYYY-MM-DD')
  },
  methods: {
    maxNumber,
    dateFormat() {
      return moment()
    }
  }
}
</script>

<style scoped></style>
