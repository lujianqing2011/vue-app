<template>
    <div class="nba_page">
        <div class="nba_page_title" id="team_bg"> {{teamTitle}} </div>
        <div class="nba_content">
            <section ref="nabTitle" id="nba_bg">
                <ul class="team_box">
                    <li class="team_list" v-for="(team,index) in sliceNbaTeamAll" :class="{ on: index === selectIndex }" @click="selectList(index, team.name)" > {{team.name}} </li>
                </ul>
            </section>
            <aside ref="nbaInfo">
                <div>
                    <div class="seek_team">
                        <input type="text" name="team" v-model="teamA" placeholder="输入球队名" @input="changeSeekTeam($event)" > 
                        <i class="vs">VS</i> 
                        <input type="text" id="team_b" name="team" v-model="teamB" placeholder="输入球队名" @input="seekTeam()" disabled="disabled" >
                    </div>
                    <div class="team_events" v-for="item in teamEvents">
                        <div class="team_info">
                            <div class="img"><img :src="item.player1logo"></div>
                            <p> {{item.player1}} </p>
                        </div>
                        <div class="team_vs">
                            <span>{{item.score}} </span>
                            <p> {{item.m_time}} </p> 
                        </div>
                        <div class="team_info">
                            <div class="img">
                                <img :src="item.player2logo">
                            </div>
                            <p> {{item.player2}} </p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import BScroll from 'better-scroll'

