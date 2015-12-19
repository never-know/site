	_$('logincode').onblur=function(){
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
							itag.style.color='green';
					} 
				 }
			);
			 
		}

	};
	_$('loginsubmit').onclick= function(){
		//var code = this.value;
		//var itag=getNextElement(this);
		//console.log(itag);
		 var msg ='';
		 var obj=this;
		var name = _$('loginname').value;
		var pwd = _$('loginpwd').value;
		var code	= this.getAttribute('sindex');
		if( code == 0 ){
			this.setAttribute('sindex',1);
			this.style.cssText =" background:silver; border:1px solid silver;";
			minAjax({
				url:"http://passport.annqi.com/login.html", 
				type:"POST", 
				data:{
					username:name,
					pwd:pwd,
					login:1
				},
				method:"true",
				debugLog:"false", 
				success: function(data){
				sleep(5000);
					if(data==1){
						var ReturnUrl = getQueryString('ReturnUrl')
						if(ReturnUrl){
							location=ReturnUrl; 
						
						}else{
							location="http://www.annqi.com";
						}
					}else{

						if(data==0){
							msg='用户名只能由汉字、字母、数字及"_"或"-"组成';
						}else if(data==2){
							msg="用户名或密码错误，忘记用户名或者忘记密码";
						} 
						var  loginmsg	= _$('login-msg');
						var loginname	=  _$('login-name');
						var msgspan  	=_$('login-msg').getElementsByTagName('span');
						loginmsg.style.display='block';
						loginname.style.cssText = 'margin-top:10px;';
						msgspan[0].innerHTML = msg;
						obj.setAttribute('sindex',0);
						obj.removeAttribute('style');
					}
				}
			});
			
			 
		}

	};	
	_$('autoLogin').onclick= function(){
		if(this.checked){
		_$('msg-warn').style.display="block";
		}else{
		_$('msg-warn').style.display="none";
		
		}
	};
	_$('forget-pwd').onclick= function(){
		if( _$('login-code').style.display=='block' ){
		_$('login-code').style.display="none";
		}else{
		_$('login-code').style.display="block";
		
		}
	}
	if(_$('autoLogin').checked){
		_$('msg-warn').style.display="block";
	}
	
	