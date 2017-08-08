;!(function(win, $){
    var $vod = $('.vod-box-pl'), winHeight = $(window).height();

    function setPage($figure, $video){
        var viewH = $(win).height(), viewW = $(win).width();
        if(android || shareConfig.room.vscreen==1){
          $video.width('102.2%');
          var vodH = Math.round(viewW * 640/360);
          vodH >= viewH ? $video.height(vodH):$video.height(viewH);
          $video.css({marginTop:-(vodH - viewH), marginLeft:'-1.1%', marginRight:'-1.1%'});

        }else{
          $video.width('100%');
          var vodH = Math.round(viewW * 360/640);
          $video.height(vodH).css({'marginTop':'2.55rem'})
        }
        $figure.height(viewH);
    }

    $(function(){
        FastClick.attach(document.body);
        
        setPage($vod,$('video'));
        $(window).on("resize", function(){
              setPage($vod, $('video'));
              if(android && winHeight - $(window).height() < 10)  $(".input").blur();
        });
        $('body').removeClass('hide');
    })
})(window, jQuery)