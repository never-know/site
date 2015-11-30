  // 用户名
  var msg =new Array("用户名不能为空","用户名长度4-20，一个汉字长度为2",
			'4-20位字符，支持汉字、字母、数字及"_"或"-"组合',"用户名不能为纯数字");
  function betweenLength(str, _min, _max) {
   
        return (str.length >= _min && str.length <= _max);
    }
	function badFormat(str) {
        return new RegExp("^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$").test(str);
    }
  function userCheck(username) {
        
        var fullNumber = /^[0-9]+$/ ;
		var error = _$('regname_error');
        if (username == "") {
            error.innerHTML=msg[0];
            return false;
        }
        var len = betweenLength(username.replace(/[^\x00-\xff]/g, "**"), 4, 20);
        if (!len) {
            error.innerHTML=msg[1];
            return false;
        }
        else if (badFormat(username) == false) {
		
            error.innerHTML=msg[2];
            return false;
        }
        else if (fullNumber.test(username)) {
           error.innerHTML=msg[3];
            return false;
        }
		return true;
        
    }


	_$('regname').onfocus=function(){
		var tips=_$('regname_error');
		tips.innerHTML='4-20位字符，支持汉字、字母、数字及"_"或"-"组合';
		tips.className="tips";
		this.removeAttribute('style');
		var itag=getNextElement(this);
		itag.innerHTML="&#xe63b;"
		itag.removeAttribute('style');
		
	};
	_$('regname').onblur=function(){
		var tips =_$('regname_error');
		tips.className ="hide";
		var name = this.value;
		var result = userCheck(name);
		if(result == false){
			tips.className="errors";
			this.style.borderColor="#f00";
			return;
		}else{
			var obj=this;
			minAjax({
				url:"http://passport.annqi.com/checkuser.html", 
				type:"GET", 
				data:{
					name:name
				},
				method: true,
				debugLog: false, 
				success: function(data){
				  
					if(data == 0){
						var itag=getNextElement(obj);
							itag.innerHTML="&#xe634;"
							itag.style.color="#7ABD54";
							return ;
					}else{
						tips.innerHTML='用户名格式错误';
						tips.className='errors'; 
						obj.style.borderColor="#f00";
						return;
					} 

				}
			});			 
		}
	}
	

	// 密码
	  function isPwd(str) {	   
	   return /^[a-zA-Z0-9`~!@#$%^&*()_+-=\[\]{}|:;,./<>?]+$/.test(str);
    }
    function isPwdRepeat(str1, str2) {
        return (str1 == str2);
    }
 function checkpwd(e){
		var pwd = _$('regpwd');
		//var pwd1 = _$('regpwd1');
		//return betweenLength(pwd, 6, 20)&&isPwd(pwd);
		 if( pwdCheck(pwd.value) == false){
			var error = _$('regpwd_error');
			var inner = error.innerHTML;
			
			if(pwd.value==''){
			error.innerHTML='密码不能为空';	
			}
			pwd.style.borderColor="#f00";
			error.innerHTML=inner;	
			error.className="errors";
			var error1 = _$('regpwd1_error');
			error1.innerHTML='请先修改上面设置的的密码';	
			error1.className="errors";
			
			return false;
		}else{
			return true;
		}		
	}
	function pwdCheck(pwd){
		var error = _$('regpwd_error');
        var  regpwd = _$('regpwd');
        var len = betweenLength(pwd, 6, 20);
		 
        if (!len) {
            error.innerHTML='请输入6-20位密码';
			error.className="errors";
			regpwd.style.borderColor="#f00";
            return false;
        }
        else if (isPwd(pwd) == false) {			
            error.innerHTML='密码只能包含字母、数字或标点（空格、引号、反斜线\除外）';
			error.className="errors";
			regpwd.style.borderColor="#f00";
            return false;
        }
       
		return true;
	
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
		var tips =_$('regpwd_error');
		tips.className ="hide";
		this.removeAttribute('style');
		var pwd = this.value;
		var pwd1 = _$('regpwd1');
		
		 if (pwd == "" && pwd1.value=='') {
            return  
        }else{
			var itag1=	getNextElement(pwd1);
			var tips1 =_$('regpwd1_error');
			 
		var result = pwdCheck(pwd);
		if(result == false){
			 
			tips.className="errors";
			this.style.borderColor="#f00";
			return;
		}else{
			 
			
			var itag=getNextElement(this);
			itag.innerHTML="&#xe634;"
			itag.style.color="#7ABD54";
			this.removeAttribute('style');
			if (pwd == pwd1.value){
				itag1.innerHTML="&#xe634;"
				itag1.style.color="#7ABD54";
				tips1.className="hidden";
				pwd1.removeAttribute('style');
			}else{
				itag1.innerHTML="&#xe63a;"
				itag1.removeAttribute('style');
				tips1.className="errors";
				tips1.innerHTML='两次输入密码不相同';
				pwd1.style.borderColor="#f00";
			}
		}
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
	 
	_$('regpwd1').onblur=function(){
	 
		var tips =_$('regpwd1_error');
		tips.className ="hide";
		var pwd = _$('regpwd').value;
		if(betweenLength(pwd, 6, 20)&&isPwd(pwd)){
		 
		 
		var pwd1= this.value;
		if(pwd == pwd1){
			if(pwd == ''){
				return
			}else{
			var itag=getNextElement(this);
			itag.innerHTML="&#xe634;"
			itag.style.color="#7ABD54";
			return ;
			}
		}else{
		 
			tips.className="errors";
			tips.innerHTML='两次输入密码不相同';
			this.style.borderColor="#f00";
			return;
		} 
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
	
	//电话号码
	function numberOnly(e)
{
var keynum
var keychar
var numcheck

if(window.event) // IE
  {
  keynum = e.keyCode
  }
else if(e.which) // Netscape/Firefox/Opera
  {
  keynum = e.which
  }
keychar = String.fromCharCode(keynum)
numcheck = /\d/
return numcheck.test(keychar)
}
function phoneCheck(phone){
	var tips=_$('regphone_error');
	
	if(phone.length != 11 && /^[\d]+$/.test(phone)){
		tips.innerHTML='请输入11位手机号码';
		return false;
	}
	if(/^1[\d]{10}$/.test(phone)==false){
		tips.innerHTML='手机号码格式不对';
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
		itag.innerHTML="&#xe63a;"
		itag.removeAttribute('style');	 
	};
	_$('regphone').onblur=function(){
		var tips =_$('regphone_error');
		tips.className ="hide";
		var name = this.value;
		if(name==''){return true;}
		var result = phoneCheck(name);
		if(result == false){
			tips.className="errors";
			this.style.borderColor="#f00";
			return;
		}else{ 
			var itag=getNextElement(this);
							itag.innerHTML="&#xe634;"
							itag.style.color="#7ABD54";
							return ;
				 }
		
	};
	
	
	// 大小写提示
 function checkCapslock (event,obj)
{
	var e = event||window.event;
	var o = e.target||e.srcElement;
	var oTip = o.nextSibling;
	var keyCode  =  e.keyCode||e.which; // 获取按键的keyCode
	var isShift  =  e.shiftKey ||(keyCode  ==   16 ) || false ;
	var itag=getNextElement(obj);
	// 判断shift键是否按住
	if (
	((keyCode >=   65   &&  keyCode  <=   90 )  &&   !isShift)
	// Caps Lock 打开，且没有按住shift键
	|| ((keyCode >=   97   &&  keyCode  <=   122 )  &&  isShift)
	// Caps Lock 打开，且按住shift键
	){  
		itag.innerHTML="&#xe648;";
		itag.style.color="red";	  }
	else{ itag.innerHTML="&#xe63a;" ;itag.removeAttribute("style");	  }
}
	