<template>
    <div class="home_page">
        <div class="banner" >  
            <swiper :options="swiperOption">    
                <!-- 幻灯内容 -->    
                <swiper-slide v-for="img in bannerImg" key="img" class="slide_img">
                  <img :src="img.imgsrc">
                </swiper-slide>
            </swiper>  
        </div>
        <ul class="new_list">
            <router-link :to="{ path: 'article', query: { id: list.postid }}" tag="li" v-for="list in newList" class="new_list_li" key="list.id">
                <div class="list_img"><img class="list_img" :src="list.imgsrc"></div>
                <div class="list_title">
                    <h2 class="title_h2">{{list.title}}</h2>
                    <i class="advertising_tag">{{list.source}}</i>
                    <div class="time">{{list.mtime}}</div>
                </div>
            </router-link>
        </ul>  
    </div>
</template>

<script>

import api from '@/api/api'

export default {
    data(){
        return {
            bannerImg: [],
            newList: [],
            swiperOption: {
                autoplay: 4000,
                grabCursor : true,
                //autoHeight: true
            }
        }
    },
    mounted() {
        this.$emit('title','推荐');
    },
    created() {
        this.$emit('loading',true);
        api.banner().then((res) => {
            this.bannerImg = res.ads
        }),
        api.new_list().then((res) => {
            this.$nextTick(() => {
                this.$emit('loading',false);
            })
            this.newList = res.data
        })
    }
    
}

</script>

<style lang="scss">

$ppr:14px/0.28rem;

.home_page {
    .banner {
        width: 100%;
        .slide_img{
            & img{
                display: block;
                width: 100%;
            }
        }
    }
    .new_list{
        padding: 0 10px/$ppr 10px/$ppr;
        .new_list_li{
            display: flex;
            padding: 10px/$ppr 0;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #F1F1F1;
            &:last-child{
                padding-bottom: 0;
                border: 0;
            }
            .list_img{
                width: 120px/$ppr;
                min-height: 77px/$ppr;
                background-color: #e6e6e6;
                margin-right: 10px/$ppr;
                min-height: 162px;
                & img{
                    display: block;
                    width: 100%;
                }
                
            }
            .list_title{
                flex: 1;
                .title_h2{
                    font-size: 14px/$ppr;
                    line-height: 20px/$ppr;
                }
                .advertising_tag{
                    display: inline-block;
                    border: 1px solid red;
                    font-size: 10px/$ppr;
                    border-radius: 2px;
                    color: red;
                    padding: 0 5px/$ppr;
                }
                .time{
                    font-size: 12px/$ppr;
                    line-height: 24px/$ppr;
                }
            }
        }
    }
}


</style>