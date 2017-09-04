<template>
    <div>
        <header class="head">
            <!-- 顶部 -->
            <section class="head_top">
              <div class="flex_w iconfont" @click="$router.go(-1)"> &#xe601; </div>
              <div class="flex1">{{title}}</div>
              <div class="flex_w iconfont"  @click="menuShow()"> &#xe60a; </div>
            </section>
            <!-- 导航 -->
            <section class="menu" :class="{ menuInDown:show}" >
              <div></div>
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
        <nav class="head_nav" v-if="showNav">
            <swiper :options="swiperOption" >       
              <swiper-slide  class="classify" key="nav.id" v-for="(nav,index) in navTitle" >
                <router-link :to="nav.to">
                  <img :src="nav.icon">
                  <p>{{nav.title}}</p>
                </router-link>
              </swiper-slide>
            </swiper>  
        </nav>
    </div>
</template>

<script>

export default{
    props: {
      title: null
    },
    data(){
        return{
            show: false,
            showNav: true,
            swiperOption: {
                freeMode : true,
                slidesPerView : 5,
                click: true
            },
            navTitle: [
              { "title":"新闻", "icon": require("../assets/icon/icon_xw1.png"), "to":"/home" },
              { "title":"视频", "icon": require("../assets/icon/icon_sp.png"), "to":"/video" },
              { "title":"音乐", "icon": require("../assets/icon/icon_yy.png"), "to":"/musiclist" },
              { "title":"NBA", "icon": require("../assets/icon/icon_ty.png"), "to":"/nba" },
              { "title":"美图", "icon": require("../assets/icon/icon_mt.png"), "to":"/photo" },
              { "title":"精选", "icon": require("../assets/icon/icon_dz.png"), "to":"/featured" },
              { "title":"电影", "icon": require("../assets/icon/icon_dy.png"), "to":"/movie" },
              { "title":"框架", "icon": require("../assets/icon/icon_kj.png"), "to":"/webframe" }
            ],
        }
    },
    //计算
    computed: {

    },
    //实例已经创建完成之后执行
    created() {

    },
    //完成挂载执行
    mounted() {

    },
    //事件
    methods: {
        menuShow() {
          this.show = true;
        },
        menuHide() {
          this.show = false;
        },
        //父页面调用
        _changeNav(state) {
          this.showNav = state
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

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
      // background-image: url('../assets/nav_bg.png');
      // background-repeat: no-repeat;
      // background-position: center center;
      // background-size: 100%;
      .flex1 {
        flex: 1;
        height: 100%;
        font-size: 18px/$ppr;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
  background-color: #fff;
  .classify{
    text-align: center;
    transition: all 0.5s;
    padding: 5px/$ppr 0;
    & img{
      width: 25px/$ppr;
      height: 25px/$ppr;
      transition: all 0.3s;
    }
    & p{
      font-size: 12px/$ppr;
      margin-top: 5px/$ppr;
    }
    .router-link-active{
      & p{
        color: red;
        font-size: 14px/$ppr;
      }
      & img{
        transform: scale(1.2);
      }
      
    }
    & a{
      color: black;
      font-size: 16px/$ppr;
      text-decoration: none;
      display: block;
    }
  }
}


    
</style>