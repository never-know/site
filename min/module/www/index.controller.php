<?php
namespace min\module\www;

class index{
	public function __construct($args){
		if($args=='index') {
			$this->index();
		}
	}



	private function index(){
 
		\min\inc\app::view('common/type-index');

	}



}