<template>
  <div v-if="isShow" :class="$style.rightClickMenu" :style="{left:left+'px',top:top+'px'}" tabindex="-1" @blur="onBlur">
      <ul>
        <li :class="$style.item" @click="onClickRename">重命名</li>
        <li :class="$style.item" @click="onClickDelete">删除</li>
      </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      left: 0,
      top: 0,
      isShow: false
    }
  },
  created () {
    this.allowClose = true
  },
  methods: {
    show ({clientX, clientY}) {
      this.left = clientX
      this.top = clientY
      this.isShow = true
      this.$nextTick(() => {
        this.$el.focus()
      })
    },
    onBlur () {
      if (this.allowClose) this.isShow = false
    },
    onClickDelete () {
      this.allowClose = false
      this.$emit('delete', () => {
        this.allowClose = true
        this.isShow = false
      })
    },
    onClickRename () {
      this.isShow = false
      this.$emit('rename')
    }
  },
  watch: {
    isShow (isShow) {
      if (!isShow) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style module>
.rightClickMenu {
  position: fixed;
  border: 2px solid red;
  outline: none;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 2px 2px 3px 0px #b3b3b3;
  z-index: 99;
}
.item {
  padding: 4px 10px;
}
.item:hover {
  background-color: #ddd;
}
</style>
