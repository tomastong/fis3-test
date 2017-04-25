;!(function(win, ns, $){
    var exports = win[ns] = win[ns] || {};

    win[ns] = exports = {

        input: (function() {
            var oShare = null, oGift = null, oSpan = null;

            $(document).on('focus blur','.input', function(e) {
                e.preventDefault();
                var type= e.type;
                if(type == 'focusin'){
                    $('.wrap-menu').css({'position': 'static'}).addClass('switch');
                    $('.w-share, .w-gift').hide();
                    $('.wrap-menu .cut,.wrap-menu .send-msg').css('display', 'inline-block');
                    if(shareConfig.sObj.vscreen==2)
                        $('.w-input').removeClass('input-border');
                    if(android)
                        $(win).scrollTop(sheight-$(win).height());
                }else{
                    $('.wrap-menu').css({'position': 'inherit'}).removeClass('switch');
                    $('.w-share, .w-gift').show();
                    $('.wrap-menu .cut, .wrap-menu .send-msg').hide();
                    if(shareConfig.sObj.vscreen==2)
                        $('.w-input').addClass('input-border');
                }

            }).on(clickOrTouch, '.send-msg', function(e) {

                chat.submit();
            });
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
                countdown();
                ajax_buy_gift(1, 0);

            }).on(clickOrTouch, '.send66,.send520,.send888,.send1314', function() {
                var num = parseInt($(this).text());
                ajax_buy_gift(num, 0);
            });

            function ajax_buy_gift(cnt, n) {
                $.ajax({
                    url: shareConfig.url.buy_gift_h5,
                    type: 'post',
                    data: { scid: shareConfig.sObj.scid, 
                            giftid: $('.active').data('giftid'), 
                            amount: cnt 
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
                countdown();
            }

            function countdown() {
                clearInterval(timer);
                var i = 30;
                timer = setInterval(function() {
                    $('.lx-send p i').html(i);
                    i--;
                    if (i == 0) {
                        clearInterval(timer);
                        $('.send66,.send520,.send888,.send1314').css({'left':'1.8rem','top':'1.8rem'});
                        $('.big-bg').hide();
                        $('.lx-send p i').html(30);
                        $('.send').show();
                    }
                }, 100);
            }
        },
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
                        if(x && !$('.btm-menu').is(':hidden')){
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



