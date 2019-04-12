<template>
    <div class="wrap" v-if='songlist.length'>
         <!-- v-if='songlist.length' -->
        <div class="bigmusic" v-show="changeShow">
            <div class="bg" :style="bg">

            </div>
            <div class="bigmusic-header">
                <i @click="changeBM"><</i>
                <span>{{music.songname}}</span>
            </div>
            <h2>{{music.singername}}</h2>
            <div class="img">
                <dir class="big-img" id="big-img">
                    <img :src="music.avator" alt="">
                </dir>
                <p>{{line.txt}}</p>
            </div>
            <audio @timeupdate='timeupdate' :src="music.songbf"  ref="music"  @canplay="canPlay"></audio>
            <!-- controls -->
            <div class="bfq">
                <!-- <i v-for="(item,index) in arr" @click="ms(index)">{{item}}</i> -->
                <div class="progress-wrapper">
                    <span class='left'>{{start}}</span>
                    <div class="progress-bar-wrapper">
                        <div class="progress-bar">
                            <div class="bar-inner" id="bar" 
                                ref="progressBar"
                                @click="progressClick">
                                <div class="progress" :style="" id="progress" 
                                    ref="progress"
                                ></div>
                                <div class="progress-btn-wrapper" ref="progressBtn"></div>
                            </div>
                        </div>
                    </div>
                    <span class="right">{{end}}</span>
                </div>
                <div class="btn">
                    <span>◎</span>
                    <span @click="prav"><</span>
                    <span @click="onoff">▷</span>
                    <span @click="next">></span>
                    <span @click='collection' 
                            :style="a?'color:red':''"
                    >❤</span>
                </div>
            </div>
        </div>
        <div class="smallmusic" v-show="!changeShow">
            <div class="smallimg">
                <div class='small' id="small-img">
                    <img :src="music.avator" alt="">
                </div>
            </div>
            <div class="smallsong"  @click="changeBM">
                <p>{{music.songname}}</p>
                <p>{{music.singername}}</p>
            </div>
            <div class="smallbtn">
                <span  @click="onoff">▷</span>
                <span>〓</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters,mapState} from 'vuex';
