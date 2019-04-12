export default{
    addSongList(state,params){
        // 进行播放  添加播放列表  确定要播放哪一首歌曲
        state.songlist=params.songlist
        state.songindex=params.songindex
    },
    changeS(state){
        state.show = !state.show;
    },
    pravSong(state){
        if(state.songindex >= 0){
            state.songindex = state.songindex-1;
        }
        else{
            state.songindex = state.songlist.length-1;
        }
    },
    nextSong(state){
        if(state.songindex <= state.songlist.length-1){
            state.songindex = state.songindex+1;
        }
        else{
            state.songindex = 0;
        }
    }

}