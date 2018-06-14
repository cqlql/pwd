<template>
  <div :class="insideIsEdit&&$style.edit">
    <div v-if="insideIsEdit">
      <input ref="eInput" type="text" @input="onInput" :value=value>
    </div>
    <div v-else :class="[$style.itme,active&&$style.active,selected&&$style.selected]">{{d.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: Boolean,
    d: Object,
    active: Boolean,
    selected: Boolean
  },
  data () {
    return {
      value: '',
      insideIsEdit: this.isEdit
    }
  },
  mounted () {
    this.insideIsEdit && this.focus()
  },
  methods: {
    onInput (e) {
      this.value = e.target.value
    },
    focus () {
      this.$refs.eInput.focus()
    },
    toEdit () {
      this.value = this.d.name
      this.insideIsEdit = true
      this.$nextTick(() => {
        this.focus()
      })
    },
    toText () {
      this.insideIsEdit = false
    }
  }
}
</script>

<style module>
.itme {
  padding: 8px 10px;
  font-size: 14px;
  white-space: nowrap;
  color: #555;
  cursor: pointer;
}

.active,
.itme:hover {
  background-color: #e4e4e4;
}

.itme.selected {
  background-color: #3998d6;
  color: #fff;
}
.edit {
  position: relative;
  z-index: 99;
}
</style>
