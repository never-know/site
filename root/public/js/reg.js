	// 密码
function isPwd(str) {	   
	return /^[a-zA-Z0-9`~!@#$%^&*()_+-=\[\]{}|:;,./<>?]+$/.test(str);
}
function Pwd_OK(str){
	return /^[a-zA-Z0-9`~!@#$%^&*()_+-=\[\]{}|:;,./<>?]{6,}$/.test(str);
}
function betweenLength(str, _min, _max) {
    return (str.length >= _min && str.length <= _max);
}
function strong_settimer(obj,width,tag){
	obj.className="tips-s";
	var itag = obj.getElementsByTagName('em')[0];
	if( !itag ){
		obj.innerHTML='密码强度：'+tag+'&nbsp;&nbsp;<i class="iconfont icon-pwd">&#xe661;</i><em style="left:86px;"></em>';
		itag = obj.getElementsByTagName('em')[0];
	}
	clearInterval(itag.timer);	

	itag.timer=setInterval(function(){
		var cw=parseInt(itag.style.left);
		if(cw-width>0){
			itag.style.left= parseInt(cw-1)+'px';
		}else if(cw-width<0){
			itag.style.left= parseInt(cw+1)+'px';
		}
		else{		
				clearInterval(itag.timer);	
				itag.parentNode.innerHTML='密码强度：'+tag+'&nbsp;&nbsp;<i class="iconfont icon-pwd" >&#xe661;</i><em style="left:'+cw+'px" ></em>';		 
			}
		  
		},15);

}

function pwdstrong(pwd){
	var strong = 0;
	if(/[a-z]/.test(pwd)){ strong++;}
	if( /[\d]/.test(pwd)){ strong++;} 
	if(/[A-Z]/.test(pwd)){ strong++;}
	if(/[`~!@#$%^&*()_+-=\[\]{}|:;,./<>?]+$]/.test(pwd)){ strong ++;} 	
	if(pwd.length>5){ strong++;} 
	return strong;
}
function setstrong(strong,obj){
	
	if(strong<3){	
		strong_settimer(obj,98,'弱');		 
	}else if(strong>3){
		strong_settimer(obj,150,'强');
	}else{ 
		strong_settimer(obj,122,'中');
	}
}
function setError(obj,msg,name){
	obj.innerHTML=msg;	
	obj.className=name;
}

_$('regpwd').onkeyup =function(e){
	var itag  = Min.dom.next(this);
	var error = Min.dom.next(itag);
	var flag = 0;
	if(this.value==''){	
	 
		setError(error,'6-20位字母、数字或标点（空格、引号、反斜线\除外）','tips');
		this.removeAttribute('style');
		return;
	}
	var pwd1 =_$('regpwd1');
	if( isPwd(this.value) == false || this.value.length < 6 ){	
		flag =1;
		pwd1.setAttribute('disabled','disabled');
		this.removeAttribute('style');
		var tmp= Min.dom.next(pwd1);
		tmp.removeAttribute('style');
		tmp.innerHTML = "&#xe63a;";
		tmp.style.background="none";
		setError(_$('regpwd1-error'),'','hide');
		pwd1.removeAttribute('style');
		pwd1.style.background="#e8e8e8"; 
		
		if(isPwd(this.value) == false){
			setError( error,'密码中含有非法字符，请输入字母、数字或标点（空格、引号、反斜线\除外）','errors');
			this.style.borderColor="red";
			// flag=2;
		}else if( this.value.length < 6 ){
				setError(error,'6-20位字母、数字或标点（空格、引号、反斜线\除外）','tips');
		}
	}else{
		pwd1.removeAttribute('disabled');
		pwd1.removeAttribute('style');
		Min.dom.next(pwd1).innerHTML = "&#xe63a;";
		Min.dom.next(pwd1).style.background = "white";
		
	}
	if(flag !=1){
		this.removeAttribute('style');
		var strong = pwdstrong(this.value); 
		setstrong(strong,error);
	}
	
	
	if(pwd1.value != ''){
		var itag1  = Min.dom.next(pwd1);
		var error1 = Min.dom.next(itag1);
		if(flag==0){
			if(this.value == pwd1.value){
				setError( error,'','hide');
				itag.innerHTML="&#xe634;"
				itag.style.color="#7ABD54";
			
				setError(error1,'','hide');
				itag1.innerHTML="&#xe634;"
				itag1.style.color="#7ABD54";
				pwd1.removeAttribute('style');
			}else{
				setError(error1,'两次密码不相同，请重新输入','errors');
				itag1.innerHTML="&#xe63a;"
				itag1.style.color="silver";
				pwd1.style.borderColor="red";
			 
			}
		}
	}
	

}
_$('regpwd1').onkeyup =function(e){
	var pwd =_$('regpwd').value;
	var len= pwd.length;
	if( pwd ==''  ){
		this.value=''; 
		this.setAttribute('disabled','disabled'); 
		Min.dom.next(this).style.background = "none"; 
		_$('regpwd1-error').className='hide';
		_$('regpwd').focus();
		return true;
	}

	if((this.value.length<len && pwd.substring(0,this.value.length)!= this.value) || this.value.length>len || (this.value.length==len &&  this.value!= pwd )	){
		setError(_$('regpwd1-error'),'两次密码不相同，请重新输入','errors');
		return;
	}else if( this.value == pwd ) {console.log(3);
			setError(_$('regpwd1-error'),'','hide');
			itag = Min.dom.next(this);
			itag.innerHTML="&#xe634;"
			itag.style.color="#7ABD54";
	}else{
		setError(_$('regpwd1-error'),'请再次输入密码','tips');
		itag = Min.dom.next(this);
			itag.innerHTML="&#xe63a;"
			itag.removeAttribute('style');
		return;
	}

}

_$('regpwd').onfocus=function(){
	var tips=_$('regpwd-error');
	 
	if(Pwd_OK(this.value) == true){
		 var strong = pwdstrong(this.value); 
			setstrong(strong,tips);
	}else if(  this.value=='' || isPwd(this.value) == true){
		setError( tips,'6-20位字母、数字或标点（空格、引号、反斜线\除外）','tips');
		this.removeAttribute('style');
		var itag=Min.dom.next(this);
		itag.innerHTML="&#xe63a;"
		itag.removeAttribute('style');
	}
};

_$('regpwd').onblur=function(){
	if(this.value==''){
		setError(_$('regpwd-error'),'','hide');
		return;
	}
 
	if(isPwd(this.value)==false){
		this.style.borderColor="#f00";
	}else if(this.value.length < 6){
		setError(_$('regpwd-error'),'请输入6-20位密码','errors');
		this.style.borderColor="#f00";
		var itag=Min.dom.next(this);
		itag.innerHTML="&#xe63a;"
		itag.removeAttribute('style');
		return;
	}else{
		setError(_$('regpwd-error'),'','hide');
		var itag=Min.dom.next(this);
		itag.innerHTML="&#xe634;"
		itag.style.color="#7ABD54";
	}

}

	
	//确认密码
	_$('regpwd1').onfocus=function(){
		var tips=_$('regpwd1-error');
		tips.innerHTML='请再次输入密码';
		tips.className="tips";
		this.removeAttribute('style');
		var itag=Min.dom.next(this);
		itag.innerHTML="&#xe63a;"
		itag.removeAttribute('style');	 
	};
	_$('regpwd1').onblur = function(){ 
		if(this.value==''){
			setError(_$('regpwd1-error'),'','hide');
			return;
		}
		var pwd=_$('regpwd').value;
		if( pwd != this.value ){
			setError(_$('regpwd1-error'),'两次输入密码不相同，请重新输入','errors');
			this.style.borderColor="red";
		}
	
	}
 
 
//验证码

	_$('regcode').onblur=function(){
		var code = this.value;
		var itag=Min.dom.next(this);
		
		if(code){
		
			JSONP.get( 'http://util.annqi.com/checkcaptcha.html', {code:code}, function(data){
					if(data==0){
						 	itag.innerHTML="&#xe632;"
							itag.style.display="inline"; 
							itag.style.color='red';
					}else if(data==1){
							itag.innerHTML="&#xe634;"
							itag.style.display="inline"; 
							itag.style.color='blue';
					} 
				 }
			);
			 
		}else{
			itag.innerHTML=""
			itag.removeAttribute('style'); 
							 
		
		}

	};	
	
 _$('regcode').onkeyup=function (event){
		var obj= _$('regcode')
		var code = obj.value;
		var itag = Min.dom.next(obj);
		 
		if(code.length==4){
		
			JSONP.get( 'http://util.annqi.com/checkcaptcha.html', {code:code}, function(data){
					if(data==0){
						 	itag.innerHTML="&#xe632;"
							itag.style.display="inline"; 
							itag.style.color='red';
							 
					}else if(data==1){
							itag.innerHTML="&#xe634;"
							itag.style.display="inline"; 
							itag.style.color='blue';
					} 
					return true;
				 }
			);
			 
		}else if(code.length >4){
			
			itag.innerHTML="&#xe632;"
			itag.style.display="inline"; 
			itag.style.color='red';
		}else{
			itag.innerHTML=""
			itag.removeAttribute('style'); 
							 
		
		}
		return true;
	}
	
 
function phoneCheck(phone){
	var tips=_$('regphone-error');
	
	if(phone.length != 11 && /^1[\d]*$/.test(phone)){
		setError(tips,'请输入11位手机号码','errors');
		return false;
	}
	if(/^1[\d]{10}$/.test(phone)==false){
		setError(tips,'手机号码格式不对','errors');
		return false
	}
	return true;
}

	_$('regphone').onfocus=function(){
		var tips=_$('regphone-error');
		tips.innerHTML='请输入11位手机号码';
		tips.className="tips";
		this.removeAttribute('style');
		var itag=Min.dom.next(this);
		itag.innerHTML="&#xe619;"
		itag.removeAttribute('style');	 
	};
	_$('regphone').onblur=function(){
		var tips =_$('regphone-error');
		tips.className ="hide";
		var name = this.value;
		if(name==''){return true;}
		var result = phoneCheck(name);
		if(result == false){
			this.style.borderColor="#f00";
			return;
		}else{ 
			var itag=Min.dom.next(this);
			itag.innerHTML="&#xe634;"
			itag.style.color="#7ABD54";
			return ;
		}
		
	};
	
_$('regphone').onkeyup = function(){
	var itag = Min.dom.next(this);
	if( (this.value.length != 11 && /^1[\d]*$/.test(this.value)) || this.value == '' ){
		setError(_$('regphone-error'),'请输入11位手机号码','tips');
		itag.innerHTML="&#xe619;"
		itag.removeAttribute("style");
		return ;
		 
	}
	 if(/^1[\d]{10}$/.test(this.value)==false){
		setError(_$('regphone-error'),'手机号码格式不对','errors');
		 
	}else{
		
		itag.innerHTML="&#xe634;"
		itag.style.color="#7ABD54";
		setError(_$('regphone-error'),'','hide');
		return ;
	
	}
	 

}	

	