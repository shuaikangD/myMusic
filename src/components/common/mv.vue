<template>
    <div class="mv">
        <router-view></router-view>
        <div class="wrapper">
            <ul class="content">
                <li v-for='(group,index) in phList' :key="index" class="all" @click="goDetail(group)">
                    <div class="img">
                        <img v-lazy="group.picUrl" alt="">
                    </div>
                    <ul class="song">
                        <li v-for='(item,index) in group.songList'>
                            {{index+1}} {{item.songname}}-{{item.singername}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Scroll from 'better-scroll';
import phdata from '../../common/data/paihang.js';
import Api from '../../common/api/api.js';
import jsonp from '../../common/js/jsonp.js';
export default {
    data(){
        return{
            name:'我是mv页',
            phList:[]
        }
    },
    methods:{
        goDetail(group){
            // console.log(this.msg[0].dissid);
            console.log(group);
            this.$router.push(`/mv/detail/${group.id}`)
        },
        phData(){
            let phUrl = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp1';
            jsonp(phUrl,'jsonpCallback','jp1')
            .then((res)=>{
                let list = res.data.topList;
                this.phList=list;
                console.log(this.phList);
                this.$nextTick(()=>{
                    this.initScroll();
                })
            })
        },
        initScroll(){
            this.scroll = new Scroll('.wrapper',{click:true})
        }
    },
    created(){
        this.phData();
    },
    mounted(){

    }

}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    .mv{
        .w(375);
        height: 100%;
        .pan-t(88);
        color: #fff;
        .wrapper{
            .w(375);
            position: fixed;
            .t(88);
            .b(0);
            overflow: hidden;
            .content{
                .all{
                    .w(335);
                    .h(100);
                    .pan(20,0,0,0);
                    .mar(0,20,0,20);
                    
                    color: @fontSizeNor;
                    display: flex;
                    justify-content: space-between;
                    .img{
                        .w(100);
                        .h(100);
                        img{
                            width: 100%;
                        }
                    }
                    .song{
                        .w(195);
                        .h(100);
                        .pan(0,20,0,20);
                        background: #333;
                        display: flex;
                        flex-flow: column;
                        justify-content: space-around;
                        li{
                            font-size:@fontSize-m;
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