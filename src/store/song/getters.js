export default{
    classSong(state){
        let song = state.songlist[state.songindex]
        console.log(song)
        return song
    },
    changeShow(state){
        return state.show;
    }
}