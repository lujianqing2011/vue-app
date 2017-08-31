import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'      //使用axios进行ajax的交互
import VueAxios from 'vue-axios'
import store from './store/index.js'
import Swiper from 'vue-awesome-swiper'
import './style/animate.css'
import './config/rem.js'
import './style/reset.css'
import './style/swiper.css'
import './style/font/demo.css'
import './style/font/iconfont.css'


Vue.use(Swiper)

Vue.filter("minutes", function (value) {
    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return (Math.floor(value / 60) + ":" + Math.floor(value % 60));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
