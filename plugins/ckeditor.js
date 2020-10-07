import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

Vue.use(CKEditor, {
  editors: {
    classic: ClassicEditor
  }
})
