<template>
    <div class="article_page">
        <h3 class="title_h3">{{ article_content.title }}</h3>
        <div class="time">{{article_content.ptime}}</div>
        <p class="img" v-for="img in article_content.img"><img :src="img.src"></p>
        <div class="content" v-html="article_content.body"></div>
    </div>
</template>

<script>

import api from '@/api/api'

export default{
    data(){
        return{
            article_content: {}
        }
    },
    activated() {
        this.initData();
    },
    mounted: function() {
        this.$nextTick(() => {
            window.scrollTo(0, 0);
        })
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            this.article_content = []
            let data={
                postid:String(this.$route.query.id)
            };
            api.article(data).then((res) => {
               this.article_content = res.data
            })
            
        }
    }
}
    
</script>

<style lang="scss">

$ppr:14px/0.28rem;

.article_page{
    padding: 10px/$ppr;
    .title_h3{
        height: 40px/$ppr;
        line-height: 20px/$ppr;
        font-size: 16px/$ppr;
        font-weight: 700;
    }
    .time{
        text-align: center;
        font-size: 12px/$ppr;
        height: 30px/$ppr;
        line-height: 30px/$ppr;
    }
    .img{
        margin-top: 5px/$ppr;
        & img{
            width: 100%;
        }
    }
    .content{
        margin-top: 10px/$ppr;
        line-height: 24px/$ppr;
        & p{
            margin-bottom: 15px/$ppr;
        }
    }
}

</style>