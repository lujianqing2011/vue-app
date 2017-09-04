<template>
    <section class="photo_page">美图</section>
</template>

<script>

import api from '@/api/api'
import axios from 'axios'

export default{
    components: {
    },
    data(){
        return{
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
        this.getPhoto();
    },
    //事件
    methods: {
        getPhoto() {
            this.$emit('loading',true);
            let data = {
                page: 1,
                catid: 34
            }
            let url="http://m.toutiao.com/list/?tag=news_hot&ac=wap&count=20&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0"
            // api.photo(data).then((res) => {
            //     console.log(5,res)
            //     this.$nextTick(() => {
            //         this.$emit('loading',false);
            //     })
            // })
            axios.get(bird+url).then( function(res) {
                console.log(5,res)
                this.$nextTick(() => {
                    this.$emit('loading',false);
                })
            }.bind(this)).catch(function (error) {
                    console.log("网络有问题")
                    console.log(error)
                })
        }
    }
}

</script>

<style lang="scss">
    
</style>