<template>
    <section class="music_page">
        <section class="music_pic">
            <img :src="musicImg">
        </section>
        <h2 class="m_title">歌曲列表</h2>
        <ul class="m_list">
            <li v-for="(name,index) in musicList" @click="musicPlay(name.hash)"><i :class="{ on: index<=2 }">{{index+1}}</i>{{name.filename}}</li>
        </ul>
    </section>
</template>

<script>

import axios from 'axios'

export default{
    components: {

    },
    data(){
        return{
            musicList:[],
            musicInfo: {},
            musicImg: {}
        }
    },
    //计算
    computed: {
    },
    //实例已经创建完成之后执行
    created() {

    },
    activated() {
        this.getMusic();
    },
    //完成挂载执行
    mounted() {
        this.getMusic();
    },
    //事件
    methods: {
        getMusic() {
            this.$emit('loading',true);
            let id = this.$route.query.id;
            let url= "http://m.kugou.com/rank/info/?rankid="+id+"&page=1&json=true";
            axios.get(bird+url).then(function (res) {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.musicInfo = res.data.info
                this.musicList = res.data.songs.list;
                this.musicImg = this.musicInfo.bannerurl.replace('{size}',400)
            }.bind(this)).catch(function (error) {
                    this.$emit('loading',true);
                    console.log(error)
                })
        },
        musicPlay(hash) {
            let pid = this.$route.query.id;
            this.$router.push({ path:'/musicplay', query:{ pid:pid, id:hash }});
        }

    }
}

</script>

<style lang="scss">

$ppr:14px/0.28rem;

.music_page{
    
    .music_pic{
        min-height: 120px/$ppr;
        background-color: #ececec;
        & img{
            width: 100%;
            height: 100%;
        }
    }
    .m_title{
        background-color: #ECECEC;
        font-size: 16px/$ppr;
        padding: 0 10px/$ppr;
        line-height: 40px/$ppr;
        color: black;
    }
    .m_list{
        padding: 0 10px/$ppr 10px/$ppr 10px/$ppr;
        & li{
            height: 60px/$ppr;
            line-height: 60px/$ppr;
            font-size: 16px/$ppr;
            border-bottom: 1px solid #E0E0E0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:last-child{
                border-bottom: 0;
            }
            &:nth-child(1){ & i{ background-color: #e80000; } }
            &:nth-child(2){ & i{ background-color: #ff7200; } }
            &:nth-child(3){ & i{ background-color: #f8b300; } }
            & i{
                display: inline-block;
                margin-right: 10px/$ppr;
                font-size: 18px/$ppr;
                color: #7B7B7B;
                padding: 0 10px/$ppr;
                &.on{
                    color: white;
                    height: 26px/$ppr;
                    line-height: 26px/$ppr;
                    padding: 0 8px/$ppr;
                    border-radius: 5px/$ppr;
                }

                // &.on_a{
                //     background: red;
                // }
                // &.on_b{
                //     background: black;
                // }
                // &.on_c{
                //     background: yellow;
                // }
            }
        }
    }

}

</style>