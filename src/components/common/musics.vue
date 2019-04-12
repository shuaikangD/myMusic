<template>
    <div>
        <div v-for="(item,index) in msg" class="musics-a" id="musics" @click='goDetail(index)'>
            <div class="img-one"><img alt="" v-lazy="item.imgurl" width="60" height="60"></div>
            <div class="xinxi">
                <h3>{{item.creator.name}}</h3>
                <p>{{item.dissname}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import musicApi from '../../common/api/api.js';
export default {
    data(){
        return{
            msg:[]
        }
    },
    methods:{
        goDetail(index){
            // console.log(this.msg[0].dissid);

            this.$router.push(`/music/detail/${this.msg[index].dissid}`)
        }
    },
    created(){
        let url = musicApi.musicApi
        this.$axios.get(url)
        .then((response)=>{
            // console.log(response);
            this.msg =response.data.data.list;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    
}
</script>
<style lang="less" scoped>
     @import '../../common/style/index.less';
    #musics{
        .w(335);
        .h(62);
        .pan-l(20);
        .pan-r(20);
        .pan-b(20);
    }
    .musics-a{
        display: flex;
        justify-content: space-between;
        font-size: @fontSize-s;
    }
    .img-one{
        .w(60);
        .h(60);
    }
    .img-one img{
        width: 100%;
    }
    .xinxi{
        .w(255);
        .h(62);
        display: flex;
        flex-flow: column;
        justify-content: space-around;
    }
    .xinxi h3{
        color:@fontColor;
    }
    .xinxi p{
        
        color: @fontSizeNor;
    }
    
</style>

