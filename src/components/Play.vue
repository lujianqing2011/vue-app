<template>
    <section class="play_page">
        <h2 class="video_title">{{video.description}}</h2>
        <video class="video_box" autoplay controls="controls" :src="video.mp4Hd_url" :poster="video.cover">
        </video>
    </section>
</template>

<script>

export default{
    components: {

    },
    data(){
        return{
            video: {}
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
        this.initData();
    },
    //完成挂载执行
    mounted() {
        this.initData();
    },
    //事件
    methods: {
        initData() {
            this.video = JSON.parse(sessionStorage.getItem('videodetail'))
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.play_page{
    .video_title{
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        font-size: 16px/$ppr;
        padding: 0 10px/$ppr;
        font-weight: 600;
    }
    .video_box{
        width: 100%;
        font-size: 0;
        line-height: 0;
        display: block;
        padding: 0 10px;
        box-sizing: border-box;
    }

}
</style>