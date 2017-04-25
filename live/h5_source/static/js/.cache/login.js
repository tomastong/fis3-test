/*TMODJS:{"version":1,"md5":"5322abd781fb838550280b37a2069c63"}*/
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
});