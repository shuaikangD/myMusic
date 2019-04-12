<template>
    <div class="myye">
        <div class="input">
            <i></i>
            <span v-show="show" @click="clean">×</span>
            <input type="text" name="" placeholder=" 搜索歌曲、歌手" value="" id="sr" v-model="msg" autocomplete="off">
        </div>
        <div class="hot">
            <h3>热门搜索</h3>
            <ul>
                <li v-for="(item,index) in songList" :key = 'index' @click="soso(item.k)">
                    {{item.k}}
                </li>
            </ul>
        </div>
        <div class="his">
            <h3>
                <span>搜索历史</span>
                <span @click="delAll">删除</span>
            </h3>
            <ul>
                <li v-for='(item,index) in hisList'>
                    <span>{{item}}</span>
                    <span @click="del(index)">×</span>
                </li>
            </ul>
        </div>
        <div class="wrapper" :class='show?"":"hide"'>
            <ul class="content" v-show="show">
                <li v-for="(item,index) in xinxi">
                    <i></i>
                    {{item.songname}}-{{item.singer[0].name}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import sousuo from '../../common/data/sousuo.js';
import $ from '../../../node_modules/jquery/dist/jquery.min.js';
import jsonp from '../../common/js/jsonp.js';
import Scroll from 'better-scroll';
import Api from '../../common/api/api.js';
export default {
    data(){
        return{
            name:'我是我的页',
            songList:[],
            hisList:[],
            xinxi:[],
            show:false,
            msg:''
        }
    },
    methods:{
        sousuo(){
            let ssUrl = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp0';
            jsonp(ssUrl,'jsonpCallback','jp0').then((res)=>{
                // console.log(res);
                let list = res.data.hotkey;
                let tenList=[]
                list.forEach((item,index)=>{
                    if(index<=9){
                        tenList.push(item);
                    }
                })
                this.songList= tenList;
                this.$nextTick(()=>{
                    this.initScroll();
                })
            })
        },
        clean(){
            this.msg ='';
        },
        soso(item){
            this.msg = item
            this.bd();
        },
        delAll(){
            this.hisList.splice(0,this.hisList.length)
        },
        del(index){
            this.hisList.splice(index,1);
        },
        bd(){
             if(this.msg === ''){
                 this.show = false;
                 if(this.hisList.indexOf(this.msg)===-1){
                    this.hisList.push(this.msg);
                }
             }else{
                 this.show = true;
             }
            let url = `/input/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${this.msg}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`
            this.$axios.get(url)
            .then((response)=>{
                let list = response.data.data.song.list;
                this.xinxi = list;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        initScroll(){
            this.scroll = new Scroll('.wrapper')
        }
    },
    watch:{
        msg:function(vel){
            this.bd()
        }
    },
    created(){
        this.sousuo();
    }
}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    .myye{
        .w(375);
        height: 100%;
        .pan-t(88);
        color: #fff;
        .input{
            .w(335);
            .h(40);
            .pan(20,20,20,20);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            i{
                .w(30);
                .h(40);
                border-radius: 10px 0 0 10px;
                display: inline-block;
                background: #333;
                z-index: 999;
            }
            span{
                display: block;
                .w(16);
                .h(16);
                border-radius: 50%;
                background:@bgColor;
                color: #333;
                position: absolute;
                .t(32);
                .r(32);
                z-index: 999;
                font-size: @fontSize-l;
                text-align: center;
                .l-h(14);
            }
            input{
                .w(305);
                .h(40);
                border-radius: 0 10px 10px 0;
                background: #333;
                color:@fontSizeNor;
                position: absolute;
                .t(20);
                .r(20);
                outline: none;
                border: 0;
            }
        }
        .hot{
            .w(335);
            .h(168);
            .pan(0,20,20,20);
            h3{
                font-size: @fontSize-l;
                .mar(0,0,30,0);
                color: @fontSizeNor;
            }
            ul{
                overflow: hidden;
                li{
                    .pan(5,10,5,10);
                    .mar(0,20,10,0);
                    float: left;
                    font-size: @fontSize-s;
                    color:@fontSizeNor;
                    background:#333;
                    border-radius:10px; 
                }
            }
        }
        .his{
            .w(335);
            .pan(20,20,20,20);
            h3{
                .w(335);
                .h(40);
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: @fontSize-s;
                color: @fontSizeNor;
            }
            ul{
                li{
                    .h(40);
                    .w(335);
                    font-size: @fontSize-l;
                    color:@fontSizeNor;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        .wrapper{
            .w(375);
            position: fixed;
            .t(168);
            .l(0);
            background: @bgColor;
            .h(499);
            overflow: hidden;
            .content{
                .w(335);
                .pan(0,20,0,20);
                li{
                    .w(335);
                    .mar(0,0,20,0);
                    color:@fontSizeNor;
                    font-size: @fontSize-m;
                    white-space: nowrap;  
                    text-overflow:ellipsis; 
                    overflow:hidden;
                    display: flex;
                    justify-content: start;
                    i{
                        display: block;
                        .w(14);
                        .h(14);
                        .mar(0,20,0,0);
                        background: #f66;
                    }
                }
            }
        }
         .hide{
             z-index: -999;
         }   
    }
    </style>