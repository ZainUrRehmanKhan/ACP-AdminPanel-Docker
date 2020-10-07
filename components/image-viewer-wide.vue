<template>
  <div style="margin-bottom: 30px" class="my-main">
    <div style="display: flex;overflow: auto" class="main-scrollbar">
      <div
        v-for="(item, i) of image"
        :key="i"
        style="margin-left: 10px;"
        class="main-scrollbar"
      >
        <img
          width="100%"
          height="100%"
          style=" display: block;
        width: 200px;
        height: 200px;
        cursor: pointer;"
          :src="$axios.defaults.baseURL + '/uploads/' + item.name"
          @click="viewImage(item.name, item.sort)"
        />
      </div>
    </div>
    <v-dialog v-model="imageView" width="700px">
      <div
        class="prod-dialog"
        style="display: flex;justify-content: center;align-items: center;width:700px;background-color: white"
      >
        <div v-if="name" style="width: 100%">
          <img
            class="prod-img"
            style="object-fit: cover;width: 700px"
            :src="$axios.defaults.baseURL + '/uploads/' + name"
          />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageViewerWide',
  props: {
    image: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    imageView: false,
    name: null,
    title: null
  }),
  mounted() {
    window.console.log(this.$axios.defaults.baseURL)
  },
  methods: {
    viewImage(name, title) {
      this.imageView = true
      this.name = name
      this.title = title
    }
  }
}
</script>

<style>
@media only screen and (max-width: 600px) {
  .prod-dialog {
    width: 100% !important;
  }

  .prod-img {
    width: 100% !important;
  }

  .main-scrollbar::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }
  .main-scrollbar::-webkit-scrollbar-track {
    background-color: #fff;
  }
  .main-scrollbar::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }
  .main-scrollbar::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  .main-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }
  .main-scrollbar::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar {
    display: block;
  }
}
</style>
