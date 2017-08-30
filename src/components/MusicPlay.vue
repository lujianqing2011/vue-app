<template>
    <section class="music_play_page">
        <!-- <div class="music_head">
            <img :src="list.album_img.replace('{size}',400)">
        </div> -->
        <div class="music_lyrics">
            <ul id="lyricsList">
                <li v-for="lyrics in newLyric">{{lyrics[1]}}</li>
            </ul>
        </div>
        <div class="song_list" v-if="songListShow">
            <ul>
                <li @click="palySong(item.hash)" v-for="item in songList">{{item.filename}}</li>
            </ul>
        </div>
        <div class="audio_play">
            <h2 class="audio_title">{{list.fileName}}</h2>
            <div id="schedule">
                <div id="current" :style="{ width: parseInt(currentTime*100/playTime)+'%'}"></div>
            </div>
            <p class="audio_time">
                <span>{{currentTime | minutes}}</span>
                <span>{{ playTime | minutes}}</span>
            </p>
            <div class="audio_bt">
                <div class="flex pattern iconfont" :class="{ 'icon-danquxunhuan':musicLoop, 'icon-yinletingzhi24px':!musicLoop }" @click="loopMusic()"></div>
                <ul class="flex_1 a_bt">
                    <li id="up_song" class="iconfont" @click="previous()" > &#xe600; </li>
                    <li class="play_song iconfont " :class="{ 'icon-zanting' :musicPlay,' icon-bofang2':!musicPlay }" @click="togglePlay()"></li>
                    <li id="next_song" class="iconfont" @click="Next()" > &#xe815; </li>
                </ul>
                <div class="flex a_list iconfont" @click="songListShow = !songListShow"> &#xe6b2; </div>
            </div>
            <audio id="audio" :loop="musicLoop" :src="list.url"></audio>

        </div>
        
        <div class="black_bg" v-show="showBg"></div>
        <div id="music_play_bg" :style="{ backgroundImage: 'url(' + music.pic + ')'}"></div>

    </section>
</template>

<script>

import axios from  'axios'

