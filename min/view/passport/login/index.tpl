
	<div class="login-header">
		<div class="login-logo">
			<a href="http://www.annqi.com/" clstag="pageclick|keycount|20150112ABD|45"><img src="http://cdn.annqi.com/public/images/logo-5.png" ></a><b>欢迎登陆</b>
			<span class="regist-link">没有安琪账号？<a href="http://passport.annqi.com/regist.html?ReturnUrl=http%3A%2F%2Fwww.annqi.com" target="_blank" clstag="pageclick|keycount|20150112ABD|1">立即注册</a></span>
		</div>
		
	</div>
	<div class="nav-2"> </div> 
	<div class="login-wrapper">
		<div class="login-content">
			 <div class="login-image">
			 </div>
			 <div class="login-form">
			 <div class="login-box">
				<div class="login-title">
					
					

                    <h2 id="J_Quick2Static" class="static">账户登录</h2>
					<h2 id="J_Static2Quick" class="quick">扫码登录</h2> 
					 
				</div>
				<div class="login-msg" id="login-msg">
					 <i class="icon_error iconfont">&#xe644;</i><span></span>
					 
				</div>
				 
					<form id="login_form" method="post" onsubmit="return false;">

						<div class="login-name input-focus" id="login-name">
						
							<input id="loginname" type="text" class="loginname" name="loginname" tabindex="1" autocomplete="off"   placeholder="邮箱/用户名/已验证手机">
							<i class="icon_login iconfont">&#xe63b;</i>
						</div>
						<div class="login-pwd">
					
							<input type="password" id="loginpwd" name="loginpwd" class="loginpwd" tabindex="2" autocomplete="off" placeholder="密码" onkeypress = "checkCapslock(event,this)">
								<i class="icon_login iconfont">&#xe63a;</i>
							<span class="capslock" style="display: none;"><b></b>大小写锁定已打开</span>
						</div>
						<div class="login-code" id="login-code">
							
							<input id="logincode" type="text" class="logincode" name="logincode" tabindex="1" autocomplete="off"  placeholder="验证码">  <i class="icon_captcha iconfont">&#xe634;</i>
							
							<img  src="http://cdn.annqi.com/public/images/image.jpg" style="cursor:pointer;width:100px;height:36px;display:inline-block;line-height:36px;padding-left:10px">
							<span>换一张</span>
						</div>
						<div class="login-li">
							 
								 <!--
									<input id="autoLogin" name="chkRememberMe" type="checkbox" class="rememberme" tabindex="3" clstag="pageclick|keycount|20150112ABD|6" >
									<label for="autoLogin" class="rememberme_label" >自动登录</label>
							 
								 
								 
									<a   class="forget-pwd" id="forget-pwd"  target="_blank" clstag="pageclick|keycount|20150112ABD|8"  >忘记密码?</a>
								 -->
								  
                                   
                                        <span>
                                            <input id="autoLogin"   type="checkbox" class="rememberme_checkbox">
                                            <label for="autoLogin">自动登录</label>
                                        </span>
                                       
                                        <span class="forget-pwd">
                                            <a id="forget-pwd"  class="" target="_blank">忘记密码?</a>
                                        </span>
                                  
                                
							 					
						</div>
						 
						<div class="msg-warn hide" id="msg-warn"> <i class="icon_warn iconfont">&#xe645;</i>公共场所不建议自动登录，以防账号丢失</div>
						
						<div class="login-btn" id="loginsubmit"  sindex="0">
							<a href="javascript:;" class="btn-img btn-entry"   clstag="pageclick|keycount|20150112ABD|2">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
						</div>
						<div class="linkBox">
				<p class="f12 mb20 clear linkBoxTitle">
					<span class="mr5 mb5 clear block">合作网站账号登录：</span>	
					<div>				

					<a href="javascript:void(0);" title="新浪微博" onclick="window.open('/login/weibo');" class="iconLinks sina" mars_sead="passport_bottom_weibo_button"></a> 
					<a href="javascript:void(0);" onclick="window.open('/login/qq');" title="QQ" class="iconLinks qq" mars_sead="passport_bottom_qq_button"></a> 
					<a href="javascript:void(0);" onclick="javascript:window.open('/login/alipay');" title="支付宝" class="iconLinks alipay" mars_sead="passport_bottom_alipay_button"></a>
                    <a href="javascript:void(0);" title="微信" onclick="window.open('/login/weixin');" class="iconLinks weixin" mars_sead="passport_bottom_weixin_button"></a>
                					<a class="plusLink on" href="javascript:void(0);" data-act="showMoreLinks" mars_sead="passport_bottom_more_button">更多<i class="icon_more iconfont">&#xe611;</i></a>
									</div>
									</p>
				 
					</div>
					</form>
				 
				</div>
			 </div>
		</div>	 
	</div>
<script type="text/javascript" src="http://cdn.annqi.com/public/js/login.js"></script>