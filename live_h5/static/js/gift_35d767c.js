var render=function(){function e(e){if(e)if(1==e.isbursts)if(1==e.amount){var a=""+e.memberid+"_"+e.giftid,n=$(".left-side-cartoon > #"+a);if(n.length>0&&!n.is("hide"))n.attr("data-amount",parseInt(n.attr("data-amount"))+1);else{var r=$(".left-side-cartoon > .hide");if(r.length>0)t(e,1);else{for(var s=0;s<i.length;s++){var l=i[s];if(e.memberid==l.memberid&&e.giftid==l.giftid)return void(l.amount=(parseInt(e.amount)+parseInt(l.amount)).toString())}i.push(e)}}}else{var r=$(".left-side-cartoon > .hide");e.memberid="",r.length>0?t(e,1):i.push(e)}else if("1"==e.childtype);else if("0"==e.childtype){var r=$(".left-side-cartoon > .hide");r.length>0?t(e,1):i.push(e)}}function t(e,a){function s(){$(".gifter").fadeOut(100),$("#J_luxury").fadeOut(100,function(){if($(this).addClass("hide"),n.length>0){var e=n.shift();t(e,2)}})}function l(e){var a=(new Date).getTime();setTimeout(function(){if((new Date).getTime()-a>6e3)return o.attr("id","").addClass("hide"),o.animate({"margin-left":"-8rem"},300),void(i.length>0&&t(i.shift(),1));var n=parseInt(o.attr("data-amount")),s=parseInt(o.attr("data-current"));if(n>s){var d=(s+(n-s>=10&&1==e.isbursts&&""==e.memberid?10:1)).toString();o.attr("data-current",d),$(".count",o).html("×&nbsp;"+d),$(".count",o).addClass("scale"),setTimeout(function(){$(".count",o).removeClass("scale"),l(e)},400)}else setTimeout(arguments.callee,r)},r)}var o;switch(a){case 2:var d=initData.gifttemp["gift"+e.giftid];if(!d)return void console.log("没有找到礼物");if($("#J_luxury").removeClass("hide").html(""),canvasgift.support){var f=$("#J_luxury canvas")[0];return f||$("#J_luxury").append('<canvas style = "width:'+parseInt($(window).height()/640*360)+"px; height:"+$(window).height()+'px"></canvas>'),$(".gifter figure img").attr("src",e.avatar),$(".gifter figure .rank").addClass("r-"+e.level),$(".gifter .info .nickname").text(e.nickname),$(".gifter").fadeIn(100),f=$("#J_luxury canvas")[0],$.extend(e,initData.gifttemp["gift"+e.giftid],{id:e.giftid}),void canvasgift.animate(f,e,s)}return;case 1:o=$(".left-side-cartoon > .hide").eq(0)}o.attr({"data-amount":e.amount,id:""+e.memberid+"_"+e.giftid}),o.removeClass("hide"),o.attr("data-current",1==e.isbursts&&""==e.memberid?10:1),o.html(template("giftx",e)),$(".count",o).html("×&nbsp;"+o.attr("data-current")),o.animate({"margin-left":"0"},300),$(".count",o).addClass("scale"),setTimeout(function(){$(".count",o).removeClass("scale"),l(e)},250)}function a(){s.scrollTop(2e4)}var i=[],n=[],r=300,s=$("#message"),l=$("#list-info");this.login=function(e){var t=$.parseJSON(e)[0];if(t&&t.nickname){t.level=Math.max(1,t.level),l.append(template("login",t));for(var i=0;i<$("li",l).length-50;i++)$("li",l).eq(i).remove();a()}},this.gift=function(t){var a=$.parseJSON(t);a&&(a.level=Math.max(1,a.level),e(a),a.goldcoins&&($(".gold-coin .goldcoins").html(a.goldcoins),$(".gold-coin").is(":hidden")?$(".gold-coin").show():""))},this.comment=function(e){var t=$.parseJSON(e);if(t){t.level=Math.max(1,t.level),l.append(template("comment",t));for(var i=0;i<$("li",l).length-50;i++)$("li",l).eq(i).remove();a()}},this.message=function(e){var t=$.parseJSON(e);if(t){4==t.type?l.append(template("message",t)):5==t.type&&l.append(template("messagex",t));for(var i=0;i<$("li",l).length-50;i++)$("li",l).eq(i).remove();a()}},this.praise=function(e){var t=$.parseJSON(e)},this.live_info=function(e){var t=$.parseJSON(e)}};