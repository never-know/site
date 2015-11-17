	function _$(id){
		if (!document.getElementById) return false;
		return document.getElementById(id);
	}
		function getNextElement(element){
	  //console.log(element);
		while(element.nextSibling.nodeType==3)
					{
						element=element.nextSibling;
					}
					//console.log(element);
					return element.nextSibling;
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