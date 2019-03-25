  <template>
  <div class="recommend">
    <scroll class="recommend-content"
            ref="scroll"
            :data='discList'>

      <div>
        <!-- 轮播图 -->
        <div v-if="recommdends.length"
             class="slider-wrapper">
          <!-- 轮播图 -->
          <slider>
            <div v-for='item in recommdends'
                 :key='item.id'>
              <a :href="item.linkUrl">
                <img :src="item.picUrl"
                     class="needsclick"
                     @load="loadImage"
                     alt="">
              </a>
            </div>
          </slider>
        </div>
        <!-- 电台列表 -->
        <div class="recommend-list">
          <h1 class="list-title">电台</h1>
          <ul class="radio">
            <li class="detail_radio"
                v-for='item in radioList'
                :key='item.radioid'>
              <a href="">
                <div class="raio_po">
                  <img class="radio_pic"
                       v-lazy="item.picUrl"
                       alt="">
                  <span class="radio_play"></span>
                </div>
                <div class="radio_title">
                  {{item.Ftitle}}
                </div>
              </a>
            </li>

          </ul>
        </div>
        <!--  热门歌单推荐 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for='(item, index) in discList'
                :key='index'
                class="item">
              <div class="icon">
                <img v-lazy="item.imgurl"
                     width="60"
                     height="60"
                     alt="">
              </div>

              <div class="text">
                <h2 class="name"
                    v-html="item.creator.name"></h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container"
           v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommendData, getDiscList } from 'api/getRecommend'

import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  name: 'recommend',
  data () {
    return {
      recommdends: [],
      radioList: [],
      songList: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading

  },
  created () {
    this._getRecommendData()
    this._getDiscList()
  },
  methods: {

    _getRecommendData () {
      getRecommendData().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.recommdends = res.data.slider
          this.radioList = res.data.radioList
          this.songList = res.data.songList
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        this.discList = res.data.list
      })
    },
    // 监听图片是否加载完成
    loadImage () {
      if (!this.checkImage) {
        this.$refs.scroll.refresh()
        this.checkImage = true
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .recommend-list {
      padding: 0 0 0 10px;

      .list-title {
        height: 48px;
        line-height: 48px;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .radio {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .detail_radio {
          margin-right: 10px;
          flex: 1;

          .raio_po {
            position: relative;
            overflow: hidden;

            .radio_pic {
              width: 100%;
            }

            .radio_play {
              position: absolute;
              bottom: 7px;
              right: 5px;
              width: 24px;
              height: 24px;
              background-image: url('bofang.png');
              background-size: cover;
            }

            .radio_title {
              height: 36px;
              line-height: 18px;
              white-space: normal;
              word-wrap: break-word;
              font-size: 14px;
            }
          }
        }
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
