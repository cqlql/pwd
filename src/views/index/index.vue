<template>
  <div>
    <LeftMenu v-if="isSuccess" ref="vLeftMenu" @select="onSelectLeftMenu" @load="onLoadLeftMenu"/>
    <MainContent v-if="isSuccess" ref="vMainContent"/>
    <Login @success="onLoginSuccess"/>
  </div>
</template>

<script>
import LeftMenu from './LeftMenu'
import MainContent from './MainContent'
import Login from './Login'
export default {
  components: {
    Login,
    LeftMenu,
    MainContent
  },
  data () {
    return {
      isSuccess: false
    }
  },
  mounted () {

  },
  methods: {
    onSelectLeftMenu (id) {
      this.$refs.vMainContent.load(id)
    },
    onLoadLeftMenu (list) {
      this.$refs.vLeftMenu.select(0)
      let first = list[0]
      if (first) {
        this.$refs.vMainContent.load(first.id)
      }
    },
    onLoginSuccess () {
      this.isSuccess = true
    }
  }
}
</script>
