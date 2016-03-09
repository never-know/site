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
	 
		 app::layout('cart');
	
	}
	private function add(){ 
	 
		 app::layout();
	
	}
	private function confirm(){ 
	 
		 app::layout('checkout');
	
	}

}