<template>
  <div :class="$style.mainContent">
    <div :class="$style.editBox">
      <textarea :class="$style.eidt" @input="onInput">123</textarea>
    </div>
    <div :class="$style.preview" class="markdown-body" v-html="resultContent"></div>
  </div>
</template>

<script>
import marked from '@/../modules/marked.js'
import ExcuInterval from '@/modules/corejs/excu/excu-interval.js'
// import ajaxApi from '@/modules/ajax-api'

export default {
  data () {
    return {
      resultContent: ''
    }
  },
  created () {
    this.excuInterval = new ExcuInterval()
  },
  methods: {
    onInput ({ target }) {
      this.excuInterval.excu(() => {
        // let value = target.value.replace(/\${3}(.+?)\${3}/, function (o, r) {
        //   return '$$$' + ajaxApi.encrypt(r) + '$$$'
        // })
        this.resultContent = marked(target.value)
        // console.log(target.value)
      }, 300)
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
  border-right: 1px solid #ddd;
}
.preview {
  flex: 1;
  padding: 20px;
}
.eidt {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  resize: none;
  border: 0;
  outline: none;

  font: 14px/1.2 "Microsoft Yahei",sans-serif,arial,SimSun,tahoma,Srial,helvetica;
}
</style>
