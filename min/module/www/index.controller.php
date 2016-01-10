<?php
namespace min\module\www;
use min\inc\app;
class index{
	public function __construct($args){
		if($args=='index') {
			$this->index();
		}
	}



	private function index(){
 
		app::display();

	}



}