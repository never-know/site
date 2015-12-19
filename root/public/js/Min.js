var Min={};

var _$ = function(id){
		if (!document.getElementById) return false;
		return document.getElementById(id);
}



Min.cache = {

	cacheData : {},
	uuid:1,
	expando : 'cache' + ( +new Date() + "" ).slice( -8 ) ,
 
    data : function( elem, val, data ){
    if( typeof elem === 'string' ){
        if( val !== undefined ){
			this.cacheData[elem] = val;
	    }
		return this.cacheData[elem];
	}
	else if( typeof elem === 'object' ){
		// 如果是window、document将不添加自定义属性
		// window的索引是0 document索引为1
		var index = elem === window ? 0 : 
				elem.nodeType === 9 ? 1 : 
				elem[this.expando] ? elem[this.expando] : 
				(elem[this.expando] = ++this.uuid);
			
			if( this.cacheData[index] == undefined ) { 
				this.cacheData[index] = {} ;
			}
				
			if( data !== undefined ){
			// 将数据存入缓存中
				this.cacheData[index][val] = data;
			}
		// 返回DOM元素存储的数据
		return this.cacheData[index][val];
	}
},
 
removeData : function( elem, val ){
	if( typeof elem === 'string' ){
		delete this.cacheData[elem];
	}
	else if( typeof elem === 'object' ){
		var index = elem === window ? 0 :
				elem.nodeType === 9 ? 1 :
				elem[this.expando];
			
		if( index === undefined ) return;		
		// 检测对象是否为空
	
			// 删除DOM元素所有的缓存数据
			delteProp = function(){
				delete Min.cache.cacheData[index];
				if( index <= 1 ) return;
				try{
					// IE8及标准浏览器可以直接使用delete来删除属性
					delete elem[Min.cache.expando];
				}
				catch ( e ) {
					// IE6/IE7使用removeAttribute方法来删除属性(document会报错)
					elem.removeAttribute( Min.cache.expando );
				}
			};

		if( val ){
			// 只删除指定的数据
			delete this.cacheData[index][val];
		 
			if( Min.util.isEmptyObj( this.cacheData[index] ) ){
				delteProp();
			}
		}
		else{
			delteProp();
		}
	}
}

};




Min.UA = {
	
	kernel 		:   Min.cache.data('UA') || 
					Min.cache.data('UA', (function(){
						var ua = navigator.userAgent.toLowerCase();

						return   window.ActiveXObject ?  'ie':
				
								ua.indexOf("webkit") != -1 ? 'safari':

								ua.indexOf("gecko") != -1 ?  'gecko' :

								ua.indexOf("opera") != -1 ? 'opera' : 'ie';
					})()),

	belowIE8	:  !-[1,],
	
	isIE 		:  !!window.ActiveXObject,
	
	isIE6		:  !-[1,] && !window.XMLHttpRequest,

	isIE7 		:  !-[1,] && !!window.XMLHttpRequest && (!document.documentMode||document.documentMode == 7),
	
	isIE8 		:  !-[1,] && (document.documentMode==8)
	

};

Min.css = {

	addClass : function (c, node) {
        if(!node)return;
        node.className = this.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

	removeClass : function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!this.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

	hasClass : function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    }

};

Min.util = {

	trim : function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    },
	isEmptyObj : function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
	getQueryString : function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	},
	
	sleep : function(milliSeconds){
    	var startTime = new Date().getTime(); // get the current time
    	while (new Date().getTime() < startTime + milliSeconds); // hog cpu
	},
	
	checkCapslock : function(event,obj){
		var e = event||window.event;
	 
		var keyCode  =  e.keyCode||e.which;  
		var isShift  =  e.shiftKey ||(keyCode  ==   16 ) || false ;
		var itag=getNextElement(obj);	
		if (
		((keyCode >=   65   &&  keyCode  <=   90 )  &&   !isShift)
		// Caps Lock 打开，且没有按住shift键
		|| ((keyCode >=   97   &&  keyCode  <=   122 )  &&  isShift)
		// Caps Lock 打开，且按住shift键
		){  
			itag.innerHTML="&#xe648;";
			itag.style.color="red";	  
		}else{ 
			itag.innerHTML="&#xe63a;" ;
			itag.removeAttribute("style");
		}
	},
	 changeCheckbox : function() {
		var mylabel = document.getElementById('only-stock');
		if (mylabel.innerHTML == "√"){
		   mylabel.innerHTML = "&nbsp;";
		   mylabel.removeAttribute('style');
	   } else{
		   mylabel.innerHTML = "√";
			 mylabel.setAttribute('style','border-color:#a10000');
		   }
	},
	
	 
	
	clone : function(obj){  
		var o;  
		if(typeof obj == "object"){  
			if(obj === null){  
				o = null;  
			}else{  
				if(obj instanceof Array){  
					o = [];  
					for(var i = 0, len = obj.length; i < len; i++){  
						o.push( this.clone(obj[i]));  
					}  
				}else{  
					o = {};  
					for(var k in obj){  
						o[k] = this.clone(obj[k]);  
					}  
				}  
			}  
		}else{  
			o = obj;  
		}  
		return o;  
	}
	

};

