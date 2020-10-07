<template>
  <div>
    <div style="display: flex;justify-content: center">
      <SimpleForm
        title="Send New Notification"
        :data="notification"
        endpoint="fcm/notification"
      >
        <div class="span-2">
          <!--          <v-select-->
          <!--            v-model="notification.user"-->
          <!--            :items="items"-->
          <!--            outlined-->
          <!--            dense-->
          <!--            label="&#45;&#45; Select Type &#45;&#45;"-->
          <!--          ></v-select>-->
          <v-text-field
            v-model="notification.title"
            label="Title"
            outlined
            dense
          />
          <v-textarea
            v-model="notification.description"
            outlined
            label="Notification"
          ></v-textarea>
        </div>
      </SimpleForm>
      <!--      <v-data-table-->
      <!--        :headers="headers"-->
      <!--        :items="notify"-->
      <!--        endpoint="fcm/notification"-->
      <!--      ></v-data-table>-->
    </div>
  </div>
</template>

<script>
import SimpleForm from '@/common/ui/widgets/SimpleForm'
import { Notification } from '@/models/notification'

export default {
  name: 'Notification',
  components: { SimpleForm },
  props: {
    notification: {
      type: Object,
      default: () => new Notification()
    },
    notify: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: ['all', 'Supplier', 'Customer'],
      selected: null,
      headers: [
        { text: 'TITLE', value: 'title' },
        { text: 'DESCRIPTION', value: 'description' }
      ]
    }
  }
}
</script>

<style lang="sass">
/*.form*/
//width: 100%
</style>
