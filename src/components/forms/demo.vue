<template>
  <div class="box">
    <p><BaseText/></p>
    <p><BaseTextCircular/></p>
    <p><UserNameInput/></p>
    <p><PasswordInput/></p>
    <p><BaseCheckbox>下次自动登录</BaseCheckbox></p>
    <p>
      <LabelText>名称：</LabelText>
    </p>
    <p>
      <LabelText><span class="lb">视频：</span></LabelText>
    </p>
    <p>
      <LabelText><span class="lb">视频连接地址：</span></LabelText>
    </p>
    <p>
      <BaseTextareaFull/>
    </p>
  </div>
</template>

<script>
import BaseText from './BaseText'
import BaseTextCircular from './BaseTextCircular'
import UserNameInput from './UserNameInput'
import PasswordInput from './PasswordInput'
import BaseCheckbox from './BaseCheckbox'
import LabelText from './LabelText'
import BaseTextareaFull from './BaseTextareaFull'
export default {
  components: {
    BaseText,
    BaseTextCircular,
    UserNameInput,
    PasswordInput,
    BaseCheckbox,
    LabelText,
    BaseTextareaFull
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}
.lb {
  display: inline-block;
  width: 130px;
  text-align: right;
   white-space: nowrap;
}
</style>
