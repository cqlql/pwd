<template>
  <div :class="[$style.itme,active&&$style.active,selected&&$style.selected]">{{d.name}}</div>
</template>

<script>
export default {
  props: {
    d: Object,
    active: Boolean,
    selected: Boolean
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
</style>
