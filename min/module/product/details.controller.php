<?php
namespace min\module\product;
use min\inc\app;
class details{

	public function __construct($action){
		if( $action == 'item') {
			$this->item();
		}
	}
	
	private function item(){ 
	 
		 if(is_numeric(app::getargs())){
			$service	= new \min\service\product();
			$service->item(app::getargs());
		 }
	
	}

}