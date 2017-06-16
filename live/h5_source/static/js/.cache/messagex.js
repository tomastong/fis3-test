/*TMODJS:{"version":1,"md5":"7409b1637604120d622abfe58b5bb825"}*/
template('messagex',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,level=$data.level,nickname=$data.nickname,message=$data.message,suffix=$data.suffix,$out='';$out+='<li class="room-chat-item"> <div class="gift"> <div class="wrap-enter"> <span class="rank r-';
$out+=$escape(level);
$out+='"></span> <span class="info">';
$out+=$escape(nickname.length>6 ? (nickname.substr(0,6)+'...'):nickname);
$out+=$escape(message);
$out+='<img src="';
$out+=$escape(suffix);
$out+='"></span> </div> </div> </li> ';
return new String($out);
});