import { Base64 } from 'js-base64'
import Lyric from 'lyric-parser';
import lrc from '../../common/js/lrc.js'
export default {
    data(){
        return {
            line:{txt:'loading'},
            start:0,
            end:0,
            time:0,
            endTime:0,
            timer:null,
            a:false,
            arr:['顺序','随机','单曲'],
            deg:0
        }
    },
    components:{
       
    },
    methods:{
        //点击进度条
        progressClick(e){
            console.log(e)
            this.wTime=0;
            const rect = this.$refs.progressBar.getBoundingClientRect();
            const offsetWidth = e.pageX - rect.left;
            this.$refs.progress.style.width = `${offsetWidth}px`
            this.$refs.progressBtn.style.left = offsetWidth+"px"
            this.wpercent = offsetWidth/rect.width
            this.wTime = this.wpercent*this.endTime;
            this.LyricObj.play(this.wTime*1000,true)
            this.percents();
        },
        percents(){
            if(this.wTime){
                this.$refs.music.currentTime=this.wTime
                this.wTime=0;
                return this.$refs.music.currentTime/this.endTime
            }
            // this.time = this.wTime
            return this.time/this.endTime
        },
        collection(){
            this.a = !this.a;
        },
        //进度条
        jdt(newPer){
            // console.log(newPer);
            let progress = document.getElementById('progress');
            let wid = newPer*document.getElementById('bar').offsetWidth;
            progress.style.width = wid+'px';
            this.$refs.progressBtn.style.left = wid+"px"
        },
        //清空旋转
        cleanrotate(){
            clearInterval(this.timer);
        },
        //图片旋转
        rotate(newShow,degs){
            if(this.timer){
                clearInterval(this.timer);
            }
            let simage = document.getElementById('small-img');
            let image = document.getElementById('big-img');
            let self = this;
            this.deg = Number(degs)||0;
            console.log(this.deg)
            this.timer=setInterval(function(){
                if(newShow){
                    image.style.transform="rotate("+self.deg+"deg)";
                }else{
                    simage.style.transform="rotate("+self.deg+"deg)";
                }
                self.deg+=1;
                if(self.deg>360){
                self.deg=0;
                }
            },50);
        },
        //歌曲的时间
        timeupdate(e){
            this.time = e.target.currentTime
            this.endTime = e.target.duration;
            this.start = Math.floor(e.target.currentTime/60)+':'+Math.floor((e.target.currentTime%60));
            this.end =  Math.floor(e.target.duration/60)+':'+Math.floor((e.target.duration%60));
        },
        //上一曲
        prav(){
            this.LyricObj.lines = [];
            this.$store.commit('pravSong')
        },
        //下一曲
        next(){
            this.LyricObj.lines = [];
            this.$store.commit('nextSong')
        },
        //自动播放
        canPlay(){
            this.audio=this.$refs.music
            this.audio.play()
            this.rotate(true)
        },
        //歌词播放
        getLyric(url){
            this.$axios.get(url)
            .then((res)=>{
                // console.log(res)
                let text=Base64.decode(res.data.lyric);
                // console.log(text);
                this.LyricObj=new lrc(text,(line)=>{
                    // console.log(line)
                        this.num=line.lineNum;
                        this.line=line
                })
                // console.log(this.LyricObj.tags)
                this.LyricObj.togglePlay()
            })
        },
        //暂停开始
        onoff(){
            let audio = this.$refs.music;
            // let timee = 0;
            // let nums = 0;
            let deg = this.deg
            this.LyricObj.togglePlay();
            if(audio.paused){
                audio.play()
                if(this.changeShow){
                    this.rotate(true,deg)
                }else{
                    this.rotate(false,deg)
                }
            }else{
                audio.pause()
                this.cleanrotate();
                // timee = this.LyricObj.lines[this.num].time;
                // nums = this.num
            }
        },
        //控制大小播放器显示隐藏
        changeBM(){
            this.$store.commit('changeS');
        }
    },
    watch:{
        changeShow(newShow){
            this.rotate(newShow)
        },
        //监听百分比
        percent(newPer){
            this.jdt(newPer);
        },
        //监听音乐的切换
        music(newSong,oldSong){
            this.getLyric(newSong.songgc)
        },
        //监听音乐时间
        time : function(){
            if(this.time===this.endTime){
                this.next();
            }
        },
    },
    computed:{
        //给全局管理模式添加音乐地址和歌词地址
        music(){
            if(this.classSong){
                // console.log(this.classSong)
                let info = this.classSong;
                info.songbf =  `http://dl.stream.qqmusic.qq.com/C400${this.classSong.songmid}.m4a?guid=1693785736&vkey=D9C6C8906474501ADCF30270D4062930FFB08E2163AA3C2949005D4261413A93494EC795AD70890695B79780A4826C30C9CE26114F779E38&uin=0&fromtag=38`
                info.songgc = `/sousuo/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${this.classSong.songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552895615274`
                return info
            }
        },
        //音乐时间的百分比
        percent(){
            return this.percents();
        },
        //设置背景图片
        bg(){
            return {
                'background':'url('+this.classSong.avator+')',
                'background-repeat':'no-repeat',
                'background-size':'cover',
                "filter":"blur(20px)",
                 "background-origin":'center'
            }
        },
        ...mapState({songlist:state=>state.song.songlist,
                     songindex:state=>state.song.songindex
                    }),
        ...mapGetters(['classSong','changeShow'])
    },
    created(){
         
    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
@import '~common/style/index.less';
.wrap{
    // background: red;
    .w(375);
    position: fixed;
    top:0;
    left: 0;
    z-index: 999;
    .bigmusic{
        .w(375);
        .h(667);
        position: absolute;
        background: #222;
        z-index: -1;
        .bg{
            position: absolute;
            .w(375);
            .h(667); 
            z-index: -1;
        }
        .bigmusic-header{
            .w(335);
            .h(44);
            .pan(0,50,0,20);
            // overflow: hidden;
            display: flex;
            justify-content: start;
            align-items: center;
            z-index: 99;
            color:#fff;
            i{
                .w(35);
                .h(44);
                .l-h(44);
                text-align: center;
                // display: inline-block;
            }
            span{
                .w(270);
                .h(44);
                font-size: @fontSize-s;
                text-align: center;
                // .mar();
                .l-h(44);
            }
        }
        h2{
            .w(375);
            .h(20);
            z-index: 9;
            text-align: center;
            font-size: @fontSize-l;
            font-weight: normal;
            .mar(0,0,20,0);
            color:#fff;
        }
        .img{
            .w(375);
            .h(350);
            position: relative;
            .big-img{
                .w(280);
                .h(280);
                border-radius: 50%;
                border: 10px solid hsla(0,0%,100%,.1);
                position: absolute;
                left: 10%;
                top: 0;
                img{
                    .w(280);
                    .h(280);
                    border-radius: 50%;
                }
            }
            p{
                .w(375);
                .h(20);
                position: absolute;
                bottom: 0;
                text-align: center;
                font-size: @fontSize-s;
                color: hsla(0,0%,100%,.5);
            }
        }
        .bfq{
            .w(375);
            position: fixed;
            .b(20);
            .l(0);
            .progress-wrapper{
                .w(300);
                .h(30);
                .pan(10,0,10,0);
                .mar(0,37.5,0,37.5);
                // background: #f66;
                position: relative;
                // display: flex;
                // justify-content: space-between;
                .left{
                    .w(30);
                    .h(30);
                    position: absolute;
                    .t(10);
                    .l(0);
                    font-size: @fontSize-m;
                    text-align: center;
                    .l-h(30);
                    color:#fff;
                }
                .right{
                    .w(30);
                    .h(30);
                    position: absolute;
                    .t(10);
                    .r(0);
                    font-size: @fontSize-m;
                    text-align: center;
                    .l-h(30);
                    color:#fff;
                }
                .progress-bar-wrapper{
                    .w(240);
                    .h(30);
                    position: absolute;
                    .t(10);
                    .l(30);
                    // background:#f0f;
                    .progress-bar{
                        .w(240);
                        .h(30);
                        position: absolute;
                        .t(0);
                        .l(0);
                        // background: #fff;
                    }
                    .bar-inner{
                        .w(240);
                        .h(4);
                        background:rgba(0,0,0,.5);
                        position:absolute;
                        .t(13);
                        .l(0);
                        .progress{
                            position: absolute;
                            height: 100%;
                            background: #ffcd32;
                        }
                        .progress-btn-wrapper{
                            position: absolute;
                            .l(-6);
                            .t(-6);
                            .w(10);
                            .h(10);
                            border: 3px solid #fff;
                            background: #ffcd32;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .btn{
                .w(375);
                display: flex;
                justify-content: space-around;
                span{
                    .w(50);
                    .h(50);
                    // display: inline-block;
                    border: 2px solid @fontSizeColor;
                    border-radius: 50%;
                    font-size: @fontSize-l;
                    text-align: center;
                    .l-h(50);
                    color:@fontSizeColor;
                    font-weight: bold;
                }
            }
            
        }
    }
    .smallmusic{
        .w(375);
        position: fixed;
        .b(0);
        .h(60);
        background: #333;
        z-index: 999;
        font-size: @fontSize-s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .smallimg{
            .small{
                .mar(0,0,0,20);
                .w(40);
                .h(40);
                border-radius: 50%;
                img{
                     .w(40);
                    .h(40);
                    border-radius: 50%;
                }
            }
        }
        .smallsong{
            .w(205);
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            p{
                color:#fff;
            }
        }
        .smallbtn{
            .mar(0,10,0,0);
            span{
                .w(40);
                .h(40);
                border:2px solid @fontSizeColor;
                border-radius: 50%;
                text-align: center;
                .l-h(40);
                display: inline-block;
                color:@fontSizeColor;
                font-weight: bold;
            }
        }
    }
}
</style>
