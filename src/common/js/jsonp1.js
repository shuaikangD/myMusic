import originJsonp from 'jsonp'

function JSONP (url,opt){
    return new Promise((resolve,reject)=>{
        originJsonp(url,opt,(err,res)=>{
            if(err){reject(err) }
            resolve(res)
        })
    })
}
export default JSONP
//https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp1 