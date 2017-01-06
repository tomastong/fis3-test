var sUserAgent = navigator.userAgent.toLowerCase();
var ios = /iphone|ipad|ipod/.test(sUserAgent),
    android = /android/.test(sUserAgent);
var weixin = sUserAgent.match(/MicroMessenger/i) == "micromessenger",
    qq = navigator.userAgent.match(/QQ\//i) == "QQ/",
    weibo = sUserAgent.match(/WeiBo/i) == "weibo";
var clickOrTouch = (('ontouchend' in window)) ? 'touchend' : 'click';
//android全屏播放
// if (bIsAndroid) {
//     window.addEventListener('orientationchange', function(event) {
//         if (window.orientation == 180 || window.orientation == 0) {
//             alert("竖屏");
//             $('#video').get(0).play();
//         }
//         if (window.orientation == 90 || window.orientation == -90) {
//             //alert("横屏");
//         }
//     });

// }

// function is_weixin() {
//     var ua = navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) == "micromessenger") {
//         return true;
//     } else {
//         return false;
//     }
// }

// function download() {
//     if (is_weixin()) {
//         window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=tv.xiaoka.live";
//     } else {
//         if (bIsAndroid) {
//             // window.location.href = "http://m.xiaoka.tv/download/xiaokatv.php";
//             window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=tv.xiaoka.live";
//         } else {
//             window.location.href = "https://itunes.apple.com/app/xiao-katv/id1059274584";
//         }
//     }
// }

// //唤起APP
// function lanchLiveInfo(type, liveid) {
//     if (weixin || qq) {
//         $('#school_browser').show();
//         $('.f-layout').css('top', $('#school_browser').height());
//         $(window).scrollTop(0);
//     } else {
//         var url_prefix = 'jump';
//         var url = 'xktv://' + url_prefix + '?type=' + type + '&dataStr=' + liveid;
//         window.location.href = url;
//         setTimeout(function() {
//             download();
//         }, 2000);
//     }
// }

// function appDownload() {
//     document.getElementById('school_browser').style.display = 'block';
//     download();
// }

/*baidu 统计代码*/
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?585c3afe1531d25104e434bf49f3aed5";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
