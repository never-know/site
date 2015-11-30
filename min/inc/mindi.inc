<?php
namespace min\inc;
class mindi{
	
	private $shared			= array();
	private $definitions	= array();	
	private $singletons		= array();
	private $included		= array();
	
	public function mysqli($key,$value){
	
		if(empty($this->singletons['mysqli'])){		
			$this->singletons['mysqli'] = new mysqlidb($key,$value);
			$this->shared['mysqli']	= true;
		}
	 
		return $this->singletons['mysqli'];		
	}
	public function library($name){	
		$libraryname	= $name.'-inc';
		if( empty($this->singletons[$libraryname]) ){
			$library_name	= '\\min\\inc\\'.$name;
			$this->singletons[$libraryname] = new $library_name();
			$this->included[$libraryname]	= true;
		} 
		 return $this->singletons[$libraryname];
	}
	public function service($name){
		$servicename	= $name.'-service';
		if( empty($this->singletons[$servicename]) ){
			$service_name	= '\\min\\service\\'.$name;
			$this->singletons[$servicename] = new $service_name();
			$this->included[$servicename]	= true;
		} 
		 return $this->singletons[$servicename];
		
	}
	public function set($name,$value,$shared=false)
	{		 
		if(is_string($name) === false || is_bool($shared) === false) {
			flash(0,'Invalid parameter type.');
		}
		 		
		if($shared === TRUE) { 
			$this->shared[$name] 	= true;
		}
		
		$this->definitions[$name] 		= $value;
	}
	
	public function get($name,$parameter)
	{		
		if(is_string($name) === false) {
			flash( 0 ,'Invalid name.');
		}
		if(isset($this->shared[$name]) && $this->shared[$name] === true) {
			if(is_null($this->singletons[$name]) === false) {
				return $this->singletons[$name];
			}
		}
		
		if(isset($this->definitions[$name])){
	  		if($this->definitions[$name] instanceof Closure ){
	  			$instance =  $this->definitions[$name]();
	  		}elseif(is_string($this->definitions[$name]) === true){	  			
				$instance = new $this->definitions[$name]();
	  		}elseif(is_object($this->definitions[$name])){
	  			$instance =  $this->definitions[$name];
	  		}else{
	  			flash(0,'service can not be resolved');
	  		}
			if(isset($this->shared[$name]) && $this->shared[$name] === true){
				$this->singletons[$name] = $instance;
			}
			return $instance;
			
		}else{
	  		flash(0,'service has not defined');
	  }
	}
	 
}
 