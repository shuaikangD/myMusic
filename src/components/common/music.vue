<template>
    <div class="music">
        <router-view></router-view>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <banner></banner>
                <tit></tit>
                <musics></musics>
            </div>
            <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import banner from './banner.vue';
import tit from './title.vue';
import musics from './musics.vue'
let wrapper = document.querySelector('.wrapper')
export default {
    data(){
        return{
            name:'我是音乐页'
        }
    },
    components:{
        banner,
        tit,
        musics
    },
    methods:{
        // initScroll(){
            
        //     new BScroll(wrapper)
        // }
    },
    mounted(){
         this.$nextTick(() => { 
            this.scroll = new BScroll(this.$refs.wrapper, {click:true}) 
        }) 

    }
}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    .music{
        .w(375);
        .h(579);
        .pan-t(88);
        .wrapper{
            .w(375);
            .h(579);
             overflow: hidden;
        }
    }
</style>
