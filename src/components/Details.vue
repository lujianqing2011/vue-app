<template>
    <section class="details_page">
        <dl class="details_content">
            <dt class="d_img"><img :src="detailsList.images.large"></dt>
            <dd class="d_details">
                <h2 class="d_title">{{detailsList.title}} <i class="type">{{detailsList.genres[0]}}</i></h2>
                <p class="stars">{{detailsList.rating.stars}}星 {{detailsList.rating.average}}分</p>
                <p class="time">上映时间：{{detailsList.year}}</p>
                <p class="duration">片长：------</p>
                <p class="state">国家：中国大陆</p>
                <div class="bt_movie">点击播放</div>
            </dd>
        </dl>
        <div class="relevant_person">
            <p>
                <span class="name">导演：</span>
                <span class="person" v-for="name in detailsList.directors">{{name.name}}</span>
            <p>
                <span class="name">主演：</span>
                <span class="person" v-for="person in detailsList.casts">{{person.name}}</span>
            </p>
        </div>
        <div class="story_line"></div>
    </section>
</template>

<script>

export default{
    components: {

    },
    data(){
        return{
            detailsList: {}
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
        this.detailsList = JSON.parse(sessionStorage.getItem("moviedetail"))
        console.log(JSON.parse(sessionStorage.getItem("moviedetail")))
    },
    //事件
    methods: {

    }
}

</script>

<style lang="scss">

$ppr: 14px/0.28rem;

.details_page{
    .details_content{
        padding: 10px/$ppr;
        display: flex;
        border-bottom: 1px solid #DEDEDE;
        .d_img{
            flex: 1;
            margin-right: 10px/$ppr;
            & img{
                width: 100%;
            }
        }
        .d_details{
            flex: 2;
            .d_title{
                line-height: 38px/$ppr;
                font-size: 20px/$ppr;
                & .type{
                    vertical-align: top;
                    line-height: 16px/$ppr;
                    display: inline-block;
                    border: 1px solid red;
                    border-radius: 2px;
                    font-size: 12px/$ppr;
                    color: red;
                    padding: 0 2px/$ppr;
                }
            }
            & p{
                font-size: 14px/$ppr;
                line-height: 24px/$ppr;
            }
            .bt_movie{
                width: 80px/$ppr;
                text-align: center;
                border-radius: 20px;
                line-height: 30px/$ppr;
                margin-top: 5px/$ppr;
                color: white;
                font-size: 14px/$ppr;
                background-color: #31F300;
            }
        }
    }
    .relevant_person{
        padding: 10px/$ppr;
        & p{
            line-height: 24px/$ppr;
            font-size: 14px/$ppr;
            .name{
            }
            .person{
                margin-right: 5px/$ppr;
            }
        }
    }
    .story_line{
        line-height: 24px/$ppr;
        font-size: 14px/$ppr;
    }
}


</style>