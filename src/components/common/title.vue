<template>
    <div class="tit">
        {{title}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            title:'热门歌曲推荐'
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    .tit{
        .w(375);
        .h(65);
        display: flex;
        justify-content: center;
        align-items: center;
        color:@fontSizeColor;
        font-size: @fontSize-xl;
    }
</style>
