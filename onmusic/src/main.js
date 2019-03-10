// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
// 基础css配置
import 'common/stylus/index.styl'

// 移动端一像素边框问题
import 'common/css/border.css'
// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('common/image/maozhao.png')
})
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
