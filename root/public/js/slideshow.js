
function scrollSlide(setting){
 	
	this.sc = setting['sc'];
	this.mi = setting['mi'];
	this.mc = setting['mc'];
	this.mw = setting['mw'];
	this.resize = setting['resize'] || false; // should always be true;or code should be revised
	this.wsize = setting['wsize'];	 
	this.autoplayer = setting['autoplayer']||0;
	this.loadingId = null;
	this.inited = false;
	this.process = setting['process'] || false;
	
	var wrapper = _$(this.mw);
	wrapper.style.width  = this.wsize.width +'px';
	wrapper.style.position ='relative';

	var container  =  _$(this.sc);
	this.currentHover = container.getElementsByTagName('li')[0];
	var	conwidth = parseInt(container.offsetWidth),
		showsize = Math.floor(conwidth/parseInt(this.currentHover.offsetWidth));
	this.row = Math.ceil((container.getElementsByTagName('li').length)/showsize); 	
	var next = 'slideNext',
		pre  = 'slidePre';
	if(this.row > 1){
		next = 'scrollRight',
		pre  = 'scrollLeft';
		this.currentRow = 0;
		container.getElementsByTagName("ul")[0].style.width = this.row*conwidth  + "px"; 
	}
	container.style.left = (parseInt(container.parentNode.offsetWidth) - conwidth)/2 +"px";
	Min.event.bind(Min.dom.pre(container),'click',Min.obj.methodReference( this , pre));
	Min.event.bind(Min.dom.next(container),'click',Min.obj.methodReference( this , next));
	 
	if (setting["loadingImg"] != '') {
		var lc = document.createElement('DIV'),
			loadingText = setting["loadingText"] || 'Loading ...';
		 lc.style.position = 'absolute';
		 lc.style.visibility = 'hidden';
		 lc.className = 'MagicZoomLoading';
		 lc.style.display = 'block';
		 lc.style.textAlign = 'center';
		 lc.innerHTML = loadingText + '<br/><img border="0" alt="' + loadingText + '" src="' + setting["loadingImg"] + '"/>';
		 this.loadingId = lc.id = 'loading'+ Math.round(Math.random() * 1000000);
		wrapper.appendChild(lc);
		lc.style.left = (this.wsize.width / 2 - parseInt(lc.offsetWidth) / 2) + 'px';
		lc.style.top = (this.wsize.height / 2 - parseInt(lc.offsetHeight) / 2) + 'px';
	}
	if(this.autoplayer>0){
		this._autoplay = setInterval(Min.obj.methodReference(this,'slideNext'),this.autoplayer);
		Min.event.bind(_$(this.mc),'mouseover',Min.obj.methodReference( this , 'stop'));
		Min.event.bind(_$(this.mc),'mouseout',Min.obj.methodReference( this , 'run'));	
	}
	
};

scrollSlide.prototype.scrollLeft = function(){
	if( this.currentRow>0)
	{
		this.currentRow--;
		_$(this.sc).getElementsByTagName("ul")[0].style.marginLeft="-"+this.currentRow*parseInt(_$(this.sc).offsetWidth)+"px";
	}
};

