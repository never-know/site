<?php
namespace min\module\passport;
class checkuser{

	public function __construct($action){
		if( $action == 'index') {
			$this->checkuser();
		}
	}
	
	private function checkuser(){ 
	 
		if( !empty($_GET['name'])  && !is_numeric($_GET['name']) && validate('username',$_GET['name'])){	 
			$service	= new \min\service\checkuser();
			$service->check($_GET['name']);
		}else{
			exit(1);
		}
	
	}

}