 
	
	<div class="login-header">
		<div class="login-logo">
			<a href="http://www.annqi.com/" clstag="pageclick|keycount|20150112ABD|45"><img src="http://cdn.annqi.com/public/images/logo-5.png" ></a><b>欢迎注册</b>
				<span class="regist-link">已有安琪账号？<a href="http://passport.annqi.com/login.html?ReturnUrl=http%3A%2F%2Fwww.annqi.com" target="_blank" clstag="pageclick|keycount|20150112ABD|1">立即登陆</a></span>
					 
		</div>
		 
	</div>
	<div class="nav-2"> </div> 	
	<div class="reg-wrapper">
		<div class="reg-content">	
			<div class="reg-form">
				<div class="reg-box">
					<form id="reg_form" method="post" onsubmit="return false;">
						 <div class="login-name input-focus hide">
							<label for="regname"><b class="red">*</b>用户名：</label>
							<input id="regname" type="text" class="regname" name="regname" tabindex="1" autocomplete="off"   placeholder="用户名" maxlength="20" >
							<i class="icon_reg iconfont">&#xe63b;</i>
							<span id="regname_error"></span>
						</div>
						 <div class="reg-phone">
							<label for="regphone"><b class="red">*</b>手机号码：</label>
							<input id="regphone" type="text" class="regphone" name="regphone" tabindex="1" autocomplete="off"   placeholder="手机号码"   maxlength="11" style="IME-MODE: disabled;">
							<i class="icon_reg iconfont">&#xe619;</i>
							<span id="regphone_error"></span>
						</div>	 
						<div class="reg-mcode">
							<label for="regmcode"><b class="red">*</b>短信验证码：</label>
							<input id="regmcode" type="text" class="regmcode" name="regmcode" tabindex="1" autocomplete="off"  placeholder="短信验证码"> 
							<a  href="javascript:();"class="getcode">获取短信验证码</a>
							
						</div>
						<div class="reg-pwd">
							<label for="regpwd"><b class="red">*</b>请设置密码：</label>
							<input type="password" id="regpwd" name="regpwd" class="regpwd" tabindex="2" autocomplete="off" placeholder="密码" onpaste="return  false" maxlength="20" style="IME-MODE: disabled;" onkeypress = "checkCapslock(event,this)">
							<i class="icon_reg iconfont">&#xe63a;</i>
							<span id="regpwd_error"></span>
						</div>
						<div class="login-pwd">
							<label for="regpwd1"><b class="red">*</b>请确认密码：</label>
							<input type="password" id="regpwd1" name="regpwd1" class="regpwd" tabindex="2" autocomplete="off" placeholder="确认密码" onpaste="return  false"  onkeypress = "checkCapslock (event,this)" maxlength="20" style="IME-MODE: disabled;">
							<i class="icon_reg iconfont">&#xe63a;</i>
							<span id="regpwd1_error"></span>
						</div>
						
						
						<div class="reg-code hide">
							<label for="regcode"><b class="red">*</b>验证码：</label>
							<input id="regcode" type="text" class="regcode" name="regcode" tabindex="1" autocomplete="off"  placeholder="验证码"> <i class="icon_captcha iconfont">&#xe634;</i>
							<img  src="http://cdn.annqi.com/public/images/image.jpg" style="cursor:pointer;width:100px;height:36px;display:inline-block;line-height:36px;padding-left:10px">
							<span>换一张</span>
						</div>
						<div class="service_agreement">请阅读<a href="" >《安琪用户注册协议》</a></div>
						<div class="reg-btn">
							<a href="javascript:;" class="btn-img btn-entry" id="loginsubmit" tabindex="6" clstag="pageclick|keycount|20150112ABD|2">同意协议并注册</a>
						</div>
						

					</form>
				 
				</div>
			</div>
			<div class="reg-image"><img src="http://cdn.annqi.com/public/images/signPic.jpg" >
			</div>
		</div>	 
	</div>
 <script type="text/javascript" src="http://cdn.annqi.com/public/js/reg.js"></script>	
  