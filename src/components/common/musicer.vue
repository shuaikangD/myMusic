<template>
    <div class="singer">
        <router-view></router-view>
        <div class="wrapper">
            <ul class="singer-wrap">
                <li v-for="(group,i) in singerList" :key='i' >
                    <div class="tit" :ref='group.title' id="tit">{{group.title}}</div>
                    <div v-for="(item,index) in group.items" :key="index" class="name" id="name" @click="next(item.singerMid)">
                        <img :src="item.mid" alt="">
                        <span>{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="right-l" id="rl">
            <ul 
                @touchstart ='start'
                @touchmove="move" 
                @touchend="end">
                <li id="ccc" v-for='(item,index) in silderData' :key='index'
                    :class='index==Findex?"sel":""'
                    @click='change(item,index)'
                >
                    {{item}}
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
// import singerData from '../../common/data/singer.js'
import Scroll from 'better-scroll'
import jsonp1 from '../../common/js/jsonp1.js'
export default {
    data(){
        return{
            singerList:[],
            Findex:0
        }
    },
    methods:{
        next(item){
            // console.log(item);
            this.$router.push(`/musicer/detail/${item}`)
        },
        change(item,index){
            this.Findex = index;
            this.s.scrollToElement(this.$refs[item][0]);
        },
        start(e){
            // console.log(e);
            this.startY=e.touches[0].clientY;
            // console.log(this.startY)
            //求出按下之后目标的下标
            this.startall = this.silderData.indexOf(e.target.innerText);
            // console.log(this.startall);
        },
        move(e){
            let ccc = document.getElementById('ccc');
            //求出移动的y轴距离
            let moveY = e.touches[0].clientY;
            // console.log(moveY)
            //求点击距离与移动距离之差
            let dir = moveY-this.startY;
            //求出是第几个字母，向下取整首字母为0；
            let juli = Math.ceil(dir/ccc.offsetHeight);
            //
            this.Findex = juli + this.startall;
            //求出点击后目标里的内容
            let index = this.silderData[juli];
            //数组的length,用作边界值的判定
            let length = this.silderData.length - 1;
            //判定边界值
            if(this.Findex <= 0){
                this.Findex = 0;
            }else if(this.Findex>=length){
                this.Findex = length;
            }
            //Findex 移动下标 不能超过总的数组长度
            let Xindex = this.silderData[this.Findex];
            this.s.scrollToElement(this.$refs[Xindex][0]);

        },
        end(e){
            // console.log('抬起')
        },
        initsinger(){
            let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&'
            jsonp1(url,{param:'jsonpCallback'})
            .then((res)=>{
                let list = res.data.list;
                let index = 0;
                let obj = {
                    'hot':{
                        title:'热',
                        items:[]
                    }
                };
                list.forEach(element => {
                    index++;
                    if(index<=20){
                        obj.hot.items.push(
                            {
                                name:element.Fsinger_name,
                                mid:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                                zm:ele,
                                singerMid:element.Fsinger_mid
                            })
                    }
                    let ele = element.Findex;
                    if(obj[ele]){
                        obj[ele].items.push(
                            {
                                name:element.Fsinger_name,
                                mid:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                                zm:ele,
                                singerMid:element.Fsinger_mid
                            })
                    }else{
                        obj[ele]={
                            title:ele,
                            items:[]  
                        }
                        obj[ele].items.push(
                            {
                                name:element.Fsinger_name,
                                mid:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                                zm:ele,
                                singerMid:element.Fsinger_mid
                            }
                        )
                    }
                });
                let arr=[]
                let hot=[]
                for(var i in obj){
                    if(i!=='9'&&i!=='hot'){
                        arr.push(obj[i]);
                    }else if(i==='hot'){
                        hot.push(obj[i])
                    }
                }
                arr.sort((a,b)=>{
                    return a.title.charCodeAt()-b.title.charCodeAt();
                });
                this.singerList=hot.concat(arr)
                console.log(this.singerList)
                this.$nextTick(()=>{
                    this.initScroll();
                })
            })
        },
        initScroll(){
            this.s = new Scroll('.wrapper',{probeType:3,click:true});
            // console.log(this.$refs);
            // console.log(this.ceateScrollHeight.arr);
            this.s.on('scroll',(pos)=>{
                // console.log(pos.y);
                for(var i = 0;i<this.ceateScrollHeight.length;i++){
                    // console.log(this.ceateScrollHeight[i])
                    if(this.ceateScrollHeight[i]<=Math.abs(pos.y)){
                        // console.log(Math.abs(pos.y))
                        // console.log('-----')
                        this.Findex = i + 1;
                    }else if(this.ceateScrollHeight[0]>=Math.abs(pos.y)){
                        this.Findex = 0;
                    }
                }
            })
        }
    },
    computed:{
        ceateScrollHeight(){
            let tit = document.getElementById('tit');
            let name = document.getElementById('name');
            let singerHeight=this.singerList.map((el)=>{
                return tit.offsetHeight+name.offsetHeight*el.items.length;
            })
            let heights = [];
            let height = 0;
            for(var i = 0;i<=singerHeight.length;i++){
                height+=singerHeight[i];
                heights.push(height);
            }
            heights.pop(1);
            return heights;
        },
        silderData(){
            let arrZM =this.singerList.map((item)=>{
                return item.title;
            })
            return arrZM;
        }
    },
    create(){
        
    },
    mounted(){
        this.initsinger();
    },
    
}
</script>
<style lang="less" scoped>
    @import '../../common/style/index.less';
    .singer{
        .w(375);
        // height: 100%;
        position: fixed;
        bottom: 0;
        .t(88);
       
        color: #fff;
        .wrapper{
            .w(375);
            position: fixed;
            .t(88);
            .b(0);
            overflow: hidden;
            ul{
                li{
                    .tit{
                        .w(375);
                        .h(30);
                        color: @fontSizeNor;
                        background: #333;
                        font-size: @fontSize-m;
                        .l-h(30);
                        .pan(0,0,0,20);
                    }
                    .name{
                        .w(345);
                        .h(50);
                        .pan-l(30);
                        .pan-t(20);
                        display: flex;
                        justify-content: start;
                        .l-h(50);
                        font-size:@fontSize-s; 
                        img{
                            .w(50);
                            .h(50);
                            border-radius: 50%;
                        }
                        span{
                            .mar(0,0,0,20);
                            color:@fontSizeNor;
                            display: inline-block;
                        }
                    }
                }
            }
        }
        .right-l{
            .w(20);
            position: absolute;
            .pan(20,0,20,0);
            border-radius: 10px;
            top:50%;
            .r(10);
            transform: translate3d(0,-50%,0);
                background: rgba(0,0,0,.3);
            ul{
                li{
                    .w(14);
                    .h(12);
                    .pan(3,3,3,3);
                    font-size: @fontSize-m;
                    text-align: center;
                    color:@fontSizeNor;
                    -webkit-user-select:none;
                    -moz-user-select:none;
                    -ms-user-select:none;
                    user-select:none;
                }
            }
            .sel{
                    color:@fontSizeColor;
                }
        }
    }
    
</style>