export default{
    components: {

    },
    data(){
        return{
            list: {},
            newLyric: {},   //加工后的歌词
            music: {
                title: '~~',
                pic: ''
            },
            songList: [],
            musicPlay: false,
            musicLoop: false,
            songListShow: false,
            showBg: false,
            playTime: 0,    //总时长
            currentTime: 0      //当前播放时间
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
        this.getLyric();
        this.audioEvent();
        this.scrollLyrics();
        this.newSong();
        this.getSong();
        this.getGong();
        this.scheduleMusic();
        this.currentTime = 0;
        this.songList;
        this.$emit('title',this.music.title);
    },
    //完成挂载执行
    mounted() {
        this.$nextTick(() => {
            this.showBg = true
        })
    },
    //事件
    methods: {
        audioEvent() {
            let audio = document.getElementById("audio");
            let _this = this;

            //判断是否加载完 (有个问题:ios浏览器下面audio不会自动播放)
            audio.addEventListener("loadedmetadata", function () {
                audio.play();
                _this.musicPlay = true;
                console.info("加载完毕");
            });

            //获取播放时间
            audio.addEventListener("timeupdate", function() {
                _this.currentTime = this.currentTime
            });

            //判断结束
            audio.addEventListener("ended", function () {
                console.info("播放完");
                _this.musicPlay = false;
                _this.Next();
            });

        },

        //播放和暂停
        togglePlay() {
            let audio = document.getElementById("audio");
            let paly = document.getElementById("play_song");
            this.musicPlay = !this.musicPlay
            if(this.musicPlay){
                audio.play()
            }else{
                audio.pause()
            }
        },
        //循环播放
        loopMusic() {
            let audio = document.getElementById("audio");
            this.musicLoop = !this.musicLoop
            if(this.musicLoop){
                console.log("循环")
            }
            
        },
        //滑动(快进、快退)
        scheduleMusic() {
            let schedule = document.getElementById("schedule");
            let _this = this;
            schedule.addEventListener("mousedown",function(e) {
                let clientX = e.clientX;
                let W = schedule.offsetWidth;
                let change1 = Math.floor(clientX) / Math.floor(W) * 100
                let audio = document.getElementById("audio");
                let change2 = parseInt(_this.currentTime) / _this.playTime * 100 
                console.log( _this.playTime,W )
                console.log('时长：'+ parseInt(change2)+'%', '坐标：'+parseInt(change1)+'%')
                audio.currentTime = parseInt(change1) / 100 * _this.playTime
                console.log(audio.currentTime)
            },false)
        },
        //新歌的列表、
        newSong() {
            if(this.$route.query.pid ){
                return
            } else if(this.$route.query.gid){
                return
            }else{
                this.songList = []
                let url = "http://m.kugou.com?json=true";
                axios.get(bird+url).then((res) => {
                    console.log(res.data.data)
                    this.songList = res.data.data;
                })
            }
        },
        //排行歌曲的列表
        getSong() {
            if(!this.$route.query.pid) return
            this.songList = [];
            let pid = this.$route.query.pid;
            let purl= "http://m.kugou.com/rank/info/?rankid="+pid+"&page=1&json=true";
            this.newLyric = {};
            axios.get(bird+purl).then((res) => {
                this.songList = res.data.songs.list
                console.log(this.songList)
            })
        },
        //歌单歌曲的列表
        getGong() {
            if(!this.$route.query.gid) return
            this.songList = [];
            let gid = this.$route.query.gid;
            let gurl = "http://m.kugou.com/plist/list/"+gid+"?json=true";
            this.newLyric = {};
            axios.get(bird+gurl).then((res) => {
                this.songList = res.data.list.list.info
            })
        },
        //播放列表的歌曲
        palySong(id) {
            this.$route.query.id=id
            this.getMusic();
            this.getLyric();
            this.scheduleMusic();
            let audio = document.getElementById("audio");
            audio.play()
        },
        //上一首
        previous() {
            let len = this.songList
            if(!len.length) return
            let box = []
            for(let i in len){
                box.push(len[i].hash)
            }
            let id = this.$route.query.id
            let count = box.indexOf(id)
            count--
            console.log(count)
            if(count < 0){
                count = box.length-1
            }
            console.log(count)
            this.palySong(box[count])

        },
        //下一首
        Next() {
            
            let len = this.songList
            if(!len.length) return
            let box = []
            for(let i in len){
                box.push(len[i].hash)
            }
            let id = this.$route.query.id
            let count = box.indexOf(id)
            count++
            if(count > box.length-1){
                count = 0
            }
            this.palySong(box[count])
            this.scheduleMusic();

        },
        getMusic() {
            let id = this.$route.query.id;
            let url="http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash="+id+"&from=mkugou";
            this.$emit('loading',true);
            axios.get(bird+url).then(function (res) {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.list = res.data
                this.playTime = res.data.timeLength;

                this.music = {
                   title: this.list.songName,
                   //  author: this.list.fileName,
                   //  url: this.list.url,
                    pic:(this.list.imgUrl).replace('{size}',400),
                };

            }.bind(this)).catch(function (error) {
                console.log(error)
            })
        },
        //请求歌词接口
        getLyric() {
            let id = this.$route.query.id;
            let url="http://www.kugou.com/yy/index.php?r=play/getdata&hash="+id;
            axios.get(bird+url).then(function (res) {
                this.newLyric = this.parseLyric(res.data.data.lyrics);
                this.scrollLyrics(); //歌词滚动

                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                })
        },
        //接收歌词转化格式
        parseLyric(text) {
            let lines = text.split('\n'),
             //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
            pattern = /\[\d{0,4}:\d{0,4}.\d{0,4}\]/g,
            //保存最终结果的数组
            result = [];
            //去掉不含时间的行
            while (!pattern.test(lines[0])) {
               lines = lines.slice(1);
            }
            //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
            lines[lines.length - 1].length === 0 && lines.pop();
            lines.forEach(function (v, i, a) {
                //提取出时间[xx:xx.xx]
                let time = v.match(pattern),
                    //提取歌词
                    value = v.replace(pattern, '');
                //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
                time.forEach(function (v1, i1, a1) {
                    //去掉时间里的中括号得到xx:xx.xx
                    let t = v1.slice(1, -1).split(':');
                    //将结果压入最终数组
                    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                });
            });
            //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
            result.sort(function (a, b) {
                return a[0] - b[0];
            });
            return result;
        },
        scrollLyrics () {
            let audio = document.getElementById("audio");
            let list = document.getElementById("lyricsList");
            let lis = list.getElementsByTagName("li");
            for (let a = 0; a < lis.length; a++) {
                lis[a].className=""
            }

            let _this = this;
            audio.addEventListener("timeupdate", function () {
                let len = _this.newLyric.length;
                for (let i = 0; i < len; i++) {
                    if (this.currentTime > _this.newLyric[i][0]) {
                        let REM = -(i) * 30/(14/0.28);      //px转为rem
                        //list.style.transform = "translate3d(0,"+(-i) * 30 +"px,0)";
                        list.style.transform = "translate3d(0,"+REM.toFixed(2) +"rem,0)";
                        lis[i].className = "on";
                    }
                }
            });
        }

    }
}

</script>

<style lang="scss">

$ppr:14px/0.28rem;



.music_play_page{
    .music_head{
        position: absolute;
        top: 25%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 120px/$ppr;
        height: 120px/$ppr;
        border-radius: 50%;
        overflow: hidden;
        & img{
            width: 100%;
            height: 100%;
        }
    }
    .music_lyrics{
        position: relative;
        height: 210px/$ppr;
        margin-top: 50px/$ppr;
        overflow-y: hidden;
        & ul{
            position: absolute;
            left: 0;
            right: 0;
            top: 45%;
            text-align: center;
            transition: all 0.5s;
            font-size: 14px/$ppr;
            & li{
                height: 30px/$ppr;
                line-height: 30px/$ppr;
                overflow: hidden;
                font-size: 14px/$ppr;
                color: rgba(255, 255, 255, 0.75);
                &.on{
                    color: red;
                    font-size: 18px/$ppr;
                }
            }
        }
    }
    .song_list{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 26%;
        width: 70%;
        margin: 0 auto;
        height: 50%;
        background-color: rgba(0, 0, 0, 0.75);
        padding: 10px/$ppr;
        overflow: hidden;
        & ul{
            height: 100%;
            line-height: 30px/$ppr;
            overflow-y: auto;
            font-size: 14px/$ppr;
            & li{
                color: white;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
    .audio_play{
        width: 100%;
        background-color: red;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 20px/$ppr 10px/$ppr 10px/$ppr;
        //background: linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,0));
        background: linear-gradient(to top,rgba(255, 0, 0, 0.7),rgba(0,0,0,0));
        box-sizing: border-box;
        .audio_title{
            font-size: 16px/$ppr;
            height: 35px/$ppr;
            line-height: 35px/$ppr;
            color: white;
        }
        #schedule{
            height: 3px/$ppr;
            width: 100%;
            background-color:  rgba(255, 232, 232, 0.60);;
            overflow: hidden;
            font-size: 0;
            #current{
                width: 0%;
                height: 100%;
                transition: all 0.5s;
                background-color: #ff0000;
            }
        }
        .audio_time{
            display: flex;
            justify-content: space-between;
            align-items: center;
            & span{
                display: inline-block;
                font-size: 12px/$ppr;
                color: white;
            }
        }
        .audio_bt{
            display: flex;
            align-items: center;
            .flex_1{
                flex: 1;
                .play_song {
                    padding: 5px/$ppr;
                    font-size: 20px/$ppr;
                }
            }
            .pattern,.a_list{
                font-size: 22px/$ppr;
                color: rgb(237, 255, 0);
            }
            .a_bt{
                display: flex;
                align-items: center;
                justify-content: center;
                & li{
                    width: 50px/$ppr;
                    height: 50px/$ppr;
                    line-height: 50px/$ppr;
                    background-color: rgba(255, 255, 255, 0.77);
                    border-radius: 50%;
                    text-align: center;
                    margin-right: 15px/$ppr;
                    &:last-child{
                        margin-right: 0;
                    }
                    &#play_song{
                        padding: 5px/$ppr;
                    }
                }
            }
        }
    }
    .black_bg{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        background: linear-gradient(rgba(21, 5, 5, 0.65), transparent);
    }
    #music_play_bg{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url('../assets/bobg.jpg');
        background-repeat: no-repeat;
        background-size: 140% 100%;
        background-position: center center;
        transform: scale(1);
        transform-origin: center top;
        //opacity: 0.5;
        z-index: -2;
        @media only screen 
        and (min-device-width : 768px){
            background-size: cover;
        }
    }
}
    
</style>