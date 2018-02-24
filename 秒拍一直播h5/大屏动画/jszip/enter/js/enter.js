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

	var enter = {};
	var ctx = null;
	var canvas = null;

	//检测浏览器是否支持canvas和requestAnimationFrame
	enter.support = (function(){				
    	return (!!document.createElement('canvas').getContext) && (!!(window.requestAnimationFrame	|| window.webkitRequestAnimationFrame  || window.mozRequestAnimationFrame || window.msRequestAnimationFrame));
	})();

	enter._getBinaryContent = (function(){
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

	enter.animate = function(canvas, option, callback){
		ctx = canvas.getContext('2d');
		canv = canvas;
		var width = 750;
		var height = 1332;

		var startTime ;
		
		avatar.image = new Image();
		avatar.ready = false;
		avatar.image.onload = function(){
			avatar.ready = true;
		}
		avatar.image.src = option.url;

		canvas.width = width;
		canvas.height = height;
		canvas.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

		if(enter.load == true){
			requestAnimFrame(play);
		}else{
			enter._getBinaryContent("enter.zip", function(err, data) {
			    if(err) {
			    	 enter.load = false;
			        callback(err); // or handle err
			        return;
			    }
			    var zip = new JSZip();
			    zip.loadAsync(data)
			    .then(function(zip){
			    	var starFs = (zip.file(/^mingxing\/[0-9]{1,}.png$/));
			    	var shenhaoFs = (zip.file(/^shenhao\/[0-9]{1,}.png$/));
			    	var lightFs = (zip.file(/^light\/[0-9]{1,}.png$/));
			    	var backFs = (zip.file(/^back\/[0-9]{1,}.png$/));

			    	var promiseList = [];

			    	sortFs(starFs);
			    	sortFs(shenhaoFs);
			    	sortFs(lightFs);
			    	sortFs(backFs);

			    	for(var i = 0; i<starFs.length; i++){
			    		promiseList.push(starFs[i].async("base64"));

			    	}
			    	for(var i = 0; i<shenhaoFs.length; i++){
			    		promiseList.push(shenhaoFs[i].async("base64"));

			    	}
			    	for(var i = 0; i<lightFs.length; i++){
			    		promiseList.push(lightFs[i].async("base64"));

			    	}
			    	for(var i = 0; i<backFs.length; i++){
			    		promiseList.push(backFs[i].async("base64"));

			    	}

				   return JSZip.external.Promise.all(promiseList)
				    .then(function(list){
				    	list = list.map(function(item, index, array){
				    		var img = new Image();
				    		img.src = "data:image/png;base64," + item;
				    		return img;
				    	});
				    	star.images = list.splice(0, starFs.length);
				    	shenhao.images = list.splice(0, shenhaoFs.length);
				    	light.images = list.splice(0, lightFs.length);
				    	back.images = list.splice(0, backFs.length);
				    },function error(e) {
					    // handle the error
					    enter.load = false;
					    zip = null;
					    
					});

			    })
			    .then(function(){
			   		requestAnimFrame(play);
					
			    })
				.then(function(){
					enter.load = true;
					zip = null;

				},function error(e) {
					    // handle the error
					    enter.load = false;
					    zip = null;
					    callback(e);
					    
				});  

			});
		}


		function play(timestamp){
			if(!startTime){
				startTime = timestamp;
			}
			var runTime = timestamp - startTime;
			// console.log(runTime);
			
			if(runTime <= 8000){
				ctx.clearRect(0, 0, width, height);
				ctrl.draw(runTime);
				back.draw(runTime);
				light.draw(runTime);
				avatar.draw(runTime);
				star.draw(runTime);
				// shenhao.draw(runTime);
				// 
				requestAnimFrame(play);

			}
	    	else{

	    		ctx.clearRect(0, 0, width, height);
	    		canvas.style.backgroundColor = "transparent";
	    		callback();
	    	}			
		}

		function sortFs(files){
			files.sort(function(v1, v2){
				v1 = v1.name.match(/([0-9]+)\.png/)[1];
	    		v2 = v2.name.match(/([0-9]+)\.png/)[1];
	    		v1 = parseInt(v1);
	    		v2 = parseInt(v2)
	    		return v1 - v2;
			});
		}

	}
	var star = {
		images: [],
		X: 125,
		Y: 310,
		interval: 40,
		draw: function(t){
			var index = Math.floor(t/this.interval);

			if(index >= this.images.length){
				index = this.images.length-1;
				// console.log(t);
			}
			// ctx.globalAlpha = ctrl.opacity;
			ctx.drawImage(this.images[index], this.X, this.Y);
		}
	};
	var shenhao = {
		images:[],
		X: 123,
		Y: 308,
		interval: 40,
		draw: function(t){
			var index = Math.floor(t/this.interval);

			if(index >= this.images.length){
				index = this.images.length-1;
			}
			// ctx.globalAlpha = ctrl.opacity;
			ctx.drawImage(this.images[index], this.X, this.Y);
			
		}
	};
	var light = {
		images:[],
		startTime: 2400,
		interval: 100,
		step: 0.5233,
		angle: 0,
		draw: function(t){
			if(t > this.startTime){
				var index = parseInt((t - this.startTime)/this.interval);

				
				if(index < 16){
					this.angle = 15*Math.PI/180*(Math.sin(index*Math.PI/15 - Math.PI/2)+1)/2;
				}

				if(index >= 20 && index < 45){
					index -= 5;
					this.angle = 15*Math.PI/180*(Math.sin(index*Math.PI/30));
				
				}

				ctx.save();
				// ctx.globalAlpha = ctrl.opacity;
				ctx.translate(220, 0);
				ctx.scale(1.5, 1.5);
				ctx.rotate(-this.angle);
				ctx.drawImage(this.images[0], -220, -25);

				ctx.restore();
				ctx.save();
				// ctx.globalAlpha = ctrl.opacity;
				ctx.translate(530, 0);
				ctx.scale(1.5, 1.5);
				ctx.rotate(this.angle);
				ctx.drawImage(this.images[1], -530, -25);
				ctx.restore();
			}

		}
	};
	var back = {
		images:[],
		startTime: 2400,
		interval: 100,
		opacity: 1,
		draw: function(t){
			if(t > this.startTime){
				var index = parseInt((t - this.startTime)/this.interval); 

				 this.opacity = (Math.cos(index/10*Math.PI) + 1)/2;
				 // console.log(this.opacity);

				 ctx.save();
				 ctx.globalAlpha = this.opacity ;
				 ctx.drawImage(this.images[0], 0, 0);
				 ctx.globalAlpha = 1-this.opacity;
				 ctx.drawImage(this.images[1], 0, 0);
				 ctx.restore();
			}

		}
	};

	

	var avatar = {
		X: 285,
		Y: 392,
		r: 92,
		image: "",
		ready: false,
		draw:function(t){
			if(this.ready == true){
				ctx.save();
				// ctx.globalAlpha = ctrl.opacity;
			    ctx.beginPath();
			    ctx.arc(this.X + this.r, this.Y + this.r, this.r, 0, 2*Math.PI); 
			    ctx.fillStyle = "#fff";
			    ctx.closePath();
			    ctx.fill();
			    ctx.globalCompositeOperation="source-atop";
			    ctx.drawImage(this.image,0,0,this.image.width, this.image.height,this.X, this.Y,this.r*2,this.r*2);
			    ctx.restore();

			}
		}
	};

	var ctrl = {
			startTime: 7000,
			interval: 40,
			opacity: 1,
			draw: function(t){
				if(t > this.startTime){
					var index = parseInt((t - this.startTime)/this.interval);
					this.opacity = 1 - index/25;
				}else{
					this.opacity = 1;
				}

				canv.style.opacity = this.opacity;
			}
	};

	window.enter = enter;


})();