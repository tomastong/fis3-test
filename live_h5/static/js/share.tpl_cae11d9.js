var page_elem={input:function(){$(".input").on("focus",function(e){var e=e||window.event;e.preventDefault(),$(".wrap-menu").css({position:"static"}),$(".wrap-menu").addClass("switch"),$(".w-share,.w-gift").hide(),$(".wrap-menu > figure,.wrap-menu .send-msg").css("display","inline-block"),android&&$(window).scrollTop(sheight-$(window).height())}),$(".input").on("blur",function(e){var e=e||window.event;$(".wrap-menu").css({position:"inherit"}),$(".wrap-menu").removeClass("switch"),$(".w-share,.w-gift").show(),$(".wrap-menu > figure,.wrap-menu .send-msg").hide()}),$(".send-msg").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),chat.submit()})},share:function(){$(".w-share").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),weixin?($(".sns-share").show(),$(".sns-ctn").removeClass("sns2")):($(".sns-share").show(),$(".sns-ctn .weixin").remove(),$(".sns-ctn .friend-circle").remove(),$(".sns-ctn").addClass("sns2"))}),$(".weixin.sns").on(clickOrTouch,function(){$("body").animate({scrollTop:0}),$("#rt-share").show()}),$(".friend-circle.sns").on(clickOrTouch,function(){$("body").animate({scrollTop:0}),$("#rt-share").show()}),$("#rt-share").on(clickOrTouch,function(){$("#rt-share").hide()}),$(".weibo.sns").on(clickOrTouch,function(i){var i=i||window.event;i.stopPropagation();var n=[];for(var t in e.weibo)n.push(t+"="+encodeURIComponent(e.weibo[t]||""));window.location="http://service.weibo.com/share/share.php?"+n.join("&")}),$(".qq.sns").on(clickOrTouch,function(i){var i=i||window.event;i.stopPropagation();var n=[];for(var t in e.qq)n.push(t+"="+encodeURIComponent(e.qq[t]||""));window.location="http://connect.qq.com/widget/shareqq/index.html?"+n.join("&")}),$(".sns-share h4").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),e.stopPropagation(),$(".sns-share").hide()});var e={"default":{title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",desc:"直播就要一直播！",pic:shareConfig.wx.imgUrl,link:window.location.href},weixin:{title:shareConfig.wx.title,desc:shareConfig.wx.desc,pic:shareConfig.wx.imgUrl,link:shareConfig.wx.link},weibo:{appkey:"592819922",title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",site:"一直播",content:"utf-8",pic:shareConfig.wx.imgUrl,url:window.location.href},qq:{title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",desc:"直播就要一直播！",site:"一直播",summary:"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",pic:shareConfig.wx.imgUrl,url:window.location.href},qqzone:{title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",desc:"直播就要一直播！",site:"一直播",pic:shareConfig.wx.imgUrl,url:window.location.href},funcs:{weibo:null,weixin:null,qq:null,qqzone:null}};window.wx.ready(function(){window.wx.onMenuShareTimeline({title:e.weixin.title,desc:e.weixin.desc,imgUrl:e.weixin.pic,link:e.weixin.link}),window.wx.onMenuShareAppMessage({title:e.weixin.title,desc:e.weixin.desc,link:e.weixin.link,imgUrl:e.weixin.pic}),window.wx.onMenuShareQQ({title:e.qq.title,desc:e.qq.desc,link:e.qq.url,imgUrl:e.qq.pic}),window.wx.onMenuShareWeibo({title:e.weibo.title,desc:e.weibo.desc,link:e.weibo.url,imgUrl:e.weibo.pic}),window.wx.onMenuShareQZone({title:e.qqzone.title,desc:e.qqzone.desc,link:e.qqzone.url,imgUrl:e.qqzone.pic})})},gift:function(){function e(e,n){$.ajax({url:shareConfig.url.buy_gift_h5,type:"post",data:{scid:shareConfig.sObj.scid,giftid:$(".active").data("giftid"),amount:e},success:function(t){if(1==t.result){var o=$(".active.elem").data("giftid"),s={giftid:o,name:h5_req.giftobj["gift"+o].name,cover:h5_req.giftobj["gift"+o].cover,isbursts:h5_req.giftobj["gift"+o].isbursts,nickname:user.nickname,avatar:user.avatar,memberid:user.memberid,type:h5_req.giftobj["gift"+o].type,level:user.level,childtype:h5_req.giftobj["gift"+o].childtype,ytypevt:user.ytypevt,amount:e};chat.view.gift(JSON.stringify(s))}1==n?1==t.result?($(".recharge").html("<span>充值&nbsp;&nbsp;</span>"+t.data.goldcoin+"金币&nbsp;&nbsp;&gt;"),i()):600==t.result?($(".login").show(),$(".login .ok").on(clickOrTouch,function(){window.location.href=t.redirect_url})):100==t.result?jConfirm(t.msg,"",function(e){if(e)if(weixin)$(".guide-pay").show();else{var i=location.hostname,n=i.substr(0,i.indexOf("."));n+=".","dev."!=n&&"test1."!=n&&(n=""),window.location.href="https://"+n+"pay.yizhibo.com/product/api/get_product_list_h5"}}):jAlert(t.msg,""):0==n&&1==t.result&&$(".recharge").html("<span>充值&nbsp;&nbsp;</span>"+t.data.goldcoin+"金币&nbsp;&nbsp;&gt;")},error:function(){console.log("gift error.")}})}function i(){$(".active div").hasClass("lian")&&($(".send").hide(),$(".big-bg").show(),$(".send66").animate({left:"0.24rem",top:"2.186667rem"},100),$(".send520").animate({left:"0.35rem",top:"1.12rem"},100),$(".send888").animate({left:"1.1rem",top:"0.4rem"},100),$(".send1314").animate({left:"2.25rem",top:"0.33rem"},100),n())}function n(){clearInterval(t);var e=30;t=setInterval(function(){$(".lx-send p i").html(e),e--,0==e&&(clearInterval(t),$(".send66,.send520,.send888,.send1314").css("left","1.8rem"),$(".send66,.send520,.send888,.send1314").css("top","1.8rem"),$(".big-bg").hide(),$(".lx-send p i").html(30),$(".send").show())},100)}$(".w-gift").on(clickOrTouch,function(){$(".content-box").hide(),$(".btm-menu").hide(),$(".sns-share").hide(),$(".gift-slider").show(),$(".elem").on(clickOrTouch,function(){clicknum=0,$(".active").removeClass("active"),$(this).addClass("active"),$(".send").removeClass("disabled")})});var t=null;$(".send").on(clickOrTouch,function(){$(this).hasClass("disabled")||e(1,1)}),$(".lx-click").on(clickOrTouch,function(){n(),e(1,0)}),$(".send66,.send520,.send888,.send1314").on(clickOrTouch,function(){var i=parseInt($(this).text());e(i,0)})},lock:function(){var e=0;setInterval(function(){e+=1,60==e&&page_elem.lucky_money()},1e3)},trimTitle:function(){$.each($(".topic"),function(e,i){var n=$(i).text(),t="";$(i).html("");var o=n.substring(n.indexOf("#"),n.lastIndexOf("#"));o.indexOf("#")>-1&&(o.length>11?(o=o.substr(0,10),t=o+"...#",$(i).html(t),o+="#"):(o+="#",$(i).html(o)));var s=n.substr(n.lastIndexOf("#")+1,n.length);""!=s?(s.length>10&&(s=s.substr(0,10),s+="..."),$(i).next().html(s)):$(i).next().html("我正在一直播分享快乐")})},playBack:function(){$(".playback").on(clickOrTouch,function(){weibo||qq||weixin?($("body").animate({scrollTop:0}),$(".shadow").css({display:"block"})):window.location.href="xktv://jump?type=5&dataStr="+shareConfig.sObj.scid})},pause:function(){var e=!1;$("#video, .pause, .pause-wrap").on(clickOrTouch,function(i){var i=i||window.event;if(i.stopPropagation(),!e){var n=document.getElementById("video");n.paused?(n.play(),$(".videobg").remove(),n.style.background="#000",$(".pause").hide()):$(".btm-menu").is(":hidden")||(n.pause(),$(".pause").show())}$(".btm-menu").is(":hidden")&&($(".gift-slider").hide(),$(".content-box").show(),$(".btm-menu").show(),$(".wrap-menu").removeClass("switch"),$(".w-share,.w-gift").show(),$(".w-input .input").blur(),$(".wrap-menu > figure,.wrap-menu .send-msg").css("display","none")),e=!1}),$("#video").on("touchmove",function(){e=!0,console.log("moving")})},get_product_list:function(){$(".recharge").on(clickOrTouch,function(){if(weixin)$(".guide-pay").show();else{var e=location.hostname,i=e.substr(0,e.indexOf("."));i+=".","dev."!=i&&"test1."!=i&&(i=""),window.location.href="https://"+i+"pay.yizhibo.com/product/api/get_product_list_h5"}}),$(".guide-pay figure .close").on(clickOrTouch,function(e){var e=window.event||e;e.preventDefault(),$(".guide-pay").hide()})},lucky_money:function(){$(".player-lock").css("display","block"),$(".lucky-money").css("display","block"),$(".player-lock").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),$(".player-lock").hide(),$(".lucky-money").hide()}),$(".lucky-money .close").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),$(".player-lock").hide(),$(".lucky-money").hide()})},login:function(){$(".login .login-close,.login .cancel").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),$(".login").hide()})},urlToObj:function(e){for(var i=e.split(/[&=]/),n={},t=0;t<i.length;t+=2)n[i[t]]=i[t+1];return n},magicWin:function(){new Mlink({mlink:"https://a.yzbo.tv/AAah",button:document.querySelectorAll("div.btnOpenApp"),tparams:{u_id:shareConfig.sObj.unq_member_key},autoRedirect:!1,autoRedirectToDownloadUrl:!0,downloadWhenUniversalLinkFailed:!1})},magic_enter_room:function(){new Mlink({mlink:"https://a.yzbo.tv/AAAj?type=1&dataStr="+shareConfig.sObj.scid,button:document.querySelectorAll("div.enter_room"),tparams:{u_id:shareConfig.sObj.unq_member_key},autoRedirect:!1,autoRedirectToDownloadUrl:!0,downloadWhenUniversalLinkFailed:!1})},monitorPro:function(){$(window).scroll(function(){$(document).scrollTop()>$(window).height()/2?($(".footer").show(),$(".sns-share").hide()):$(".footer").hide()})},init:function(){1==shareConfig.sObj.status?$("#video-box").remove():(0!=$("#video").length?document.getElementById("video").controls=!1:0!=$("#em").length&&$("#em").css("width","10.0rem"),$("#video-box").css("width",$(window).width()),$("#video-box").css("height",$(window).height())),ios&&(qq||weixin)&&($(".videobg").remove(),$(".pause").hide(),$("#video").get(0).play(),document.addEventListener("WeixinJSBridgeReady",function(){$("#video")[0].play()},!1)),this.pause(),this.input(),this.share(),this.gift(),this.lock(),this.login(),this.trimTitle(),this.playBack(),this.get_product_list(),this.magicWin(),this.magic_enter_room(),this.monitorPro()}};