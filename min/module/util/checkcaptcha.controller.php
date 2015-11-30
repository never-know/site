<?php
namespace min\module\util;
class checkcaptcha{

	public function __construct($action){
		if($action=='index'){
			$this->index();
		}
	}
	
	private function index(){
		if($_GET['code']=='v6ks') {
			echo $_GET['callback']."(1);";
		}else{
		
		echo $_GET['callback']."(0);";
		}
	}


}