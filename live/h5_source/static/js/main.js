/**
 * 获奖作品
 * author lw
 * dtae 20151119
 */
var $vod = $('.vod-box-pl'),
    $vl = $('.f-layout');

var sheight = screen.height, 
    swidth = screen.width;
var winHeight = $(window).height();

// function vscroll(obj) {
//   //if(isRun) return;
//   var isIE = !-[1,], isIE6 = isIE && !window.XMLHttpRequest, o = obj, oLast = o.children(":last"), ofir = o.children(":first");
//   IsPC()&&o.hover(function () {
//       $(this).attr("name", "hovered");
//   }, function () {
//       $(this).removeAttr("name");
//   });
//   if (o.attr("name") != "hovered"&& o.children().size()>1) {
//     var height = IsPC()?oLast.height():oLast.outerHeight(true);
//     if (isIE6) {
//         oLast.css({ "height": 0 });
//     } else {
//         oLast.css({ "opacity": 0, "height": 0 });
//      }
//     ofir.before(oLast);
//     o.children(":first").animate({ height: height + "px", opacity: "1" }, 500);
//     isRun = true;
//   }
//   runTimer = setTimeout(function () { vscroll(o) }, 5000);
// }
// function postData(url,data,sfn,efn){
//   $.ajax({
//       url:url,
//       data:data,
//       type:'POST',
//       success:function(res){
//          if(res.result==1){
//             sfn&&sfn(res);
//          }else{
//             efn&&efn(res);
//          }
//       }
//   });
// }
// function IsPC() {
//   var userAgentInfo = navigator.userAgent;
//   var Agents = ["Android", "iPhone",
//               "SymbianOS", "Windows Phone",
//               "iPad", "iPod"];
//   var flag = true;
//   for (var v = 0; v < Agents.length; v++) {
//       if (userAgentInfo.indexOf(Agents[v]) > 0) {
//           flag = false;
//           break;
//       }
//   }
//   return flag;
// }

// function cancel_full_screen(doc) {
//     doc.exitFullscreen ? doc.exitFullscreen() : (doc.mozCancelFullScreen ? doc.mozCancelFullScreen() : (doc.webkitCancelFullScreen && doc.webkitCancelFullScreen()))
// }

function setPage(){
  var $win = $(window);
  if(!arguments.length) return;
  for (var i = arguments.length - 1; i >= 0; i--) {
    var isVod = arguments[i].is('video');
    var viewH = $win.height();
    var viewW = $win.width();
    // var viewH = sheight;
    // var viewW = swidth;
    if(!window.isImgShare){
      if(isVod){
        // alert("window:"+$win.width()+":"+$win.height());
        // alert("video:"+arguments[i].width()+":"+arguments[i].height());
        arguments[i].width('102.2%');
        var vodH = Math.round(viewW * 640/360);
        if(vodH>=viewH){
          arguments[i].height(vodH);
        }else{
          arguments[i].height(viewH);
        }
        arguments[i].css({
          marginTop:-(vodH-viewH),
          marginLeft:'-1.1%',
          marginRight:'-1.1%'
        });
      }else{
        arguments[i].height(viewH);
      }
    }else{
      var wW = $win.width();
      wW>414?
      arguments[i].height(414):
      arguments[i].height(wW);
    }
  };
}
$(function(){
  //设置播放器高度通屏显示
  setPage($vod,$vl,$('video'));
  //检测是否翻转屏幕
  //if("onorientationchange" in window){
  //}
  // $(window).on("resize",function(){
  //     setPage($vod,$vl,$('video'));
  //     if($(".btm-menu").offset().top>350){ 
  //       $(".input").blur();
  //     }

  // }); 
  $(window).on("resize",function(){
      setPage($vod,$vl,$('video'));
      if(bIsAndroid && winHeight - $(window).height() < 10){
          $(".input").blur();
      }
  }); 
  //点击播放
  // $video = $('video').get(0);
  // $vl.on('click',function(){
  //   $vl.hide();
  //   // $video.play();
  // });
  // $('video').on('click',function(){
  //   if($video.paused){
  //     $video.play();
  //   }else{
  //     $video.pause();
  //   }
  // }); 
  // $('.footer').on('click',function(){
  //   var tt = $(this).find('.btn-down');
  //   lanchLiveInfo(tt.data('type'),tt.data('scid'));
  //   return false;
  // });
  /*$('.user-box').on('click',function(){
	  var tt = $(this).find('.add');
	  lanchLiveInfo(tt.data('type'),tt.data('scid'));
	  return false;
  })*/
  // $('.opt-box').on('click',function(){
	 //  var tt = $(this).find('.bg-sp');
	 //  lanchLiveInfo(tt.data('type'),tt.data('scid'));
	 //  return false;
  // })
});
