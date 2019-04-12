<template>
    <div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in imgs">
                    <img :src="item.picUrl" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min.js';
import banner from '../../common/api/api.js';
export default {
    data(){
        return{
            imgs:[]
        }
    },
    methods:{
        initswiper(){
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay:true,
                speed:300,
                // 如果需要分页器
                pagination: {
                el: '.swiper-pagination',
                clickable :true,
                },
            })        
        },
        initres(){
            let url = banner.bannerApi
            this.$axios.get(url)
            .then((response)=>{
                // console.log(response.data.data.slider);
                this.imgs =response.data.data.slider;
                this.$nextTick(()=>{
                    this.initswiper()
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    created(){
        this.initres();
    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
    @import '../../../node_modules/swiper/dist/css/swiper.min.css';
    @import '../../common/style/index.less';
    .swiper-container{
        .w(375);
        .h(150);
    }
    .swiper-container img{
        width: 100%;
    }
    .swiper-pagination span{
        .w(10);
        .h(10);
    }
</style>


