export default function(url,jsonp_key,name){
      return new Promise(function(resolve,reject){
          // 函数名随机处理避免占用命名空间，避免冲突;
          var randomName = name
      //     var randomName = '_' + Date.now();
          window[randomName] = function(res){
                resolve(res);
          }
          // 2. 创建并插入script标签;
          var script = document.createElement("script");
          // 当前url之中是否存在 ? （存在问好表示已经有数据了），我应该用& 去拼接数据，反之则用 ?;
          url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;
          script.src = url;
          // 3. 标签放入页面之中;
          document.body.appendChild(script);
          // 4. 清理垃圾;
          script.onload = function(){
                this.remove();
                window[randomName] = null;
                delete window[randomName];
          }
    })
}