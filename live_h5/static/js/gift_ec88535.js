var render=function(){function e(e){if(e)if(1==e.isbursts)if(1==e.amount){var i=""+e.memberid+"_"+e.giftid,r=$(".left-side-cartoon > #"+i);if(r.length>0&&!r.is("hide"))r.attr("data-amount",parseInt(r.attr("data-amount"))+1);else{var s=$(".left-side-cartoon > .hide");if(s.length>0)t(e,1);else{for(var o=0;o<a.length;o++){var d=a[o];if(e.memberid==d.memberid&&e.giftid==d.giftid)return void(d.amount=(parseInt(e.amount)+parseInt(d.amount)).toString())}a.push(e)}}}else{var s=$(".left-side-cartoon > .hide");e.memberid="",s.length>0?t(e,1):a.push(e)}else if("1"==e.childtype)$("#J_luxury").is(".hide")?t(e,2):n.push(e);else if("0"==e.childtype){var s=$(".left-side-cartoon > .hide");s.length>0?t(e,1):a.push(e)}}function t(e,i){function s(){$(".gifter").fadeOut(100),$("#J_luxury").fadeOut(100,function(){if($(this).addClass("hide"),n.length>0){var e=n.shift();t(e,2)}})}function o(e){var i=(new Date).getTime();setTimeout(function(){if((new Date).getTime()-i>6e3)return d.attr("id","").addClass("hide"),d.animate({"margin-left":"-8rem"},300),void(a.length>0&&t(a.shift(),1));var n=parseInt(d.attr("data-amount")),s=parseInt(d.attr("data-current"));if(n>s){var l=(s+(n-s>=10&&1==e.isbursts&&""==e.memberid?10:1)).toString();d.attr("data-current",l),$(".count",d).html("×&nbsp;"+l),$(".count",d).addClass("scale"),setTimeout(function(){$(".count",d).removeClass("scale"),o(e)},400)}else setTimeout(arguments.callee,r)},r)}var d;switch(i){case 2:var l=initData.gifttemp["gift"+e.giftid];if(!l)return void console.log("没有找到礼物");if($("#J_luxury").removeClass("hide").show().html(""),canvasgift.support){var m=$("#J_luxury canvas")[0];return m||$("#J_luxury").append('<canvas style = "width:'+$(window).width()+"px; height:"+parseInt($(window).width()/360*640)+'px"></canvas>'),$(".gifter figure img").attr("src",e.avatar),$(".gifter .rank").addClass("r-"+e.level),$(".gifter .info .nickname").text(e.nickname),$(".gifter").fadeIn(100),m=$("#J_luxury canvas")[0],$.extend(e,initData.gifttemp["gift"+e.giftid],{id:e.giftid}),void canvasgift.animate(m,e,s)}return;case 1:d=$(".left-side-cartoon > .hide").eq(0)}d.attr({"data-amount":e.amount,id:""+e.memberid+"_"+e.giftid}),d.removeClass("hide"),d.attr("data-current",1==e.isbursts&&""==e.memberid?10:1),d.html(template("giftx",e)),$(".count",d).html("×&nbsp;"+d.attr("data-current")),d.animate({"margin-left":"0"},300),$(".count",d).addClass("scale"),setTimeout(function(){$(".count",d).removeClass("scale"),o(e)},250)}function i(){o.scrollTop(2e4)}var a=[],n=[],r=300,s={scid:shareConfig.sObj.scid,memberid:shareConfig.sObj.memberid},o=$("#message"),d=$("#list-info");this.login=function(e){var t=$.parseJSON(e)[0],a="";if(t&&t.nickname){t.level=Math.max(1,t.level),d.append(template("login",t));for(var n=0;n<$("li",d).length-50;n++)$("li",d).eq(n).remove();a=t.online>9999?(t.online/1e4).toFixed(2)+"万":t.online,$(".user-info .item dd").text(a+"人"),i()}},this.gift=function(t){var i=$.parseJSON(t);i&&(i.level=Math.max(1,i.level),e(i),i.goldcoins&&($(".gold-coin .goldcoins").html(i.goldcoins),$(".gold-coin").is(":hidden")?$(".gold-coin").show():""))},this.comment=function(e){var t=$.parseJSON(e);if(t){t.level=Math.max(1,t.level),d.append(template("comment",t));for(var a=0;a<$("li",d).length-50;a++)$("li",d).eq(a).remove();i()}},this.message=function(e){var t=$.parseJSON(e);if(t){4==t.type?d.append(template("message",t)):5==t.type&&d.append(template("messagex",t));for(var a=0;a<$("li",d).length-50;a++)$("li",d).eq(a).remove();i()}},this.praise=function(e){var t=$.parseJSON(e)},this.live_info=function(e){var t=$.parseJSON(e);!t||1!=t.status&&2!=t.status||$(".liveend").removeClass("hide")},this.queuing_show=function(e){function t(){s.scid=i.next_scid,s.memberid=i.next_member_id,s.nickname=i.nickname,s.avatar=i.avatar,s.queuing_room_scid=i.queuing_room_scid,shareConfig.sObj.scid=s.scid,shareConfig.sObj.memberid=s.memberid,$(".user-info .avatar img, .user_avatar img").attr("src",s.avatar),$(".user-info .item dt, .user_desc dt").text(s.nickname)}var i=$.parseJSON(e);return i&&3==i.type&&!i.next_scid?void $(".lunmaigd").removeClass("hide"):void(i&&3==i.type&&s.scid==i.next_scid||($.getJSON("http://test.m.yizhibo.com/www/mobile/get_play_live?scid=xhM5agNgmtNC_0kZ",function(e){$(".lunmaigd").removeClass("hide"),s.playurl=e.linkurl,$("#video-box video").attr("src",s.playurl)}),$("#video-box video")[0].addEventListener("loadstart canplay canplaythrough",function(){$("#video-box video")[0].play(),t(i),$(".lunmaigd").addClass("hide")})))}};