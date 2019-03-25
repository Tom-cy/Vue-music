<template>
  <div class="singer"
       ref="singer">
    <listview :data="singers"></listview>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import Listview from 'base/listview/listview'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  data () {
    return {
      singers: []
    }
  },
  components: {
    getSingerList,
    Listview
  },
  created () {
  },
  mounted () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    // 定义一个方法获得热门数据
    _normalizeSinger (list) {
      // 初始化热门数据
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 填充hot 数据
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 填充非hot 数据
        const key = item.Findex
        // 判断 map有没有key  没有将添加key 即为title
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      // 为了得到有序列表  我们需要处理map
      let hot = []
      let ret = []
      for (var key in map) {
        let val = map[key]
        // console.log(val)
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // a-z数组排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