Min.print ={

	debug : function(msg){
		if (console && console.log) {
			//console.log(msg);
			console.log( Min.util.clone(msg));
			
		}else{
			alert(msg);
		}
	
	},
	
	log : function(msg){
		if (console && console.log) {
			//console.log(msg);
			console.log( msg);
			
		}else{
			alert(msg);
		}
	
	}

};

Min.dom = {

 
	eventQueue : [],
 
	isReady :false,
 
 
	isBind :false,
	
	ready : function(fn){
	
		if (this.isReady) {
			fn.call(window);
		}else{
			this.eventQueue.push(fn);
		}; 
		if (!this.isBind) {
			this.bindReady();
		}
	},
 
 
	bindReady : function(){
		if (this.isReady) return;
		if (this.isBind) return;
		this.isBind = true;
	 
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded',function(){
					document.removeEventListener( 'DOMContentLoaded', arguments.callee, false );
					Min.dom.execFn();
				},false);
			window.addEventListener( "load", Min.dom.execFn, false );
		}
		else if (window.attachEvent) {
			document.attachEvent( 'onreadystatechange', function(){
					if( document.readyState === 'complete' ){
						document.detachEvent( 'onreadystatechange', arguments.callee );
						Min.dom.execFn();
					}
				});
			window.attachEvent( "onload", Min.dom.execFn );
			var top = false;
				 try {
					 top = window.frameElement == null && document.documentElement;
				 } catch(e) {}
				 if ( top && top.doScroll ) {
					this.doScroll();
				}
		};
	},
 
 
	doScroll : function(){
		try{
			document.documentElement.doScroll('left');
		}
		catch(error){
			return setTimeout(Min.dom.doScroll,5);
		};
		Min.dom.execFn();
	},
 
 
	execFn : function(){
		if (!Min.dom.isReady) {
			Min.dom.isReady = true;
			
			for (var i = 0,len = Min.dom.eventQueue.length; i < len; i++) {
			   try { 
					Min.dom.eventQueue[i].call(window);
			   }catch(e){}
			};
			delete Min.dom.eventQueue;
		};
	},
	
	next : function(element){
		var tmp = element.nextSibling;
		while( tmp!= null && tmp.nodeType!=1){
			tmp=tmp.nextSibling;
		}
		return tmp;
	},
	
	pre : function(element){
	
		var tmp = element.previousSibling;
		while( tmp!= null && tmp.nodeType!=1){
			tmp=tmp.previousSibling;
		}
		return tmp;
	},
	
	grand : function(element,level){
	
		if( level == 2 || level == undefined )
			return element.parentNode.parentNode;
		return this.grand(element.parentNode,level-1);
	},
	
	getBounds : function(e) {
		if (e.getBoundingClientRect) {
			var r = e.getBoundingClientRect();
			var wx = 0;
			var wy = 0;
			if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
				wy = document.body.scrollTop;
				wx = document.body.scrollLeft
			} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				wy = document.documentElement.scrollTop;
				wx = document.documentElement.scrollLeft
			}
			return {
				'left': r.left + wx,
				'top': r.top + wy,
				'right': r.right + wx,
				'bottom': r.bottom + wy
			}
		}
	}
	
}


Min.obj = {

	extend : function( destination , source){
			 
		for (var i in source ) {
			destination[i] = source[i];
		}
		return destination;
		
	},
	
	methodReference : function(object, methodName) {
		 
		var args= arguments[2]||[];
		 
		return  function() {
			[].push.apply(arguments, args);
			object[methodName].apply(object, arguments);
		}
	 
	 
	},
	imgLoad : function(a,b,c,d){
		for(var i=0, args; args=a[i++];){
			ok = ( args.readyState==='complete' || args.complete );
			if ( args.width == 0 || args.height == 0 ||  !ok ){
				if( typeof b === 'object' && b != null ){
					c = c ||'init';
					Min.event.bind(args, "load", {handler: Min.obj.methodReference(b,c,d),once:true});
				}
				return false;
			}
		}
		return true;
	}

}