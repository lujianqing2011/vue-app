<template>
    <section class="featured_page">
        <ul class="featured_box">
            <li class="featured_list" v-for="item in featuredList">
                <div class="f_left">
                    <h2 class="title">{{item.title}}</h2>
                    <p class="source">{{item.source}}</p>
                </div>
                <div class="f_right">
                    <img :src="item.firstImg">
                </div>
            </li>
        </ul>
    </section>
</template>

<script>

import api from '@/api/api'
import axios from 'axios'

export default{
    components: {

    },
    data(){
        return{
            featuredList: []
        }
    },
    //计算
    computed: {

    },
    //实例已经创建完成之后执行
    created() {

    },
    //完成挂载执行
    mounted() {
        this.getfeatured();
    },
    //事件
    methods: {
        getfeatured() {
            let url = "http://v.juhe.cn/weixin/query?key=e2df8b7c11c420ddb327c69278f7d14f&pno=1&ps=20"
            this.$emit('loading',true);
            axios.get(bird+url).then((res) => {
                this.featuredList = res.data.result.list
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                console.log(res.data.result)
            })
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.featured_page{
    .featured_box{
        padding: 10px/$ppr;
        margin-bottom: 20px/$ppr;
        .featured_list{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            margin-bottom: 15px/$ppr;
            padding-bottom: 15px;
            &:last-child{
                margin-bottom: 0;
                border-bottom: 0;
                padding-bottom: 0;
            }
            .f_left{
                line-height: 24px/$ppr;
                font-size: 16px/$ppr;
                .title{
                    height: 48px;
                    line-height: 24px;
                    overflow: hidden;
                }
                .source{
                    color: #CCC;
                    font-size: 12px/$ppr;
                }
            }
            .f_right{
                flex: 0 0 120px/$ppr;
                height: 80px/$ppr;
                margin-left: 10px/$ppr;
                & img{
                    width: 100%;
                    height: 100%;
                }
            }
            
            
        }
        
        
    }
}
    
</style>