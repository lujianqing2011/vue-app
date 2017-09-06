<template>
    <section class="photo_page">
        <ul>
            <li v-for="img in imgList">
                <h2>{{img.content}}</h2>
                <img :src="img.url">
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
            imgList: []
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
            let url="https://bird.ioliu.cn/joke/rand"
            // api.photo(data).then((res) => {
            //     console.log(5,res)
            //     this.$nextTick(() => {
            //         this.$emit('loading',false);
            //     })
            // })
            axios.get(bird+url).then( function(res) {
                console.log(5,res.data.data)
                this.imgList = res.data.data
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