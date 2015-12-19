 
function menuFixed(id){ 
var obj = document.getElementById(id); 
var _getHeight = obj.offsetTop; 
window.onscroll = function(){ 
changePos(id,_getHeight); 
} 
} 
function changePos(id,height){ 
var obj = document.getElementById(id); 
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
 
if(scrollTop < height){ 
obj.style.position = 'relative'; 
_$('product-shop-id').removeAttribute('style');
_$('product-shop-id').style.position = 'relative'; 
_$('pnt-add-to-cart').style.display="none";
}else{ 
obj.style.position = 'fixed'; 
obj.style.top=0;
_$('product-shop-id').style.position = 'fixed'; 
_$('product-shop-id').style.top = '0'; 
_$('product-shop-id').style.width = '220px'; 
_$('pnt-add-to-cart').style.display="block";
} 
} 


if(  !Min.UA.isIE6){
menuFixed('product-nav-tab');
}

var navs	= _$('product-nav-tab').getElementsByTagName('li');
var navs_length= navs.length;
for(var i=0;i<navs_length;i++){

	navs[i].onclick=function(){
	
	 
		window.location.hash="product-desc";
		window.location = window.location;
		if(this.getAttribute('for')=='product-comment'){
				_$('product-comment-title').style.display="none";
				}else{
				_$('product-comment-title').removeAttribute('style');
				}
		
		for(var k=0;k<navs_length;k++){

			var id= navs[k].getAttribute('for');
			if(id){
				
			
				if( this == navs[k] ){
					_$(id).style.display="block";
					this.className="pnt-selected";
					}else{
					_$(id).style.display="none";
					navs[k].className='';
				}
				_$('product-comment').style.display="block";
			}
		}
 }


}
 