scrollSlide.prototype.scrollRight = function(){
	if(this.currentRow +1< this.row)
	{
		this.currentRow++;
		_$(this.sc).getElementsByTagName("ul")[0].style.marginLeft="-"+this.currentRow*parseInt(_$(this.sc).offsetWidth)+"px";
		
	}
};
scrollSlide.prototype.slidePre = function(){
	this.stop();
	var container  =  _$(this.sc).getElementsByTagName('li'),
		len = container.length,
		tmp;
		
	if( this.currentHover == container[0]){
		tmp = container[len-1];
	}else{
		tmp = Min.dom.pre(this.currentHover);
	}
	this.replaceSlide({delegateEvent:tmp});
	setTimeout(Min.obj.methodReference(this,'run'),1000);

};
scrollSlide.prototype.slideNext = function(e){
	 
	this.stop();
	var container = _$(this.sc).getElementsByTagName('li'),
		len = container.length,
		tmp;
		
	if( this.currentHover == container[len-1]){
		tmp = container[0];
	}else{
		tmp = Min.dom.next(this.currentHover);
	}
	this.replaceSlide({delegateEvent:tmp});
	if( e && e.type == "click"){
		setTimeout(Min.obj.methodReference(this,'run'),2000);
	}else{
		this.run();
	}
};
scrollSlide.prototype.replaceSlide = function(e,skip){
	skip = skip || false;
	var ael = e.delegateEvent;
	if(ael == this.currentHover){
		Min.event.stopPropagation(e);
		return false;
	}
	clearInterval(this.process_run);
	this.currentHover.className='';
	ael.className="tsSelectImg";
	this.currentHover = ael;
    _$(this.mi).src = ael.getAttribute("mi");
	 if(this.resize) this.tsScrollResize();
	 if(this.process == true){
	 var span =ael.getElementsByTagName('span')[0];
		 span.style.width = '0%';
		if( e.type != undefined ){	 
			span.style.width = '100%';	
		}else{
			var t = Math.floor((this.autoplayer-1000)/25);
			this.process_run = setInterval( Min.obj.methodReference(this,'progress'), t);
		}
	}
	 if(!skip){
		this.init();
	}
	 return true;
};
scrollSlide.prototype.progress = function(){
	var wt = parseInt(this.currentHover.getElementsByTagName('span')[0].style.width);
	if(wt<100){
		this.currentHover.getElementsByTagName('span')[0].style.width = (wt+4)+'%';
	}else{
		clearInterval(this.process_run);
	}
		
}
scrollSlide.prototype.init = function(){

	var l =_$(this.loadingId),
		m =_$(this.mi);
		if( !Min.obj.imgLoad([m], this) ){
			if(l) l.style.visibility = 'visible';
			return ;
		}
	
	if (l) l.style.visibility = 'hidden';
	_$(this.mc).style.width = m.offsetWidth + 'px';
	
	if(this.inited == true){
		return;
	}
	this.inited = true;
	Min.event.bind(_$(this.sc),  'mouseover', {handler: Min.obj.methodReference(this, "navHover"),selector:'li'});
	Min.event.bind(_$(this.sc),  'mouseout', {handler: Min.obj.methodReference(this, "run")});

};
scrollSlide.prototype.stop = function(e){
	if(this.autoplayer>0){
	   clearInterval(this._autoplay);
	}		
};
scrollSlide.prototype.run = function(e){
	if(this.autoplayer>0){
	  clearInterval(this._autoplay);
	    this._autoplay = setInterval(Min.obj.methodReference(this,'slideNext'),this.autoplayer);
	}		
};
scrollSlide.prototype.navHover = function(e){
	this.stop();
	this.replaceSlide(e);	
};
scrollSlide.prototype.tsScrollResize = function(){
		var imgNew = new Image();
		imgNew.src = _$(this.mi).src;

		if ( !Min.obj.imgLoad([imgNew],this,'tsScrollResizeHd',[imgNew]) ){
		} else {
			this.tsScrollResizeHd(null,imgNew);
		}
};

scrollSlide.prototype.tsScrollResizeHd = function(e,imgNew){	

	var maxWidth	= this.wsize.width;
	var maxHeight	= this.wsize.height;
	var Ratio = 1;
	var w = imgNew.width;
	var h = imgNew.height;
	var wRatio = maxWidth / w;
	var hRatio = maxHeight / h;
	if (maxWidth == 0 && maxHeight == 0) {
		Ratio = 1;
	} else if (maxWidth == 0) {
		if (hRatio < 1) Ratio = hRatio;
	} else if (maxHeight == 0) {
		if (wRatio < 1) Ratio = wRatio;
	} else if (wRatio < 1 || hRatio < 1) {
		Ratio = (wRatio <= hRatio ? wRatio: hRatio);
	}
	if (Ratio < 1) {
		w = w * Ratio;
		h = h * Ratio;
	}
	
	if(h%2!=0) h=h-1;

	var myimg = _$(this.mi), tsImgsBox = _$(this.mw);
	myimg.height = h; myimg.width = w;

	if(myimg.height<maxHeight){
		var TopBottom=(maxHeight-myimg.height)/2;
		 tsImgsBox.style.paddingTop=Math.floor(TopBottom)+"px";
		 tsImgsBox.style.paddingBottom=Math.ceil(TopBottom)+"px";
	} else {
	 	tsImgsBox.style.paddingTop="0px";
		 tsImgsBox.style.paddingBottom="0px";
	}
};
