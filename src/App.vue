<template>
  <div id="app">
    <header class="head">
        <!-- 顶部 -->
        <section class="head_top">
          <div class="flex_w iconfont" @click="$router.go(-1)"> &#xe601; </div>
          <div class="flex1">{{title}}</div>
          <div class="flex_w iconfont"  @click="menuShow()"> &#xe60a; </div>
        </section>
        <!-- 导航 -->
        <section class="menu" :class="{ menuInDown:show}" >
          <ul class="menu_nav">
            <li v-for="nav in navTitle" key="nav.id" @click="show = false">
              <router-link :to="nav.to">
                <p class="icon"><img :src="nav.icon"></p>
                <p class="title">{{nav.title}}</p>
              </router-link>
            </li>
          </ul>
          <div class="hideM_menu"> <i class=" iconfont" @click="menuHide()">&#xe607;</i> </div>
        </section>
    </header>
    <!-- 导航 -->
    <nav class="head_nav" v-if="showNav">
        <swiper :options="swiperOption" >       
          <swiper-slide  class="classify" key="nav.id" v-for="(nav,index) in navTitle" >
            <router-link :to="nav.to">{{nav.title}}</router-link>
          </swiper-slide>
        </swiper>  
    </nav>

    <!-- 加载动画s -->
    <div class="loading_animation " v-if="showLoading">
      <div class="card">
        <span class="three-quarters-loader">Loading&#8230;</span>
      </div>
    </div>
    <!-- 加载动画e -->

    <transition 
        enter-active-class="animated flipInY "
        leave-active-class="animated flipOutY"
    >
        <keep-alive>
            <router-view @title="change" @loading="loading" :title="title"></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{
        show: false,
        title: "~~",
        swiperOption: {
            freeMode : true,
            slidesPerView : 5,
            click: true
        },
        navTitle: [
          { "title":"新闻", "icon": require("./assets/icon/icon_xw1.png"), "to":"/home" },
          { "title":"视频", "icon": require("./assets/icon/icon_sp.png"), "to":"/video" },
          { "title":"音乐", "icon": require("./assets/icon/icon_yy.png"), "to":"/musiclist" },
          { "title":"电影", "icon": require("./assets/icon/icon_dy.png"), "to":"/movie" },
          { "title":"美图", "icon": require("./assets/icon/icon_mt.png"), "to":"" },
          { "title":"段子", "icon": require("./assets/icon/icon_dz.png"), "to":"" },
          { "title":"体育", "icon": require("./assets/icon/icon_ty.png"), "to":"" },
          { "title":"教育", "icon": require("./assets/icon/icon_jy.png"), "to":"" },
          { "title":"IT科技", "icon": require("./assets/icon/icon_kj.png"), "to":"" }
        ],
        showNav: true,
        showLoading: false
    }
  },
  mounted() {
    
  },
  methods: {
    change(title) {
      this.title = title
    },
    loading(state) {
      this.showLoading = state
    },
    menuShow() {
      this.show = true;
    },
    menuHide() {
      this.show = false;
    }
  }
}
</script>

<style lang="scss">

$ppr: 14px/0.28rem;

body{
    font-size: .28rem;
}
.head {
    .head_top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 54px/$ppr;
      line-height: 54px/$ppr;
      background: red;
      text-align: center;
      color: white;
      .flex1 {
        flex: 1;
        height: 100%;
        font-size: 18px/$ppr;
      }
      .flex_w {
        flex: 0 0 54px/$ppr;
        height: 100%;
        font-size: 20px/$ppr;
      }
    }
    .menu {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      background: rgba(255,255,255,0.95);
      //transition: all 0.5s ease-in-out;
      transition: all 0.5s cubic-bezier(0.8, 1, 0.5, 1);
      transform: translate3d(0, -100%, 0);
      .menu_nav{
        width: 100%;
        margin: auto 0;
        padding: 20px/$ppr 0;
        zoom: 1;
        //background: white;
        &:after{
          display: block;
          clear: both;
          content: "";
          visibility: hidden;
          height: 0;
        } 
        & li{
          width: 33.33%;
          float: left;
          text-align: center;
          padding-bottom: 10px/$ppr;
          box-sizing: border-box;
          & .icon{
            font-size: 30px/$ppr;
            padding: 5px/$ppr 0;
            text-align: center;
            & img{
              width: 42px/$ppr;
              max-width: 64px;
              line-height: 0;
              font-size: 0;
              overflow: hidden;
            }
          }
          & .title{
            font-size: 16px/$ppr;
            line-height: 30px;
            color: black;
          }
        }
      }
      .hideM_menu{
        width: 100%;
        height: 60px/$ppr;
        line-height: 60px/$ppr;
        text-align: center;
        position: absolute;
        bottom: 0;
        & i{
          display: inline-block;
          font-size: 25px/$ppr;
          color: red;
        }
      }
      &.menuInDown {
          transform: translate3d(0,0,0)
      }
  }
}
.head_nav {
  background: rgba(255, 255, 255, 0.7);
  .classify{
    height: 40px/$ppr;
    line-height: 40px/$ppr;
    text-align: center;
    & a{
      color: black;
      font-size: 16px/$ppr;
      text-decoration: none;
    }
  }
}

// 加载动画样式s
.loading_animation{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    z-index: 999;
    padding: 20px/$ppr;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px/$ppr;
}
/* :not(:required) hides this rule from IE9 and below */
.three-quarters-loader:not(:required) {
  -moz-animation: three-quarters-loader 1250ms infinite linear;
  -webkit-animation: three-quarters-loader 1250ms infinite linear;
  animation: three-quarters-loader 1250ms infinite linear;
  border: 8px/$ppr solid rgb(255, 255, 255);
  border-right-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  overflow: hidden;
  text-indent: -9999px;
  width: 40px/$ppr;
  height: 40px/$ppr;
}

@-moz-keyframes three-quarters-loader {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes three-quarters-loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes three-quarters-loader {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
// 加载动画样式e




</style>
