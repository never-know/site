function MagicZoom(settings) {

	this.lcsize = {w:390,h:390};
    this.pup = false;
    this.positionX = 0;
    this.positionY = 0;
	this.index = -1;
	this.baseuri = '';
    this.inited = false;
	this.bind = false;
    this.checkcoords_ref = Min.obj.methodReference(this, "checkcoords");
	this.scroll = new scrollSlide(settings);
	MagicZoom.helper.zooms.push(this);

	this.initPopup();
    Min.event.bind(_$(this.scroll.mc), "mousemove", Min.obj.methodReference(this, "mousemove"));
	
};
MagicZoom.prototype.checkcoords = function(e) {

	var	z =  Min.event.getEventCoords(e),
		m =  this.container.getElementsByTagName('img')[0],
		r =  Min.dom.getBounds(m);

    if (z.x > (r.left + m.width ) || z.x < r.left || z.y > (r.top + m.height) || z.y < r.top) {
        this.hiderect();
        return false
    }
	this.showrect();
    return true;
};
MagicZoom.prototype.mousemove = function(e) {
	
	if( this.scroll.inited == false ) return;
	if( this.scroll.currentHover.getAttribute('loaded') != "2" ) return;
	
	if(this.inited == false){
		this.init();
	}
	
    var z = Min.event.getEventCoords(e),
		m = this.container.getElementsByTagName('img')[0],
		r = Min.dom.getBounds(m),
		popupSizeX = parseInt(this.pup.style.width),
		popupSizeY = parseInt(this.pup.style.height);
		
    this.positionX = z.x - r.left;
    this.positionY = z.y - r.top;

    if ((this.positionX + popupSizeX / 2) >=  m.width) {
        this.positionX =  m.width -  popupSizeX / 2
    }
    if ((this.positionY +  popupSizeY / 2) >=  m.height) {
        this.positionY =  m.height -  popupSizeY / 2
    }
    if ((this.positionX -  popupSizeX / 2) <= 0) {
        this.positionX =  popupSizeX / 2
    }
    if ((this.positionY -  popupSizeY / 2) <= 0) {
        this.positionY = popupSizeY / 2
    }

	if(this.bind == false){
		this.bind = true;
		Min.event.bind(window.document, "mousemove", this.checkcoords_ref);
	}

};
MagicZoom.prototype.showrect = function() {

	var mimage = this.container.getElementsByTagName('img')[0],
		lcont =  this.container.getElementsByTagName('div')[0],
		limage;
		
	var tag = mimage, smallY=0, smallX=0;
	     while (tag != _$(this.scroll.mc) ) {
            smallY += tag.offsetTop;
            smallX += tag.offsetLeft;
            tag = tag.offsetParent
        }
		
	var left = this.positionX  - parseInt(this.pup.style.width) / 2,
		top = this.positionY   - parseInt(this.pup.style.height) / 2;
    this.pup.style.left = left + smallX  + 'px';
    this.pup.style.top =  top + smallY  + 'px';
    this.pup.style.visibility = "visible";
	lcont.style.display = 'block';
	lcont.style.visibility = 'visible';
	lcont.style.left = '';
	if( limage = this.container.getElementsByTagName('img')[1]){
		limage.style.display = 'block';
		limage.style.visibility = 'visible';
	}
	if( this.container.getAttribute('lcloaded') == "2"){
		var perX = left * (limage.width/ mimage.width),
			perY = top * (limage.height/mimage.height);
			limage.style.left = ( - perX) + 'px';
			limage.style.top = ( - perY) + 'px';
	}

};
MagicZoom.prototype.hiderect = function() {

	var mimage = this.container.getElementsByTagName('img')[0],
		lcont  = this.container.getElementsByTagName('div')[0];
    if (this.pup) {
        this.pup.style.visibility = "hidden"
    }
	lcont.style.left = '-10000px';
	lcont.style.visibility = 'hidden';
	this.bind = false;
	this.inited = false;
	Min.event.unbind(window.document, "mousemove", this.checkcoords_ref);

};
MagicZoom.prototype.recalculatePopupDimensions = function() {

	var mi = this.container.getElementsByTagName('img')[0],
		li = this.container.getElementsByTagName('img')[1],
		popupSizeX = this.lcsize.w * mi.width / li.width,
		popupSizeY = this.lcsize.h * mi.height / li.height; 

    this.pup.style.width =  Math.min( popupSizeX , mi.width) + 'px';
    this.pup.style.height = Math.min( popupSizeY , mi.height) + 'px';
	
};
MagicZoom.prototype.initPopup = function() {

    this.pup = document.createElement("DIV");
    this.pup.className = 'MagicZoomPup';
	var mcont = _$(this.scroll.mc);
    mcont.appendChild(this.pup);
    mcont.unselectable = "on";
    mcont.style.MozUserSelect = "none";
    mcont.onselectstart = MagicZoom.helper.ia;
    mcont.oncontextmenu = MagicZoom.helper.ia;
};

MagicZoom.prototype.init = function() {

	if(this.inited == true) return;
	this.inited = true;
	var index = this.scroll.currentHover.getAttribute('data-index');
	if( this.index == index ) return;
	this.index = index;
	this.container =  _$(this.scroll.mc).getElementsByTagName('li')[index];
	var lcloaded = this.container.getAttribute('lcloaded')||false;

	if(!lcloaded){
		var lcont  = document.createElement("DIV");
			lcont.className = "MagicZoomBigImageCont";
			lcont.style.width = this.lcsize.w+"px";
			lcont.style.height = this.lcsize.h+"px";
			this.container.appendChild(lcont);
			var inner = (Min.UA.isIE?'<iframe style="left:0px;top:0px;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);width:'+this.lcsize.w+'px;height:'+this.lcsize.h+'px;" frameborder="0"></iframe>':'')+'<div style="overflow: hidden;"></div>';
			lcont.innerHTML= inner;
			this.container.setAttribute('lcloaded','1');
		
		var newImage = document.createElement("IMG");
			newImage.src = this.scroll.currentHover.getAttribute("bi");
		if(!Min.obj.imgLoad([newImage])){
				var self = this;
			Min.event.bind( newImage,'load',{ handler:function(){
			
				lcont.getElementsByTagName('div')[0].appendChild(this);
				lcont.parentNode.setAttribute('lcloaded',"2");
				self.scroll.currentHover.removeAttribute('bi');
				if(self.scroll.currentHover.getAttribute('data-index') == index){
					self.recalculatePopupDimensions();
				}
			} });
		}else{
			lcont.getElementsByTagName('div')[0].appendChild(newImage);
			this.container.setAttribute('lcloaded',"2");
			this.scroll.currentHover.removeAttribute('bi');
		
		}
	}
	var newload = this.container.getAttribute('lcloaded');
	if( newload == "2"){
		this.recalculatePopupDimensions();
	}else{
		var mimage = this.container.getElementsByTagName('img')[0];
			this.pup.style.width = parseInt(mimage.width/2) + "px";
			this.pup.style.height = parseInt(mimage.height/2) + "px";
	}
	 
};

MagicZoom.helper = {
	zooms : [],
	ia : function(){
		return false;
	}
}

Min.dom.ready( function(){
		var settings = {
			sc:'tsImgSCon',
			mc:'MagicZoom',
			mw:'MagicZoomWrapper',
			resize :{y:true,w:390,h:390}
		};
        var zoom = new MagicZoom(settings);
	}
);