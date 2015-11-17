	// 密码
function isPwd(str) {	   
	return /^[a-zA-Z0-9`~!@#$%^&*()_+-=\[\]{}|:;,./<>?]+$/.test(str);
}
function betweenLength(str, _min, _max) {
    return (str.length >= _min && str.length <= _max);
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
	obj.className="tips";
	if(strong<3){
		obj.innerHTML='密码强度：&nbsp;<b class="show">弱</b><b>中</b><b>强</b>';	
	}else if(strong>3){
		obj.innerHTML='密码强度：&nbsp;<b class="show">弱</b><b class="show">中</b><b class="show">强</b>';	
	}else{
		obj.innerHTML='密码强度：&nbsp;<b class="show">弱</b><b class="show">中</b><b>强</b>';	
	}
}
function setError(obj,msg,name){
	obj.innerHTML=msg;	
	obj.className=name;
}

_$('regpwd').onkeyup =function(e){
	var itag  = getNextElement(this);
	var error = getNextElement(itag);
	var flag = 0;
	if(this.value==''){	
		return;
	}
	var pwd1 =_$('regpwd1');
	if( isPwd(this.value) == false || this.value.length < 6 ){	
		flag =1;
		 
		pwd1.setAttribute('disabled','disabled');
		var tmp= getNextElement(pwd1);
		tmp.removeAttribute('style');
		tmp.innerHTML = "&#xe63a";
		tmp.style.background="none";
		setError(_$('regpwd1_error'),'','hide');
		pwd1.removeAttribute('style');

		
		if(isPwd(this.value) == false){
			setError( error,'密码中含有非法字符，请输入字母、数字或标点（空格、引号、反斜线\除外）','errors');
			 flag=2;
		}
	}else{
		pwd1.removeAttribute('disabled');
		getNextElement(pwd1).style.background = "white";
	}
	if(flag !=2){
		var strong = pwdstrong(this.value); 
		setstrong(strong,error);
	}
	
	
	if(pwd1.value != ''){
		var itag1  = getNextElement(pwd1);
		var error1 = getNextElement(itag1);
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
		getNextElement(this).style.background = "none"; 
		_$('regpwd1_error').className='hide';
		_$('regpwd').focus();
		return true;
	}
	console.log(1);
	if((this.value.length<len && pwd.substring(0,this.value.length)!= this.value) || this.value.length>len || (this.value.length==len &&  this.value!= pwd )	){
		console.log(2);
		setError(_$('regpwd1_error'),'两次密码不相同，请重新输入','errors');
		return;
	}else if( this.value == pwd ) {console.log(3);
	
			setError(_$('regpwd1_error'),'','hide');
			itag = getNextElement(this);
			itag.innerHTML="&#xe634;"
			itag.style.color="#7ABD54";
	}else{
	console.log(3);
		setError(_$('regpwd1_error'),'请再次输入密码','tips');
		itag = getNextElement(this);
			itag.innerHTML="&#xe63a;"
			itag.removeAttribute('style');
		return;
	}

}

_$('regpwd').onfocus=function(){
	var tips=_$('regpwd_error');
	tips.innerHTML='6-20位字母、数字或标点（空格、引号、反斜线\除外）';
	tips.className="tips";
	this.removeAttribute('style');
	var itag=getNextElement(this);
	itag.innerHTML="&#xe63a;"
	itag.removeAttribute('style');
};
_$('regpwd').onblur=function(){
	if(this.value==''){
		setError(_$('regpwd_error'),'','hide');
		return;
	}
 
	if(isPwd(this.value)==false){
		this.style.borderColor="#f00";
	}else if(this.value.length < 6){
		setError(_$('regpwd_error'),'请输入6-20位密码','errors');
		this.style.borderColor="#f00";
		var itag=getNextElement(this);
		itag.innerHTML="&#xe63a;"
		itag.removeAttribute('style');
		return;
	}else{
		setError(_$('regpwd_error'),'','hide');
		var itag=getNextElement(this);
		itag.innerHTML="&#xe634;"
		itag.style.color="#7ABD54";
	}

}

	
	//确认密码
	_$('regpwd1').onfocus=function(){
		var tips=_$('regpwd1_error');
		tips.innerHTML='请再次输入密码';
		tips.className="tips";
		this.removeAttribute('style');
		var itag=getNextElement(this);
		itag.innerHTML="&#xe63a;"
		itag.removeAttribute('style');	 
	};
	_$('regpwd1').onblur = function(){ 
		if(this.value==''){
			setError(_$('regpwd1_error'),'','hide');
			return;
		}
		var pwd=_$('regpwd').value;
		if( pwd != this.value ){
			setError(_$('regpwd1_error'),'两次输入密码不相同，请重新输入','errors');
			this.style.borderColor="red";
		}
	
	}
 
 
//验证码

	_$('regcode').onblur=function(){
		var code = this.value;
		var itag=getNextElement(this);
		
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
		var itag = getNextElement(obj);
		 
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
	var tips=_$('regphone_error');
	
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
		var tips=_$('regphone_error');
		tips.innerHTML='请输入11位手机号码';
		tips.className="tips";
		this.removeAttribute('style');
		var itag=getNextElement(this);
		itag.innerHTML="&#xe619;"
		itag.removeAttribute('style');	 
	};
	_$('regphone').onblur=function(){
		var tips =_$('regphone_error');
		tips.className ="hide";
		var name = this.value;
		if(name==''){return true;}
		var result = phoneCheck(name);
		if(result == false){
			this.style.borderColor="#f00";
			return;
		}else{ 
			var itag=getNextElement(this);
			itag.innerHTML="&#xe634;"
			itag.style.color="#7ABD54";
			return ;
		}
		
	};
	
_$('regphone').onkeyup = function(){
	var itag=getNextElement(this);
	if( (this.value.length != 11 && /^1[\d]*$/.test(this.value)) || this.value == '' ){
		setError(_$('regphone_error'),'请输入11位手机号码','tips');
		itag.innerHTML="&#xe619;"
		itag.removeAttribute("style");
		return ;
		 
	}
	 if(/^1[\d]{10}$/.test(this.value)==false){
		setError(_$('regphone_error'),'手机号码格式不对','errors');
		 
	}else{
		
		itag.innerHTML="&#xe634;"
		itag.style.color="#7ABD54";
		return ;
	
	}
	 

}	

	