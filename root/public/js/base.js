var MagicZoom_ua = 'msie';
var ie_version = false;
var W = navigator.userAgent.toLowerCase();
if (W.indexOf("opera") != -1) {
    MagicZoom_ua = 'opera'
} else if (W.indexOf("msie") != -1) {
    MagicZoom_ua = 'msie';
	ie_version = W.match(/msie ([\d.]+)/)[1] ;
} else if (W.indexOf("safari") != -1) {
    MagicZoom_ua = 'safari'
} else if (W.indexOf("mozilla") != -1) {
    MagicZoom_ua = 'gecko'
}
var ie6=!-[1,]&&!window.XMLHttpRequest;

//保存domReady的事件队列
eventQueue = [];
 
//判断DOM是否加载完毕
isReady = false;
 
//判断DOMReady是否绑定
isBind = false;
 
/*执行domReady()
 *
 *@param    {function}
 *@execute  将事件处理程序压入事件队列,并绑定DOMContentLoaded
 *          如果DOM加载已经完成，则立即执行
 *@caller
 */

 
function domReady(fn){
    if (isReady) {
        fn.call(window);
    }
    else{
        eventQueue.push(fn);
    };
 
    bindReady();
};
 
/*domReady事件绑定
 *
 *@param    null
 *@execute  现代浏览器通过addEvListener绑定DOMContentLoaded,包括ie9+
            ie6-8通过判断doScroll判断DOM是否加载完毕
 *@caller   domReady()
 */
function bindReady(){
    if (isReady) return;
    if (isBind) return;
    isBind = true;
 
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded',function(){
				document.removeEventListener( 'DOMContentLoaded', arguments.callee, false );
				execFn();
			},false);
		window.addEventListener( "load", execFn, false );
    }
    else if (window.attachEvent) {
		document.attachEvent( 'onreadystatechange', function(){
				if( document.readyState === 'complete' ){
					document.detachEvent( 'onreadystatechange', arguments.callee );
					execFn();
				}
			});
        window.attachEvent( "onload", execFn );
		var top = false;
             try {
                 top = window.frameElement == null && document.documentElement;
             } catch(e) {}
             if ( top && top.doScroll ) {
				doScroll();
			}
    };
};
 
/*doScroll判断ie6-8的DOM是否加载完成
 *
 *@param    null
 *@execute  doScroll判断DOM是否加载完成
 *@caller   bindReady()
 */
function doScroll(){
    try{
        document.documentElement.doScroll('left');
    }
    catch(error){
        return setTimeout(doScroll,5);
    };
    execFn();
};
 
/*执行事件队列
 *
 *@param    null
 *@execute  循环执行队列中的事件处理程序
 *@caller   bindReady()
 */
function execFn(){
    if (!isReady) {
        isReady = true;
        for (var i = 0; i < eventQueue.length; i++) {
           try { 
		   eventQueue[i].call(window);
		   }catch(e){}
        };
        
    };
};

function _$(id){
		if (!document.getElementById) return false;
		return document.getElementById(id);
}

function print_r(msg){

	if (console && console.log) {
		console.log(msg);
	}else{
		alert(msg);
	}

}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


function MagicZoom_addEventListener(obj, event, listener) {

	if(!obj) return;
	//console.log('listener---'+listener);
	if (window.addEventListener) {
        try {
            obj.addEventListener(event, listener, false)
        } catch(e) {
           print_r("error: " + e + ", event=" + event)
        }
    }
    else if (window.attachEvent) {
		 obj.attachEvent("on" + event, listener)
	}

};
function MagicZoom_removeEventListener(obj, event, listener) {
	if(!obj) return;
    if (window.removeEventListener) {
        obj.removeEventListener(event, listener, false)
    } else if (window.detachEvent) {
        obj.detachEvent("on" + event, listener)
    }
};
function children_addEventListener(obj,tag,event,listener){
 
if(!obj) return;
var tags = obj.getElementsByTagName(tag);

if(!tags[0])return;
for ( var i=0,len=tags.length; i<len; i++){
	MagicZoom_addEventListener(tags[i],event,listener);
}

}


function getNextElement(element){
		var tmp = element.nextSibling;
		while( tmp!= null && tmp.nodeType!=1){
			tmp=tmp.nextSibling;
		}
		return tmp;
	}
function getPreElement(element){
		var tmp = element.previousSibling;
		while( tmp!= null && tmp.nodeType!=1){
		
			tmp=tmp.previousSibling;
		}
		return tmp;
}
function getGrandpaNode(element){
return element.parentNode.parentNode;
}
function sleep(milliSeconds){
    var startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}

 function checkCapslock (event,obj)
{
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
		itag.style.color="red";	  }
	else{ itag.innerHTML="&#xe63a;" ;itag.removeAttribute("style");	  }
}

