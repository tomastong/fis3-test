var page_elem = {

    input: function() {
        var that = this;
        var oShare = null,
            oGift = null,
            oSpan = null;


        $(".input").on("focus", function(e) {
            var e = e || window.event;
            e.preventDefault();
            $('.wrap-menu').css({
                'position': 'static'
            });
            $('.wrap-menu').addClass("switch");
            $('.w-share,.w-gift').hide();
            $(".wrap-menu > figure,.wrap-menu .send-msg").css("display", "inline-block");
            if(android){
                $(window).scrollTop(sheight-$(window).height());
            }
        });
        $(".input").on("blur",function(e){
            var e = e || window.event;
            $('.wrap-menu').css({
                'position': 'inherit'
            });
            $('.wrap-menu').removeClass("switch");
            $('.w-share,.w-gift').show();
            $(".wrap-menu > figure,.wrap-menu .send-msg").hide();
        })
        $(".send-msg").on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.preventDefault();
            chat.submit();
        });

    },
    share: function() {
        $(".w-share").on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.preventDefault();
            if (weixin) {
                $('.sns-share').show();
                $(".sns-ctn").removeClass("sns2");
            } else {
                $('.sns-share').show();
                $(".sns-ctn .weixin").remove();
                $(".sns-ctn .friend-circle").remove();
                $(".sns-ctn").addClass("sns2");
            }
        });
        $('.weixin.sns').on(clickOrTouch, function(e) {
            $("body").animate({ scrollTop: 0 });
            $("#rt-share").show();
        });
        $('.friend-circle.sns').on(clickOrTouch, function(e) {
            $("body").animate({ scrollTop: 0 });
            $("#rt-share").show();
        });
        $("#rt-share").on(clickOrTouch, function(e) { $("#rt-share").hide() });
        $('.weibo.sns').on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.stopPropagation();
            var s = [];
            for (var i in share.weibo) {
                s.push(i + '=' + encodeURIComponent(share.weibo[i] || ''));
            }
            window.location = "http://service.weibo.com/share/share.php?" + s.join('&');
        });

        $('.qq.sns').on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.stopPropagation();
            var s = [];
            for (var i in share.qq) {
                s.push(i + '=' + encodeURIComponent(share.qq[i] || ''));
            }
            window.location = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
        });
        $(".sns-share h4").on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            $(".sns-share").hide();
        });

        var share = {
            default:{
                title:document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                desc: '直播就要一直播！',
                pic: shareConfig.wx.imgUrl,
                link: window.location.href
            },
            weixin:{
                title : shareConfig.wx.title,
                desc : shareConfig.wx.desc,
                pic : shareConfig.wx.imgUrl,
                link : shareConfig.wx.link
            },
            weibo:{
                appkey:'592819922',
                title: document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                site: '一直播',
                content: 'utf-8',
                pic: shareConfig.wx.imgUrl,
                url: window.location.href
            },
            qq:{
                title: document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                desc: '直播就要一直播！',
                site: '一直播',
                summary:'直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                pic: shareConfig.wx.imgUrl,
                url: window.location.href
            },
            qqzone:{
                title: document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                desc: '直播就要一直播！',
                site: '一直播',
                pic: shareConfig.wx.imgUrl,
                url: window.location.href
            },
            funcs: {
                weibo: null,
                weixin: null,
                qq: null,
                qqzone: null
            }
        }

        window.wx.ready(function(){
            window.wx.onMenuShareTimeline({
                title: share.weixin.title,
                desc: share.weixin.desc,
                imgUrl: share.weixin.pic,
                link: share.weixin.link
            });
            window.wx.onMenuShareAppMessage({
                title: share.weixin.title,
                desc: share.weixin.desc,
                link: share.weixin.link,
                imgUrl: share.weixin.pic,
            });
            window.wx.onMenuShareQQ({
                title: share.qq.title,
                desc: share.qq.desc,
                link: share.qq.url,
                imgUrl: share.qq.pic,
            });
            window.wx.onMenuShareWeibo({
                title: share.weibo.title,
                desc: share.weibo.desc,
                link: share.weibo.url,
                imgUrl: share.weibo.pic,
            });
            window.wx.onMenuShareQZone({
                title: share.qqzone.title,
                desc: share.qqzone.desc,
                link: share.qqzone.url,
                imgUrl: share.qqzone.pic,
            });

        });

    },
    gift: function() {
        var that = this;
        $(".w-gift").on(clickOrTouch, function(e) {

            $(".content-box").hide();
            $(".btm-menu").hide();
            $(".sns-share").hide();
            $(".gift-slider").show();

            $(".elem").on(clickOrTouch, function() {
                clicknum = 0;
                $(".active").removeClass("active");
                $(this).addClass("active");
                $(".send").removeClass("disabled");
            })
        });

        var timer = null;
        $(".send").on(clickOrTouch, function(e) {
            if (!$(this).hasClass("disabled")) {
                ajax_buy_gift(1, 1); // 第一个表示送礼个数，第二个表示打开第一次判断是否连点菜单
            }
        })
        $(".lx-click").on(clickOrTouch, function() {
            countdown();
            ajax_buy_gift(1, 0);
        });
        $(".send66,.send520,.send888,.send1314").on(clickOrTouch, function() {
            var num = parseInt($(this).text());
            ajax_buy_gift(num, 0);
        });

        function ajax_buy_gift(cnt, n) {
            $.ajax({
                url: shareConfig.url.buy_gift_h5,
                type: "post",
                data: { scid: shareConfig.sObj.scid, giftid: $(".active").data("giftid"), amount: cnt },
                success: function(data) {
                    if(data.result == 1){
                        var giftid = $('.active.elem').data("giftid"), gift = {
                                "giftid": giftid,
                                "name": h5_req.giftobj['gift'+giftid].name,
                                "cover": h5_req.giftobj['gift'+giftid].cover,
                                "isbursts": h5_req.giftobj['gift'+giftid].isbursts,
                                "nickname": user.nickname,
                                "avatar": user.avatar,
                                "memberid": user.memberid,
                                "type": h5_req.giftobj['gift'+giftid].type,
                                "level": user.level,
                                "childtype": h5_req.giftobj['gift'+giftid].childtype,
                                "ytypevt": user.ytypevt,
                                "amount": cnt
                        };
                        chat.view.gift(JSON.stringify(gift));
                    }
                    if (n == 1) {
                        if (data.result == 1) {
                            $(".recharge").html("<span>充值&nbsp;&nbsp;</span>" + data.data.goldcoin + "金币&nbsp;&nbsp;&gt;");
                            active_bursts();
                        } else if (data.result == 600) {
                            $(".login").show();
                            $('.login .ok').on(clickOrTouch, function(){window.location.href = data.redirect_url;});
                        } else if (data.result == 100) {
                            jConfirm(data.msg, '', function(flag) {
                                if(!flag) return;
                                if(weixin){
                                    $(".guide-pay").show();
                                }else{
                                    var domain = location.hostname;
                                    var child = domain.substr(0,domain.indexOf("."));
                                    child += ".";
                                    if(child != "dev."&&child != "test1."){child = "";}
                                    window.location.href = 
                                    'https://'+child+'pay.yizhibo.com/product/api/get_product_list_h5';
                                }
                            })
                        } else {
                            jAlert(data.msg, '');
                        }
                    } else if (n == 0) {
                        if (data.result == 1) {
                            $(".recharge").html("<span>充值&nbsp;&nbsp;</span>" + data.data.goldcoin + "金币&nbsp;&nbsp;&gt;");
                        }
                    }
                },
                error: function(data) { console.log("gift error.") },
            })
        }

        function active_bursts() {
            if ($(".active div").hasClass("lian")) {
                $(".send").hide();
                $(".big-bg").show();
                $(".send66").animate({ "left": "0.24rem", "top": "2.186667rem" }, 100);
                $(".send520").animate({ "left": "0.35rem", "top": "1.12rem" }, 100);
                $(".send888").animate({ "left": "1.1rem", "top": "0.4rem" }, 100);
                $(".send1314").animate({ "left": "2.25rem", "top": "0.33rem" }, 100);
                countdown();
            }
        }

        function countdown() {
            clearInterval(timer);
            var i = 30;
            timer = setInterval(function() {
                $(".lx-send p i").html(i);
                i--;
                if (i == 0) {
                    clearInterval(timer);
                    $(".send66,.send520,.send888,.send1314").css("left", "1.8rem");
                    $(".send66,.send520,.send888,.send1314").css("top", "1.8rem");
                    $(".big-bg").hide();
                    $(".lx-send p i").html(30);
                    $(".send").show();
                }
            }, 100);
        }
    },
    lock: function() {
        var seconds = 0;
        setInterval(function() {
            seconds += 1;
            if (seconds == 60) {
                page_elem.lucky_money();
            }
        }, 1000);

    },
    // openDownload: function() {
        // $('#pop_div_layout').css('display', 'block');
        // $('#pop_div_lock').css('display', 'block');
        // $('.lock-ctn .close').on(clickOrTouch, function(e) {
        //     var e = e || window.event;
        //     e.preventDefault();
        //     $('.player-lock').hide();
        // });

        // $(".lock-ctn a").on(clickOrTouch, download);
        // $('.player-lock').on(clickOrTouch, function(e) {
        //     var e = e || window.event;
        //     e.preventDefault();
        //     $('.player-lock').hide();
        // });
    // },
    trimTitle: function() {
        $.each($('.topic'), function(i, n) {
            var str = $(n).text(),
                ss = "";
            $(n).html("");
            var s = str.substring(str.indexOf("#"), str.lastIndexOf("#"));
            if (s.indexOf("#") > -1) {
                if (s.length > 11) {
                    s = s.substr(0, 10);
                    ss = s + "...#";
                    $(n).html(ss);
                    s += "#";
                } else {
                    s += "#";
                    $(n).html(s);
                }
            }

            var sdesc = str.substr(str.lastIndexOf("#") + 1, str.length);
            if (sdesc != "") {
                if (sdesc.length > 10) {
                    sdesc = sdesc.substr(0, 10);
                    sdesc += "..."
                }
                $(n).next().html(sdesc);
            } else {
                $(n).next().html("我正在一直播分享快乐");
            }
        });
    },
    playBack: function() {
        $('.playback').on(clickOrTouch, function(e) {
            if (weibo || qq || weixin) {
                $("body").animate({ scrollTop: 0 });
                $(".shadow").css({ "display": "block" });
            } else {
                window.location.href = "xktv://jump?type=5&dataStr=" + shareConfig.sObj.scid;
            }
        });
    },
    pause: function() {
        var move = false;
        $("#video, .pause, .pause-wrap").on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.stopPropagation();

            if (!move) {
                var x = document.getElementById("video");
                if (x.paused) {
                    x.play();
                    $(".videobg").remove();
                    x.style.background = "#000";
                    $(".pause").hide();
                } else {
                    if(!$(".btm-menu").is(":hidden")){
                        x.pause();
                        $(".pause").show();
                    }
                }
            }
            
            if($(".btm-menu").is(":hidden")){
                $(".gift-slider").hide();
                // $(".send").addClass("disabled");
                $(".content-box").show();
                $(".btm-menu").show();
                // 点击视频还原送礼
                $('.wrap-menu').removeClass("switch");
                $('.w-share,.w-gift').show();
                $('.w-input .input').blur();
                $(".wrap-menu > figure,.wrap-menu .send-msg").css("display", "none");
            }
            move = false;
        });
        $("#video").on("touchmove", function() {
            move = true;
            console.log("moving");
        })
    },
    // concern: function() {
    //     var that = this;

        // $.ajax({
        //     url: shareConfig.url.has_follow,
        //     type: "post",
        //     data: {
        //         "url": window.location.href,
        //         "scid": shareConfig.sObj.scid
        //     },
        //     dataType: "json",
        //     success: function(data) {
        //         if (data.result == 1) {
        //             if (data.data.isfocus == 1) {
        //                 $(".subs").hide();
        //             }
        //         }
        //     },
        //     error: function(data) {
        //         console.log("net error.");
        //     }
        // });

        // $(".subs").on(clickOrTouch, function() {

        //     $.ajax({
        //         url: shareConfig.url.follow_friends,
        //         type: "post",
        //         async: "false",
        //         data: {
        //             "url": window.location.href,
        //             "friendid": shareConfig.sObj.memberid
        //         },
        //         dataType: "json",
        //         success: function(data) {
        //             if (data.result == 600) {
        //                 jConfirm(data.msg, "", function(flag) {
        //                    if(!flag) return;
        //                     window.location.href = data.redirect_url;
        //                 });
        //             } else {
        //                 $(".subs").hide();
        //             }
        //         },
        //         error: function(data) {
        //             console.log("net error.");
        //         }
        //     })
        // })
    // },
    get_product_list: function() {
        $(".recharge").on(clickOrTouch, function() {
            if(weixin){
                $(".guide-pay").show();
            }else{
            var domain = location.hostname;
            var child = domain.substr(0,domain.indexOf("."));
            child += ".";
            if(child != "dev."&&child != "test1."){child = "";}
            window.location.href = 'https://'+child+'pay.yizhibo.com/product/api/get_product_list_h5';
            }
        })
        $(".guide-pay figure .close").on(clickOrTouch,function(e){
            var e = window.event || e;
            e.preventDefault();    
            $(".guide-pay").hide();
        })
    },
    lucky_money: function() {
        $('.player-lock').css('display', 'block');
        $('.lucky-money').css('display', 'block');
        $('.player-lock').on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.preventDefault();
            $('.player-lock').hide();
            $('.lucky-money').hide();
        });
        $('.lucky-money .close').on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.preventDefault();
            $('.player-lock').hide();
            $('.lucky-money').hide();
        });
    },
    login: function() {
        $('.login .login-close,.login .cancel').on(clickOrTouch, function(e) {
            var e = e || window.event;
            e.preventDefault();
            $('.login').hide();
        });
    },
    urlToObj:function(str){
        var arr = str.split(/[&=]/);
        var obj = {};
        for(var i=0;i<arr.length;i+=2)
            obj[arr[i]] = arr[i+1];
        return obj;
    },
    magicWin:function(){
        new Mlink({
            mlink : "https://a.yzbo.tv/AAah",
            button : document.querySelectorAll("div.btnOpenApp"),
            tparams : {'u_id':shareConfig.sObj.unq_member_key},
            autoRedirect : false,
            autoRedirectToDownloadUrl: true,
            downloadWhenUniversalLinkFailed: false
        });
    },
    magic_enter_room:function(){
        new Mlink({
            mlink : "https://a.yzbo.tv/AAAj?type=1&dataStr="+shareConfig.sObj.scid,
            button : document.querySelectorAll("div.enter_room"),
            tparams : {'u_id' : shareConfig.sObj.unq_member_key},
            autoRedirect : false,
            autoRedirectToDownloadUrl: true,
            downloadWhenUniversalLinkFailed: false
        });  
    },
    monitorPro:function(){
        $(window).scroll(function () {
                if($(document).scrollTop()>$(window).height()/2){
                    $(".footer").show();
                    $(".sns-share").hide();
                }else{
                    $(".footer").hide();
                }
        });
    },
    // 初始化player大小
    init: function() {
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
        if(ios && (qq || weixin)){
            $(".videobg").remove();
            $(".pause").hide();
            $("#video").get(0).play();
            document.addEventListener("WeixinJSBridgeReady", function () { 
                $("#video")[0].play(); 
            }, false);
        }
        this.pause();
        this.input();
        this.share();
        this.gift();
        this.lock();
        this.login();
        this.trimTitle();
        this.playBack();
        
        this.get_product_list();
        this.magicWin();
        this.magic_enter_room();
        this.monitorPro();
    },

}
