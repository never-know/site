
function index_zoomin(a){
	clearInterval(a.timer);
	a.timer=setInterval(function(){
		var cw = a.width; 
		if(cw<170){
			a.width= cw+1;
		}else{ 
			clearInterval(a.timer);	
		}
	},10);
}
		
function index_zoomout(a){
	clearInterval(a.timer);
	a.timer=setInterval(function(){
		var cw=a.width;
		if(cw<171 && cw>160){
			a.width=cw-1;
		}else{
			clearInterval(a.timer)
		}
	},10);
}  
	
  Min.event.bind(_$('hot'),'mouseover',{handler:function(e){
	index_zoomin(e.delegateTarget);
  },selector:'img.ad_floor_item_img'});
    
  Min.event.bind(_$('hot'),'mouseout',{handler:function(e){
	index_zoomout(e.delegateTarget);
  },selector:'img.ad_floor_item_img'});
  
 
  
  