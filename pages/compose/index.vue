<template>
  <div style="display: flex;justify-content: center" app>
    <SimpleForm
      title="Compose"
      endpoint="/subscribers/sendemail"
      :data="compose"
      return
    >
      <div class="span-2" style="margin-bottom: 30px">
        <ckeditor
          id="editor"
          v-model="compose.data"
          :editor="editor"
          contenteditable="true"
          style="height: 500px; width: 100%"
        ></ckeditor>
      </div>
    </SimpleForm>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Compose } from '../../models/compose'

export default {
  name: 'Index',
  components: { SimpleForm },
  props: {
    compose: {
      type: Object,
      default: () => new Compose()
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        extraPlugins: [
          (editor) => {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader
            ) => ({
              upload() {
                console.log('uploading....')
              }
            })
          }
        ]
      }
    }
  },

  mounted() {
    console.log(ClassicEditor)
  }
}
</script>

<style lang="sass">
/*.form*/
/*  width: 100%*/
</style>
