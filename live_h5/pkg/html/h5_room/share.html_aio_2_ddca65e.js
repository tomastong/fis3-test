function setPage(){var e=$(window);if(arguments.length)for(var i=arguments.length-1;i>=0;i--){var t=arguments[i].is("video"),n=e.height(),g=e.width();if(window.isImgShare){var h=e.width();arguments[i].height(h>414?414:h)}else if(t){arguments[i].width("102.2%");var r=Math.round(640*g/360);arguments[i].height(r>=n?r:n),arguments[i].css({marginTop:-(r-n),marginLeft:"-1.1%",marginRight:"-1.1%"})}else arguments[i].height(n)}}var $vod=$(".vod-box-pl"),$vl=$(".f-layout"),sheight=screen.height,swidth=screen.width,winHeight=$(window).height();$(function(){setPage($vod,$vl,$("video")),$(window).on("resize",function(){setPage($vod,$vl,$("video")),bIsAndroid&&winHeight-$(window).height()<10&&$(".input").blur()})});
var sUserAgent=navigator.userAgent.toLowerCase(),ios=/iphone|ipad|ipod/.test(sUserAgent),android=/android/.test(sUserAgent),weixin="micromessenger"==sUserAgent.match(/MicroMessenger/i),qq="QQ/"==navigator.userAgent.match(/QQ\//i),weibo="weibo"==sUserAgent.match(/WeiBo/i),clickOrTouch="ontouchend"in window?"touchend":"click",_hmt=_hmt||[];!function(){var e=document.createElement("script");e.src="//hm.baidu.com/hm.js?585c3afe1531d25104e434bf49f3aed5";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();
var page_elem={input:function(){$(".input").on("focus",function(e){var e=e||window.event;e.preventDefault(),$(".wrap-menu").css({position:"static"}),$(".wrap-menu").addClass("switch"),$(".w-share,.w-gift").hide(),$(".wrap-menu > figure,.wrap-menu .send-msg").css("display","inline-block"),android&&$(window).scrollTop(sheight-$(window).height())}),$(".input").on("blur",function(e){var e=e||window.event;$(".wrap-menu").css({position:"inherit"}),$(".wrap-menu").removeClass("switch"),$(".w-share,.w-gift").show(),$(".wrap-menu > figure,.wrap-menu .send-msg").hide()}),$(".send-msg").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),chat.submit()})},share:function(){$(".w-share").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),weixin?($(".sns-share").show(),$(".sns-ctn").removeClass("sns2")):($(".sns-share").show(),$(".sns-ctn .weixin").remove(),$(".sns-ctn .friend-circle").remove(),$(".sns-ctn").addClass("sns2"))}),$(".weixin.sns").on(clickOrTouch,function(){$("body").animate({scrollTop:0}),$("#rt-share").show()}),$(".friend-circle.sns").on(clickOrTouch,function(){$("body").animate({scrollTop:0}),$("#rt-share").show()}),$("#rt-share").on(clickOrTouch,function(){$("#rt-share").hide()}),$(".weibo.sns").on(clickOrTouch,function(i){var i=i||window.event;i.stopPropagation();var n=[];for(var t in e.weibo)n.push(t+"="+encodeURIComponent(e.weibo[t]||""));window.location="http://service.weibo.com/share/share.php?"+n.join("&")}),$(".qq.sns").on(clickOrTouch,function(i){var i=i||window.event;i.stopPropagation();var n=[];for(var t in e.qq)n.push(t+"="+encodeURIComponent(e.qq[t]||""));window.location="http://connect.qq.com/widget/shareqq/index.html?"+n.join("&")}),$(".sns-share h4").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),e.stopPropagation(),$(".sns-share").hide()});var e={"default":{title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",desc:"直播就要一直播！",pic:shareConfig.wx.imgUrl,link:window.location.href},weixin:{title:shareConfig.wx.title,desc:shareConfig.wx.desc,pic:shareConfig.wx.imgUrl,link:shareConfig.wx.link},weibo:{appkey:"592819922",title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",site:"一直播",content:"utf-8",pic:shareConfig.wx.imgUrl,url:window.location.href},qq:{title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",desc:"直播就要一直播！",site:"一直播",summary:"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",pic:shareConfig.wx.imgUrl,url:window.location.href},qqzone:{title:document.title||"直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>",desc:"直播就要一直播！",site:"一直播",pic:shareConfig.wx.imgUrl,url:window.location.href},funcs:{weibo:null,weixin:null,qq:null,qqzone:null}};window.wx.ready(function(){window.wx.onMenuShareTimeline({title:e.weixin.title,desc:e.weixin.desc,imgUrl:e.weixin.pic,link:e.weixin.link}),window.wx.onMenuShareAppMessage({title:e.weixin.title,desc:e.weixin.desc,link:e.weixin.link,imgUrl:e.weixin.pic}),window.wx.onMenuShareQQ({title:e.qq.title,desc:e.qq.desc,link:e.qq.url,imgUrl:e.qq.pic}),window.wx.onMenuShareWeibo({title:e.weibo.title,desc:e.weibo.desc,link:e.weibo.url,imgUrl:e.weibo.pic}),window.wx.onMenuShareQZone({title:e.qqzone.title,desc:e.qqzone.desc,link:e.qqzone.url,imgUrl:e.qqzone.pic})})},gift:function(){function e(e,n){$.ajax({url:shareConfig.url.buy_gift_h5,type:"post",data:{scid:shareConfig.sObj.scid,giftid:$(".active").data("giftid"),amount:e},success:function(t){if(1==t.result){var o=$(".active.elem").data("giftid"),s={giftid:o,name:h5_req.giftobj["gift"+o].name,cover:h5_req.giftobj["gift"+o].cover,isbursts:h5_req.giftobj["gift"+o].isbursts,nickname:user.nickname,avatar:user.avatar,memberid:user.memberid,type:h5_req.giftobj["gift"+o].type,level:user.level,childtype:h5_req.giftobj["gift"+o].childtype,ytypevt:user.ytypevt,amount:e};chat.view.gift(JSON.stringify(s))}1==n?1==t.result?($(".recharge").html("<span>充值&nbsp;&nbsp;</span>"+t.data.goldcoin+"金币&nbsp;&nbsp;&gt;"),i()):600==t.result?($(".login").show(),$(".login .ok").on(clickOrTouch,function(){window.location.href=t.redirect_url})):100==t.result?jConfirm(t.msg,"",function(e){if(e)if(weixin)$(".guide-pay").show();else{var i=location.hostname,n=i.substr(0,i.indexOf("."));n+=".","dev."!=n&&"test1."!=n&&(n=""),window.location.href="https://"+n+"pay.yizhibo.com/product/api/get_product_list_h5"}}):jAlert(t.msg,""):0==n&&1==t.result&&$(".recharge").html("<span>充值&nbsp;&nbsp;</span>"+t.data.goldcoin+"金币&nbsp;&nbsp;&gt;")},error:function(){console.log("gift error.")}})}function i(){$(".active div").hasClass("lian")&&($(".send").hide(),$(".big-bg").show(),$(".send66").animate({left:"0.24rem",top:"2.186667rem"},100),$(".send520").animate({left:"0.35rem",top:"1.12rem"},100),$(".send888").animate({left:"1.1rem",top:"0.4rem"},100),$(".send1314").animate({left:"2.25rem",top:"0.33rem"},100),n())}function n(){clearInterval(t);var e=30;t=setInterval(function(){$(".lx-send p i").html(e),e--,0==e&&(clearInterval(t),$(".send66,.send520,.send888,.send1314").css("left","1.8rem"),$(".send66,.send520,.send888,.send1314").css("top","1.8rem"),$(".big-bg").hide(),$(".lx-send p i").html(30),$(".send").show())},100)}$(".w-gift").on(clickOrTouch,function(){$(".content-box").hide(),$(".btm-menu").hide(),$(".sns-share").hide(),$(".gift-slider").show(),$(".elem").on(clickOrTouch,function(){clicknum=0,$(".active").removeClass("active"),$(this).addClass("active"),$(".send").removeClass("disabled")})});var t=null;$(".send").on(clickOrTouch,function(){$(this).hasClass("disabled")||e(1,1)}),$(".lx-click").on(clickOrTouch,function(){n(),e(1,0)}),$(".send66,.send520,.send888,.send1314").on(clickOrTouch,function(){var i=parseInt($(this).text());e(i,0)})},lock:function(){var e=0;setInterval(function(){e+=1,60==e&&page_elem.lucky_money()},1e3)},trimTitle:function(){$.each($(".topic"),function(e,i){var n=$(i).text(),t="";$(i).html("");var o=n.substring(n.indexOf("#"),n.lastIndexOf("#"));o.indexOf("#")>-1&&(o.length>11?(o=o.substr(0,10),t=o+"...#",$(i).html(t),o+="#"):(o+="#",$(i).html(o)));var s=n.substr(n.lastIndexOf("#")+1,n.length);""!=s?(s.length>10&&(s=s.substr(0,10),s+="..."),$(i).next().html(s)):$(i).next().html("我正在一直播分享快乐")})},playBack:function(){$(".playback").on(clickOrTouch,function(){weibo||qq||weixin?($("body").animate({scrollTop:0}),$(".shadow").css({display:"block"})):window.location.href="xktv://jump?type=5&dataStr="+shareConfig.sObj.scid})},pause:function(){var e=!1;$("#video, .pause, .pause-wrap").on(clickOrTouch,function(i){var i=i||window.event;if(i.stopPropagation(),!e){var n=document.getElementById("video");n.paused?(n.play(),$(".videobg").remove(),n.style.background="#000",$(".pause").hide()):$(".btm-menu").is(":hidden")||(n.pause(),$(".pause").show())}$(".btm-menu").is(":hidden")&&($(".gift-slider").hide(),$(".content-box").show(),$(".btm-menu").show(),$(".wrap-menu").removeClass("switch"),$(".w-share,.w-gift").show(),$(".w-input .input").blur(),$(".wrap-menu > figure,.wrap-menu .send-msg").css("display","none")),e=!1}),$("#video").on("touchmove",function(){e=!0,console.log("moving")})},get_product_list:function(){$(".recharge").on(clickOrTouch,function(){if(weixin)$(".guide-pay").show();else{var e=location.hostname,i=e.substr(0,e.indexOf("."));i+=".","dev."!=i&&"test1."!=i&&(i=""),window.location.href="https://"+i+"pay.yizhibo.com/product/api/get_product_list_h5"}}),$(".guide-pay figure .close").on(clickOrTouch,function(e){var e=window.event||e;e.preventDefault(),$(".guide-pay").hide()})},lucky_money:function(){$(".player-lock").css("display","block"),$(".lucky-money").css("display","block"),$(".player-lock").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),$(".player-lock").hide(),$(".lucky-money").hide()}),$(".lucky-money .close").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),$(".player-lock").hide(),$(".lucky-money").hide()})},login:function(){$(".login .login-close,.login .cancel").on(clickOrTouch,function(e){var e=e||window.event;e.preventDefault(),$(".login").hide()})},urlToObj:function(e){for(var i=e.split(/[&=]/),n={},t=0;t<i.length;t+=2)n[i[t]]=i[t+1];return n},magicWin:function(){new Mlink({mlink:"https://a.yzbo.tv/AAah",button:document.querySelectorAll("div.btnOpenApp"),tparams:{u_id:shareConfig.sObj.unq_member_key},autoRedirect:!1,autoRedirectToDownloadUrl:!0,downloadWhenUniversalLinkFailed:!1})},magic_enter_room:function(){new Mlink({mlink:"https://a.yzbo.tv/AAAj?type=1&dataStr="+shareConfig.sObj.scid,button:document.querySelectorAll("div.enter_room"),tparams:{u_id:shareConfig.sObj.unq_member_key},autoRedirect:!1,autoRedirectToDownloadUrl:!0,downloadWhenUniversalLinkFailed:!1})},monitorPro:function(){$(window).scroll(function(){$(document).scrollTop()>$(window).height()/2?($(".footer").show(),$(".sns-share").hide()):$(".footer").hide()})},init:function(){1==shareConfig.sObj.status?$("#video-box").remove():(0!=$("#video").length?document.getElementById("video").controls=!1:0!=$("#em").length&&$("#em").css("width","10.0rem"),$("#video-box").css("width",$(window).width()),$("#video-box").css("height",$(window).height())),ios&&(qq||weixin)&&($(".videobg").remove(),$(".pause").hide(),$("#video").get(0).play(),document.addEventListener("WeixinJSBridgeReady",function(){$("#video")[0].play()},!1)),this.pause(),this.input(),this.share(),this.gift(),this.lock(),this.login(),this.trimTitle(),this.playBack(),this.get_product_list(),this.magicWin(),this.magic_enter_room(),this.monitorPro()}};
!function(){function e(e,n){return(/string|function/.test(typeof n)?i:c)(e,n)}function n(e,r){return"string"!=typeof e&&(r=typeof e,"number"===r?e+="":e="function"===r?n(e.call(e)):""),e}function r(e){return p[e]}function t(e){return n(e).replace(/&(?![\w#]+;)|[<>"']/g,r)}function s(e,n){if(f(e))for(var r=0,t=e.length;t>r;r++)n.call(e,e[r],r,e);else for(r in e)n.call(e,e[r],r)}function a(e,n){var r=/(\/)[^/]+\1\.\.\1/,t=("./"+e).replace(/[^/]+$/,""),s=t+n;for(s=s.replace(/\/\.\//g,"/");s.match(r);)s=s.replace(r,"/");return s}function c(n,r){var t=e.get(n)||l({filename:n,name:"Render Error",message:"Template not found"});return r?t(r):t}function i(e,n){if("string"==typeof n){var r=n;n=function(){return new u(r)}}var t=o[e]=function(r){try{return new n(r,e)+""}catch(t){return l(t)()}};return t.prototype=n.prototype=v,t.toString=function(){return n+""},t}function l(e){var n="{Template Error}",r=e.stack||"";if(r)r=r.split("\n").slice(0,2).join("\n");else for(var t in e)r+="<"+t+">\n"+e[t]+"\n\n";return function(){return"object"==typeof console&&console.error(n+"\n\n"+r),n}}var o=e.cache={},u=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},f=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},v=e.utils={$helpers:{},$include:function(e,n,r){return e=a(r,e),c(e,n)},$string:n,$escape:t,$each:s},g=e.helpers=v.$helpers;e.get=function(e){return o[e.replace(/^\.\//,"")]},e.helper=function(e,n){g[e]=n},"function"==typeof define?define(function(){return e}):"undefined"!=typeof exports?module.exports=e:this.template=e,e("comment",function(e){"use strict";var n=this,r=(n.$helpers,n.$escape),t=e.avatar,s=e.level,a=e.nickname,c=e.content,i="";return i+='<li class="room-chat-item"> <div class="item-ctn clearfix"> <figure class="avatar" style="background:url(',i+=r(t),i+=') center center;background-size: cover;"></figure> <dl> <dt class="room-chat-user-name"> <span class="rank r-',i+=r(s),i+='"></span>',i+=r(a),i+='</dt> <dd class="room-chat-content">',i+=r(c),i+="</dd> </dl> </div> </li>",new u(i)}),e("giftx",function(e){"use strict";var n=this,r=(n.$helpers,n.$escape),t=e.avatar,s=e.level,a=e.nickname,c=e.name,i=e.cover,l="";return l+='<div class="wrap-cartoon"> <figure class="cartoon-avatar"> <img src="',l+=r(t),l+='"> </figure> <p class="nickname"><span class="rank r-',l+=r(s),l+='"></span>',l+=r(a.length>5?a.substr(0,4)+"..":a),l+='</p> <p class="desc">送出了',l+=r(c),l+='</p> <figure class="gift"> <img src="',l+=r(i),l+='"> </figure> <h4 class="count">×&nbsp;1</h4> </div>',new u(l)}),e("login",function(e){"use strict";var n=this,r=(n.$helpers,n.$escape),t=e.level,s=e.nickname,a="";return a+='<li class="room-chat-item"> <div class="item-ctn enter bg-',a+=r(t>40?"inf":t),a+='"> <div class="wrap-enter"> <span class="rank r-',a+=r(t),a+='"></span> <span class="info">',a+=r(s.length>6?s.substr(0,6)+"...":s),a+="&nbsp;进入直播间</span> </div> </div> </li>",new u(a)}),e("message",function(e){"use strict";var n=this,r=(n.$helpers,n.$escape),t=e.level,s=e.message,a="";return a+='<li class="room-chat-item"> <div class="gz"> <div class="wrap-enter"> <span class="rank r-',a+=r(t),a+='"></span> <span class="info">',a+=r(s.length>10?s.substr(0,5)+"...":s.substr(0,s.length-5)),a+="关注了主播</span> </div> </div> </li>",new u(a)}),e("messagex",function(e){"use strict";var n=this,r=(n.$helpers,n.$escape),t=e.level,s=e.message,a=e.nickname,c=e.suffix,i="";return i+='<li class="room-chat-item"> <div class="gift"> <div class="wrap-enter"> <span class="rank r-',i+=r(t),i+='"></span> <span class="info">',i+=r(s.length>12?a.substr(0,5)+"..."+s.replace(a,""):s),i+='<img src="',i+=r(c),i+='"></span> </div> </div> </li> ',new u(i)})}();
var render=function(){function e(e){if(e)if(1==e.isbursts)if(1==e.amount){var a=""+e.memberid+"_"+e.giftid,n=$(".left-side-cartoon > #"+a);if(n.length>0&&!n.is("hide"))n.attr("data-amount",parseInt(n.attr("data-amount"))+1);else{var r=$(".left-side-cartoon > .hide");if(r.length>0)t(e);else{for(var s=0;s<i.length;s++){var o=i[s];if(e.memberid==o.memberid&&e.giftid==o.giftid)return void(o.amount=(parseInt(e.amount)+parseInt(o.amount)).toString())}i.push(e)}}}else{var r=$(".left-side-cartoon > .hide");e.memberid="",r.length>0?t(e):i.push(e)}else{var r=$(".left-side-cartoon > .hide");r.length>0?t(e):i.push(e)}}function t(e){function a(e){var s=(new Date).getTime();setTimeout(function(){if((new Date).getTime()-s>6e3)return r.attr("id","").addClass("hide"),r.animate({"margin-left":"-8rem"},300),void(i.length>0&&t(i.shift()));var o=parseInt(r.attr("data-amount")),l=parseInt(r.attr("data-current"));if(o>l){var m=(l+(o-l>=10&&1==e.isbursts&&""==e.memberid?10:1)).toString();r.attr("data-current",m),$(".count",r).html("×&nbsp;"+m),$(".count",r).addClass("scale"),setTimeout(function(){$(".count",r).removeClass("scale"),a(e)},250)}else setTimeout(arguments.callee,n)},n)}var r=$(".left-side-cartoon > .hide").eq(0);r.attr({"data-amount":e.amount,id:""+e.memberid+"_"+e.giftid}),r.removeClass("hide"),r.attr("data-current",1==e.isbursts&&""==e.memberid?10:1),r.html(template("giftx",e)),$(".count",r).html("×&nbsp;"+r.attr("data-current")),r.animate({"margin-left":"0"},300),$(".count",r).addClass("scale"),setTimeout(function(){$(".count",r).removeClass("scale"),a(e)},250)}function a(){r.scrollTop(2e4)}var i=[],n=300,r=$("#message"),s=$("#list-info");this.login=function(e){if(e=$.parseJSON(e)[0],e.nickname){e.level=Math.max(1,e.level),s.append(template("login",e));for(var t=0;t<$("li",s).length-50;t++)$("li",s).eq(t).remove();a()}},this.gift=function(t){var a=$.parseJSON(t);a.level=Math.max(1,a.level),e(a),a.goldcoins&&($(".gold-coin .goldcoins").html(a.goldcoins),$(".gold-coin").is(":hidden")?$(".gold-coin").show():"")},this.comment=function(e){var t=$.parseJSON(e);t.level=Math.max(1,t.level),s.append(template("comment",t));for(var i=0;i<$("li",s).length-50;i++)$("li",s).eq(i).remove();a()},this.message=function(e){var t=$.parseJSON(e);4==t.type?s.append(template("message",t)):5==t.type&&s.append(template("messagex",t));for(var i=0;i<$("li",s).length-50;i++)$("li",s).eq(i).remove();a()},this.praise=function(e){$.parseJSON(e)},this.live_info=function(e){$.parseJSON(e)}};
var chat={socket:null,view:new render,submit:function(){function e(e){if($(".input").blur(),600!=e.result){var i={avatar:user.avatar,level:user.level,memberid:user.memberid,content:n,nickname:user.nickname};o.view.comment(JSON.stringify(i)),$("#content").val(""),$(".wrap-menu").removeClass("switch"),$(".wrap-menu > figure,.wrap-menu .send-msg").hide(),$(".w-share,.w-gift").css("display","inline-block")}else $(".login").show(),$(".login .ok").on(clickOrTouch,function(){window.location.href=e.redirect_url})}var n=$("#content").val(),i="",o=this;""!=n&&$.ajax({url:shareConfig.url.send_live_comment,type:"post",async:"false",data:{scid:shareConfig.sObj.scid,createip:i,comment:n},dataType:"json",success:function(n){e(n)},error:function(){$("#content").val("")}})},init:function(){var e=location.hostname,n="",i=e.substr(0,e.indexOf("."));n="dev"==i?"ws://10.10.20.54:80":"ws://ws.yizhibo.com",this.socket=io.connect(n,{reconnectionAttemptes:10,reconnectionDelay:3e3,transports:["websocket"],path:"/yizhibo","force new connection":!0});var o=this;this.socket.on("connect",function(){o.socket.emit("joinRoom",shareConfig.sObj.scid)}),o.socket.on("comment",function(e){var n=$.parseJSON(e);n.memberid!=user.memberid&&o.view.comment(e)}),o.socket.on("gift",function(e){var n=$.parseJSON(e);n.memberid!=user.memberid&&o.view.gift(e)}),o.socket.on("live_info",function(e){o.view.live_info(e)}),o.socket.on("praise",function(e){o.view.praise(e)}),o.socket.on("login",function(e){o.view.login(e)}),o.socket.on("message",function(e){o.view.message(e)}),o.socket.on("disconnect",function(){})}};
$(function(){h5_req.init(),page_elem.init(),chat.init()});var h5_req={giftobj:{},fit_screen:function(){1==shareConfig.sObj.status?$("#video-box").remove():(0!=$("#video").length?document.getElementById("video").controls=!1:0!=$("#em").length&&$("#em").css("width","10.0rem"),$("#video-box").css("width",$(window).width()),$("#video-box").css("height",$(window).height()))},req_data:function(){var e=this;$(".pause").show(),$.ajax({url:shareConfig.url.get_gift_list_h5,type:"get",success:function(t){i=0,t.data.list.map(function(t){e.giftobj["gift"+t.giftid]=t,i%8==0&&0!=i&&($("<div class='mui-slider-item'></div>").appendTo($(".mui-slider-group")),$("<div class='mui-indicator'></div>").appendTo($(".mui-slider-indicator")));var s=$("<div class='elem' data-giftid='"+t.giftid+"'></div>").appendTo($($(".mui-slider-item")[Math.floor(i/8)])),n=$("<figure></figure>").appendTo(s),o=($("<div class="+(t.isbursts?"lian":"")+"></div>").appendTo(n),$("<img src="+t.cover+">").appendTo(n));o.css("width",o.width()/75+"rem");$("<p class='gift-name'>"+t.name+"</p>").appendTo(n),$("<p>"+t.goldcoin+"个金币</p>").appendTo(n);i++}),mui(".mui-slider").slider()},error:function(){console.log("gift list error.")}})},loading_user:function(){$.ajax({url:shareConfig.url.get_my_wallet,type:"get",success:function(i){1==i.result&&(user=i.data,$(".recharge").html("<span>充值&nbsp;&nbsp;</span>"+user.goldcoin+"金币&nbsp;&nbsp;&gt;"))},error:function(){console.log("loading user error.")}})},init:function(){this.fit_screen(),this.req_data(),this.loading_user()}};
