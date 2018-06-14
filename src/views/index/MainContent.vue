<template>
  <div v-key-ctrl="onKeyCtrl" :class="$style.mainContent">
    <div :class="$style.editBox">
      <textarea :class="$style.eidt" @input="onInput" :value="content"></textarea>
    </div>
    <div :class="$style.preview" class="markdown-body" v-html="resultContent"></div>
  </div>
</template>

<script>
import marked from '@/../modules/marked.js'
import ExcuInterval from '@/modules/corejs/excu/excu-interval.js'
import ajaxApi from '@/modules/ajax-api'
import state from './state.js'

export default {
  data () {
    return {
      content: '',
      resultContent: ''
    }
  },
  created () {
    this.state = state
    this.excuInterval = new ExcuInterval()
  },
  directives: {
    'key-ctrl': {
      // 指令的定义
      inserted (el, {value}) {
        let ctrlDown = false
        el.addEventListener('keydown', function (e) {
          if (e.keyCode === 17) {
            ctrlDown = true
          } else if (ctrlDown) {
            if (value(e.keyCode) === false) {
              e.preventDefault()
            }
          }
        })
        el.addEventListener('keyup', function (e) {
          if (e.keyCode === 17) {
            ctrlDown = false
          }
        })
      }
    }
  },
  methods: {
    onInput ({ target }) {
      this.state.isEdit = true
      this.excuInterval.excu(() => {
        this.resultContent = marked(this.content = target.value)
      }, 300)
    },
    load (id) {
      ajaxApi.getItem(id).then(data => {
        data = this.content = this.decrypt(data)
        this.resultContent = marked(data)
      })
    },
    encrypt (content) {
      return content.replace(/\${3}(.+?)\${3}/, function (o, r) {
        return '$$$' + ajaxApi.encrypt(r) + '$$$'
      })
    },
    decrypt (content) {
      return content.replace(/\${3}(.+?)\${3}/, function (o, r) {
        return '$$$' + ajaxApi.decrypt(r) + '$$$'
      })
    },
    onKeyCtrl (keyCode) {
      if (keyCode === 83) {
        ajaxApi.editContent(this.encrypt(this.content)).then(() => {
          state.isEdit = false
        })
        return false
      }
    }
  }
}
</script>

<style src="./markdown-style.css"></style>

<style module>
.mainContent {
  position: fixed;
  display: flex;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
}

.editBox {
  flex: 1;
  width: 50%;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
}
.preview {
  flex: 1;
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
}
.eidt {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  resize: none;
  border: 0;
  outline: none;

  font: 14px/1.2 "Microsoft Yahei", sans-serif, arial, SimSun, tahoma, Srial,
    helvetica;
}
</style>
