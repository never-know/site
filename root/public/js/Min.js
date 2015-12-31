var Min={};
var _$ = function(id){
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
		console.log(this.hasClass(c,node));
    },

	removeClass : function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!this.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

	hasClass : function (c, node) {
        if(!node || !node.className)return false;
		var tmp = ' '+ node.className + ' ';
		c = ' ' + Min.util.trim(c) + ' ';
        return tmp.indexOf(c)>-1;
    },
	setOpacity : function(n,m){
		n.style["opacity"] = m;
		n.style["-moz-opacity"] = m;
		n.style["-html-opacity"] = m;
		n.style["filter"] = "alpha(Opacity=" + m*100 + ")";
	}

};

Min.util = {

	trim : function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    },
	sleep : function(milliSeconds){
    	var startTime = new Date().getTime(); 
    	while (new Date().getTime() < startTime + milliSeconds); 
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
			if(typeof msg == "String"){
				console.log(msg);
			}else{
				console.log( Min.util.clone(msg));
			}
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
			var r = e.getBoundingClientRect(),
				wy = this.getScrollTop(),
				wx = this.getScrollLeft();
			return {
				'left': r.left + wx,
				'top': r.top + wy,
				'right': r.right + wx,
				'bottom': r.bottom + wy
			}
		} else {
			var left=0 , top=0, node = e;
			while (node) { 
				left += node.offsetLeft;
				top  += node.offsetTop; 
				node  = node.offsetParent; 
			};
			return {
				'right'  : left + e.offsetWidth, 
				'bottom' : top  + e.offsetHeight,
				'left' : left,
				'top' : top
			}
		}
	},
	
	getScrollTop : function(node) {
		var doc = node ? node.ownerDocument : document;
		return doc.documentElement.scrollTop || doc.body.scrollTop;
	},
	
	getScrollLeft : function(node) {
		var doc = node ? node.ownerDocument : document;
		return doc.documentElement.scrollLeft || doc.body.scrollLeft;
	},
	contains : document.defaultView? 
		function (a, b) {
			return !!( a.compareDocumentPosition(b) & 16 ); 
		} : 
		function (a, b) { 
			return a != b && a.contains(b); 
	},

	clientRect : function(node) {
		var rect = this.getBounds(node), 
			sLeft = this.getScrollLeft(node), 
			sTop = this.getScrollTop(node);
		rect.left -= sLeft; 
		rect.right -= sLeft;
		rect.top -= sTop; 
		rect.bottom -= sTop;
		return rect;
	}
	
}

Min.obj = {

	extend : function (destination, source, override) {
		if (override === undefined) override = true;
		for (var property in source) {
			if (override || !(property in destination)) {
				destination[property] = source[property];
			}
		}
		return destination;
	},
	wrapper : function(me, parent) {
		var ins = function() { me.apply(this, arguments); };
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		ins.prototype = new subclass;
		return ins;
	},
	methodReference : function(object, methodName) {	 
		var args= arguments[2]||[]; 
		return  function() {
			[].push.apply(arguments, args);
			return object[methodName].apply(object, arguments);
		}
	},
	imgLoad : function(a,b,c,d){
		for(var i=0, args; args=a[i++];){
			ok = (( Min.UA.belowIE8 && args.readyState ==='complete') || (!Min.UA.belowIE8 && args.complete == true ));
			if ( args.width == 0 || args.height == 0 ||  !ok ){
				if( typeof b == 'object' && b != null ){
					c = c ||'init';
					Min.event.bind(args, "load", {handler: Min.obj.methodReference(b,c,d),once:true});
				}
				return false;
			}
		}
		return true;
	},
	each :function( object, callback ) {
		if ( undefined === object.length ){
			for ( var name in object ) {
				if (false === callback( object[name], name, object )) break;
			}
		} else {
			for ( var i = 0, len = object.length; i < len; i++ ) {
				if (i in object) { if (false === callback( object[i], i, object )) break; }
			}
		}
	}
}
 
if (typeof Array.prototype.forEach != "function") {
  Array.prototype.forEach = function (fn, context) {
    Min.obj.each( this, function(){ fn.apply(context, arguments); } );
  };
}
if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
	var arr = [];
	Min.obj.each( this, function(){ 
		arr.push(fn.apply(context, arguments)); 
	});
	return arr;
  };
}
if (typeof Array.prototype.filter != "function") {
  Array.prototype.filter = function (fn, context) {
	var arr = [];
	Min.obj.each( this, function(item){
			fn.apply(context, arguments) && arr.push(item);
		});
	return arr;
  };
}
if (typeof Array.prototype.some != "function") {
  Array.prototype.some = function (fn, context) {
	var passed = false;
	Min.obj.each( this, function(){
		if ( fn.apply(context, arguments) ){ 
			passed = true; 
			return false; 
		};
	});
	return passed;
  };
}

if (typeof Array.prototype.every != "function") {
  Array.prototype.every = function (fn, context) {
	var passed = true;
	Min.obj.each( this, function(){
		if ( !fn.apply(context, arguments) ){ 
			passed = false; 
			return false;
		};
	});
	return passed;
  };
}
if (typeof Array.prototype.indexOf != "function") {
  Array.prototype.indexOf = function (elt, from) {
	var len = this.length;
	from = isNaN(from) ? 0
		: from < 0 ? Math.ceil(from) + len : Math.floor(from);
	for ( ; from < len; from++ ) {
		if ( this[from] === elt ) return from;
	}
	return -1;
  };
}

if (typeof Array.prototype.lastIndexOf != "function") {
  Array.prototype.lastIndexOf = function (elt, from) {
	var len = this.length;
	from = isNaN(from) || from >= len - 1 ? len - 1
		: from < 0 ? Math.ceil(from) + len : Math.floor(from);
	for ( ; from > -1; from-- ) {
		if ( this[from] === elt ) return from;
	}
	return -1;
  };
}

if (Min.UA.isIE6) try {
    document.execCommand("BackgroundImageCache", false, true)
} catch(e) {};

/*

method:
var method='document|getElementsByTagName|prototype|length|apply|call|';

var css='style|removeAttribute|href|width|height|offsetWidth|offsetHeight|offsetTop|offsetBottom|top|bottom|left|right|length';

var math='floor|ceil';

var event = '';

var arr ='push|';

dom='parentNode|';

string:
var a2= 'style|px|ul|li|img|relative|absolute|';
*/
