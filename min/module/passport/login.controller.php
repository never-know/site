<?php
namespace min\module\passport;
use min\inc\app;
class login
{    
    public $errors = array(); 
    public $messages = array();
  
    public function __construct($action)
    {  

		if ( isset($_POST['login']) ){		
			$this->dologinWithPostData();		
		}elseif ( $action == 'index'){
			$this->display();	
		}elseif ( $action == 'popup'){		
			$this->popup();		
		}

    }
 
	
	private function display(){
		app::display('type-login');
	}
	private function popup(){
		app::view();
	}
   
    private function dologinWithPostData()
    {
        echo 1;
        
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