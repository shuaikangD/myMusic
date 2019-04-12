<template>
    <div id="xq">
        <div class="wrap">
            <div class="img" :style="img">
                <div class="header">
                    <h3><i @click="back"><</i><span>{{hehe}}</span></h3>
                </div>
                <div class="play-wrapper">
                    <div class="play" @click="goPlayer(0)">
                        <i>▷</i>
                        <span>顺序播放全部</span>
                    </div>
                </div>
            </div>
            <div class="wrappers">
                <ul class="contents">
                    <li v-for="(item,index) in haha" :key="index" @click="goPlayer(index)">
                        <h4>{{item.songname}}</h4>
                        <p>
                            <span>{{item.singername}}</span>
                                ·
                            <span>{{item.albumname}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
// import jsonp from '../../common/js/jsonp.js'
import Scroll from 'better-scroll'
import jsonp from '../../common/js/jsonp';
import {mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {
            haha:[],
            hehe:'',
            img:'',
            headImg:''
        }
    },
    methods:{
        back(){
            this.$router.back()
        },
        goPlayer(index){
            console.log(this.haha,index)
            this.$store.commit('addSongList',{songlist:this.haha,songindex:index});
        },
        initData(singermid){
            console.log(this);
            if(this.$route.params.id){
                let mid = this.$route.params.id;
                let url = `/details/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${mid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`;
                this.$axios.get(url)
                .then((res)=>{
                    let list = res.data.cdlist[0].songlist;
                    
                    this.haha=res.data.cdlist[0].songlist.map((item)=>{
                        return{
                            songname:item.songname,
                            songmid:item.songmid,
                            singername:item.singer[0].name,
                            albummid:item.albummid,
                            albumname:item.albumname,
                            avator:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
                        }
                    })
                    console.log(this.haha)
                    this.hehe = res.data.cdlist[0].dissname;
                    this.img={
                            "background":"url("+res.data.cdlist[0].logo+")no-repeat",
                            "background-size":"100%",
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else if(this.$route.params.mid){
                let singerUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${singermid}`
                jsonp(singerUrl,'jsonpCallback','jp1')
                .then((res)=>{
                    this.haha=res.data.list.map((item)=>{
                        return{
                            songname:item.musicData.songname,
                            songmid:item.musicData.songmid,
                            singername:item.musicData.singer[0].name,
                            albummid:item.musicData.albummid,
                            albumname:item.musicData.albumname,
                            avator:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.musicData.albummid}.jpg?max_age=2592000`
                        }
                    })
                    // console.log(this.haha);
                    // console.log(res);
                    this.hehe = res.data.singer_name
                    this.img={
                            "background":"url("+`https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`+")no-repeat",
                            "background-size":"100%"
                        }
                })
            }else if(this.$route.params.topid){
                console.log(this.$route.params.topid)
                let phUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=${this.$route.params.topid}&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5`
                jsonp(phUrl,'jsonpCallback','jp4')
                .then((res)=>{
                    console.log(res)
                    this.haha=res.songlist.map((item)=>{
                        return{
                            songname:item.data.songname,
                            songmid:item.data.songmid,
                            singername:item.data.singer[0].name,
                            albummid:item.data.albummid,
                            albumname:item.data.albumname,
                            avator:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.data.albummid}.jpg?max_age=2592000`
                        }
                    })
                    this.hehe = res.topinfo.ListName
                    this.img={
                            "background":"url("+res.topinfo.pic_v12+")no-repeat",
                            "background-size":"100%"
                        }
                })
            }
            this.$nextTick(()=>{
                this.initScroll();
            })
        },
        initScroll(){
            this.scroll = new Scroll('.wrappers',{click:true});
        }
    },
    computed:{
        
    },
    created(){
        // console.log(this.$route.params.mid)
        this.initData(this.$route.params.mid);
    }
}
</script>
<style lang="less" scoped>
@import '../../common/style/index.less';
#xq{
    position: absolute;
    left: 0;
    bottom:0;
    .w(375);
    height:100%;
    background: @bgColor;
    z-index: 99;
    .wrap{
        .w(375);
        position: fixed;
        .t(44);
        .h(667);
        left: 0;
        overflow: hidden;
        .img{
            .w(375);
            .h(262);
            position: fixed;
            .t(0);
            .l(0);
            // z-index: 5;
            .header{
                .w(335);
                .h(44);
                .pan(0,20,0,20);
                font-size: @fontSize-s;
                z-index: 999;
                position: fixed;
                    .t(0);
                    .l(0);
                    z-index: 99;
                    color: #fff;
                h3{
                    font-weight: normal;
                    .w(335);
                    .h(44);
                    display: flex;
                    align-items: center;
                    justify-content:start;
                    i{
                        .w(22);
                        .h(22);
                        .pan(11,11,11,11);
                        display: inline-block;
                        // background: #f66 no-repeat;
                    }
                }
            }
            .play-wrapper{
                .w(375);
                .h(32);
                position: absolute;
                .b(20);
                .l(0);
                display: flex;
                justify-content: center;
                .play{
                    .w(133);
                    .h(16);
                    .pan(7,0,7,0);
                    border: 1px solid #ffcd32;
                    color:@fontSizeColor;
                    font-size: @fontSize-m;
                    border-radius:15px; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    i{
                        .w(13);
                        .h(13);
                        .pan(3,3,3,3);
                        display: inline-block;
                        // background: #f66;
                        border:1px solid @fontSizeColor;
                        border-radius: 50%;
                        .mar(0,10,0,0);
                        text-align: center;
                        font-size: @fontSize-sm;
                        // .l-h(16);
                    }
                    span{
                        display: inline-block;
                    }
                }
            }
        }
        .wrappers{
            .w(375);
            .h(401);
            position: absolute;
            .t(222);
            background: @bgColor;
            // box-sizing: border-box;
            // z-index: 999;
            .contents{
                .w(315);
                .pan(20,30,20,30);
                background: @bgColor;
                li{
                    width: 100%;
                    .h(64);
                    h4{
                        font-size:@fontSize-s;
                        color: #fff; 
                        .l-h(20);
                        font-weight: normal;
                        white-space: nowrap;  
                        text-overflow:ellipsis; 
                        overflow:hidden;
                    }
                    p{
                        font-size: @fontSize-s;
                        color:@fontSizeNor;
                        .mar(5,0,0,0);
                        white-space: nowrap;  
                        text-overflow:ellipsis; 
                        overflow:hidden;
                    }
                }
            }
        }
    }
    
}
</style>
