<template>
  <div id="app">

    <!-- header -->
    <module-header v-show="showHeader" :title="title" ref="navState" ></module-header>

    <!-- 加载动画s -->
    <div class="loading_animation " v-if="showLoading">
      <div class="card">
        <span class="three-quarters-loader">Loading&#8230;</span>
      </div>
    </div>
    <!-- 加载动画e -->
    
    <!-- enter-active-class="animated flipInY "
    leave-active-class="animated flipOutY" -->
    <transition 
         :name='transitionName' mode='out-in'
    >
        <keep-alive>
          <router-view 
              @loading = "loading" 
              @showState = "showState" 
              @changeNavState = "changeNavState"
              @titleState = "titleState" 
              class="child_view">
          </router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>

import api from '@/api/api'
import moduleHeader from './components/ModuleHeader'

export default {
  components: {
    moduleHeader
  },
  data(){
    return{
        title: "9",
        transitionName: 'slide-left',
        showHeader: true,
        showLoading: false
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length  
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  mounted() {
    
  },
  methods: {
    loading(state) {
      this.showLoading = state
    },
    showState(state) {
      if(this.$route.path == "/play"){
        this.showHeader = state
      }else{
        this.showHeader = true
      }
    },
    changeNavState(state) {
      if(this.$route.path == "/musicplay"){
        this.$refs.navState._changeNav(state);
      }else{
        this.$refs.navState._changeNav(true);
      }
    },
    titleState(state) {
      this.title = state
    }


  }
}
</script>

<style lang="scss">

$ppr: 14px/0.28rem;

// 页面过度s
.child_view{
  transition: all .2s cubic-bezier(.55, 0, .1, 1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}

.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
// 页面过度e

body{
    font-size: .28rem;
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
