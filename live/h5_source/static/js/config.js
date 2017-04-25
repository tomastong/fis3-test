var sUserAgent = navigator.userAgent.toLowerCase();
var ios = /iphone|ipad|ipod/.test(sUserAgent),
    android = /android/.test(sUserAgent);
var weixin = sUserAgent.match(/MicroMessenger/i) == "micromessenger",
    qq = navigator.userAgent.match(/QQ\//i) == "QQ/",
    weibo = sUserAgent.match(/WeiBo/i) == "weibo";
var clickOrTouch = (('ontouchend' in window)) ? 'touchend' : 'click';
var appCtl = false;

// 新浪新闻订制
window.onpause = function(){
    if(appCtl || $('#video')[0].paused) return ;
    $('#video')[0].pause();
    appCtl = true;
}
window.onresume = function(){
    if(!appCtl) return;
    $('.videobg, .pause').hide();
    $('#video')[0].play();
    appCtl = false;
}

// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?585c3afe1531d25104e434bf49f3aed5";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

// que统计
var _maq = _maq || [];
_maq.push(['_setAccount', 'yizhibo_room']);
(function() {
var ma = document.createElement('script');
ma.type = 'text/javascript'; 
ma.async = true;
ma.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.qchannel03.cn/m.js'; 
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ma, s);
        })();
