<?php
namespace min\module\order;
use min\inc\app;
class order{

	public function __construct($action){
		if( $action == 'view') {
			$this->view();
		}elseif($action == 'add'){
			$this->add();
		}elseif($action == 'confirm'){
			$this->checkout();
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
	 
		 app::layout('cart');
	
	}

}