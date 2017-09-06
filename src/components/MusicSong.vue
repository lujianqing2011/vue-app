<template>
    <section class="music_song_page">
        <div class="music_song_img">
            <img :src="songImg">
        </div>
        <h2 class="music_song_title">{{songInfo.intro}}</h2>
        <ul class="music_song_list">
            <li v-for="item in songList" @click="musicPlay(item.hash)">{{item.filename}}</li>
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
            songList: [],
            songInfo: {},
            songImg: {}
        }
    },
    activated() {
        this.getSongList();
        this.$emit('changeNavState',true);
    },
    //计算
    computed: {
    },
    //实例已经创建完成之后执行
    created() {
    },
    //完成挂载执行
    mounted() {
        //this.getSongList()
    },
    //事件
    methods: {
        getSongList() {
            this.$emit('loading',true);
            console.log(this.$route.query.id)
            let id = this.$route.query.id
            let url = "http://m.kugou.com/plist/list/"+id+"?json=true";
            axios.get(bird+url).then((res) => {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.songInfo = res.data.info.list
                this.songList = res.data.list.list.info
                this.songImg = this.songInfo.imgurl.replace('{size}',400)
            })
        },
        musicPlay(id) {
            let gid = this.$route.query.id;
            this.$router.push({path: '/musicplay', query:{ gid:gid, id: id }});
        }
    }
}

</script>

<style lang="scss">

@import '../style/mixin.scss';

.music_song_page{
    .music_song_img{
        position: relative;
        padding-bottom: 60%;
        background-color:#e8e8e8;
        overflow: hidden;
        & img{
            position: absolute;
            width: 100%;
            
        }
    }
    .music_song_title{
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 10px/$ppr;
        font-size: 18px/$ppr;
        background-color: #EFEFEF;
    }
    .music_song_list{
        padding: 0 10px/$ppr 10px/$ppr;
        & li{
            height: 50px/$ppr;
            line-height: 50px/$ppr;
            border-bottom: 1px solid #ECECEC;
            font-size: 16px/$ppr;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:last-child{
                border-bottom: 0;
            }
        }
    }
}
    
</style>