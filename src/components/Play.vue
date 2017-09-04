<template>
    <section class="play_page">
        <div class="video_content">
            <div class="go_bt iconfont" @click="$router.go(-1)"> &#xe601; </div>
            <video class="video_box" autoplay controls="controls" :src="video.mp4_url" :poster="video.cover"></video>
        </div>
        <div class="video_info">
            <h2 class="video_title">{{video.title}}</h2>
            <p><span>视频源：</span>{{video.videosource}}</p>
            <p><span>上传者：{{video.topicName}}</span>{{video.ptime}}</p>
        </div>
        <h2 class="relation_title">相关视频<span @click="videoMore()">换一批 &rsaquo;</span></h2>
        <div class="video_mani" id="videoDiv">
            <ul class="video_list">
                <li class="v_box" v-for="list in videoList" @click="videoPlay(list)">
                    <div class="img"><img :src="list.topicImg"></div>
                    <div class="title">
                        <h2>{{list.title}}</h2>
                        <p>{{list.topicDesc}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="video_null" v-if="!videoList.length">没有相关的视屏</div>
        <div class="video_more" v-if="videoList.length" @click="videoMore()">换一批</div>
    </section>
</template>

<script>

import axios from 'axios'

export default{
    data(){
        return{
            video: {},
            videoList: [],
            pageMore: Number
        }
    },
    //计算
    computed: {
    },
    //实例已经创建完成之后执行
    created() {
    },
    //不缓存，重新加载
    activated() {
        this.$emit('showState',false);
        this.pageMore = Number(this.$route.query.page)
        this.video = JSON.parse(sessionStorage.getItem('videodetail'))
        this.getVideo();
        window.onresize = this.elHeight //窗口大小改变触发
    },
    //完成挂载执行
    mounted() {
    },
    watch: {
        'pageMore'() {
            this.getVideo();
        }
    },
    //事件
    methods: {
        getVideo() {
            this.$emit('loading',true);
            let id = this.$route.query.id
            let url ="http://c.m.163.com/nc/video/list/"+ id +"/y/"+ this.pageMore +"-10.html"
            //获取相关的视屏列表
            axios.get(bird+url).then((res) => {
                console.log(res.data[id])
                this.videoList = res.data[id]
                this.$nextTick(() => {
                    this.$emit('loading',false);
                    this.elHeight();
                })
            })
        },
        elHeight() {
            let el = document.getElementById('videoDiv');
            let elTop = el.offsetTop
            let H = document.body.clientHeight || document.documentElement.clientHeight
            let height = H - elTop;
            console.log(height)
            if(height<350){
                height = 350
            }
            el.style.height= height +"px";
        },
        //播放点击的视屏
        videoPlay(list) {
            this.video = list
        },
        //更换10条视屏数据
        videoMore() {
            this.pageMore += 10
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.play_page{
    .video_info{
        padding: 10px/$ppr;
        overflow: hidden;
        .video_title{
            line-height: 24px/$ppr;
            font-size: 16px/$ppr;
            font-weight: 600;
            margin-bottom: 5px/$ppr;
        }
        & p{
            display: flex;
            justify-content: space-between;
            line-height: 20px/$ppr;
            font-size: 12px/$ppr;
        }
    }
    
    .video_content{
        position: relative;
        .go_bt{
            position: absolute;
            top: 2%;
            left: 2%;
            z-index: 10;
            width: 40px/$ppr;
            height: 40px/$ppr;
            line-height: 40px/$ppr;
            text-align: center;
            border-radius: 50%;
            color: white;
            font-size: 18px/$ppr;
            background-color: rgba(0, 0, 0, 0.55);
        }
        .video_box{
            width: 100%;
            font-size: 0;
            line-height: 0;
            display: block;
            box-sizing: border-box;
        }
    }
    
    .relation_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px/$ppr;
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        background-color: #fff;
        font-size: 16px/$ppr;
        color: #000;
        border: 1px #eee;
        border-weight: 1px;
        border-color: #eee;
        border-solid: 1px 0 1px 0;
        & span{
            display: inline-block;
            font-size: 14px/$ppr;
            color: red;
        }
    }
    .video_mani{
        position: relative;
        .video_list{
            padding: 10px/$ppr;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow-y: auto;
            .v_box{
                display: flex;
                margin-bottom: 10px/$ppr;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px/$ppr;
                overflow: hidden;
                &:last-child{
                    border-bottom: 0;
                }
                .img{
                    min-height: 80px/$ppr;
                    background-color: #eee;
                    flex: 0 0 80px/$ppr;
                    & img{ 
                        width: 100%;
                    }
                }
                .title{
                    flex: 1;
                    margin-left: 10px/$ppr;
                    & h2{
                        height: 30px/$ppr;
                        line-height: 30px/$ppr;
                        font-size: 14px/$ppr;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    & p{
                        font-size: 12px/$ppr;
                        color: #969696;
                        line-height: 24px/$ppr;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-all;
                        text-indent: 25px/$ppr;   
                    }  
                }
            }
        }
    }
    
    .video_null{
        height: 50px/$ppr;
        line-height: 50px/$ppr;
        font-size: 14px/$ppr;
        text-align: center;
    }
    .video_more{
        width: 150px/$ppr;
        height: 45px/$ppr;
        font-size: 16px/$ppr;
        margin: 10px/$ppr auto;
        line-height: 45px/$ppr;
        text-align: center;
        background-color: white;
        border: 1px solid #dedede;
        border-radius: 20rem;
        &:active{
            background-color: red;
            color: white;
        }
    }

}
</style>