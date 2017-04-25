/*TMODJS:{"version":4,"md5":"3becccae3122a1614bf8d518779426b1"}*/
template('gift',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="mui-slider-group"> ';
$each(data,function(value,i){
$out+=' ';
if(i % 8 == 0){
$out+=' <div class="mui-slider-item"></div> ';
}else{
$out+=' <div class="mui-slider-item"> <div class="elem" data-giftid="';
$out+=$escape(value.giftid);
$out+='"> <figure> <div class="';
$out+=$escape(value.isbursts ? 'lian' : '');
$out+='"></div> <img src="';
$out+=$escape(value.cover);
$out+='" style="width: 1.33333rem;"> <p class="gift-name">';
$out+=$escape(value.name);
$out+='</p> <p>';
$out+=$escape(value.goldcoin);
$out+='个金币</p> </figure> </div> </div> ';
}
$out+=' ';
});
$out+=' </div> <div class="mui-slider-indicator pagination"> ';
$each(data,function(value,i){
$out+=' ';
if(i % 8 == 0){
$out+=' <div class="mui-indicator"></div> ';
}
$out+=' ';
});
$out+=' </div> ';
return new String($out);
});