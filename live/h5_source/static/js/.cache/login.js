/*TMODJS:{"version":1,"md5":"6e6081bd288bf4ba313893a33b275c34"}*/
template('login',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,nickname=$data.nickname,$out='';$out+='<li class="room-chat-item"> <div class="item-ctn enter"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(nickname.length>6?(nickname.substr(0,6)+'...'):nickname);
$out+='&nbsp;进入直播间</span> </div> </div> </li>';
return new String($out);
});