<?php
namespace min\module\cart;
use min\inc\app;
class cart{

	public function __construct($action){
		if( $action == 'view') {
			$this->view();
		}elseif($action == 'add'){
			$this->add();
		}elseif($action == 'confirm'){
			$this->confirm();
		}
		exit();
	}
	
	private function view(){ 
	 
		 app::display('cart');
	
	}
	private function add(){ 
	 
		 app::display();
	
	}
	private function confirm(){ 
	 
		 app::display('checkout');
	
	}

}