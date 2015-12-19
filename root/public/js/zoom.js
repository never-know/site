function MagicZoom(settings) {

	this.recalculating = false;
    this.mc = settings['mc'];
	_$(this.mc).style.position="relative";
	var i = _$(this.mc).getElementsByTagName('IMG')[0];
    this.mi = i.id = "mi" + Math.round(Math.random() * 1000000);
	this.mw =settings['mw']
    this.lc = '';
    this.li = '';
    this.pup = false;
    this.positionX = 0;
    this.positionY = 0;
	
	this.baseuri = '';
    this.inited = false;
		
    this.checkcoords_ref = Min.obj.methodReference(this, "checkcoords");
	settings['mi'] =this.mi;
	this.scroll = new scrollSlide(settings);
	
	MagicZoom.helper.zooms.push(this);
	
	this.init();
	
};
MagicZoom.prototype.stopZoom = function() {
    Min.event.unbind(window.document, "mousemove", this.checkcoords_ref);
};
MagicZoom.prototype.checkcoords = function(e) {
 
    var y = 0;
    var x = 0;
    r = Min.event.getEventCoords(e);
    x = r['x'];
    y = r['y'];
    var smallY = 0;
    var smallX = 0;
    var tag = _$(this.mi);
	
    while (tag && tag.tagName != "BODY" && tag.tagName != "HTML") {
        smallY += tag.offsetTop;
        smallX += tag.offsetLeft;
        tag = tag.offsetParent
    }
	var m = _$(this.mi);
	 
    if (Min.UA.isIE) {
        r = Min.dom.getBounds(m);
        smallX = r['left'];
        smallY = r['top']
    }
	 
    if (x > parseInt(smallX + m.width)) {
        this.hiderect();
        return false
    }
    if (x < parseInt(smallX)) {
        this.hiderect();
        return false
    }
    if (y > parseInt(smallY + m.height)) {
        this.hiderect();
        return false
    }
    if (y < parseInt(smallY)) {
        this.hiderect();
        return false
    }
    if (Min.UA.isIE) {
       _$(this.mc).style.zIndex = 1
    }
    return true
};
MagicZoom.prototype.mousedown = function(e) {
    Min.event.stopPropagation(e);
   _$(this.mc).style.cursor = 'move'
};
MagicZoom.prototype.mouseup = function(e) {
    Min.event.stopPropagation(e);
    _$(this.mc).style.cursor = 'default'
};
MagicZoom.prototype.mousemove = function(e) {
	if(this.inited == false) return;
    Min.event.stopPropagation(e);
	
    for (i = 0; i < MagicZoom.helper.zooms.length; i++) {
        if (MagicZoom.helper.zooms[i] != this) {
            MagicZoom.helper.zooms[i].checkcoords(e)
        }
    }

    if (this.recalculating) {
        return
    }

    if (!this.checkcoords(e)) {
        return
    }
    this.recalculating = true;
    var smallImg = _$(this.mi);
    var smallX = 0;
    var smallY = 0;
    if ( Min.UA.isIE) {
		 r = Min.dom.getBounds(smallImg);
        smallX = r['left'];
        smallY = r['top']
        
    } else {
		var tag = smallImg;
       while (tag.tagName != "BODY" && tag.tagName != "HTML") {
            smallY += tag.offsetTop;
            smallX += tag.offsetLeft;
            tag = tag.offsetParent
        }
    }
    r = Min.event.getEventCoords(e);
    x = r['x'];
    y = r['y'];
    this.positionX = x - smallX;
    this.positionY = y - smallY;
	
	var popupSizeX = parseInt(this.pup.style.width),
		popupSizeY = parseInt(this.pup.style.height),
		smallImageSizeX = _$(this.mi).width,
		smallImageSizeY = _$(this.mi).height;
		
    if ((this.positionX + popupSizeX / 2) >=  smallImageSizeX) {
        this.positionX =  smallImageSizeX -  popupSizeX / 2
    }
    if ((this.positionY +  popupSizeY / 2) >=  smallImageSizeY) {
        this.positionY =  smallImageSizeY -  popupSizeY / 2
    }
    if ((this.positionX -  popupSizeX / 2) <= 0) {
        this.positionX =  popupSizeX / 2
    }
    if ((this.positionY -  popupSizeY / 2) <= 0) {
        this.positionY = popupSizeY / 2
    }
    setTimeout(Min.obj.methodReference(this, "showrect"), 10)
};
MagicZoom.prototype.showrect = function() {
	var  limage = _$(this.li), lcont = _$(this.lc);

    this.pup.style.left = (this.positionX - parseInt(this.pup.style.width) / 2) + 'px';
    this.pup.style.top = (this.positionY - parseInt(this.pup.style.height) / 2) + 'px';
    this.pup.style.visibility = "visible";
    perX = parseInt(this.pup.style.left) * (limage.width/ _$(this.mi).width);
    perY = parseInt(this.pup.style.top) * (limage.height/_$(this.mi).height);
	
    limage.style.left = ( - perX) + 'px';
    limage.style.top = ( - perY) + 'px';
    limage.style.display = 'block';
    limage.style.visibility = 'visible';
	lcont.style.display = 'block';
    lcont.style.visibility = 'visible';
	lcont.style.left = '390px';
    this.recalculating = false;
};
MagicZoom.prototype.hiderect = function() {
 
    if (this.pup) {
        this.pup.style.visibility = "hidden"
    }
	_$(this.lc).style.left = '-10000px';
	_$(this.lc).style.visibility = 'hidden';
    if (Min.UA.isIE) {
        _$(this.mc).style.zIndex = 0
    }
};
MagicZoom.prototype.recalculatePopupDimensions = function() {

	var miw	= _$(this.mi).width,
		mih = _$(this.mi).height,
		popupSizeX = ( parseInt(_$(this.lc).style.width) * miw )/(_$(this.li).width),
		popupSizeY = ( parseInt(_$(this.lc).style.height) * mih )/(_$(this.li).height); 

    this.pup.style.width =  Math.min( popupSizeX , miw) + 'px';
    this.pup.style.height = Math.min( popupSizeY , mih) + 'px'
};
MagicZoom.prototype.initPopup = function() {
    this.pup = document.createElement("DIV");
    this.pup.className = 'MagicZoomPup';
	var mcont = _$(this.mc);
    this.recalculatePopupDimensions();
    mcont.appendChild(this.pup);
    mcont.unselectable = "on";
    mcont.style.MozUserSelect = "none";
    mcont.onselectstart = MagicZoom.helper.ia;
    mcont.oncontextmenu = MagicZoom.helper.ia;
};
MagicZoom.prototype.initlc = function() {
  
	var lcont  = document.createElement("DIV");
	var rand = Math.round(Math.random() * 1000000);
		this.lc = lcont.id = "lc" +rand;
		lcont.className = "MagicZoomBigImageCont";
		lcont.style.width = '390px';
		lcont.style.height = '390px';
		_$(this.mw).appendChild(lcont);
		
    if (Min.UA.isIE) {
        var f = document.createElement("IFRAME");
        f.style.left = '0px';
        f.style.top = '0px';
        f.style.position = 'absolute';
        f.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
        f.style.width = lcont.style.width;
        f.style.height = lcont.style.height;
        f.frameBorder = 0;
        lcont.appendChild(f)
    }
    var ar1 = document.createElement("DIV");
    ar1.style.overflow = "hidden";
    lcont.appendChild(ar1);
	var bi = document.createElement("IMG");
    bi.src = _$(this.mc).getAttribute('href');
    bi.style.position = 'relative';
	this.li = bi.id = 'li'+rand;
    ar1.appendChild(bi)
};
MagicZoom.prototype.init = function(e) {
	console.log(11);
	if( this.li == '') this.initlc();	 
	var l =_$(this.scroll.loadingId),
		i =_$(this.li),
		m =_$(this.mi);
		if ( !Min.obj.imgLoad([i,m],this) ){ 
			console.log(22);
			if(l) l.style.visibility = 'visible';
			return ;
		}
	 
	this.inited = true;
	if(l) l.style.visibility = 'hidden';
	_$(this.mc).style.width = m.offsetWidth + 'px';
	
    if (this.pup) {
        this.recalculatePopupDimensions();
        return;
    }
    
    this.initPopup();
	console.log('zoom++++inited');
    Min.event.bind(window.document, "mousemove", this.checkcoords_ref);
    Min.event.bind(_$(this.mc), "mousemove", Min.obj.methodReference(this, "mousemove"));
	
};

MagicZoom.prototype.replaceZoom = function(e) {
	if( !this.scroll.replaceSlide(e,true)) return;
	 var ael = e.delegateEvent;
 	_$(this.li).src = ael.getAttribute("bi");
	 this.inited = false;
     this.init()
};
 
MagicZoom.helper = {
	zooms : [],
	ia : function(){
		return false;
	}
}

if (Min.UA.isIE) try {
    document.execCommand("BackgroundImageCache", false, true)
} catch(e) {};
 
Min.dom.ready( function(){
		var settings = {
			schange: 'mouseover',
			loadingText: 'Loading....',
			loadingImg: 'http://cdn.annqi.com/public/images/loading.gif',
			sc:'tsImgSCon',
			mc:'MagicZoom',
			mw:'MagicZoomWrapper',
			wsize :{width:390,height:390},
			resize:true
		};
        var zoom = new MagicZoom(settings);

		Min.event.bind(_$(settings['sc']),  settings['schange'], {handler: Min.obj.methodReference(zoom, "replaceZoom"), selector:'li'});

	}
);