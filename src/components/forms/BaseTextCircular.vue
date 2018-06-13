<template>
  <BaseText :type="type" :placeholder="placeholder" @inputValue="v=>$emit('inputValue',v)" />
</template>

<script>
import BaseText from './BaseText'
export default {
  props: {
    placeholder: String,
    type: String
  },
  components: {
    BaseText
  }
}
</script>

<style scoped>
.form-control {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 30px;
  box-shadow: 0 5px 25px rgba(12, 12, 12, 0.07);
  padding-left: 20px;
  letter-spacing: 1.3px;
  border: 1px solid #0ace82;
  font-weight: bold;
}
</style>


