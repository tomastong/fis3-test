var render = function() {
    var _giftqueue = [],
        staytime = 1000,
        boomtime = 300; // 进场礼物队列

    function pushGift(data) {
        if (!data) return;

        if (data.isbursts == 1) {
             
            if (data.amount == 1) {    // 连击、个数为1，就要复杂的判断
                // 这里的设置是在执行动画的时候设置的
                var _mid_gid = "" + data.memberid + "_" + data.giftid;
                var last = $(".left-side-cartoon > #" + _mid_gid);
                // 正在放映动画，改变amount值
                if (last.length > 0 && !last.is("hide")) {   // 1 送的时候正在执行
                    last.attr("data-amount", parseInt(last.attr("data-amount")) + 1);
                } else { 
                    var d = $(".left-side-cartoon > .hide");
                    if(d.length > 0){   // 2 有空闲线程，立即执行
                        animateGift(data);  
                    }else{              // 2 无空闲线程，要不累加，要不直接压入栈
                        for (var i = 0; i < _giftqueue.length; i++) {
                            var g = _giftqueue[i];
                            // 3 栈中存在同类，连击礼物队列累加
                            if (data.memberid == g.memberid && data.giftid == g.giftid) {
                                g.amount = (parseInt(data.amount) + parseInt(g.amount)).toString();
                                return;
                            }
                        }
                        // 3 栈中不存在同类，直接压入
                        _giftqueue.push(data);
                    }
                }
            }else{  //  批量礼物不是执行，就是压入栈
                var d = $(".left-side-cartoon > .hide");
                data.memberid = "";
                if(d.length > 0){
                    animateGift(data);
                }else{
                    _giftqueue.push(data);
                }
            }
        }else{   //  普通礼物，不是执行，就是压入栈
            var d = $(".left-side-cartoon > .hide");
            if(d.length > 0){
                animateGift(data);
            }else{
                _giftqueue.push(data);
            }
        }
    }

    function animateGift(data) {
        var stage = $(".left-side-cartoon > .hide").eq(0);
        stage.attr({ "data-amount": data.amount, "id": "" + data.memberid + "_" + data.giftid });
        stage.removeClass("hide");
        stage.attr("data-current", (data.isbursts == 1 && data.memberid == "") ? 10 : 1);
        stage.html(template("giftx", data));
        
        $(".count", stage).html("×&nbsp;" + stage.attr("data-current"));
        stage.animate({"margin-left":"0"},300);
        $(".count", stage).addClass("scale");
        setTimeout(function(){
            $(".count", stage).removeClass("scale");
            animate(data);      // 变换一次数字执行一次动画
        },250);

        function animate(data) {

            var lasttime = new Date().getTime();
            
            setTimeout(function() {
                // 等待6秒，没有就执行下一个动画，否则接着执行送礼+1
                if (new Date().getTime() - lasttime > 6e3) {
                    stage.attr("id", "").addClass('hide');
                    stage.animate({"margin-left":"-8rem"},300);
                    if (_giftqueue.length > 0) {
                        animateGift(_giftqueue.shift());
                    }
                    return;
                }
                // 判断当前和目标值
                var a = parseInt(stage.attr("data-amount")),
                    c = parseInt(stage.attr("data-current"));
                if (a > c) {
                    var curr = (c + (a - c >= 10 && (data.isbursts == 1 && data.memberid == "") ? 10 : 1)).toString();
                    stage.attr("data-current", curr);
                    $(".count", stage).html("×&nbsp;" + curr);
                    $(".count", stage).addClass("scale");
                    setTimeout(function(){
                        $(".count", stage).removeClass("scale");
                        animate(data);      // 变换一次数字执行一次动画
                    },400);
                } else {
                    setTimeout(arguments.callee, boomtime)  
                    // 这里只是判断时间停留够不够6秒
                }
            }, boomtime)
        }
    }

    var div = $("#message");
    var list = $("#list-info");
    this.login = function(data){
        data  =  $.parseJSON(data)[0];
        if(!data.nickname) return;
        data.level = Math.max(1,data.level);
        list.append(template("login",data));
        for(var i=0;i<$("li", list).length-50;i++){
                $("li", list).eq(i).remove();
        }
        autoscroll();
    }
    this.gift = function(data){
        var gift = $.parseJSON(data);
        gift.level = Math.max(1,gift.level);
        pushGift(gift);
        
        if(!gift.goldcoins) return;
        $(".gold-coin .goldcoins").html(gift.goldcoins);
        $(".gold-coin").is(":hidden")?$(".gold-coin").show():'';
    }
    this.comment = function(data){
        var comment = $.parseJSON(data);
        comment.level = Math.max(1,comment.level);
        list.append(template("comment",comment));
        for(var i=0;i<$("li", list).length-50;i++){
                $("li", list).eq(i).remove();
        }
        autoscroll();
    }
    this.message = function(data){
        var obj = $.parseJSON(data);
        if(obj.type==4){
            list.append(template("message",obj));
        }else if(obj.type==5){
            list.append(template("messagex",obj));
        }
        for(var i=0;i<$("li", list).length-50;i++){
                $("li", list).eq(i).remove();
        }
        autoscroll();
    }
    this.praise = function(data){
        var obj = $.parseJSON(data);
    }
    this.live_info = function(data){
        var obj = $.parseJSON(data);
        // if(!obj.goldcoins) return;
        // $(".gold-coin .goldcoins").html(obj.goldcoins);
        // $(".gold-coin").is(":hidden")?$(".gold-coin").show():'';
    }
    function autoscroll(){
        div.scrollTop(20000);
    }
}
   