function changeCheckbox() {
    var mylabel = document.getElementById('only-stock');
    if (mylabel.innerHTML == "√"){
       mylabel.innerHTML = "&nbsp;";
	   mylabel.removeAttribute('style');
   } else{
       mylabel.innerHTML = "√";
		 mylabel.setAttribute('style','border-color:#a10000');
	   }
}


function heremore(obj){
var target=getPreElement(obj);
var height=parseInt(target.offsetHeight);
var width= parseInt(target.offsetWidth);
target.style.height=2*height+'px';
target.style.width=width+20+'px';
target.style.overflow="auto";
obj.setAttribute('abcd','show');
}


function showmore(obj){
var status =obj.parentNode.getAttribute('abcd');
if(status=='show') return;
heremore(obj.parentNode);
obj.innerHTML='取消<i class="icon-right iconfont">&#xe66c;</i>';
obj.removeAttribute('onclick');
obj.onclick=function(){hidemore(obj)};
}

function hidemore(obj){
//console.log(obj);
var status = obj.parentNode.getAttribute("abcd");
if(status=='hide') return;
var target = getPreElement(obj.parentNode);
target.scrollTop=0;
target.style.cssText = '';
target.style.overflow="hidden";
obj.innerHTML='更多<i class="icon-right iconfont">&#xe66c;</i>';
obj.parentNode.setAttribute('abcd','hide');
obj.onclick=function(){showmore(obj)};
}

function selectmore(obj){
//显示列表
var pre=obj.parentNode;
var status =pre.getAttribute('abcd');
if(status =='show') {
hidemore(getPreElement(obj));
}
heremore(pre);
//关闭更多按钮 Onclick 事件

//显示BUTTON
 var bigdiv = document.createElement("DIV");
 bigdiv.className="multi-select-button";
 var subspan = document.createElement("span");
 subspan.innerHTML="取消";
 subspan.onclick =function(){hide_selectmore(this)};
 bigdiv.appendChild(subspan);
 obj.parentNode.parentNode.appendChild(bigdiv);
 obj.removeAttribute('onclick');
 obj.onclick=function(){return;};
 
 //显示border:
 
 obj.parentNode.parentNode.parentNode.style.border="2px solid silver";
 
}


 function hide_selectmore(obj){

 var tmp= getPreElement(obj.parentNode).getElementsByTagName('em')[0];

 tmp.onclick=function(){selectmore(this)};
 
 obj.parentNode.parentNode.parentNode.removeAttribute('style');
  hidemore(getPreElement(obj.parentNode).getElementsByTagName('span')[0]);
 obj.parentNode.parentNode.removeChild(obj.parentNode);
 }
 

 
 
 
function setChosen(){
// 获取事件对象  
var evt = event || window.event;  
// 获取事件触发的目标对象  
// W3C标准（非IE）： evt.target  
// IE：evt.srcElement  
var src = evt.target || evt.srcElement;  
src.style.background="silver";
		
}

function setRegion(){
var evt = event || window.event;  
var src = evt.target || evt.srcElement; 
var gf=src.parentNode.parentNode.parentNode;
getPreElement(gf).innerHTML=src.innerHTML;
var ggf = getNextElement(gf.parentNode)
if( !ggf){

	_$("shop-name").innerHTML=getPreElement(src.parentNode).innerHTML+' - '+src.innerHTML;
	 _$("region-select").removeAttribute("style");
	location.reload(true);
	
}else{
gf.parentNode.className='';
ggf.className='on';
_$("region-select").style.display="block";
}

}
function showRegion(){
var evt = event || window.event;  
var src = evt.target || evt.srcElement; 
var p=src.parentNode.parentNode;
var lis=p.getElementsByTagName('li');
for ( var i=0,len=lis.length; i<len; i++){
	lis[i].className='';
}
src.parentNode.className="on";
}
 
 
 
 
function set_arrow_focus(){
if(ie_version=='7.0'){
console.log('123');
_$('arrow-first').focus();
}
}



function shortcut_menu(){
var lis = _$('shortcut-menu').getElementsByTagName('li');
for ( var i=0,len=lis.length; i<len; i++){

lis[i].onmouseover = function(){
	if(this.className =='arrow-down'){
		this.style.cssText= "background:white;border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;border-bottom:1px solid #fff;_border-bottom:none;z-index:20; ";
		this.getElementsByTagName('span')[0].style.cssText= "border-left:1px solid #fff;border-right:1px solid #fff";
		this.getElementsByTagName('i')[0].style.display="none";
		this.getElementsByTagName('em')[0].style.display="inline";
		this.getElementsByTagName('div')[0].style.display="block";
	}
}

}

}

window.onload=function(){


 children_addEventListener(_$('abcd'),'li','click',setChosen);
 children_addEventListener(_$('region-select'),'a','click',setRegion);
 children_addEventListener(_$('region-select'),'label','click',showRegion)
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
function  clone(obj){  
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
	
 function debug(msg){
		if (console && console.log) {
			//console.log(msg);
			console.log( clone(msg));
			
		}else{
			alert(msg);
		}
	
	}
 
 
 
 
 
 