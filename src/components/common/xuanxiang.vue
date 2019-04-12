<template>
    <div class="fy">
            <router-link tag='div' v-for="(item,index) in arr" :to='item.zj' active-class='sel' :key="index">
                {{item.m}}
            </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
            arr:[{m:'音乐',zj:'/music'},{m:'歌手',zj:'/musicer'},{m:'排行',zj:'/mv'},{m:'搜索',zj:'/myye'}],
            num:0
        }
    },
    methods:{
        // fs(index){
        //     this.num=index;
        //     this.$emit('fsIndex',index)
        // }
    }
}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    .fy{
        .w(375);
        .h(44);
        color:rgba(255,255,255,.5);
        position: fixed;
        left: 0;
        .t(43);
        display: flex;
        font-size: 16px;
        text-align: center;
        background: @bgColor;
        // z-index: 999;
        // .bug(blue);
        justify-content: space-around;
        div{
            .h(36);
            border-bottom: 2px solid #222;
            .l-h(44);
        }
        .sel{
            border-bottom: 2px solid #ffcd32;
            color: #ffcd32;
        }
    }
</style>