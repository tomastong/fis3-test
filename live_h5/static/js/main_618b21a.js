!function(i,n){function o(o,h){var e=n(i).height(),r=n(i).width();if(android||1==shareConfig.sObj.vscreen){h.width("102.2%");var t=Math.round(640*r/360);h.height(t>=e?t:e),h.css({marginTop:-(t-e),marginLeft:"-1.1%",marginRight:"-1.1%"})}else{h.width("100%");var t=Math.round(360*r/640);h.height(t).css({marginTop:"2.55rem"})}o.height(e)}var h=n(".vod-box-pl"),e=n(window).height();n(function(){o(h,n("video")),n(window).on("resize",function(){o(h,n("video")),android&&e-n(window).height()<10&&n(".input").blur()})})}(window,jQuery);