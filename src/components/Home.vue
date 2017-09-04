<template>
    <div class="home_page">
        <div class="new_type">
            <ul class="n_t_box">
                <li class="n_t_list" v-for="(type,index) in typeTitle" @click="selectType(type.type, index)" :class="{ on:index === selectIndex}" > {{type.name}} </li>
            </ul>
        </div>
        <div class="banner" >  
            <!-- <swiper :options="swiperOption">      
                <swiper-slide v-for="img in bannerImg" key="img" class="slide_img">
                  <img :src="img.imgsrc">
                </swiper-slide>
            </swiper>  --> 
        </div>
        <ul class="new_list">
            <router-link :to="{ path: 'article', query: { id: list.postid }}" tag="li" v-for="list in newList" class="new_list_li" key="list.id">
                <div class="list_img"><img class="list_img" :src="list.thumbnail_pic_s"></div>
                <div class="list_title">
                    <h2 class="title_h2">{{list.title}}</h2>
                    <i class="advertising_tag">{{list.category}}</i>
                    <div class="time">{{list.date}}</div>
                </div>
            </router-link>
        </ul>  
    </div>
</template>

<script>

import api from '@/api/api'
import axios from 'axios'

export default {
    data(){
        return {
            bannerImg: [],
            newList: [],
            teamAll: [],
            selectIndex: 0,
            typeTitle: [
                { name: "头条", type: "top" },
                { name: "社会", type: "shehui" },
                { name: "国内", type: "guonei" },
                { name: "国际", type: "guoji" },
                { name: "娱乐", type: "yule" },
                { name: "体育", type: "tiyu" },
                { name: "军事", type: "junshi" },
                { name: "科技", type: "keji" },
                { name: "财经", type: "caijing" },
                { name: "时尚", type: "shishang" }
            ],
            typeNew: "top",
            swiperOption: {
                autoplay: 4000,
                grabCursor : true,
                //autoHeight: true
            }
        }
    },
    activated() {
        this.$emit('titleState',"新闻");
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$emit('loading',true);
            let url = "http://v.juhe.cn/toutiao/index?type="+this.typeNew+"&key=451594ba5f2ed3a9256ba59fd2ddd987"
            axios.get(bird+url).then((res) => {
                console.log(0,res.data.result.data)
                this.newList = res.data.result.data
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
            })
        },
        selectType(type, index) {
            this.typeNew = type
            this.selectIndex = index
            this.getData();
        }
    },
    created() {
    }
    
}

</script>

<style lang="scss">

$ppr:14px/0.28rem;

.home_page {
    .new_type{
        .n_t_box{
            background-color: #F1F1F1;
            padding: 10px/$ppr 0;
            background-image: url('../assets/new_bg.jpg');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
            zoom: 1;
            &:after{
                content: ' ';
                display: block;
                height: 0;
                visibility: hidden;
                clear: both;
            }
            .n_t_list{
                float: left;
                width: 20%;
                text-align: center;
                height: 40px/$ppr;
                color: rgba(255, 255, 255, 0.87);
                line-height: 40px/$ppr;
                transition: all 0.3s;
                font-size: 14px/$ppr;
                &.on{
                    animation: neon6 1s ease-in-out infinite alternate;
                    font-size: 16px/$ppr;
                    transition: all 0.3s;
                    color: white;
                }
                @-webkit-keyframes neon6 {
                  from {
                    text-shadow: 
                        0 0 10px #fff,
                        0 0 20px #fff,
                        0 0 30px #fff,
                        0 0 40px #007aff,
                        0 0 70px #007aff,
                        0 0 80px #007aff,
                        0 0 100px #007aff,
                        0 0 150px #007aff;
                  }
                  to {
                    text-shadow: 
                        0 0 10px #fff,
                        0 0 20px #fff,
                        0 0 30px #fff,
                        0 0 40px #ff0000,
                        0 0 70px #ff0000,
                        0 0 80px #ff0000,
                        0 0 100px #ff0000,
                        0 0 150px #ff0000;
                  }
                }
            }
        }
    }
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
                min-height: 80px/$ppr;
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
                    margin: 5px/$ppr 0;
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