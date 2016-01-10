
 // 首页幻灯片 1
Min.dom.ready('slidebox', function(){
	var settings = {
			sc:'slidenabox',
			mc:'slidebox',
			//resize :{y:true,w:520,h:270},
			autoplayer:3000
		};
  new scrollSlide(settings);
});  

// 首页SLIDEMENU
Min.dom.ready('recommend_1', function(){
new slideMenu('recommend_1',10,15);
});


// 首页 floor 幻灯片 

Min.dom.ready('floor-slidebox-1',function(){
	 var settings = {
			sc:'floor-slidenabox-1',
			mc:'floor-slidebox-1',
			resize :{y:true,w:240,h:330},
			autoplayer:3000,
			process :true
		};
new scrollSlide(settings);
	var settings2 = {
			sc:'floor-slidenabox-2',
			mc:'floor-slidebox-2',
			resize :{y:true,w:240,h:330},
			autoplayer:3000,
			process :true
		};
new scrollSlide(settings2);
});

// 商品放大 zoom
Min.dom.ready( 'tsImgSCon',function(){
		var settings = {
			sc:'tsImgSCon',
			mc:'MagicZoom',
			resize :{y:true,w:390,h:390}
		};
        new MagicZoom(settings);
});


if(Min.UA.isIE6){
 Min.event.bind(document,'mouseover',{handler:function(e){
	var c  = e.delegateTarget.className;
	cs = c.split(' ');
	for(var i= 0 ,len =cs.length; i<len;i++){
		if(cs[i]!='' && cs[i]!= 'Hovmark' ){
			Min.css.addClass('d-hover',e.delegateTarget);
			break;
		}
	}
	Min.css.addClass('hover',e.delegateTarget);
	//alert(e.delegateTarget.className);

	Min.event.bind(e.delegateTarget,'mouseout',{handler:function(e){
		Min.css.removeClass('d-hover',this);
		Min.css.removeClass('hover',this);	
 },once:true});

 },selector:'.Hovmark'});
  
}   
