<?php
namespace min\service;
class regist
{
	private $loginDao;

	public function login($name,$pwd) {
	
	/*
		if(is_email($name)){
			$sql = 'SELECT uid,name, email, password_hash FROM users  WHERE email =?';
         }elseif(is_phone($name)){
			$sql = 'SELECT uid,name, email, password_hash FROM users  WHERE phone =?';
		 }elseif(is_safe_account($name)){
			$sql = 'SELECT uid,name, email, password_hash FROM users  WHERE name =?';
		 }else{
			flash(0,101);
		 }

		$sql_result	= DI->getDB('login')->query('single',$sql,'s',$name);
		if( NULL === $sql_result){
			return 0; // user name error
		}elseif( FALSE === $sql_result){
			return -1; //system error
		}elseif(password_verify($pwd, $sql_result['password_hash'])){
            return $sql_result['uid'];
		}else{
			return -2; //password error
		}
		*/ 
	}


}