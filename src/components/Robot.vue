<template>
    <section class="robot_page">
        <div class="session_content" ref="sessionBox">
            <ul class="robot_box" ref = "elentBox">
                <li v-for="item in sessionList" class="robot_box_list">
                    <div class="left"><img src="../../static/images/touxian.jpg"></div>
                    <div class="right">
                        <i class="icon_triangle"></i>
                        <p>{{item}}</p>
                    </div>
                 </li>
                 <!-- <li class="local">
                    <div class="right">
                        <i class="icon_triangle"></i>
                        <p>789798</p>
                    </div>
                    <div class="left"><img src="../../static/images/touxian.jpg"></div>
                 </li> -->
            </ul>
        </div>
        <footer>
            <div class="info_input">
                <div class="info_expression iconfont"> &#xe707; </div>
                <div class="info"><input type="text" v-model.trim="textContent" name=""  @keydown="showSend($event)"></div>
                <div class="info_bt" @click="sendSession()">发送</div>
            </div>
        </footer>
    </section>
</template>

<script>

import BScroll from 'better-scroll'
import api from '@/api/api'
import axios from 'axios'

export default{
    components: {
        BScroll
    },
    data(){
        return{
            sessionList: [],
            textContent: ""
        }
    },
    //计算
    computed: {
        showList() {
            //return this.webFrameList.slice(0, this.frameData)
        }
    },
    activated() {
        this.$emit('titleState',"与机器人会话");
        
    },
    //实例已经创建完成之后执行
    created() {

    },
    //完成挂载执行
    mounted() {
        this.sessionList.push("hello、咱们聊一聊人生吧、呵呵")
        // this.$nextTick(() => {
        //     this.getSession();
        // })
    },
    //事件
    methods: {
        getData() {
            // this.$emit('loading',true);
            let url = "http://op.juhe.cn/robot/index?info="+this.textContent+"&key=362e02f3c56c41a8adaeabad012f0e06"
            this.textContent = ""
            axios.get(bird+url).then((res) => {
                console.log(res.data)
                console.log(res.data.result.text)
                console.log(this.sessionList)
                this.sessionList.push(res.data.result.text)
                this.$nextTick(() => {
                    this.getSession();
                    // this.$emit('loading',false);
                })
            })
        },
        sendSession() {
            if(!this.textContent.length || this.textContent == ""){
                return
            }
            let date = new Date()
            let M = date.getMonth()+1
            let D = + date.getDate()
            let elentBox = this.$refs.elentBox
            let createLi = document.createElement("li")
            createLi.className = "local"
            createLi.innerHTML= "<div class='right'><i class='icon_triangle'></i><p>"+this.textContent+"</p></div><div class='left'><img src='../../static/images/touxian.jpg'></div>"
            console.log(M,D)
            elentBox.append(createLi)
            this.$nextTick(() => {
                this.getSession();
            })
            this.getData();
        },
        showSend(e) {
            if(e.keyCode == 13){ // enter 键
                 this.sendSession();
            }
            console.log(event)
        },
        getSession() {
            this.boxScroll = new BScroll( this.$refs.sessionBox, {
                click: true
            })
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.robot_page{
    position: absolute;
    top: 116px/$ppr;
    bottom: 50px/$ppr;
    left: 0;
    right: 0;
    background-color: #000;
    overflow: hidden;
    .session_content{
        height: 100%;
        padding: 0 10px/$ppr;
        .robot_box{
            transition: all 0.5s;
            .robot_box_list, .local{
                display: flex;
                transition: all 0.5s;
                padding: 10px/$ppr 0 5px/$ppr;
                &:last-child{
                    padding-bottom: 10px/$ppr;
                }
                .left{
                    flex: 0 0 35px/$ppr;
                    width: 35px/$ppr;
                    height: 35px/$ppr;
                    background-color: black;
                    overflow: hidden;
                    & img{
                        width: 100%;
                        display: block;
                    }
                }
                .right{
                    background-color: white;
                    border-radius: 4px;
                    position: relative;
                    & .icon_triangle{
                        display: inline-block;
                        border: 6px/$ppr solid #000; border-color: transparent #fff  transparent transparent;
                        position: absolute;
                        top: 8px/$ppr;
                    }
                    & p{
                        padding: 5px/$ppr 10px/$ppr;
                        font-size: 14px/$ppr;
                        line-height: 25px/$ppr;
                        word-break: break-all;
                        word-wrap: break-word;
                    }
                }
            }
            .robot_box_list{
                .right{
                    margin-left: 10px/$ppr;
                }
                .icon_triangle{
                    left: -11px/$ppr;
                }
            }
            .local{
                justify-content: flex-end;
                .right{
                    margin-right: 10px/$ppr;
                    background-color: #2aff00;
                    & .icon_triangle{
                        border: 6px/$ppr solid #2aff00; 
                        border-color: transparent transparent transparent #2aff00;
                        right: -12px/$ppr;
                    }
                }
            }
        }
    }
    footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .info_input{
            display: flex;
            align-items: center;
            background: white;
            .info_expression{
                flex: 0 0 50px/$ppr;
                text-align: center;
                font-size: 25px/$ppr;
                color: red;
            }
            .info{
                flex: 1;
                padding: 8px/$ppr 0;
                & input{
                    width: 100%;
                    height: 36px/$ppr;
                    line-height: 36px/$ppr;
                    border: 1px solid #e2e2e2;
                    padding: 0 5px/$ppr;
                    box-sizing: border-box;
                }
            }
            .info_bt{
                flex: 0 0 50px/$ppr;
                text-align: center;
                height: 50px/$ppr;
                line-height: 50px/$ppr;
                font-size: 14px/$ppr;
            }
        }
    }
    
    
}
    
</style>