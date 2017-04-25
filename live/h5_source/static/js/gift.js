var render = function() {
    var _giftqueue = [], _giftluxury = [],
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
                        animateGift(data, 1);  
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
                    animateGift(data, 1);
                }else{
                    _giftqueue.push(data);
                }
            }
        }
        else if(data.childtype == "1"){////豪华礼物 
            // if($("#J_luxury").is(".hide"))
            //     animateGift(data, 2);
            // else
            //     _giftluxury.push(data);
        }else if(data.childtype == "0"){   //  普通礼物，不是执行，就是压入栈
            var d = $(".left-side-cartoon > .hide");
            if(d.length > 0){
                animateGift(data, 1);
            }else{
                _giftqueue.push(data);
            }
        }
    }

    function animateGift(data, type) {
        var stage;
        switch(type){
            case 2:
                var giftinfo = initData.gifttemp['gift'+ data.giftid];
                if(!giftinfo) {
                    console.log('没有找到礼物');
                    return;
                }
                $("#J_luxury").removeClass('hide').show().html('');
                if(canvasgift.support)  // true（支持）false(不支持)
                {
                    var canvas = $("#J_luxury canvas")[0];
                    if(!canvas)
                        $("#J_luxury").append('<canvas style = "width:'+parseInt($(window).height()/640*360)+'px; height:'+$(window).height()+'px"></canvas>');
                    $('.gifter figure img').attr('src', data.avatar);
                    $('.gifter figure .rank').addClass('r-'+data.level);
                    $('.gifter .info .nickname').text(data.nickname);
                    $('.gifter').fadeIn(100);
                    canvas = $("#J_luxury canvas")[0];
                    // 将socket中的data数据添加初始化礼物信息，并且添加id属性
                    $.extend(data, initData.gifttemp['gift'+ data.giftid], {id:data.giftid});
                    canvasgift.animate(canvas , data , animalend);
                    return;
                }
                // var img = new Image();
                // img.onload = function(){
                //     setTimeout(animalend,giftinfo.animationtime-200);
                // }
                // img.onerror = animalend;
                function animalend(){
                    $('.gifter').fadeOut(100);
                    $("#J_luxury").fadeOut(100, function() {
                        $(this).addClass('hide');
                        if(_giftluxury.length>0){
                            var gift = _giftluxury.shift();
                            animateGift(gift,2);
                        }
                    });
                }
                return;
            break;
            
            case 1:    
                stage = $(".left-side-cartoon > .hide").eq(0);
            break;
        }
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
                        animateGift(_giftqueue.shift(),1);
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
        var login  =  $.parseJSON(data)[0];
        if(!login || !login.nickname) return;
        login.level = Math.max(1,login.level);
        list.append(template("login",login));
        for(var i=0;i<$("li", list).length-50;i++){
                $("li", list).eq(i).remove();
        }
        autoscroll();
    }
    this.gift = function(data){
        var gift = $.parseJSON(data);
        if(!gift) return;
        gift.level = Math.max(1,gift.level);
        pushGift(gift);
        
        if(!gift.goldcoins) return;
        $(".gold-coin .goldcoins").html(gift.goldcoins);
        $(".gold-coin").is(":hidden")?$(".gold-coin").show():'';
    }
    this.comment = function(data){
        var comment = $.parseJSON(data);
        if(!comment) return;
        comment.level = Math.max(1,comment.level);
        list.append(template("comment",comment));
        for(var i=0;i<$("li", list).length-50;i++){
                $("li", list).eq(i).remove();
        }
        autoscroll();
    }
    this.message = function(data){
        var obj = $.parseJSON(data);
        if(!obj) return;
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
        if(!obj) return;
    }
    this.live_info = function(data){
        var obj = $.parseJSON(data);
        if(!obj) return;
        // if(!obj.goldcoins) return;
        // $(".gold-coin .goldcoins").html(obj.goldcoins);
        // $(".gold-coin").is(":hidden")?$(".gold-coin").show():'';
    }
    function autoscroll(){
        div.scrollTop(20000);
    }
}
   