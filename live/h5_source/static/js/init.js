;!(function(win, ns, $){
    var exports = window[ns] = window[ns] || {};

    win[ns] = exports = {
        gifttemp : {},
        giftcache:function(){
            var that = this, d = {};
            var domain = location.host, prefix = domain.substr(0, domain.indexOf('.')+1);
            $.inArray(prefix,['test.', 'dev.'])== -1 ? prefix='' : '';
            $.ajax({  
                url:'//'+prefix+'pay.yizhibo.com'+shareConfig.url.get_gift_list_background+'?scid='+shareConfig.room.scid+'&memberid='+user.memberid,  
                type: "get",  
                async: false,  
                dataType: "jsonp",  
                jsonp: "callback",
                jsonpCallback: "return_callback"

            }).done(function(data) {
                // var i = 0;
                data.data.nodisplay.map(function(item, i) {
                    d['gift'+item.giftid] = item; });
                data.data.list.map(function(item, i) {
                    d['gift'+item.giftid] = item; 

                    if (i % 8 == 0 && i != 0) {
                        $("<div class='mui-slider-item'></div>").appendTo($(".mui-slider-group"));
                        $("<div class='mui-indicator'></div>").appendTo($(".mui-slider-indicator"));
                    }
                    var oelem = $("<div class='elem' data-giftid='" + item.giftid + "'></div>").appendTo($(".mui-slider-item").eq(Math.floor(i / 8)));
                    var ofigure = $("<figure></figure>").appendTo(oelem);
                    var odiv = $("<div class=" + (item.isbursts ? 'lian' : '') + "></div>").appendTo(ofigure);
                    var oimg = $("<img src=" + item.cover + ">").appendTo(ofigure);
                    oimg.css("width", oimg.width()/75+"rem");
                    var op = $("<p class='gift-name'>" + item.name + "</p>").appendTo(ofigure);
                    var op2 = $("<p>" + item.goldcoin + "个金币</p>").appendTo(ofigure);

                    // i++;
                })

                // mui(".mui-slider").slider();
                mui('#slider');
            })

            exports.gifttemp =  d;
        },
        getuser : (function(){
            $.ajax({
                    url: shareConfig.url.get_my_wallet,
                    type: "get"
            }).done(function(data) {
                if (data.result != 1) return;
                user = data.data;
                $('#video-box .useravatar img').attr('src', user.avatar);
                $('#video-box .nickname').text( user.nickname);
                $(".recharge").html("<span>充值&nbsp;&nbsp;</span>" + user.goldcoin + "金币&nbsp;&nbsp;&gt;");
            }).fail(function() {
                console.log("loading user error.");
            })
        })(),
        ajaxinit:(function(){
            $(document).ajaxError(function(event,xhr,options,exc){          
                if(xhr.status==0)
                    jAlert("无网络,请打开网络连接再试!",''); 
                else
                    jAlert("服务器返回错误! 错误代码:"+xhr.status,'');
            }).ajaxSuccess(function(a,b,c,e){
               // 登录成功
            }).ajaxComplete(function(){
                // 处理加载
                //     loading.destroy();
            }).ajaxStart(function(){
                // 处理加载
            });
        })()
    }
    $(function(){exports.giftcache();})
})(window, 'initData', jQuery)