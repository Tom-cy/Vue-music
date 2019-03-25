<template>
  <scroll class="listview"
          ref="listview"
          :listenScroll='listenScroll'
          @scroll='scroll'
          :probeType='probeType'
          :data='data'>
    <ul>
      <li class="list-group"
          v-for='(group, index) in data'
          ref="listGroup"
          :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item"
              v-for="item in group.items"
              :key="item.id">
            <img v-lazy="item.avatar"
                 alt=""
                 class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart='onShortcutTouchStart'
         @touchmove.stop.prevent='onShortcutTouchMove'>
      <ul>
        <li v-for="(item , index) in shortcutList"
            :key="index"
            :data-index='index'
            :class="{'current': currentIndex ===index}"
            class="item">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
export default {
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  props: {
    data: {
      type: Array,
      dafault: []
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart (e) {
      console.log(1)
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      console.log(anchorIndex)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
    // 计算商品列表高度
    // _calculateHeight () {
    //   this.listHeight = []
    //   // 获取到所有到列表
    //   const list = this.$refs.listGroup
    //   // 第一次高度肯定为0
    //   let height = 0
    //   this.listHeight.push(height)
    //   for (let i = 0; i < list.length; i++) {
    //     let item = list[i]
    //     height += item.clientHeight

    //     this.listHeight.push(height)
    //   }
    // }
  },
  // watch: {
  //   data () {
  //     setTimeout(() => {
  //       // this._calculateHeight()
  //     }, 20)
  //   },
  //   scrollY (newY) {
  //     const listHeight = this.listHeight
  //     // 判断区间  newY > 0
  //     if (newY > 0) {
  //       this.currentIndex = 0
  //       return
  //     }
  //     // 判断区间  中间部分
  //     for (let i = 0; i < listHeight.length - 1; i++) {
  //       let height1 = listHeight[i]
  //       let height2 = listHeight[i + 1]
  //       // eslint-disable-next-line no-mixed-operators
  //       if (-newY >= height1 && -newY < height2) {
  //         this.currentIndex = i
  //         return
  //       }
  //     }
  //     // 滚动底部且-newy > 最后一个元素到上限
  //     this.currentIndex = listHeight.length - 2
  //   }
  // },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
