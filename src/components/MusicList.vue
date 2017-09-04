<template>
    <section class="music_list_page">
        <ul class="music_title">
            <li v-for="(item,index) in titleList" @click="selectType(index)">{{item}}</li>
        </ul>
        <div class="slide_on"><div id="slide_id"></div></div>

        <section class="music_new" v-if="selectIndex === 0">
            <div class="banner_slide">
                <swiper :options="swiperOption">    
                    <!-- 幻灯内容 -->    
                    <swiper-slide v-for="img in bannerList" key="img" class="slide_img">
                        <img :src="img.imgurl">
                    </swiper-slide>
                </swiper> 
            </div>
            <ul class="song_name">
                <li class="name iconfont icon-bofang1" v-for="name in newMusicList" @click="newSong(name.hash)">{{name.filename}}</li>
            </ul>
        </section>

        <section class="music_ranking" v-if="selectIndex === 1">
            <ul class="r_box"> 
                <li v-for="(item,index) in rankingMusicList">
                    <div class="r_img" @click="routerMusic(item.rankid)">
                        <img :src="item.imgurl.replace('{size}',400)">
                    </div>
                </li>
            </ul>
        </section>

        <section class="music_song" v-if="selectIndex === 2">
            <dl class="s_flex" v-for="item in songMusicList" @click="MusicSong(item.specialid)">
                <dt class="flex_img">
                    <div class="f_img"><img :src="item.imgurl.replace('{size}',400)"></div>
                </dt>
                <dd class="flex_name">
                    <div class="flex_1 f_info">
                        <p class="f_describe">{{item.specialname}}</p>
                        <p class="f_count"><i class="iconfont"> &#xe611; </i> {{item.playcount}} </p>
                    </div>
                    <div class="icon iconfont"> &#xe661; </div>
                </dd>
            </dl>
        </section>

    </section>
</template>

<script>

import axios from 'axios'

export default{
    components: {

    },
    data(){
        return{
            swiperOption: {
                autoplay: 4000
            },
            selectIndex: 0,
            bannerList: [],
            newMusicList: [],
            rankingMusicList: [],
            songMusicList: [],
            titleList: ["新歌","排行","歌单"]
        }
    },
    //计算
    computed: {

    },
    //实例已经创建完成之后执行
    created() {

    },
    activated() {
        this.newMusic();
        this.rankingMusic();
        this.rankingMusic();
        this.$emit('changeNavState',true);
        this.$emit('titleState',"音乐");
    },
    //完成挂载执行
    mounted() {
        this.initData();
    },
    //事件
    methods: {
        newMusic() {
            this.$emit('loading',true);
            let url = "http://m.kugou.com?json=true";
            axios.get(bird+url).then(function (res) {
                console.log(res)
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.bannerList = res.data.banner;
                this.newMusicList = res.data.data;

            }.bind(this)).catch(function (error) {
                    this.$emit('loading',true);
                    console.log(error)
                })
        },
        rankingMusic() {
            this.$emit('loading',true);
            let url = "http://m.kugou.com/rank/list?json=true";
            axios.get(bird+url).then(function (res) {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.rankingMusicList = res.data.rank.list
                //console.log(4,res.data.rank.list)
            }.bind(this)).catch(function (error) {
                    this.$emit('loading',true);
                    console.log(error)
                })
        },
        
        songMusic() {
            this.$emit('loading',true);
            let url = "http://m.kugou.com/plist/index?json=true";
            axios.get(bird+url).then(function (res) {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.songMusicList = res.data.plist.list.info
            }.bind(this)).catch(function (error) {
                    this.$emit('loading',true);
                    console.log(error)
                })
        },
        newSong(id) {
            this.$router.push({path: '/musicplay', query:{ id: id }});
        },
        routerMusic(id) {
            this.$router.push({path: '/music', query: { id: id }});
        },
        MusicSong(id) {
            this.$router.push({path: '/musicsong', query:{ id: id }});
        },
        initData() {
            if( this.selectIndex === 0 ){
                this.newMusic();
                this.$emit('title',"新歌");
            }else if( this.selectIndex === 1 ){
                this.rankingMusic();
                this.$emit('title',"排行");
            }else{
                this.songMusic();
                this.$emit('title',"歌单");
            }
        },
        selectType(index) {
            this.selectIndex = index
            this.initData();
            let el = document.getElementById('slide_id')
            let W = el.offsetWidth
            el.style.left = W*index+"px"
        }
    }
}

</script>

<style lang="scss">

$ppr:14px/0.28rem;

.music_list_page{
    .music_title{
        display: flex;
        & li{
            flex: 1;
            height: 45px/$ppr;
            line-height: 45px/$ppr;
            text-align: center;
            font-size: 18px/$ppr;
        }
    }
    .slide_on{
        width: 100%;
        height: 2px;
        position: relative;
        #slide_id{
            width: 33.33%;
            height: 2px;
            background-color: red;
            transition: all 0.3s;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .music_new{
        padding: 10px/$ppr;
        .banner_slide{
            min-height: 124px/$ppr;
            background-color: #eee;
            .slide_img{
                & img{
                    width: 100%;
                    display: block;
                }
            }
        }
        .song_name{
            margin-top: 10px/$ppr;
            & .name{
                line-height: 50px/$ppr;
                font-size: 16px/$ppr;
                border-bottom: 1px solid #EFEFEF;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                &:before{
                    float: right;
                    font-size: 24px/$ppr;
                    color: rgb(255, 108, 0);
                }
                &:last-child{
                    border-bottom: 0;
                }
            }
            &:after{
                display: block;
                clear: both;
                content: "";
                visibility:hidden; 
                height:0;
            }
        }
    }
    .music_ranking{
        padding: 10px/$ppr 5px/$ppr 0;
        .r_box{
            & li{
                float: left;
                width: 33.33%;
                box-sizing: border-box;
                padding: 0 5px/$ppr 10px/$ppr 5px/$ppr;
                .r_img{
                    position: relative;
                    padding-bottom: 100%;
                    background: #eee;
                    border-radius: 8px;
                    overflow: hidden;
                    & img{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
                
            }
            &:after{
                display: block;
                clear: both;
                content: "";
                visibility:hidden; 
                height:0;
            }
        }
    }
    .music_song{
        padding: 10px/$ppr;
        .s_flex{
            display: flex;
            padding: 10px/$ppr 0;
            border-bottom: 1px solid #ECECEC;
            &:last-child{
                border-bottom: 0;
            }
            .flex_img{
                flex: 1;
                margin-right: 15px/$ppr;
                .f_img{
                    position: relative;
                    padding-bottom: 100%;
                    background-color: #e4e4e4;
                    & img{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }
            .flex_name{
                flex: 2;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .flex_1{
                    flex: 1;
                    margin-right: 5px/$ppr;
                    &.f_info{
                        line-height: 28px/$ppr;
                        .f_describe{
                            font-size: 18px/$ppr;
                        }
                        .f_count{
                            font-size: 14px/$ppr;
                            color: #888;
                            & i{
                                font-size: 18px/$ppr;
                                margin-right: 5px/$ppr;
                                color: #929292;
                            }
                        }
                    }
                }
                & .icon{
                    display: block;
                    height: 100%;
                    line-height: 110px/$ppr;
                }
            }
        }
        
    }
    
}
    
</style>