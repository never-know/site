function slideMenu(sm,mt,s){
	this.sm =sm;
	this.t = mt;
	this.sp =s;
	this.init();
};

slideMenu.prototype.init = function(e){
	var m =_$(this.sm);
	if( ! Min.obj.imgLoad(m.getElementsByTagName('img'),this,'init')){
		return;
	}
	var lis = m.getElementsByTagName('li'), l = lis.length;
	this.tw = 0;

	for(var i=0; lis[i];i++){
		var len = parseInt(lis[i].getElementsByTagName('img')[0].width);
		this.tw += len;
		lis[i].style.width = len + 'px';
	}
	if(len*l>this.tw){
		this.st=len;
		this.ot=(this.tw-len)/(l-1);
	}else{
		this.ot = len;
		this.st = this.tw-len*(l-1);
	} 
	Min.event.bind( m ,'mouseover',{ handler:Min.obj.methodReference(this,'run'),selector:'li'});
}
slideMenu.prototype.run = function(e){

	clearInterval(this.timer);
	this.timer = setInterval(Min.obj.methodReference(this,'slide',[{delegateTarget:e.delegateTarget}]),this.t);
};
slideMenu.prototype.slide = function(e){

	var s = e.delegateTarget,
		cw = parseInt(s.style.width);

	if(cw < this.st){
		var owt = 0, sa = _$(this.sm).getElementsByTagName('li');
		for(var i=0,o;o=sa[i++];){
			if( o != s ){
				var oi=0 , ow=parseInt(o.style.width);
				if(ow>this.ot){
					oi=Math.floor((ow-this.ot)/this.sp); 
					oi=(oi>0)?oi:1; 
					o.style.width=parseInt(ow-oi)+'px';
					var ss=o.getElementsByTagName('img')[0];
					ss.setAttribute('src',ss.getAttribute('small'));
				}
				owt = owt+ow-oi;
			}
		}		
		s.style.width=parseInt(this.tw-owt)+'px';
		var ssk = s.getElementsByTagName('img')[0];	 
		ssk.setAttribute('src',ssk.getAttribute('big'));
 
	}else{
		clearInterval(this.timer)
	}
};
