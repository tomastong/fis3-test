;!(function(win, ns, $){
    var exports = win[ns] = win[ns] || {};

    win[ns] = exports = {

        input: (function() {
            var oShare = null, oGift = null, oSpan = null;

            $(document).on(clickOrTouch,'.w-input .input', function(e) {
                e.preventDefault();
                if(!isEmptyObject(user)){
                    $('#video-box .modal').removeClass('hide');
                    $('#video-box .modal input').focus();
                }
                else{
                    var domain = location.host, prefix = domain.substr(0, domain.indexOf('.')+1);
                                    $.inArray(prefix,['test.', 'dev.'])== -1 ? prefix='' : '';
                                    prefix = 'test.';
                    window.location.href='http://'+prefix+'m.yizhibo.com/www/live/login?redirect_url='+window.location.href;
                }

            }).on(clickOrTouch, '.send-msg', function(e) {

                chat.submit();
            });
            
            function isEmptyObject(e) {  
                var t;  
                for (t in e)  
                    return !1;  
                return !0  
            }
        })(),
        
        share: (function() {
            $(document).on(clickOrTouch, '.w-share', function(e) {
                $('.sns-share').show();
                if (!weixin) 
                    $('.weixin, .friend-circle',$('.sns-ctn').addClass('sns2')).remove();

            }).on(clickOrTouch, '.weixin, .friend-circle', function(e) {
                $('body').animate({ scrollTop: 0 });
                $('#rt-share').show();

            }).on(clickOrTouch, '.weibo, .qq', function(e) {
                var s = [], sns = $(this).data('sns'), q = share[sns];
                for (var i in q) 
                    s.push(i + '=' + encodeURIComponent(q[i] || ''));
                if(sns == 'weibo')
                    win.location = 'http://service.weibo.com/share/share.php?' 
                                    + s.join('&');
                else
                    win.location = 'http://connect.qq.com/widget/shareqq/index.html?'
                                    + s.join('&');
                    
            });
            $('#rt-share').on(clickOrTouch, function(e) { $('#rt-share').hide() });
            $('.sns-share h4').on(clickOrTouch, function(e) {$('.sns-share').hide();});

            var share = {
                default:{
                    title:document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                    desc: '直播就要一直播！',
                    pic: shareConfig.wx.imgUrl,
                    link: shareConfig.wx.link
                },
                weixin:{
                    title : shareConfig.wx.title,
                    desc : shareConfig.wx.desc,
                    pic : shareConfig.wx.imgUrl,
                    link : shareConfig.wx.link
                },
                weibo:{
                    appkey:shareConfig.rmzb.appid,
                    title: document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                    site: '一直播',
                    content: 'utf-8',
                    pic: shareConfig.wx.imgUrl,
                    url: win.location.href
                },
                qq:{
                    title: document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                    desc: '直播就要一直播！',
                    site: '一直播',
                    summary:'直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                    pic: shareConfig.wx.imgUrl,
                    url:  win.location.href
                },
                qqzone:{
                    title: document.title || '直播就要#一直播#，我正在一直播分享快乐，快来支持我！点击直接观看>>',
                    desc: '直播就要一直播！',
                    site: '一直播',
                    pic: shareConfig.wx.imgUrl,
                    url:  win.location.href
                },
                funcs: {
                    weibo: null,
                    weixin: null,
                    qq: null,
                    qqzone: null
                }
            }

            win.wx.ready(function(){
                win.wx.onMenuShareTimeline({
                    title: share.weixin.title,
                    desc: share.weixin.desc,
                    imgUrl: share.weixin.pic,
                    link: share.weixin.link
                });
                win.wx.onMenuShareAppMessage({
                    title: share.weixin.title,
                    desc: share.weixin.desc,
                    link: share.weixin.link,
                    imgUrl: share.weixin.pic,
                });
                win.wx.onMenuShareQQ({
                    title: share.qq.title,
                    desc: share.qq.desc,
                    link: share.qq.url,
                    imgUrl: share.qq.pic,
                });
                win.wx.onMenuShareWeibo({
                    title: share.weibo.title,
                    desc: share.weibo.desc,
                    link: share.weibo.url,
                    imgUrl: share.weibo.pic,
                });
                win.wx.onMenuShareQZone({
                    title: share.qqzone.title,
                    desc: share.qqzone.desc,
                    link: share.qqzone.url,
                    imgUrl: share.qqzone.pic,
                });

            });

        })(),
        gift: function() {
            var that = this, timer = null;

            $(document).on(clickOrTouch, '.w-gift', function(e) {
                
                $('.content-box, .btm-menu, .sns-share').hide();
                $('.gift-slider').show();
                
            }).on(clickOrTouch, '.elem', function() {
                
                clicknum = 0;
                $('.active').removeClass('active');
                $(this).addClass('active');
                $('.send').removeClass('disabled');

            }).on(clickOrTouch, '.send' , function(e) {
                if (!$(this).is('.disabled')) 
                    ajax_buy_gift(1, 1); // 第一个表示送礼个数，第二个表示打开第一次判断是否连点菜单

            }).on(clickOrTouch, '.lx-click', function() {
                cutdown();
                ajax_buy_gift(1, 0);

            }).on(clickOrTouch, '.send66,.send520,.send888,.send1314', function() {
                var num = parseInt($(this).text());
                ajax_buy_gift(num, 0);
            });

            function ajax_buy_gift(cnt, n) {
                $.ajax({
                    url: shareConfig.url.buy_gift_h5,
                    type: 'post',
                    data: { scid: shareConfig.sObj.scid || shareConfig.sObj.carouselid, 
                            giftid: $('.active').data('giftid'), 
                            amount: cnt,
                            carouselid:shareConfig.sObj.carouselid ||'' 
                    }
                }).done(function(data) {
                    if(data.result == 1){
                        var giftid = $('.active.elem').data('giftid'),gift = {};
                        $.extend(gift, initData.gifttemp['gift'+giftid], 
                            {'nickname': user.nickname,
                             'avatar': user.avatar,
                             'memberid': user.memberid,
                             'level': user.level,
                             'ytypevt': user.ytypevt,
                             'amount': cnt});
                        chat.view.gift(JSON.stringify(gift));
                    }
                    if (n == 1) {
                        if (data.result == 1) {
                            $('.recharge').html('<span>充值&nbsp;&nbsp;</span>' + data.data.goldcoin + '金币&nbsp;&nbsp;&gt;');
                            active_bursts();

                        } else if (data.result == 600) {
                            $('.login').show();
                            $('.login .ok').on(clickOrTouch, function(){
                                win.location.href = data.redirect_url;
                            });

                        } else if (data.result == 100) {
                            jConfirm(data.msg, '', function(flag) {
                                if(!flag) return;
                                if(weixin){
                                    $('.guide-pay').show();
                                }else{
                                    var domain = location.host, prefix = domain.substr(0, domain.indexOf('.')+1);
                                    $.inArray(prefix,['test.', 'dev.'])== -1 ? prefix='' : '';
                                    var m = user.memberid==undefined?'':user.memberid;
                                    win.location.href = '//'+prefix+'static.yizhibo.com/html/h5pay/pay-checkstand.html?memberid=' + m;
                                }
                            })
                        } else {
                            jAlert(data.msg, '');
                        }
                    } else if (n == 0) {
                        if (data.result == 1) 
                            $('.recharge').html('<span>充值&nbsp;&nbsp;</span>' + data.data.goldcoin + '金币&nbsp;&nbsp;&gt;');
                    }
                }).fail(function(data) { 
                    console.log('gift error.') 
                })
            }

            function active_bursts() {
                
                if (!$('.active div').is('.lian'))  return;
                
                $('.send').hide();
                $('.big-bg').show();
                $('.send66').animate({ 'left': '0.24rem', 'top': '2.186667rem' }, 100);
                $('.send520').animate({ 'left': '0.35rem', 'top': '1.12rem' }, 100);
                $('.send888').animate({ 'left': '1.1rem', 'top': '0.4rem' }, 100);
                $('.send1314').animate({ 'left': '2.25rem', 'top': '0.33rem' }, 100);
                animate(30);
                cutdown();
            }

            // function countdown() {
            //     clearInterval(timer);
            //     var i = 30;
            //     timer = setInterval(function() {
            //         $('.lx-send p i').html(i);
            //         i--;
            //         if (i == 0) {
            //             clearInterval(timer);
            //             $('.send66,.send520,.send888,.send1314').css({'left':'1.8rem','top':'1.8rem'});
            //             $('.big-bg').hide();
            //             $('.lx-send p i').html(30);
            //             $('.send').show();
            //         }
            //     }, 100);
            // }
            // ==================================
                var c = document.getElementById('canvas'),ctx = c.getContext('2d'),
                    c1 = new Circle(58,58,58,0,2*Math.PI, '#FF670F'), 
                    c2 = new Circle(58,58,50,0,2*Math.PI, '#FF670F'),
                    // c3 = new Circle(58,58,58, 3/2*Math.PI, -Math.PI/2, '#FF976B'),
                    c3 = new Circle(58,58,58, 3/2*Math.PI, 3/2*Math.PI, '#FF976B'),
                    i = 30, timer = null;
                
                // if(ctx) cutdown();
                // 抽象圆形类
                function Circle(x, y, radius,start, angle,fillStyle){
                    this.x = x;
                    this.y = y;
                    this.radius = radius;
                    this.start = start;
                    this.angle = angle;
                    this.fillStyle = fillStyle;
                }
                // 绘制方法
                Circle.prototype.draw = function(i){
                    ctx.beginPath();
                    ctx.moveTo(58,58);
                    ctx.arc(this.x, this.y, this.radius, this.start, this.angle);
                    ctx.fillStyle = this.fillStyle;
                    ctx.closePath();
                    ctx.fill();

                    ctx.font="italic 30px Georgia ";
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText("连击",26,50);

                    ctx.font="italic 30px PingFang SC Medium";
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(i, 42,90);
                }
                // 运动方法
                function animate(i){
                    ctx.clearRect(0,0,116,116);
                    c1.draw(i);
                    c3.draw(i);
                    c2.draw(i);
                }
                // 倒计时
                function cutdown(){
                    clearInterval(timer);
                    i = 30;
                    timer = setInterval(function(){
                        
                        if(i == -1){
                            clearInterval(timer);
                            $('.send66,.send520,.send888,.send1314').css({'left':'1.8rem','top':'1.8rem'});
                            $('.big-bg').hide();
                            $('.send').show();
                            i = 30;
                            c3.angle = 3/2 * Math.PI;
                            animate(30);
                        }else{
                            if(i==30)
                                c3.angle = 3/2 * Math.PI;
                            else if(i==0)
                                c3.angle = -1/2 * Math.PI;
                            else
                                c3.angle = 3/2 * Math.PI - i/30 * 2 * Math.PI;
                            animate(i--);
                        }
                    }, 100);
                }
                
        },
        smallGift:(function(){
            $(document).on(clickOrTouch,'.sgift', function(){
                var e = e || window.event;
                e.stopPropagation();

                var buyxhr = $.ajax({
                    url: shareConfig.url.buy_gift_h5,
                    type: 'post',
                    data: { scid: shareConfig.sObj.scid || shareConfig.sObj.carouselid, 
                            giftid: $('.sgift img').data('giftid'), 
                            amount: 1,
                            carouselid:shareConfig.sObj.carouselid ||'' 
                    }
                })
                buyxhr.done(function(data){
                    if(data.result == 600){
                        $('.login').show();
                        $('.login .ok').on(clickOrTouch, function(){
                            win.location.href = data.redirect_url;
                        });
                    }else if(data.result == 100){
                        jConfirm(data.msg, '', function(flag) {
                            if(!flag) return;
                            if(weixin){
                                $('.guide-pay').show();
                            }else{
                                var domain = location.host, prefix = domain.substr(0, domain.indexOf('.')+1);
                                $.inArray(prefix,['test.', 'dev.'])== -1 ? prefix='' : '';
                                var m = user.memberid==undefined?'':user.memberid;
                                win.location.href = '//'+prefix+'static.yizhibo.com/html/h5pay/pay-checkstand.html?memberid=' + m;
                            }
                        })
                    }else if(data.result == 1){
                        cutdown();
                        var gift = data.data, giftid = $('.sgift img').data('giftid');
                        $.extend(gift, 
                            {'nickname': user.nickname,
                             'avatar': user.avatar,
                             'memberid': user.memberid,
                             'level': user.level,
                             'ytypevt': user.ytypevt,
                             'goldcoin':'',
                             'giftid':$('.sgift img').data('giftid'),
                             'name':initData.gifttemp['gift'+giftid].name,
                             'cover':initData.gifttemp['gift'+giftid].cover,
                             'isbursts':initData.gifttemp['gift'+giftid].isbursts,
                             'childtype':initData.gifttemp['gift'+giftid].childtype,
                             'amount': 1});
                        chat.view.gift(JSON.stringify(gift));
                    }else
                        jAlert(data.msg, '');
                })
                buyxhr.fail(function(jq, status, xhr){
                    console.log('面板礼物送礼失败...');
                })
            })

            var c = document.getElementById('sgift'),ctx = c.getContext('2d'),
                    c1 = new Circle(58,58,58,0,2*Math.PI, 'rgba(0,0,0,1)'), 
                    c2 = new Circle(58,58,50,0,2*Math.PI, 'rgba(0,0,0,1)'),
                    // c3 = new Circle(58,58,58, 3/2*Math.PI, -Math.PI/2, '#FF976B'),
                    c3 = new Circle(58,58,58, 3/2*Math.PI, 3/2*Math.PI, '#FF976B'),
                    i = 20, timer = null;
                
                // 抽象圆形类
                function Circle(x, y, radius,start, angle,fillStyle){
                    this.x = x;
                    this.y = y;
                    this.radius = radius;
                    this.start = start;
                    this.angle = angle;
                    this.fillStyle = fillStyle;
                }
                // 绘制方法
                Circle.prototype.draw = function(i){
                    ctx.beginPath();
                    ctx.moveTo(58,58);
                    ctx.arc(this.x, this.y, this.radius, this.start, this.angle);
                    ctx.fillStyle = this.fillStyle;
                    ctx.closePath();
                    ctx.fill();

                }
                // 运动方法
                function animate(i){
                    ctx.clearRect(0,0,116,116);
                    c1.draw(i);
                    c3.draw(i);
                    c2.draw(i);
                }
                // 倒计时
                function cutdown(){
                    clearInterval(timer);
                    i = 20;
                    timer = setInterval(function(){
                        
                        if(i == -1){
                            clearInterval(timer);
                            i = 20;
                            c3.angle = 3/2 * Math.PI;
                            animate(20);
                        }else{
                            if(i==20)
                                c3.angle = 3/2 * Math.PI;
                            else if(i==0)
                                c3.angle = -1/2 * Math.PI;
                            else
                                c3.angle = 3/2 * Math.PI - i/20 * 2 * Math.PI;
                            animate(i--);
                        }
                    }, 100);
                }

        })(),
        lockScreen: (function() {
            var seconds = 0;
            setInterval(function() {
                seconds += 1;
                if (seconds == 60) leadReece();
            }, 1000);

            function leadReece(){
                $('.player-lock, .leadReece').css('display', 'block');

                $(document).on(clickOrTouch, '.player-lock', function(e) {
                    $('.player-lock, .leadReece').hide();

                }).on(clickOrTouch, '.leadReece .close', function(e) {
                    $('.player-lock, .leadReece').hide();
                });
            }
        })(),
        dealcw: (function() {
            $.each($('.topic'), function(i, n) {
                var str = $(n).text(),
                    ss = '';
                $(n).html('');
                var s = str.substring(str.indexOf('#'), str.lastIndexOf('#'));
                if (s.indexOf('#') > -1) {
                    if (s.length > 11) {
                        s = s.substr(0, 10);
                        ss = s + '...#';
                        $(n).html(ss);
                        s += '#';
                    } else {
                        s += '#';
                        $(n).html(s);
                    }
                }

                var sdesc = str.substr(str.lastIndexOf('#') + 1, str.length);
                if (sdesc != '') {
                    if (sdesc.length > 10) {
                        sdesc = sdesc.substr(0, 10);
                        sdesc += '...'
                    }
                    $(n).next().html(sdesc);
                } else 
                    $(n).next().html('我正在一直播分享快乐');
            });
        })(),
        playBack: (function() {
            $(document).on(clickOrTouch, '.playback', function(e) {
                if (weibo || qq || weixin) {
                    $('body').animate({ scrollTop: 0 });
                    $('.shadow').css({ 'display': 'block' });
                }
                else 
                    win.location.href = 'xktv://jump?type=5&dataStr=' + shareConfig.sObj.scid;
                
            });
        })(),
        pause: (function() {
            var move = false;
            $('#video, .pause, .pause-wrap').on(clickOrTouch, function(e) {
                var e = e || win.event;
                e.stopPropagation();

                if (!move) {
                    var x = $('video')[0];
                    if (x && x.paused) {
                            $('.videobg, .pause').hide();
                            x.play();
                    } else {
                        if(!$('.modal').is('.hide')) 
                            $('.modal').addClass('hide');
                        else if(x && !$('.btm-menu').is(':hidden')){
                            $('.videobg, .pause').show();
                            x.pause();
                        }

                    }
                }
                
                if($('.btm-menu').is(':hidden')){
                    $('.gift-slider').hide();
                    $('.content-box, .btm-menu').show();

                    // 点击视频还原送礼
                    $('.wrap-menu').removeClass('switch');
                    $('.w-share,.w-gift').show();
                    $('.w-input .input').blur();
                    $('.wrap-menu .cut, .wrap-menu .send-msg').css('display', 'none');
                }
                move = false;
            });
            $('#video').on('touchmove', function() {
                move = true;
            })
        })(),
        recharge: (function() {
            $(document).on(clickOrTouch, '.recharge', function() {
                
                var domain = location.host, prefix = domain.substr(0, domain.indexOf('.')+1);
                $.inArray(prefix,['test.', 'dev.'])== -1 ? prefix='' : '';
                var m = user.memberid==undefined?'':user.memberid;
                win.location.href = '//'+prefix+'static.yizhibo.com/html/h5pay/pay-checkstand.html?memberid='+m;

            }).on(clickOrTouch, '.guide-pay figure .close', function(e){

                var e = win.event || e;
                e.preventDefault();    
                $('.guide-pay').hide();
            })
        })(),
        login: (function() {
            $(document).on(clickOrTouch, '.login .close, .login .cancel', 
                function(e) {
                    var e = e || win.event;
                    e.preventDefault();
                    $('.login').hide();
                }
            );
        })(),
        magicWin:function(){
            new Mlink({
                mlink : 'https://a.yzbo.tv/AAah',
                button : document.querySelectorAll('a#btnOpenApp'),
                tparams : {'u_id':shareConfig.sObj.unq_member_key},
                autoRedirect : false,
                autoRedirectToDownloadUrl: true,
                downloadWhenUniversalLinkFailed: false
            });
            new Mlink({
                mlink : 'https://a.yzbo.tv/AAAj?type=1&dataStr='+shareConfig.sObj.scid,
                button : document.querySelectorAll('a#enter_room'),
                tparams : {'u_id' : shareConfig.sObj.unq_member_key},
                autoRedirect : false,
                autoRedirectToDownloadUrl: true,
                downloadWhenUniversalLinkFailed: false
            });  
        },
        monitorPro:(function(){
            $(win).scroll(function () {
                    if($(document).scrollTop()>$(win).height()/2){
                        $('.footer').show();
                        $('.sns-share').hide();
                    }else
                        $('.footer').hide();
                    
            });
        })(),
        newsApp:(function(){
            var xhr = $.ajax({
                url:"/www/live/get_hot_list",
                type:"post",
                async:false,
                data:{"page":1,"limit":"20"},
                dataType:"json"
            });
            xhr.done(function(data){
                if(data.result!=1) return;
                [1,2,3].forEach(function(v,i){
                    var nickname = data.data.list[i].nickname;
                    nickname.length>10?nickname = nickname.substr(0.10)+'...':'';
                    $('.scroll-image-wrapper li img').eq(v).attr('src', data.data.list[i].avatar);
                    $('.scroll-title-wrapper li a').eq(v).html('我在一直播，快来跟我互动吧！'+'<br>'+nickname);
                })
            });
            xhr.fail(function(){
                console.log('热门列表数据轮播加载失败...');
            })


            var twidth = parseInt($('.scroll-title-wrapper li.current').width())+1;
            $('.doc-footer-wrapper .scroll-title-wrapper li:gt(0)').css({'left':twidth});
            $('.scroll-title-wrapper li.current').css({'left':0});
            var timer = setInterval(function(){
                var index = $('.scroll-image-wrapper li.active').index(), current = $('.scroll-title-wrapper li.current').index();

                $('.scroll-image-wrapper li.active, .scroll-panel li.active').removeClass('active');
                $('.scroll-image-wrapper li').eq((index+1)%4).addClass('active');
                $('.scroll-panel li').eq((index+1)%4).addClass('active');

                $('.scroll-title-wrapper li.current').removeClass('current').css({'left':-twidth});
                $('.scroll-title-wrapper li').eq((current+1)%4).addClass('current').css({'left':0});
                $('.scroll-title-wrapper li').eq((current+2)%4).removeClass('hide').css({'left':twidth});
                $('.scroll-title-wrapper li').eq((current+3)%4).addClass('hide').css({'left':twidth});

            }, 3000);
        })(),
        panelGift:(function(){
            // url: shareConfig.url.get_user_panel_gift_background,
            var domain = location.host, prefix = domain.substr(0, domain.indexOf('.')+1);
            $.inArray(prefix,['test.', 'dev.'])== -1 ? prefix='' : '';
            var xhr = $.ajax({
                url: '//'+prefix+'pay.yizhibo.com/gift/api/get_user_panel_gift_background',
                data: { anchorid:shareConfig.sObj.memberid },
                type: "get",  
                async: false,  
                dataType: "jsonp",  
                jsonp: "callback",
                jsonpCallback: "return_callback1"
            });
            xhr.done(function(d){
                if(d.result != 1) return;
                $('.sgift img').attr('src', d.data.cover).data('coin', d.data.price).data('giftid',d.data.giftId);
            })
            xhr.fail(function(d){
                console.log('面板礼物加载失败...');
            })  
        })(),
        init: function() {
            shareConfig.sObj.status == 1?
            $('#video-box').remove():$('video')[0].controls = false;
            
            if($('video').length && shareConfig.sObj.vscreen==2){
                $('.user-info,.user_live_room,.gold-coin,.yizhibo-logo')
                    .css({'background-color':'#1F1F1F'});
                $('.w-input').addClass('input-border');
            }
            if(shareConfig.sObj.showtype==3) $('.pay-live').show();
            if(ios && (qq || weixin) && $('video').length != 0){
                $('.videobg, .pause').hide();
                $('#video').get(0).play();
                document.addEventListener('WeixinJSBridgeReady', function () { 
                    $('#video')[0].play(); 
                }, false);
            }else{
                $('.videobg, .pause').show();
            }
            this.gift();
            this.magicWin();
        }

    }
    $(function(){ exports.init();})
})(window, 'liveroom', jQuery)
