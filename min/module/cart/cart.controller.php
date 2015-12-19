<?php
namespace min\module\cart;
use min\inc\app;
class cart{

	public function __construct($action){
		if( $action == 'index') {
			$this->index();
		}
	}
	
	private function index(){ 
	 
		 app::view();
	
	}

}