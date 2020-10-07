<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Shipping Charges' : 'Add Shipping Charges'"
      :data="shippingCharges"
      endpoint="shipping-charges"
      return
    >
      <div class="span-2">
        <v-text-field
          v-model="shippingCharges.location"
          label="Location"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="shippingCharges.charges"
          label="Charges"
          type="number"
          outlined
          dense
        ></v-text-field>
      </div>
    </SimpleForm>
  </div>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { ShippingCharge } from '@/models/shipping-charge'
export default {
  name: 'ShippingChargesForm',
  components: { SimpleForm },
  props: {
    shippingCharges: {
      type: Object,
      default: () => new ShippingCharge()
    },
    isUpdate: {
      type: Boolean
    }
  }
}
</script>

<style scoped></style>
