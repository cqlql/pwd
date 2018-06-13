<template>
  <Popup :class="$style.popup" ref="vPopup" :initIsShow="initIsShow" :initMaskCloseEvent="false">
    <div :class="$style.tit">key</div>
    <BaseText :class="$style.textInput" @keyupEnter="onKeyupEnter" @inputValue="onInputValue">hello</BaseText>
  </Popup>
</template>

<script>
import Popup from '@/components/popup'
import BaseText from '@/components/forms/BaseText'
import ajaxApi from '@/modules/ajax-api'
export default {
  components: {
    BaseText,
    Popup
  },
  data () {
    return {
      initIsShow: true,
      key: ''
    }
  },
  created () {
    if (ajaxApi.token) {
      this.initIsShow = false
    }
  },
  methods: {
    onKeyupEnter () {
      ajaxApi.login(this.key).then(() => {
        this.$refs.vPopup.isShow = false
        this.isShowLogin = false
      })
    },
    onInputValue (v) {
      this.key = v
    }
  }
}
</script>
<style module>
.tit {
  padding-bottom: 10px;
}
.popup :global .popup {
  /* background-color: #ddd; */
  padding: 10px 0 20px;
}

.textInput {
  width: 80%;
}
</style>
