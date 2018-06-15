import Vue from 'vue'

export default new Vue({
  data: {
    isEdit: false
  },
  watch: {
    isEdit (isEdit) {
      if (isEdit) {
        document.title = '* ' + document.title
        window.onbeforeunload = function () {
          return '该页面未保存，是否确认退出？'
        }
      } else {
        document.title = document.title.replace(/\* /, '')
        window.onbeforeunload = null
      }
    }
  }
})
