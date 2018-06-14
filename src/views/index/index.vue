<template>
  <div>
    <LeftMenu @select="onSelectLeftMenu"/>
    <MainContent ref="vMainContent"/>
    <Login/>
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
    }
  },
  mounted () {

  },
  methods: {
    onSelectLeftMenu (id) {
      this.$refs.vMainContent.load(id)
    }
  }
}
</script>
