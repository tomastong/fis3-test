/*TMODJS:{"version":1,"md5":"5f6c40e01b0e821b8d2041c0adf65655"}*/
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
});