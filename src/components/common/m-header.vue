<template>
    <div id="header">
        dsk's Music
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    #header{
        .w(375);
        .h(44);
        color:@fontSizeColor;
        position: fixed;
        left: 0;
        top:0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        // z-index: 999;
        background:@bgColor;
        font-size: @fontSize-xl;
    }
</style>

