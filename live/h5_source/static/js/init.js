$(function() {
    h5_req.init();
    page_elem.init();
    chat.init(); 
})


var h5_req = {
    giftobj : {},
    fit_screen : function(){
        if (shareConfig.sObj.status == 1) {
            $('#video-box').remove();
        } else {
            if ($("#video").length != 0) {
                // 隐藏控制菜单
                document.getElementById("video").controls = false;
            } else if ($("#em").length != 0) {
                $('#em').css("width", "10.0rem");
            }
            $('#video-box').css("width", $(window).width());
            $('#video-box').css("height", $(window).height());
        }
    },
    req_data : function(){
        var that = this;
        $(".pause").show();
        $.ajax({
            url: shareConfig.url.get_gift_list_h5,
            type: "get",
            success: function(data) {
                i = 0;
                // template("giftlist",data.data);
                data.data.list.map(function(item) {
                    that.giftobj['gift'+item.giftid] = item; 
                    if (i % 8 == 0 && i != 0) {
                        $("<div class='mui-slider-item'></div>").appendTo($(".mui-slider-group"));
                        $("<div class='mui-indicator'></div>").appendTo($(".mui-slider-indicator"));
                    }
                    var oelem = $("<div class='elem' data-giftid='" + item.giftid + "'></div>").appendTo($($(".mui-slider-item")[Math.floor(i / 8)]));
                    var ofigure = $("<figure></figure>").appendTo(oelem);
                    var odiv = $("<div class=" + (item.isbursts ? 'lian' : '') + "></div>").appendTo(ofigure);
                    var oimg = $("<img src=" + item.cover + ">").appendTo(ofigure);
                    oimg.css("width", oimg.width()/75+"rem");
                    var op = $("<p class='gift-name'>" + item.name + "</p>").appendTo(ofigure);
                    var op2 = $("<p>" + item.goldcoin + "个金币</p>").appendTo(ofigure);

                    i++;
                })
                mui(".mui-slider").slider();
            },
            error: function() {
                console.log("gift list error.");
            }
        })
    },
    loading_user : function(){
        $.ajax({
                url: shareConfig.url.get_my_wallet,
                type: "get",
                success: function(data) {
                    if (data.result == 1) {
                        user = data.data;
                        $(".recharge").html("<span>充值&nbsp;&nbsp;</span>" + user.goldcoin + "金币&nbsp;&nbsp;&gt;");
                    }
                },
                error: function() {
                    console.log("loading user error.");
                }
        });   
    },
    init:function(){
        this.fit_screen();
        this.req_data();
        this.loading_user();
    }
}