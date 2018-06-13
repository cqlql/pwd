<template>
  <div>
    <LeftMenu/>
    <MainContent/>
    <Login/>
  </div>
</template>

<script>
import LeftMenu from './LeftMenu'
import MainContent from './MainContent'
import Login from './Login'
import AES from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'
export default {
  components: {
    Login,
    LeftMenu,
    MainContent
  },
  data () {
    return {
    }
  },
  created () {
    console.log(AES.decrypt('U2FsdGVkX1/0wAtd3RCORkqjDr4CEKo4IK9fKfc0uWE=', '941491').toString(enc))
  },
  methods: {
  }
}
</script>
<style module>

</style>
