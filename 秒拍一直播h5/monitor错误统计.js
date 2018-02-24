(function(){
  if(window.monitor){return;}

  var M = {};

  M.p_from = getScriptArg("p_from");    // 错误所属人
  M.logHost = 'http://static.yizhibo.com/pc_live/static/img/error.gif?';  //错误请求地址
  M.limit = 5;        //错误消息限制总数
  M.errorCount = 0;   //错误消息计数
  M.errorList = [];

  M.js_error = function(msg,url,line,col,error){

     if(M.errorCount >= M.limit){
       return  false;
     } 
     if(!url){
      // 返回false浏览器输出错误
      return false;
     }  
     var _url =[]; 
     col = col || 0;//不一定所有浏览器都支持col参数
 
     _url.push('p_from=Ferror.'+(M.p_from||"Noname"));
     _url.push('msg'+'='+encodeURIComponent(msg));
     _url.push('error_url'+'='+encodeURIComponent(url));
     _url.push('line'+'='+encodeURIComponent(line));
     _url.push('col'+'='+encodeURIComponent(col));
     _url.push('UA'+'='+encodeURIComponent(navigator.userAgent));
     _url.push('page_url'+'='+encodeURIComponent(location.href));
     var src = M.logHost + _url.join('&');

     if(M.errorList.indexOf(src) == -1){
      M.errorList.push(src);
      M.errorCount++;
     }else{
      return false;
     }
      
    var img = new Image(0,0);
    img.onload = img.onerror = function(event){

        img.onload = img.onerror = null;
        img = null;
        return true;
     }; 
    img.src = src;
    // 返回false浏览器输出错误
    return false;

  };

  function getScriptArg(key){    //获取本JS文件单个参数
    var scripts=document.getElementsByTagName("script"),
    script=scripts[scripts.length-1],
    src=script.src;
    // return (src.match(new RegExp("(\\?|&)"+key+"=(.*?)(&|$)"))||['',""])[2];
    return (src.match(new RegExp("(?:\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
  };

  window.monitor = M;

  window.onerror = M.js_error;

})();





