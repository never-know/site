var MagicZoom_ua = 'msie';
var W = navigator.userAgent.toLowerCase();
if (W.indexOf("opera") != -1) {
    MagicZoom_ua = 'opera'
} else if (W.indexOf("msie") != -1) {
    MagicZoom_ua = 'msie'
} else if (W.indexOf("safari") != -1) {
    MagicZoom_ua = 'safari'
} else if (W.indexOf("mozilla") != -1) {
    MagicZoom_ua = 'gecko'
}
function MagicZoom_addEventListener(obj, event, listener) {
	if(!obj) return;
    if (MagicZoom_ua == 'gecko' || MagicZoom_ua == 'opera' || MagicZoom_ua == 'safari') {
        try {
            obj.addEventListener(event, listener, false)
        } catch(e) {
            alert("MagicZoom error: " + e + ", event=" + event)
        }
    } else if (MagicZoom_ua == 'msie') {
        obj.attachEvent("on" + event, listener)
    }
};
function MagicZoom_removeEventListener(obj, event, listener) {
	if(!obj) return;
    if (MagicZoom_ua == 'gecko' || MagicZoom_ua == 'opera' || MagicZoom_ua == 'safari') {
        obj.removeEventListener(event, listener, false)
    } else if (MagicZoom_ua == 'msie') {
        obj.detachEvent("on" + event, listener)
    }
};

function _$(id){
		if (!document.getElementById) return false;
		return document.getElementById(id);
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
 //console.log(obj);
 var tmp= getPreElement(obj.parentNode).getElementsByTagName('em')[0];
 //console.log(tmp);
 tmp.onclick=function(){selectmore(this)};
 
 obj.parentNode.parentNode.parentNode.removeAttribute('style');
  hidemore(getPreElement(obj.parentNode).getElementsByTagName('span')[0]);
 obj.parentNode.parentNode.removeChild(obj.parentNode);
 }
 

 