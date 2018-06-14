<template>
  <div>
    <LeftMenu ref="vLeftMenu" @select="onSelectLeftMenu" @load="onLoadLeftMenu"/>
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
    },
    onLoadLeftMenu (list) {
      this.$refs.vLeftMenu.select(0)
      let first = list[0]
      if (first) {
        this.$refs.vMainContent.load(first.id)
      }
    }
  }
}
</script>
