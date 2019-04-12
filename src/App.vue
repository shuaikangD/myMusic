<template>
  <div id="app">
    <MHeader></MHeader>
    <xuanxiang></xuanxiang>
    <!-- <component :is="arr[num].pach"></component> -->
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/common/m-header.vue';
import xuanxiang from './components/common/xuanxiang.vue';
import player from './components/player/player.vue'
// import music from './components/common/music.vue';
// import musicer from './components/common/musicer.vue';
// import myye from './components/common/myye.vue';
// import mv from './components/common/mv.vue';
export default {
  name: 'App',
  data(){
    return {
      arr:[
        {pach:'music'},
        {pach:'musicer'},
        {pach:'mv'},
        {pach:'myye'},
      ],
      num:0
    }
  },
  methods:{
    jsIndex(index){
      this.num = index;
    }
  },
  components: {
   MHeader,
   xuanxiang,
   player
  //  music,
  //  musicer,
  //  mv,
  //  myye
  }
}
</script>

<style lang="less" scoped>
@import './common/style/index.less';
  #app{
    .w(375);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background:@bgColor;
    // overflow-y:scroll;
  }
</style>
