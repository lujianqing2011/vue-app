<template>
    <section class="video_page">
        <section class="video_select">
            <span :class="{on:selectSpan === index}" @click="selectType(index)" v-for="(type,index) in typeList">{{type}}</span>
        </section>
        <ul class="video_item">
            <li class="v_poster" :data-id="item.topicSid" v-for="(item,index) in videoList" @click="palyUrl(index)">
                <div class="v_topicImg">
                    <img :src="item.topicImg">
                    <p>
                        <span class="on"> {{item.topicName}} </span>
                        <span> {{item.ptime}} </span>
                    </p>
                </div>
                <h2 class="v_title">{{item.title}}</h2>
                <div class="v_img"><img :src="item.cover"></div>
                <div class="v_source">视频源来自:<span> {{item.videosource}} </span></div>
            </li>
        </ul>
        <section class="load_more" @click="loadMore" v-show="videoList.length" >换一批</section>
    </section>
</template>

<script>

import api from '@/api/api'
import axios from 'axios'

export default{
    data(){
        return{
            selectSpan: 0,
            pageMore: 0,
            moreCount: 0,
            videoList: [],
            videoType: 0,
            videoId: null,
            dd:[],
            typeList:["搞笑视频","美女视频","体育视频","新闻现场","涨姿势","猎奇","黑科技"]
        }
    },
    //计算
    computed: {

    },
    //实例已经创建完成之后执行
    created() {
        //this.initData();
        this.getVideo();
    },
    watch: {
        //监控选择类型时，触发
        'selectSpan'() {
            //this.initData();
            this.getVideo();
        },
        'pageMore'() {
            //this.initData();
            this.getVideo();
            this.moreCount = this.selectSpan;
        }
    },
    activated() {
        this.$emit('showState',false);
        this.$emit('titleState',"视频");
    },
    //完成挂载执行
    mounted() {
        this.getVideo();
    },
    //事件
    methods: {
        getVideo() {
            let id
            console.log(this.videoType)
            switch (this.videoType) {
                case 0:
                    id = "VAP4BFE3U"
                    break;
                case 1:
                    id = "VAP4BG6DL"
                    break;
                case 2:
                    id = "VBF8F2E94"
                    break;
                case 3:
                    id = "VAV3H6JSN"
                    break;
                case 4:
                    id = "VBF8F3SGL"
                    break;
                case 5:
                    id = "VBF8ET3S2"
                    break;
                case 5:
                    id = "VBF8F2PKF"
                    break;
                default:
                    id = "VAP4BFE3U";
            }
            this.videoId = id
            let url ="http://c.m.163.com/nc/video/list/"+ id +"/y/"+ this.pageMore +"-10.html"
            this.$emit('loading',true);
            axios.get(bird+url).then((res) => {
                console.log(res.data[id])
                this.videoList = res.data[id]
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
            })
        },
        //初始化获取数据
        initData() {
            this.$emit('loading',true);
            let data={type:this.selectSpan,page:this.pageMore}
            api.video_type(data).then((res) => {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.videoList = res.data
            })
        },
        //选择视频类型
        selectType(index) {
            this.selectSpan = index
            this.videoType = index
            if(this.moreCount != index){
                this.pageMore = 0
            }
        },
        loadMore() {
            this.pageMore += 10
            this.$nextTick(() => {
                document.body.scrollTop = 0;
            })
        },
        palyUrl(index) {
            sessionStorage.setItem("videodetail", JSON.stringify(this.videoList[index]));
            this.$router.push({ path: '/play', query:{ id:this.videoId, page:this.pageMore }});
        }
    }
}

</script>

<style lang="scss">

@import '../style/mixin.scss';

.video_page{
    .video_select{
        padding: 0 10px/$ppr;
        line-height: 32px/$ppr;
        & span{
            display: inline-block;
            padding: 0 10px/$ppr;
            border: 1px solid #6D6D6D;
            margin: 8px/$ppr 8px/$ppr 0 0;
            font-size: 14px/$ppr;
            border-radius: 20rem;
            &.on{
                border-color: red;
                background-color: red;
                color: white;
            }
        }
    }
    .video_item{
        padding: 10px/$ppr;
        .v_poster{
            margin-bottom: 15px/$ppr;
            &:last-child{
                margin-bottom: 0;
                & .v_source{
                    border-bottom: 0;
                }
            }
            .v_topicImg{
                display: flex;
                & img{
                    width: 40px/$ppr;
                    height: 40px/$ppr;
                    border-radius: 50%;
                    overflow: hidden;
                }
                & p{
                    margin-left: 10px/$ppr;
                    & span{
                        display: block;
                        font-size: 12px/$ppr;
                        color: #A2A2A2;
                        &.on{
                            font-size: 14px/$ppr;
                            color: #000;
                        }
                    }
                }
                
            }
            .v_title{
                color: black;
                font-size: 16px/$ppr;
                padding: 10px/$ppr 0;
                line-height: 20px/$ppr;
            }
            .v_img{
                position: relative;
                padding-bottom: 55%;
                background-color: #eee;
                & img{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .v_source{
                height: 40px/$ppr;
                line-height: 40px/$ppr;
                border-bottom: 1px solid #F1F1F1;
                & span{
                    color: red;
                }
            }
            
        }
    }
    .load_more{
        width: 150px/$ppr;
        height: 45px/$ppr;
        line-height: 45px/$ppr;
        margin: 10px/$ppr auto;
        line-height: 40px/$ppr;
        text-align: center;
        background-color: #fff;
        border: 1px solid #DCDCDC;
        border-radius: 20rem;
        font-size: 16px/$ppr;
        &:active{
            background-color: red;
            color: white;
        }
    }
}
    
</style>