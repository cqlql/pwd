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
import VMask from '@/components/base/VMask'
import state from './state.js'
export default {
  components: {
    LeftItem,
    RightClickMenu,
    VMask
  },
  render () {
    let { list, $style, deleteIndex, selectedIndex, isAdd, isEdit } = this
    let listCont
    if (list) {
      if (isAdd || list.length) {
        let items = isAdd ? [<LeftItem isEdit ref="vAddItem"/>] : []
        list.forEach((item, i) => {
          items.push(<LeftItem key={item.id} ref={i} data-index={i} d={item} active={deleteIndex * 1 === i} selected={selectedIndex * 1 === i}/>)
        })
        listCont = (
          <div class={$style.listCont}>{items}</div>
        )
      } else {
        listCont = (
          <div class={$style.noData}>
            <a href="javascript:;" onClick={this.onAddMode}>没有数据，增加一个吧</a>
          </div>
        )
      }
    }

    return (
      <div class={$style.typeMenu}>
        <div class={$style.topBar}>
          <a href="javascript:;" onClick={this.onAddMode}>add</a>
        </div>
        <div class={$style.list} onContextmenu={this.onContextmenu} onClick={this.onClickSelect} onKeyup={({keyCode}) => { keyCode === 13 && this.onSave() }}>{listCont}</div>
        <RightClickMenu ref="vRightClickMenu" onRename={this.onRename} onDelete={this.onDelete} onClose={this.onClose}/>
        {(isAdd || isEdit) && <VMask onClick={this.onSave}/>}
      </div>
    )
  },
  data () {
    return {
      list: null,
      isAdd: false,
      isEdit: false,
      deleteIndex: -1,
      editIndex: -1,
      selectedIndex: -1
    }
  },
  created () {
    ajaxApi.list().then(data => {
      this.list = data
      this.$emit('load', data)
    })
  },
  methods: {
    onContextmenu (e) {
      e.preventDefault()
      this.findItemIndex(e.target, index => {
        this.editIndex = this.deleteIndex = index
        this.$refs.vRightClickMenu.show(e)
      })
    },
    onRename () {
      this.isEdit = true
      this.$refs[this.editIndex].toEdit()
    },
    onDelete (toClose) {
      this.$confirm('确认删除', () => {
        let index = this.deleteIndex
        let id = this.$refs[index].d.id
        ajaxApi.del(id).then(() => {
          toClose()
          this.list.splice(index, 1)
          this.$toast.success('删除成功')
          if (index === this.selectedIndex) {
            this.$emit('load', this.list)
          } else {
            this.selectedIndex--
          }
        }).catch(() => {
          toClose()
        })
      }, function () {
        toClose()
      })
    },
    onClose () {
      this.deleteIndex = -1
    },
    onClickSelect ({target}) {
      this.findItemIndex(target, index => {
        if (this.selectedIndex !== index) {
          const excu = () => {
            this.selectedIndex = index
            this.$emit('select', this.$refs[index].d.id)
            state.isEdit = false
          }
          if (state.isEdit) {
            this.$confirm('未保存，确定离开？', excu)
          } else {
            excu()
          }
        }
      })
    },
    onSave () {
      if (this.isAdd) {
        // 新增
        let {value} = this.$refs.vAddItem
        value = value.trim()
        if (value) {
          ajaxApi.add(value).then(id => {
            this.isAdd = false
            this.$toast.success('新增成功')
            this.list.unshift({
              id,
              name: value
            })
            this.$emit('load', this.list)
          })
        } else {
          this.isAdd = false
        }
      } else {
        // 修改名称
        let index = this.editIndex
        let vItem = this.$refs[index]
        let {value} = vItem
        value = value.trim()
        if (value !== vItem.d.name) {
          ajaxApi.editName({
            id: vItem.d.id,
            name: value
          }).then(id => {
            this.isEdit = false
            this.$toast.success('修改成功')
            this.list[index].name = value
            vItem.toText()
          })
        } else {
          this.isEdit = false
          vItem.toText()
        }
      }
    },
    onAddMode () {
      this.isAdd = true
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
    },
    select (index) {
      this.selectedIndex = index
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
