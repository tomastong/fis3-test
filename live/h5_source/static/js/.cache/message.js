/*TMODJS:{"version":2,"md5":"e09c872e25ed021a3af4f58f2332f518"}*/
template('message',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,nickname=$data.nickname,message=$data.message,$out='';$out+='<li class="room-chat-item"> <div class="gz"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(nickname.length>10 ? (nickname.substr(0,5)+'...'):nickname);
$out+=$escape(message);
$out+='</span> </div> </div> </li>';
return new String($out);
});