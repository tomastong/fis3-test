!function(e,n,i){var o=window[n]=window[n]||{};e[n]=o={socket:null,view:new render,submit:function(){function e(e){if(600!=e.result){var o={avatar:user.avatar,level:user.level,memberid:user.memberid,content:n,nickname:user.nickname};t.view.comment(JSON.stringify(o)),i(".comment.modal").addClass("hide"),i("#video-box .cinput input").val("").blur()}else i(".login").show(),i(".login .ok").on(clickOrTouch,function(){window.location.href=e.redirect_url})}var n=i(".cinput input").val(),o="",t=this;""!=n&&i.ajax({url:shareConfig.url.send_live_comment,type:"post",async:"false",data:{scid:shareConfig.sObj.scid,is_carousel:!!shareConfig.sObj.carouselid,createip:o,comment:n},dataType:"json",success:function(n){e(n)},error:function(){i(".cinput input").val("")}})},init:function(){var e=location.hostname,n="",o=e.substr(0,e.indexOf("."));n="dev"==o?"ws://10.10.20.54:80":"ws://ws.yizhibo.com",this.socket=io.connect(n,{reconnectionAttemptes:10,reconnectionDelay:3e3,transports:["websocket"],path:"/yizhibo","force new connection":!0});var t=this;this.socket.on("connect",function(){t.socket.emit("joinRoom",shareConfig.sObj.carouselid||shareConfig.sObj.scid)}),t.socket.on("comment",function(e){var n=i.parseJSON(e);n.memberid!=user.memberid&&t.view.comment(e)}),t.socket.on("gift",function(e){var n=i.parseJSON(e);n.memberid!=user.memberid&&t.view.gift(e)}),t.socket.on("live_info",function(e){t.view.live_info(e)}),t.socket.on("praise",function(e){t.view.praise(e)}),t.socket.on("login",function(e){t.view.login(e)}),t.socket.on("message",function(e){t.view.message(e)}),t.socket.on("queuing_show",function(e){t.view.queuing_show(e)}),t.socket.on("disconnect",function(){})}},i(function(){o.init()})}(window,"chat",jQuery);