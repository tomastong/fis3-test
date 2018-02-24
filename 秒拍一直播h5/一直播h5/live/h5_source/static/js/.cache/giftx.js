/*TMODJS:{"version":1,"md5":"274cf560f15bfa28a0119747913f3956"}*/
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
});