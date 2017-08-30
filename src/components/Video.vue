<template>
    <section class="video_page">
        <section class="video_select">
            <span :class="{on:selectSpan === index}" @click="selectType(index)" v-for="(type,index) in typeList">{{type}}</span>
        </section>
        <ul class="video_item">
            <li class="v_poster" :data-id="item.topicSid" v-for="(item,index) in videoList" @click="palyUrl(index)">
                <div class="v_img"><img :src="item.cover"></div>
                <h2 class="v_title">{{item.title}}</h2>
            </li>
        </ul>
        <section class="load_more" @click="loadMore" v-if="videoList.length" >换一批</section>
    </section>
</template>

<script>

import api from '@/api/api'

export default{
    components: {

    },
    data(){
        return{
            selectSpan: 0,
            pageMore: 0,
            moreCount: 0,
            videoList: [],
            dd:[],
            typeList:["精品视频","搞笑视频","美女视频","体育视频","新闻现场"]
        }
    },
    //计算
    computed: {

    },
    //实例已经创建完成之后执行
    created() {
        this.initData();
    },
    watch: {
        //监控选择类型时，触发
        'selectSpan'() {
            this.initData();
        },
        'pageMore'() {
            this.initData();
            this.moreCount = this.selectSpan;
        }
    },
    //完成挂载执行
    mounted() {

    },
    //事件
    methods: {
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
            console.log(1,this.moreCount)
            if(this.moreCount != index){
                this.pageMore = 0
            }
        },
        loadMore() {
            console.log(2,this.moreCount)
            this.pageMore += 10
        },
        palyUrl(index) {
            sessionStorage.setItem("videodetail", JSON.stringify(this.videoList[index]));
            this.$router.push({ path: '/play' });
        }
    }
}

</script>

<style lang="scss">

$ppr:14px/0.28rem;

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
            position: relative;
            margin-bottom: 10px/$ppr;
            &:last-child{
                margin-bottom: 0;
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
            & .v_title{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                text-align: center;
                color: white;
                font-size: 16px/$ppr;
                line-height: 38px/$ppr;
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }
    .load_more{
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        text-align: center;
        background-color: #fff;
        border-top: 1px solid #DCDCDC;
        font-size: 16px/$ppr;
    }
}
    
</style>