/*TMODJS:{"version":4,"md5":"ff36b455d08bd7cb649deaefab3fef8e"}*/
template('comment',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,nickname=$data.nickname,content=$data.content,$out='';$out+='<li class="room-chat-item"> <div class="item-ctn comment clearfix"> <dl> <dt class="room-chat-user-name"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span><span class="nickname">';
$out+=$escape(nickname);
$out+='</span>：';
$out+=$escape(content);
$out+=' </dt> </dl> </div> </li>';
return new String($out);
});