var chat = {

    socket: null,
    view : new render(),
    //提交聊天消息内容
    submit: function() {
        var content = $("#content").val();
        var ip = "", that = this;
        if (content != '') {
            $.ajax({
                url: shareConfig.url.send_live_comment,
                type: "post",
                async: "false",
                data: {"scid": shareConfig.sObj.scid,"createip": ip,"comment": content},
                dataType: "json",
                success: function(data) {succfunc(data);},
                error: function(data) {$("#content").val("");}
            })
        }
        function succfunc(data){
            $(".input").blur();
            if (data.result != 600) {
                var comment = {
                    'avatar':user.avatar,
                    'level':user.level,
                    'memberid':user.memberid,
                    'content':content,
                    'nickname':user.nickname
                }
                that.view.comment(JSON.stringify(comment));

                $("#content").val("");
                $('.wrap-menu').removeClass("switch");
                $(".wrap-menu > figure,.wrap-menu .send-msg").hide();
                $('.w-share,.w-gift').css("display", "inline-block");
            } else {
                $(".login").show();
                $('.login .ok').on(clickOrTouch, function(){window.location.href = data.redirect_url;});
            }
        }
    },
    init: function() {
        var domain = location.hostname, socketurl="";
        var child = domain.substr(0,domain.indexOf("."));
        if(child == "dev"){
            socketurl = "ws://10.10.20.54:80";
        }else{
            socketurl = "ws://ws.yizhibo.com"
        }
        //连接websocket后端服务器 ws://10.10.20.54:80
        this.socket = io.connect(socketurl, {
            reconnectionAttemptes: 10,
            reconnectionDelay: 3000,
            transports: ['websocket'],
            path: '/yizhibo',
            'force new connection': true
        });
        // var view = new render();
        var that = this;
        //监听新用户登录
        this.socket.on('connect', function(data) {
            that.socket.emit('joinRoom', shareConfig.sObj.scid);
            // console.log("connect success.");
        });
        //监听消息发送
        that.socket.on('comment', function(data) {
            var comment = $.parseJSON(data);
            if(comment.memberid == user.memberid) return;
            that.view.comment(data);
        });

        that.socket.on('gift', function(data) {
            var gift = $.parseJSON(data);
            if(gift.memberid == user.memberid) return;
            that.view.gift(data);
        });
        that.socket.on('live_info', function(data) {
            that.view.live_info(data);
        });
        that.socket.on('praise', function(data) {
            that.view.praise(data);
        });
        that.socket.on('login', function(data) {
            that.view.login(data);
        });
        that.socket.on('message', function(data) {
            that.view.message(data);
        });
        //监听用户退出
        that.socket.on('disconnect', function(o) {
            // console.log("disconnect..")
        });
    }
};

