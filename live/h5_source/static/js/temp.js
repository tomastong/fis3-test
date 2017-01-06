/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('comment',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatar=$data.avatar,level=$data.level,nickname=$data.nickname,content=$data.content,$out='';$out+='<li class="room-chat-item"> <div class="item-ctn clearfix"> <figure class="avatar" style="background:url(';
$out+=$escape(avatar);
$out+=') center center;background-size: cover;"></figure> <dl> <dt class="room-chat-user-name"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span>';
$out+=$escape(nickname);
$out+='</dt> <dd class="room-chat-content">';
$out+=$escape(content);
$out+='</dd> </dl> </div> </li>';
return new String($out);
});/*v:1*/
template('giftx',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatar=$data.avatar,level=$data.level,nickname=$data.nickname,name=$data.name,cover=$data.cover,$out='';$out+='<div class="wrap-cartoon"> <figure class="cartoon-avatar"> <img src="';
$out+=$escape(avatar);
$out+='"> </figure> <p class="nickname"><span class="rank r-';
$out+=$escape(level);
$out+='"></span>';
$out+=$escape(nickname.length>5?nickname.substr(0,4)+'..':nickname);
$out+='</p> <p class="desc">送出了';
$out+=$escape(name);
$out+='</p> <figure class="gift"> <img src="';
$out+=$escape(cover);
$out+='"> </figure> <h4 class="count">×&nbsp;1</h4> </div>';
return new String($out);
});/*v:1*/
template('login',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,nickname=$data.nickname,$out='';$out+='<li class="room-chat-item"> <div class="item-ctn enter bg-';
$out+=$escape(level>40?'inf':level);
$out+='"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(nickname.length>6?(nickname.substr(0,6)+'...'):nickname);
$out+='&nbsp;进入直播间</span> </div> </div> </li>';
return new String($out);
});/*v:1*/
template('message',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,message=$data.message,$out='';$out+='<li class="room-chat-item"> <div class="gz"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(message.length>10 ? (message.substr(0,5)+'...'):message.substr(0,message.length-5));
$out+='关注了主播</span> </div> </div> </li>';
return new String($out);
});/*v:1*/
template('messagex',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,message=$data.message,nickname=$data.nickname,suffix=$data.suffix,$out='';$out+='<li class="room-chat-item"> <div class="gift"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(message.length>12 ? (nickname.substr(0,5)+'...'+message.replace(nickname,'')):message);
$out+='<img src="';
$out+=$escape(suffix);
$out+='"></span> </div> </div> </li> ';
return new String($out);
});

}()