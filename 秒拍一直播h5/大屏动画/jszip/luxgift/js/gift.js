(function(){

	var requestAnimFrame = (function(){
		return window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame  ||
		window.mozRequestAnimationFrame	 	||
		window.msRequestAnimationFrame		||
		 function(callback){
			window.setTimeout(callback,1000/60);
		};
	})();

	var gift = {};

	//检测浏览器是否支持canvas和requestAnimationFrame
	gift.support = (function(){				
    	return (!!document.createElement('canvas').getContext) && (!!(window.requestAnimationFrame	|| window.webkitRequestAnimationFrame  || window.mozRequestAnimationFrame || window.msRequestAnimationFrame));
	})();

	//礼物列表
	gift.list = {};

	//获取服务器zip包
	gift._getBinaryContent = (function(){
		var JSZipUtils = {};
		// just use the responseText with xhr1, response with xhr2.
		// The transformation doesn't throw away high-order byte (with responseText)
		// because JSZip handles that case. If not used with JSZip, you may need to
		// do it, see https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
		JSZipUtils._getBinaryFromXHR = function (xhr) {
		    // for xhr.responseText, the 0xFF mask is applied by JSZip
		    return xhr.response || xhr.responseText;
		};

		// taken from jQuery
		function createStandardXHR() {
		    try {
		        return new window.XMLHttpRequest();
		    } catch( e ) {}
		}

		function createActiveXHR() {
		    try {
		        return new window.ActiveXObject("Microsoft.XMLHTTP");
		    } catch( e ) {}
		}

		// Create the request object
		var createXHR = window.ActiveXObject ?
		    /* Microsoft failed to properly
		     * implement the XMLHttpRequest in IE7 (can't request local files),
		     * so we use the ActiveXObject when it is available
		     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
		     * we need a fallback.
		     */
		    function() {
		    return createStandardXHR() || createActiveXHR();
		} :
		    // For all other browsers, use the standard XMLHttpRequest object
		    createStandardXHR;



		JSZipUtils.getBinaryContent = function(path, callback) {
		    /*
		     * Here is the tricky part : getting the data.
		     * In firefox/chrome/opera/... setting the mimeType to 'text/plain; charset=x-user-defined'
		     * is enough, the result is in the standard xhr.responseText.
		     * cf https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest#Receiving_binary_data_in_older_browsers
		     * In IE <= 9, we must use (the IE only) attribute responseBody
		     * (for binary data, its content is different from responseText).
		     * In IE 10, the 'charset=x-user-defined' trick doesn't work, only the
		     * responseType will work :
		     * http://msdn.microsoft.com/en-us/library/ie/hh673569%28v=vs.85%29.aspx#Binary_Object_upload_and_download
		     *
		     * I'd like to use jQuery to avoid this XHR madness, but it doesn't support
		     * the responseType attribute : http://bugs.jquery.com/ticket/11461
		     */
		    try {

		        var xhr = createXHR();

		        xhr.open('GET', path, true);

		        // recent browsers
		        if ("responseType" in xhr) {
		            xhr.responseType = "arraybuffer";
		        }

		        // older browser
		        if(xhr.overrideMimeType) {
		            xhr.overrideMimeType("text/plain; charset=x-user-defined");
		        }

		        xhr.onreadystatechange = function(evt) {
		            var file, err;
		            // use `xhr` and not `this`... thanks IE
		            if (xhr.readyState === 4) {
		                if (xhr.status === 200 || xhr.status === 0) {
		                    file = null;
		                    err = null;
		                    try {
		                        file = JSZipUtils._getBinaryFromXHR(xhr);
		                    } catch(e) {
		                        err = new Error(e);
		                    }
		                    callback(err, file);
		                } else {
		                    callback(new Error("Ajax error for " + path + " : " + this.status + " " + this.statusText), null);
		                }
		            }
		        };

		        xhr.send();

		    } catch (e) {
		        callback(new Error(e), null);
		    }
		};

		return JSZipUtils.getBinaryContent;

	})();
 
 	// 运行动画接口
	gift.animate = function(canvas , option , callback){
		var ctx = canvas.getContext("2d");
		var giftid = option.giftid;
		var index = 0;
		var animationtime, length, step, imgWidth, imgHeight, imgList;
		var startTime = 0;
		

		if(!ctx){
			callback(new Error("your browser don't support canvas"));
			return false;
		}
		
		if(gift.list[giftid] && gift.list[giftid].images.length > 0){
			 animationtime = option.animationtime;
			 length = gift.list[giftid].images.length;
			 step = animationtime/length;
			 imgList =  gift.list[giftid].images;
			 imgWidth = imgList[0].width;
			 imgHeight = imgList[0].height;
			 canvas.width = imgWidth;
			 canvas.height = imgHeight;
			requestAnimFrame(play);

		}else{
			var obj = gift.list[giftid] = {};
			obj.name = option.name;
			obj.animationtime = option.animationtime; 
			obj.images = [];

			gift._getBinaryContent(option.fileurl, function(err, data) {
			    if(err) {
			    	 gift.list[giftid] = null;
			        callback(err); // or handle err
			        return;
			    }
			    var zip = new JSZip();
			    zip.loadAsync(data)
			    .then(function(zip){
			    	var files = zip.file(/^[0-9]{1,}.png$/);
			    	var promiseList = [];

			    	files.sort(function(v1, v2){
			    		return parseInt(v1.name) - parseInt(v2.name)
			    	});
			    	for(var i = 0,len = files.length;i<len;i++){
			    		promiseList.push(files[i].async("base64").then(function(data){return data}));

			    	}
				   return JSZip.external.Promise.all(promiseList)
				    .then(function(list){
				    	for(var i=0 ; i < list.length; i++){
				    		var img = new Image();
			    			img.src = "data:image/png;base64," + list[i];
			    			obj.images[i] = img;
				    	}
				    },function error(e) {
					    // handle the error
					    gift.list[giftid] = null;
					    zip = null;
					    
					});

			    })
			    .then(function(){
			   		animationtime = option.animationtime;
					length = gift.list[giftid].images.length;
					if(length >0){
						step = animationtime/length;
						imgList =  gift.list[giftid].images;
						imgWidth = imgList[0].width;
						imgHeight = imgList[0].height;
						canvas.width = imgWidth;
						canvas.height = imgHeight;
				    	requestAnimFrame(play);
					}else{
						gift.list[giftid] = null;
						throw new Error("can't find images");
					}
					
			    },function error(e) {
					    // handle the error
					    gift.list[giftid] = null;
					    zip = null;
					    // callback(e);
					    
				})
				.then(function(){
					zip = null;
				},function error(e) {
					    // handle the error
					    gift.list[giftid] = null;
					    zip = null;
					    callback(e);
					    
				});  

			});

		}

		function play(timestamp){
			if(!startTime){
				startTime = timestamp;
			}
			index = Math.floor((timestamp - startTime)/step);

			if(index < length){
				var img = imgList[index];

				ctx.clearRect(0, 0, canvas.width, canvas.height);
	    		ctx.drawImage(img, 0, 0,imgWidth,imgHeight,0,0,canvas.width,canvas.height);	
			}
			if(index >= length){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
	    		callback();
	    	}else{
	    		requestAnimFrame(play);
	    	}			
		}
	}


	
	window.canvasgift = gift;


})();