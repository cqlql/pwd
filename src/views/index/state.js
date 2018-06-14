import Vue from 'vue'

export default new Vue({
  data: {
    isEdit: false
  },
  watch: {
    isEdit (isEdit) {
      if (isEdit) {
        document.title = '* ' + document.title
      } else {
        document.title = document.title.replace(/\* /, '')
      }
    }
  }
})
