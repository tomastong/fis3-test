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
 
 	// 运行豪华礼物动画接口
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

	//普通礼物特效
	gift.common = (function(){

		// 1：ff6907,
		// 2: 66d6e3,66a9e3
		// 3: 689ae3,706fe3
		// 4: f86935,f73721
		// 5: ffa700,
		var common = {};
		common.image = new Image();  //爆炸效果图片
		common.ready = false;
		common.image.onload = function(){
				common.ready = true;
			};
		image.src = "boom.png";

		step = 80;
		length = 8;


		return function(canvas){
			var startTime;
			var ctx = canvas.getContext("2d");
			var X = 240;
			var Y = 0;
			var stepX = 0;
			var stepY = 160;
			var cur = 0;
			var tar = 9999;
			var index=index1=0;

			canvas.width = 360;
			canvas.height = 160;

			ctx.font = 'normal 53px arial,"Microsoft YaHei"';
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "rgba(255,0,0,1)";
			ctx.strokeStyle = "rgba(255,255,255,1)";
			ctx.lineWidth = 10;
			// ctx.shadowColor = "#fff";
			// ctx.shadowBlur = 10;
			// 


			requestAnimFrame(play);

			function play(timestamp){
				if(!startTime){
					startTime = timestamp;
				}

				index = Math.floor((timestamp - startTime)/step)%length;

				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
	    		ctx.drawImage(image, X, Y, 120, 160, 120, 0, 120, 160);	
	    		if(index == 0 && index1 == 0){
	    			if(tar - cur >=10){
		    			cur += 10;
		    		}else if(tar - cur < 10 && tar > cur){
		    			cur += 1;
		    		}else{
		    			cur = tar;
		    		}

		    		 index1 = 1;

	    		}
	    		if(index == 7){
	    			index1 = 0;
	    		}
	    		
	    		ctx.font =  'normal ' + (53 + index*7) + 'px arial,"Microsoft YaHei"';
	    		ctx.strokeText("X"+cur, 180, 80);

	    		ctx.fillText("X"+cur, 180, 80);

	    		Y = stepY*index;	

		    	requestAnimFrame(play);
		    }
		
		}

	})();


	//神豪入场特效
	gift.enter = (function(){

		var enter = {
			ctx: null,
			canvas: null,
			type: null,
			width: 750,
			height: 1332

		};
		
		
		enter.animate = function(canvas, option, callback){
			var startTime ;

			
			if(canvas.getContext('2d')){
				enter.ctx = canvas.getContext('2d');
			}else{
				if(callback){
					callback(new Error("this is not a canvas element"));
				}
				return;
			}
			enter.canvas = canvas;
			enter.type = option.type;
			
			avatar.image = new Image();
			avatar.ready = false;
			avatar.image.onload = function(){
				avatar.ready = true;
			}
			avatar.image.src = option.avatar;

			canvas.width = enter.width;
			canvas.height = enter.height;
			canvas.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

			if(enter.load == true){
				requestAnimFrame(play);
			}else{
				var hostname = location.hostname.indexOf("test1") == -1 ? "static.yizhibo.com" : "teststatic.yizhibo.com";
				gift._getBinaryContent("//" + hostname+ "/js/libs/gift/zips/enter.zip", function(err, data) {
				    if(err) {
				    	 enter.load = false;
				    	 if(callback){
				    	 	callback(err); // or handle err
				    	 }
				        
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
						    if(callback){
						    	callback(e);
						    }
						    
						    
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
					enter.ctx.clearRect(0, 0, enter.width, enter.height);
					ctrl.draw(runTime);
					back.draw(runTime);
					light.draw(runTime);
					avatar.draw(runTime);
					switch(enter.type){
						case 1:
							star.draw(runTime);       	//明星入场
							break;
						case 2:
							shenhao.draw(runTime);		//神豪入场
							break;
					};
					requestAnimFrame(play);

				}
		    	else{

		    		enter.ctx.clearRect(0, 0, enter.width, enter.height);
		    		enter.canvas.style.backgroundColor = "transparent";
		    		if(callback){
		    			callback();
		    		}
		    		
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
				}
				enter.ctx.drawImage(this.images[index], this.X, this.Y);
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
				enter.ctx.drawImage(this.images[index], this.X, this.Y);
				
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

					var ctx = enter.ctx;
					ctx.save();
					ctx.translate(220, -25);
					ctx.scale(2, 2);
					ctx.rotate(-this.angle);
					ctx.drawImage(this.images[0], -220, -25);

					ctx.restore();
					ctx.save();
					ctx.translate(530, -25);
					ctx.scale(2, 2);
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
					 
					 var ctx = enter.ctx;
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
					var ctx = enter.ctx;
					ctx.save();
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
				startTime: 6960,
				interval: 40,
				opacity: 1,
				draw: function(t){
					if(t > this.startTime){
						var index = parseInt((t - this.startTime)/this.interval);
						this.opacity = 1 - index/25;
					}else{
						this.opacity = 1;
					}

					enter.canvas.style.opacity = this.opacity;
				}
		};

		return enter.animate;


	})();


	
	window.canvasgift = gift;


})();