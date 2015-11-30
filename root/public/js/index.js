slideMenu.build('sm1',10,15,2);

function settimer(a){
		a.onmouseover=function(){
		
		 clearInterval(a.timer);
		a.timer=setInterval(function(){
		 
			var cw=parseInt(a.offsetWidth);
			 
			if(cw<170){
				a.style.width= parseInt(cw+1)+'px';
			}else{
				 
				clearInterval(a.timer);
				
			}
		  
		},10)}
		
		 a.onmouseout=function(){
	
			 clearInterval(a.timer);
				   a.timer=setInterval(function(){
						var cw=parseInt(a.offsetWidth);
						 
						if(cw<171 && cw>160){
						
							a.style.width=parseInt(cw-1)+'px';
						}else{
					 
							clearInterval(a.timer)
						}
	  
		},10)}
	  
	}
	
	
	
   var hot=document.getElementById('hot');
   var imgs=hot.getElementsByTagName('img');
   var l=imgs.length;
   var i=0;
	for(i;i<l;i++){
		var a=imgs[i];
	 
		var cw=parseInt(a.offsetWidth);
		if(cw<200){
		settimer(a);
  
	}
  }
  
  
  
  