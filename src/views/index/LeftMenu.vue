<!--<template>
  <div :class="$style.typeMenu">
    <div :class="$style.topBar">
      <a href="javascript:;">add</a>
    </div>
    <div :class="$style.list">
      <ul v-if="list&&list.length">
        <li data-index="0" :class="$style.selected">canvas 画图</li>
        <li data-index="1">css</li>
        <li data-index="2">css-modules</li>
      </ul>
      <div v-if="list&&list.length===0" :class="$style.noData">
        <a href="javascript:;">没有数据，增加一个吧</a>
      </div>
    </div>
  </div>
</template>-->

<script>
import ajaxApi from '@/modules/ajax-api'
import LeftItem from './LeftItem'
import RightClickMenu from './RightClickMenu'
import scopeElements from '@/modules/corejs/dom/scope-elements.js'
export default {
  components: {
    LeftItem,
    RightClickMenu
  },
  render () {
    let { list, $style, acitveIndex, selectedIndex } = this
    let listCont
    if (list) {
      if (list.length) {
        let items = []
        list.forEach((item, i) => {
          items.push(<LeftItem ref={i} data-index={i} d={item} active={acitveIndex * 1 === i} selected={selectedIndex * 1 === i}/>)
        })
        listCont = (
          <div class={$style.listCont}>{items}</div>
        )
      } else {
        listCont = (
          <div class={$style.noData}>
            <a href="javascript:;">没有数据，增加一个吧</a>
          </div>
        )
      }
    }

    return (
      <div class={$style.typeMenu}>
        <div class={$style.topBar}>
          <a href="javascript:;">add</a>
        </div>
        <div class={$style.list} onContextmenu={this.onContextmenu} onClick={this.onClickSelect}>{listCont}</div>
        <RightClickMenu ref="vRightClickMenu" onRename={this.onRename} onDelete={this.onDelete} onClose={this.onClose}/>
      </div>
    )
  },
  data () {
    return {
      list: null,
      acitveIndex: -1,
      selectedIndex: -1
    }
  },
  created () {
    ajaxApi.list().then(data => {
      this.list = data
    })
  },
  methods: {
    onContextmenu (e) {
      e.preventDefault()
      this.findItemIndex(e.target, index => {
        this.acitveIndex = index
        this.$refs.vRightClickMenu.show(e)
      })
    },
    onRename () {
      console.log(this.$refs[this.acitveIndex])
    },
    onDelete (toClose) {
      this.$confirm('确认删除', () => {
        let index = this.acitveIndex
        let id = this.$refs[index].d.id
        ajaxApi.del(id).then(() => {
          toClose()
          this.list.splice(index, 1)
          this.$toast.success('删除成功')
        }).catch(() => {
          toClose()
        })
      }, function () {
        toClose()
      })
    },
    onClose () {
      this.acitveIndex = -1
    },
    onClickSelect ({target}) {
      this.findItemIndex(target, index => {
        if (this.selectedIndex !== index) {
          this.selectedIndex = index
          this.$emit('select', this.$refs[index].d.id)
        }
      })
    },
    findItemIndex (elem, cb) {
      const sList = this.$style.list
      scopeElements(elem, elem => {
        if (elem.classList.contains(sList)) return false
        let index = elem.dataset.index
        if (index) {
          cb(index)
          return false
        }
      })
    }
  }
}
</script>

<style module>
.typeMenu {
  height: 100%;
  background-color: #f7f7f7;
  border-right: 1px solid #efefef;
  box-sizing: border-box;

  width: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1;
  /* overflow: auto; */
}
.topBar {
}
.list {
  border-top: 1px solid #efefef;
  position: absolute;
  top: 26px;
  bottom: 0;
  width: 100%;
  overflow: auto;
}

.listCont {
  list-style-type: none;
}

</style>
