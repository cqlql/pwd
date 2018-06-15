<template>
  <div :class="$style.bar">
    <VButtonSmall v-if="mode" @click="$emit('preview');mode=0">预览</VButtonSmall>
    <VButtonSmall v-else @click="$emit('edit');mode=1" s="gray">编辑</VButtonSmall>
  </div>
</template>

<script>
import VButtonSmall from '@/components/buttons/VButtonSmall'
export default {
  components: {
    VButtonSmall
  },
  data () {
    return {
      mode: 0
    }
  }
}
</script>

<style module>
.bar {
  padding: 10px;
}
</style>
