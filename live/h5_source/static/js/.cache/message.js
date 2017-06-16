/*TMODJS:{"version":2,"md5":"dc77bd1bf7e2cbcaa34aa259d5d4c021"}*/
template('message',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,nickname=$data.nickname,message=$data.message,$out='';$out+='<li class="room-chat-item"> <div class="gz item-ctn"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(nickname.length>10 ? (nickname.substr(0,5)+'...'):nickname);
$out+=$escape(message);
$out+='</span> </div> </div> </li>';
return new String($out);
});