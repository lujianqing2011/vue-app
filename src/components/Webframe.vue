<template>
    <section class="webframe_page">
        <div class="w_box">
            <div class="w_list" v-for="item in webFrameList">
                <div class="img"><img :src="item.thumb"></div>
                <p class="title"> {{item.description}} </p>
            </div>
        </div>
        <div class="more_frame" @click="moreFrame()">加载更多</div>
    </section>
</template>

<script>

import api from '@/api/api'

export default{
    components: {

    },
    data(){
        return{
            webFrameList: [],
            frameData: 20
        }
    },
    //计算
    computed: {
        showList() {
            //return this.webFrameList.slice(0, this.frameData)
        }
    },
    //实例已经创建完成之后执行
    created() {

    },
    //完成挂载执行
    mounted() {
        this.getWebframe();
    },
    //事件
    methods: {
        getWebframe() {
            this.$emit('loading',true);
            api.weather_forecast().then((res) => {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                console.log(8,res)
                this.webFrameList = res.data
            })
        },
        moreFrame() {
            this.frameData += 10;
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.webframe_page{
    
    .w_box{
        padding: 10px/$ppr 20px/$ppr 0;
        .w_list{
            margin-bottom: 20px/$ppr;
            border: 1px solid #E8E8E8;
            padding: 10px/$ppr 10px/$ppr;
            border-radius: 8px;
            .img{
                position: relative;
                padding-bottom: 70%;
                background-color: #efefef;
                & img{
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
            .title{
                line-height: 24px/$ppr;
                font-size: 14px/$ppr;
                margin-top: 10px/$ppr;
            }
        }
    }
    
    .more_frame{
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 16px/$ppr;
        border-top: 1px solid #e8e8e8;
        background-color: #F1F1F1;
    }
}
    
</style>