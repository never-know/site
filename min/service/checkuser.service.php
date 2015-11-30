<?php
namespace min\service;
use min\inc\app;
class checkuser
{
	
	public function check($name) {
		echo '0';exit;
		$sql = 'SELECT 1 FROM users  WHERE name =?';
		app::mysqli('user','login');
		app::mysqli()->set_active_db('user_2','login');
		app::mysqli()->set_active_db('user3','reg');
 
	 
	}


}