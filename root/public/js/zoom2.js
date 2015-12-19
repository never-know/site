function MagicZoom(smallImageContId, smallImageId, bigImageContId, bigImageId, settings) {
    this.recalculating = false;
    this.smallImageCont = _$(smallImageContId);
    this.smallImage = _$(smallImageId);
    this.bigImageCont = _$(bigImageContId);
    this.bigImage = _$(bigImageId);
    this.pup = 0;
    this.settings = settings;
    if (!this.settings["header"]) {
        this.settings["header"] = ""
    }
    this.bigImageSizeX = 0;
    this.bigImageSizeY = 0;
    this.smallImageSizeX = 0;
    this.smallImageSizeY = 0;
    this.popupSizeX = 20;
    this.popupSizey = 20;
    this.positionX = 0;
    this.positionY = 0;
    this.bigImageContStyleLeft = '';
    this.loadingCont = null;
    if (this.settings["loadingImg"] != '') {
        this.loadingCont = document.createElement('DIV');
        this.loadingCont.style.position = 'absolute';
        this.loadingCont.style.visibility = 'hidden';
        this.loadingCont.className = 'MagicZoomLoading';
        this.loadingCont.style.display = 'block';
        this.loadingCont.style.textAlign = 'center';
        this.loadingCont.innerHTML = this.settings["loadingText"] + '<br/><img border="0" alt="' + this.settings["loadingText"] + '" src="' + this.settings["loadingImg"] + '"/>';
        this.smallImageCont.appendChild(this.loadingCont)
    }
    this.baseuri = '';
    this.safariOnLoadStarted = false;
    MagicZoom.helper.zooms.push(this);
    this.checkcoords_ref = Min.obj.methodReference(this, "checkcoords")
};
MagicZoom.prototype.stopZoom = function() {
    Min.event.unbind(window.document, "mousemove", this.checkcoords_ref);
    if (this.settings["position"] == "custom") {
        _$(this.smallImageCont.id + "-big").removeChild(this.bigImageCont)
    }
};
MagicZoom.prototype.checkcoords = function(e) {
    var y = 0;
    var x = 0;
    r = Min.event.getEventCoords(e);
    x = r['x'];
    y = r['y'];
    var smallY = 0;
    var smallX = 0;
    var tag = this.smallImage;
    while (tag && tag.tagName != "BODY" && tag.tagName != "HTML") {
        smallY += tag.offsetTop;
        smallX += tag.offsetLeft;
        tag = tag.offsetParent
    }
	console.log(tag);
	console.log(this.smallImage);
    if (Min.UA.isIE) {
        r = Min.dom.getBounds(this.smallImage);
        smallX = r['left'];
        smallY = r['top']
    }
	console.log(this.smallImage.style.width);
	console.log(this.smallImageSizeX);
    if (x > parseInt(smallX + this.smallImageSizeX)) {
        this.hiderect();
        return false
    }
    if (x < parseInt(smallX)) {
        this.hiderect();
        return false
    }
    if (y > parseInt(smallY + this.smallImageSizeY)) {
        this.hiderect();
        return false
    }
    if (y < parseInt(smallY)) {
        this.hiderect();
        return false
    }
    if (Min.UA.isIE) {
        this.smallImageCont.style.zIndex = 1
    }
    return true
};
MagicZoom.prototype.mousedown = function(e) {
    Min.event.stopPropagation(e);
    this.smallImageCont.style.cursor = 'move'
};
MagicZoom.prototype.mouseup = function(e) {
    Min.event.stopPropagation(e);
    this.smallImageCont.style.cursor = 'default'
};
MagicZoom.prototype.mousemove = function(e) {
    Min.event.stopPropagation(e);
    for (i = 0; i < MagicZoom.helper.zooms.length; i++) {
        if (MagicZoom.helper.zooms[i] != this) {
            MagicZoom.helper.zooms[i].checkcoords(e)
        }
    }
    if (this.settings && this.settings["drag_mode"] == true) {
        if (this.smallImageCont.style.cursor != 'move') {
            return
        }
    }
    if (this.recalculating) {
        return
    }
    if (!this.checkcoords(e)) {
        return
    }
    this.recalculating = true;
    var smallImg = this.smallImage;
    var smallX = 0;
    var smallY = 0;
    if ( Min.UA.isIE) {
		 r = Min.dom.getBounds(this.smallImage);
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
    if ((this.positionX + this.popupSizeX / 2) >= this.smallImageSizeX) {
        this.positionX = this.smallImageSizeX - this.popupSizeX / 2
    }
    if ((this.positionY + this.popupSizeY / 2) >= this.smallImageSizeY) {
        this.positionY = this.smallImageSizeY - this.popupSizeY / 2
    }
    if ((this.positionX - this.popupSizeX / 2) <= 0) {
        this.positionX = this.popupSizeX / 2
    }
    if ((this.positionY - this.popupSizeY / 2) <= 0) {
        this.positionY = this.popupSizeY / 2
    }
    setTimeout(Min.obj.methodReference(this, "showrect"), 10)
};
MagicZoom.prototype.showrect = function() {
    this.pup.style.left = (this.positionX - this.popupSizeX / 2) + 'px';
    this.pup.style.top = (this.positionY - this.popupSizeY / 2) + 'px';
    this.pup.style.visibility = "visible";
    perX = parseInt(this.pup.style.left) * (this.bigImageSizeX / this.smallImageSizeX);
    perY = parseInt(this.pup.style.top) * (this.bigImageSizeY / this.smallImageSizeY);
    this.bigImage.style.left = ( - perX) + 'px';
    this.bigImage.style.top = ( - perY) + 'px';
    this.bigImageCont.style.display = 'block';
    this.bigImageCont.style.visibility = 'visible';
    this.bigImage.style.display = 'block';
    this.bigImage.style.visibility = 'visible';
    this.recalculating = false;
    this.bigImageCont.style.left = this.bigImageContStyleLeft
};
MagicZoom.prototype.hiderect = function() {
    if (this.settings && this.settings["bigImage_always_visible"] == true) return;
    if (this.pup) {
        this.pup.style.visibility = "hidden"
    }
    this.bigImageCont.style.left = '-10000px';
    this.bigImageCont.style.visibility = 'hidden';
    if (Min.UA.isIE) {
        this.smallImageCont.style.zIndex = 0
    }
};
MagicZoom.prototype.recalculatePopupDimensions = function() {
    this.popupSizeX = (parseInt(this.bigImageCont.style.width) - 0) / (this.bigImageSizeX / this.smallImageSizeX);
    if (this.settings && this.settings["header"] != "") {
        this.popupSizeY = (parseInt(this.bigImageCont.style.height) - 0 - 0) / (this.bigImageSizeY / this.smallImageSizeY)
    } else {
        this.popupSizeY = (parseInt(this.bigImageCont.style.height) - 0) / (this.bigImageSizeY / this.smallImageSizeY)
    }
    if (this.popupSizeX > this.smallImageSizeX) {
        this.popupSizeX = this.smallImageSizeX
    }
    if (this.popupSizeY > this.smallImageSizeY) {
        this.popupSizeY = this.smallImageSizeY
    }
    this.pup.style.width = this.popupSizeX + 'px';
    this.pup.style.height = this.popupSizeY + 'px'
};
MagicZoom.prototype.initPopup = function() {
    this.pup = document.createElement("DIV");
    this.pup.className = 'MagicZoomPup';
    this.pup.style.zIndex = 10;
    this.pup.style.visibility = 'hidden';
    this.pup.style.position = 'absolute';
    this.pup.style["opacity"] = parseFloat(this.settings['opacity'] / 100.0);
    this.pup.style["-moz-opacity"] = parseFloat(this.settings['opacity'] / 100.0);
    this.pup.style["-html-opacity"] = parseFloat(this.settings['opacity'] / 100.0);
    this.pup.style["filter"] = "alpha(Opacity=" + this.settings['opacity'] + ")";
    this.recalculatePopupDimensions();
    this.smallImageCont.appendChild(this.pup);
    this.smallImageCont.unselectable = "on";
    this.smallImageCont.style.MozUserSelect = "none";
    this.smallImageCont.onselectstart = MagicZoom.helper.ia;
    this.smallImageCont.oncontextmenu = MagicZoom.helper.ia;
};
MagicZoom.prototype.initBigContainer = function() {
    var bigimgsrc = this.bigImage.src;
    while (this.bigImageCont.firstChild) {
        this.bigImageCont.removeChild(this.bigImageCont.firstChild)
    }
    if (Min.UA.isIE) {
	
        var f = document.createElement("IFRAME");
        f.style.left = '0px';
        f.style.top = '0px';
        f.style.position = 'absolute';
        f.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
        f.style.width = this.bigImageCont.style.width;
        f.style.height = this.bigImageCont.style.height;
        f.frameBorder = 0;
        this.bigImageCont.appendChild(f)
    }
    var ar1 = document.createElement("DIV");
    ar1.style.overflow = "hidden";
    this.bigImageCont.appendChild(ar1);
    this.bigImage = document.createElement("IMG");
    this.bigImage.src = bigimgsrc;
    this.bigImage.style.position = 'relative';
    ar1.appendChild(this.bigImage)
};
MagicZoom.prototype.initZoom = function() {
	 
    if (this.loadingCont != null && !this.bigImage.complete && this.smallImage.width != 0 && this.smallImage.height != 0) {
        this.loadingCont.style.left = (parseInt(this.smallImage.width) / 2 - parseInt(this.loadingCont.offsetWidth) / 2) + 'px';
        this.loadingCont.style.top = (parseInt(this.smallImage.height) / 2 - parseInt(this.loadingCont.offsetHeight) / 2) + 'px';
        this.loadingCont.style.visibility = 'visible';
		
    }
	 
	
 
    if (Min.UA.kernel == 'safari') {
	
        if (!this.safariOnLoadStarted) {
		
            Min.event.bind(this.bigImage, "load",  Min.obj.methodReference(this, "initZoom"));
            this.safariOnLoadStarted = true;
            return
        }
    } else {
        if (!this.bigImage.complete || !this.smallImage.complete) {
            setTimeout(Min.obj.methodReference(this, "initZoom"), 100);
            return
        }
    }
	 
    this.bigImageSizeX = this.bigImage.width;
    this.bigImageSizeY = this.bigImage.height;
    this.smallImageSizeX = this.smallImage.width;
    this.smallImageSizeY = this.smallImage.height;
    if (this.bigImageSizeX == 0 || this.bigImageSizeY == 0 || this.smallImageSizeX == 0 || this.smallImageSizeY == 0) {
        setTimeout(Min.obj.methodReference(this, "initZoom"), 100);
        return
    }
    if (this.loadingCont != null) this.loadingCont.style.visibility = 'hidden';
    this.smallImageCont.style.width = this.smallImage.offsetWidth + 'px';
    this.bigImageCont.style.left = this.smallImage.width  + 'px';
  //  this.bigImageCont.style.top = '-1px';
    switch (this.settings['position']) {
    case 'left':
        this.bigImageCont.style.left = '-' + ( parseInt(this.bigImageCont.style.width)) + 'px';
        break;
    case 'bottom':
        this.bigImageCont.style.top = this.smallImage.height  + 'px';
        this.bigImageCont.style.left = '0px';
        break;
    case 'top':
        this.bigImageCont.style.top = '-' + ( parseInt(this.bigImageCont.style.height)) + 'px';
        this.bigImageCont.style.left = '0px';
        break;
    case 'custom':
        this.bigImageCont.style.left = '0px';
        this.bigImageCont.style.top = '0px';
        break;
    case 'inner':
        this.bigImageCont.style.left = '0px';
        this.bigImageCont.style.top = '0px';
        break
    }
    this.bigImageContStyleLeft = this.bigImageCont.style.left;
    if (this.pup) {
        this.recalculatePopupDimensions();
        return
    }
    this.initBigContainer();
    this.initPopup();
    Min.event.bind(window.document, "mousemove", this.checkcoords_ref);
     Min.event.bind(this.smallImageCont, "mousemove", Min.obj.methodReference(this, "mousemove"));
	 
    if (this.settings && this.settings["drag_mode"] == true) {
         Min.event.bind(this.smallImageCont, "mousedown", Min.obj.methodReference(this, "mousedown"));
         Min.event.bind(this.smallImageCont, "mouseup", Min.obj.methodReference(this, "mouseup"));
        this.positionX = this.smallImageSizeX / 2;
        this.positionY = this.smallImageSizeY / 2;
        this.showrect()
    }
};
MagicZoom.prototype.replaceZoom = function(e, ael) {
 
	var aels = _$(this.settings.scrollId).getElementsByTagName("li");
	var len=aels.length;
	 
	for(var i=0;i<len;i++)
	{
		 
		aels[i].className="";
	}
	ael.className="tsSelectImg";

   // if (ael.href == this.bigImage.src) return;
    var newBigImage = document.createElement("IMG");
    newBigImage.id = this.bigImage.id;
    newBigImage.src = ael.getElementsByTagName('img')[0].getAttribute("source");
    var p = this.bigImage.parentNode;
    p.replaceChild(newBigImage, this.bigImage);
    this.bigImage = newBigImage;
    this.bigImage.style.position = 'relative';
    this.smallImage.src = ael.getElementsByTagName('img')[0].getAttribute("tsImgS");
    this.safariOnLoadStarted = false;
  //  this.initZoom()
};
 

MagicZoom.helper = {
	zooms : [],
	ia : function(){
		return false;
	},
	extendElement1 : function() {
		var args = arguments;
		 
		if (!args[1]) args = [this, args[0]];
		for (var property in args[1]) args[0][property] = args[1][property];
		return args[0]
	},
	
	findSelectors : function(id, zoom) {
	
		var aels = _$(id).getElementsByTagName("li");
		for (var i = 0 ,len=aels.length ; i < len; i++) {
			
				Min.event.bind(aels[i], "click",
				function(event) {
					if ( !Min.UA.isIE ) {
						this.blur()
					} else {
						window.focus()
					}
					Min.event.stopPropagation(event);
					return false
				});
				Min.event.bind(aels[i], zoom.settings['thumb_change'], Min.obj.methodReference(zoom, "replaceZoom", aels[i]));
				
				/*
				aels[i].style.outline = '0';
			
			 
				aels[i].mzextend = MagicZoom.helper.extendElement;
				aels[i].mzextend({
					zoom: zoom,
					selectThisZoom: function() {
						this.zoom.replaceZoom(null, this)
					}
				});
				*/
		}
	},
	 

	findZooms : function( smallContId , scrollId ,size){
	 
		var aels = _$(smallContId);
		var rand = Math.round(Math.random() * 1000000);
		aels.style.position = "relative";
		aels.style.display = 'block';
		aels.style.outline = '0';
		aels.style.textDecoration = 'none';
		var fn =  function(event) {
			if (!Min.UA.isIE) {
				this.blur()
			} else {
				window.focus()
			}
			Min.event.stopPropagation(event);
			return false
		};
		Min.event.bind(aels, "click",fn);
		
		if ( Min.UA.isIE ) {
			aels.style.zIndex = 0
		}
		var smallImg = aels.getElementsByTagName('img')[0];
		smallImg.id = "sim" + rand;
		
		var bigCont = document.createElement("DIV");
		bigCont.id = "bc" + rand;
		bigCont.style.width = size.width;
		bigCont.style.height = size.height;
		bigCont.style.left = smallImg.width  + 'px';
		bigCont.style.top = '-1px';
		
		var position = 'right',
			drag_mode = false,
			bigImage_always_visible = false;
		 
		bigCont.style.overflow = 'hidden';
		bigCont.className = "MagicZoomBigImageCont";
		bigCont.style.zIndex = 100;
		bigCont.style.visibility = 'hidden';
		if (position != 'custom') {
			bigCont.style.position = 'absolute'
		} else {
			bigCont.style.position = 'relative'
		}
		var bigImg = document.createElement("IMG");
		bigImg.id = "bim" + rand;

		bigImg.src = aels.getAttribute('href');
		bigCont.appendChild(bigImg);
		if (position != 'custom') {
			aels.appendChild(bigCont)
		} else {
			_$(aels.id + '-big').appendChild(bigCont)
		}
		var settings = {
			bigImage_always_visible: false,
			drag_mode: false,
			header: '',
			opacity: 50,
			thumb_change: 'mouseover',
			position: 'right',
			loadingText: 'Loading....',
			loadingImg: 'http://cdn.annqi.com/public/images/loading.gif',
			scrollId:scrollId
		};
        var zoom = new MagicZoom( smallContId , smallImg.id , bigCont.id , bigImg.id , settings);
/*
		aels.mzextend = MagicZoom.helper.extendElement;
	 
		aels.mzextend({
			zoom: zoom
		});
		*/
 
		zoom.initZoom();
		this.findSelectors(scrollId, zoom);  
     
	}
}




/*
if (Min.UA.isIE) try {
    document.execCommand("BackgroundImageCache", false, true)
} catch(e) {};
*/
Min.dom.ready( function(){
	MagicZoom.helper.findZooms('MagicZoom','tsImgSCon',{width:'390px',height:'390px'});
	}
);