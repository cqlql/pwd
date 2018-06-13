<template>
  <div :class="$style.mainContent">
    <div :class="$style.editBox">
      <textarea :class="$style.eidt" @input="onInput">123</textarea>
    </div>
    <div :class="$style.preview"></div>
  </div>
</template>

<script>
import marked from '@/../modules/marked.js'
import ExcuInterval from '@/modules/corejs/excu/excu-interval.js'
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
    onInput ({target}) {
      this.excuInterval.excu(function () {
        this.resultContent = marked(target.value)
        // console.log(target.value)
      }, 300)
    }
  }
}
</script>

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

}
.eidt {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  resize: none;
  border: 0;
  outline: none;
}
</style>
