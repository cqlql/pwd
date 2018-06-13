<template>
  <div>
    <VMask v-show="mask&&isShow" @click="maskClose&&(isShow=false)" />
    <VTransition name="zoom-out">
    <div :class="$style.popup" class="popup" v-show="isShow">
      <slot/>
    </div>
    </VTransition>
  </div>
</template>

<script>
import VMask from '../base/VMask'
import VTransition from '../v-transition'
export default {
  props: {
    initIsShow: Boolean,
    initMaskCloseEvent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      mask: true,
      maskClose: this.initMaskCloseEvent,
      isShow: this.initIsShow
    }
  },
  methods: {
    show ({mask = true} = {}) {
      this.mask = mask
      this.isShow = true
    }
  },
  components: {
    VMask,
    VTransition
  }
}
</script>

<style module>
.popup {
  position: fixed;
  display: table;
  z-index: 99;
  width: 300px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  text-align: center;
  border-radius: 3px;
}
</style>
