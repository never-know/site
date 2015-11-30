<?php
namespace min\module\passport;
use min\inc\app;
class login
{    
    public $errors = array(); 
    public $messages = array();
  
    public function __construct($action)
    {  

		if ( $action == 'index' && isset($_POST['login']) ){		
			$this->dologinWithPostData();		
		}
		if ( $action == 'index' && strtolower($_SERVER['REQUEST_METHOD']) == 'get' ){		
			$this->display();		
		}

    }
 
	
	private function display(){
		app::view('common/type-login');
	}
   
    private function dologinWithPostData()
    {
        echo 2;
        
    }
     
    public function doLogout()
    {
        // delete the session of the user
        $_SESSION = array();
        session_destroy();
        // return a little feeedback message
        $this->messages[] = "You have been logged out.";
    }
    /**
     * simply return the current state of the user's login
     * @return boolean user's login status
     */
    public function isUserLoggedIn()
    {
        if (isset($_SESSION['user_login_status']) AND $_SESSION['user_login_status'] == 1) {
            return true;
        }
        // default return
        return false;
    }
	
}