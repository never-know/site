<?php
namespace min\module\passport;
use min\inc\app;

class regist{ 

	public function __construct($action){

		if ( $action == 'index' && isset($_POST['reg']) ){		
			$this->regWithPostData();		
		}
		if ( $action == 'index' && strtolower($_SERVER['REQUEST_METHOD']) == 'get' ){		
			$this->display();		
		}

	}
	
	private function display(){
		app::view('common/type-login');
	}
   
    private function regWithPostData(){
        
        
    }

    
}