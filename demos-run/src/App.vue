<template>
  <div>
    <VTransition :name="slideName" :activeClass="activeClass">
      <router-view></router-view>
    </VTransition>
  </div>
</template>

<script>
import VTransition from '@/components/v-transition'
export default {
  data () {
    return {
      slideName: ''
    }
  },
  computed: {
    activeClass () {
      return this.slideName && 'slide-active'
    }
  },
  watch: {
    '$route' (to, from) {
      if (from.name) {
        let toPath = to.path
        let fromPath = from.path
        toPath = toPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
        fromPath = fromPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
        let toDepth = toPath.split('/').length
        let fromDepth = fromPath.split('/').length
        if (toDepth === fromDepth) {
          toDepth = to.meta.zIndex
          fromDepth = from.meta.zIndex
        }
        this.slideName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  components: {
    VTransition
  }
}
</script>

<style scoped>
  .slide-active{
    transition: 0.3s cubic-bezier(.55,0,.1,1);
    transition-property:opacity,transform;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
  }

</style>
