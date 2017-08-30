<template>
    <section class="movie_page">
        <h2 class="movie_title">{{movieList.title}} </h2>
        <ul class="movie_item">
            <li class="m_list" v-for="(item,index) in movieList.subjects" @click="movieDetails(index)">
                <div class="m_img">
                    <img :src="item.images.large">
                </div>
                <h2>{{item.title}}</h2>
            </li>
        </ul>
        <section class="load_more" @click="loadMore()" v-if="movieList.length" >加载更多</section>
    </section>
</template>

<script>

import api from '@/api/api'

export default{
    components: {

    },
    data(){
        return{
            movieList: [],
            pageMore: 0
        }
    },
    //计算
    computed: {

    },
    //实例已经创建完成之后执行
    created() {
        this.initData();
    },
    //完成挂载执行
    mounted() {

    },
    //事件
    methods: {
        initData() {
            this.$emit('loading',true);
            let data={page:this.pageMore}
            api.playing_movie_list(data).then((res) => {
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
                this.movieList = res
            })
        },
        movieDetails(index) {
            sessionStorage.setItem("moviedetail", JSON.stringify(this.movieList.subjects[index]));
            this.$router.push({ path: '/details' });
        },
        loadMore() {
        }
    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.movie_page{
    .movie_title{
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        font-size: 16px/$ppr;
        padding: 0 10px/$ppr;
        font-weight: 700;
    }
    .movie_item{
        width: 100%;
        padding: 0 5px/$ppr;
        box-sizing: border-box;
        &:after{
            display: block;
            clear: both;
            content: "";
            visibility:hidden; 
            height:0;
        }
        .m_list{
            float: left;
            width: 33.33%;
            box-sizing: border-box;
            padding: 0 5px/$ppr 10px/$ppr 5px/$ppr;
            .m_img{
                position: relative;
                padding-bottom: 150%;
                background-color: #eee;
                & img{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
            & h2{
                height: 30px/$ppr;
                line-height: 30px/$ppr;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 12px/$ppr;
            }
        }
    }
    .load_more{
        height: 40px/$ppr;
        line-height: 40px/$ppr;
        text-align: center;
        border-top: 1px solid #E8E8E8;
        font-size: 16px/$ppr;
    }
}

</style>