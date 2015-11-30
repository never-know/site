var slideMenu=function(){
	var sp,st,t,m,sa,l,ot,step,last_step,total_width,set;
	return{
		build:function(sm,mt,s,sl){
			sp=s;t=mt;
			set=0;
			m=document.getElementById(sm);
			
			
			sa=m.getElementsByTagName('li');
			l=sa.length;  
			total_width = parseInt(m.offsetWidth-l);
			if(sl>l||sl<1) sl=1;
			var i=0;
			for(i;i<l;i++){
			var k=sa[i];
			s=k.getElementsByTagName('img');
			if( sl == parseInt(i+1)){
			s[0].setAttribute('src',s[0].getAttribute('big'));
			}else{
			
			s[0].setAttribute('src',s[0].getAttribute('small'));
 
			}

			this.timer(k);
			}
			
			 
			 
			 
			 
		},
		timer:function(s){s.onmouseover=function(){clearInterval(m.timer);m.timer=setInterval(function(){slideMenu.slide(s)},t)}},
		slide:function(s){
		    var move=0;
			var ll=l-1;
			var cw=parseInt(s.offsetWidth-1);
			 
			if(set==0){
			if(cw*l>total_width){
			
			st=cw;
			ot=(total_width-cw)/ll;
			}else{
			ot=cw;
			st=total_width-cw*ll;
			}
			 set=1;
			 
			 }
		 
			if(cw<st){
			
				var owt=0; var i=0;
				for(i;i<l;i++){
					if(sa[i]!=s){
						var o,ow; 
						var oi=0; 
						o=sa[i]; 
						ow=parseInt(o.offsetWidth-1);
						if(ow>ot){
						oi=Math.floor((ow-ot)/sp); 
						oi=(oi>0)?oi:1; 
						o.style.width=parseInt(ow-oi)+'px';
						var ss=sa[i].getElementsByTagName('img');
						ss[0].setAttribute('src',ss[0].getAttribute('small'));
						
						}
						owt=owt+(ow-oi);
						}
						}
						 
				s.style.width=parseInt(total_width-owt)+'px';
				var ssk = s.getElementsByTagName('img');	 
				ssk[0].setAttribute('src',ssk[0].getAttribute('big'));
		 
			}else{clearInterval(m.timer)}
		}
	};
}();