export default{
    components: {
        BScroll
    },
    data(){
        return{
            nbaTeamAll: [],
            teamEvents: [],
            teamTitle: "",
            selectIndex: 1,
            teamA: "",
            teamB: "勇士",
            teamBackground: {
                backgroundImage: "url(" + require("../assets/nba_logo/1.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "280% 100%",
                backgroundPosition: "center center"
            },
            colorLogo: [ "#dc3d3a","#038235","#bf9656","#c40620","#85153b","#0465b2","#f0b929","#f11749","#2365b1","#d12147","#ffc425","#b91e2e","#efaf2b","#ba3234","#054a13","#00548d","#000000","#e86320","#4465aa","#16619a","#e56121","#d23836","#6d32a6","#c4cbd1","#066fb0","#03481b","#bd1c2c","#b91a2e","#7b96ce","#028ca6" ]
        }
    },
    //计算
    computed: {
        //截取0-30的NBA球队,后面不是NBA球队
        sliceNbaTeamAll: function(){
            return this.nbaTeamAll.slice(0,30)
        }
    },
    activated() {
        this.getTeam();
        this.selectList(1, "凯尔特人");
        this.$emit('titleState',"NBA");
    },
    //实例已经创建完成之后执行
    created() {
    },
    //完成挂载执行
    mounted() {
        // this.$nextTick(() => {
        //     this.initScroll();
        // })  
    },
    //事件
    methods: {
        getTeam() {
            // 获取所有球队
            let url = "http://op.juhe.cn/onebox/basketball/nba?key=f7462677dcae26d59b12e08c0c237a31"
            axios.get(bird+url).then((res) => {
                this.nbaTeamAll = res.data.result.teammatch
                this.$nextTick(() => {
                    //this.initScroll()
                })
            })
        },
        //球队赛事
        getEvents(name) {
            if(name == "老鹰"){ name = "凯尔特人" }
            console.log(name)
            this.$emit('loading',true);
            let url = "http://op.juhe.cn/onebox/basketball/team?key=f7462677dcae26d59b12e08c0c237a31&team="+name
            axios.get(bird+url).then((res) => {
                // this.teamEvents = res.data.result.list
                //this.teamTitle = res.data.result.title
                this.$nextTick(() => {
                    this.teamEvents = res.data.result.list
                    this.teamTitle = res.data.result.title
                    this.$emit('loading',false);
                    this.initScroll();
                })
            })
        },
        seekTeam() {
            this.$emit('loading',true);
            let url = "http://op.juhe.cn/onebox/basketball/combat?key=f7462677dcae26d59b12e08c0c237a31&hteam="+this.teamA+"&vteam="+this.teamB+"";
            axios.get(bird+url).then((res) => {
                this.teamEvents = res.data.result.list
                this.$nextTick(() => {
                    this.$emit('loading',false);
                    this.initScroll();
                })
            })
        },
        initScroll() {
            this.leftScroll = new BScroll( this.$refs.nabTitle, {
                click: true
            })
            this.rightScroll = new BScroll( this.$refs.nbaInfo, {
                click: true
            })
        },
        //输入第一个输入框，而且长度要>=2
        changeSeekTeam(e) {
            const teamB = document.getElementById('team_b');
            if(e.path["0"].value.length >= 2){
                teamB.removeAttribute('disabled')
                this.seekTeam();
            }else{
                teamB.setAttribute('disabled', 'disabled')
                console.log(teamB)
            }
        },
        //执行点击的球队
        selectList(index, name) {
            let bgIndex = Number(index) + 1;
            let el = document.getElementById('nba_bg').style.backgroundImage = "url(static/images/nba_logo/"+bgIndex+".jpg)";
            let elTitle = document.getElementById('team_bg').style.backgroundColor = this.colorLogo[index]
            this.teamEvents = []
            this.teamB = name
            this.selectIndex = index
            this.getEvents(name)
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.nba_page{
    .nba_page_title{
        padding: 0 10px/$ppr;
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        text-align: center;
        font-size: 14px/$ppr;
        white-space: nowrap;
        text-overflow: ellipsis;
        background-color: rgb(243, 243, 243);
        overflow: hidden;
        transition: all 0.3s;
        color: white;
    }
    .nba_content{
        position: absolute;
        top: 156px/$ppr;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        overflow: hidden;
        & section{
            flex: 1;
            height: 100%;
            box-shadow: 0 0 10px #DADADA;
            border-right: 1px solid #F1F1F1;
            background-image: url('../assets/nba_logo/2.jpg') no-repeat;
            background-size: 280% 100%;
            background-position: center center;
            transition: all 0.3s;
            color: white;
            .team_box{
                zoom: 1;
                &:after{
                    clear: both;
                    content: " ";
                    height: 0;
                    display: block;
                    visibility: hidden;
                }
                .team_list{
                    height: 40px/$ppr;
                    line-height: 40px/$ppr;
                    text-align: center;
                    transition: all 0.5s;
                    font-size: 16px/$ppr;
                    background-color: rgba(255, 255, 255, 0.25);
                    margin-bottom: 1px/$ppr;
                    &.on{
                        //border-radius: 20rem;
                        background-color: rgba(255, 0, 0, 0);
                        box-shadow: 0 0 5px white;
                        color: white;
                    }
                }
            }
        }
        & aside{
            flex: 2;
            padding: 0 10px/$ppr;
            .seek_team{
                height: 50px/$ppr;
                background-color: white;
                font-size: 0;
                display: flex;
                align-items: center;
                & .vs{
                    flex:  0 0 50px/$ppr;
                    font-size: 16px/$ppr;
                    font-weight: 700;
                    text-align: center;
                }
                & input[name="team"]{
                    flex: 1;
                    height: 30px/$ppr;
                    line-height: 30px/$ppr;
                    border: 1px solid #CACACA;
                    font-size: 16px/$ppr;
                    padding: 0 5px/$ppr;
                    border-radius: 2px;
                    text-align: center;
                    box-shadow: 0 1px 10px rgba(130, 130, 130, 0.12) inset;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1);
                    &:focus{
                        border-color: red;
                    }
                }
            }
            .team_events{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 10px/$ppr;
                &:last-child{
                    margin-bottom: 0;
                }
                .team_info{
                    .img{
                        height: 60px/$ppr;
                        width: 60px/$ppr;
                        min-height: 30px/$ppr;
                        & img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    
                    & p{
                        text-align: center;
                        font-size: 14px/$ppr;
                    }
                }
                .team_vs{
                    padding: 0 5px/$ppr;
                    text-align: center;
                    & span{
                        font-weight: 700;
                    }
                }
            }
        }
        
    }
}

    
</style>