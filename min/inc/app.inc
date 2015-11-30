<?php 
// application::getcontainer()->get('db')->query();
namespace min\inc;
class app{
	
	protected static $module;
	protected static $controller;
	protected static $action;
	protected static $args;
	protected static $booted = FALSE;
	protected static $container;
	
	protected static function setcontainer(){
		self::$container = new mindi();
	}
	protected static function dispatch(){
		 
		if(empty($_SERVER['PATH_INFO'])|| !preg_match('/^(?:[a-zA-Z0-9]+\/){2,}[a-zA-Z0-9]+$/', $_SERVER['PATH_INFO'])) {	
			request_not_found();
		}else{	
			$pathinfo 	= explode('/',$_SERVER['PATH_INFO'],4); 
			if( empty($pathinfo[3]) ) $pathinfo[3]	= '';
			list(self::$module, self::$controller, self::$action, self::$args) 	= $pathinfo; 
		}
		
		$file	= MIN_ROOT.'/module/'.self::$module.'/'.self::$controller.'.controller.php';
		//	echo $file;exit;
		if(!is_file($file)){
			request_not_found();
		}else{
			require($file);
			$controller_name = '\\min\\module\\'.self::$module.'\\'.self::$controller;
 		
			new $controller_name(self::$action);
			
		}
	 
	}
	public static function autoload($class){
 
 
		$list	= explode('\\',$class);
		$size	= count($list);
		$type	= $list[$size-2];
		$path	= implode($list,'/');
		if(	$type == 'inc'){
			$file	= MIN_ROOT.'/../'.$path.'.inc';
		}else{
			$file	= MIN_ROOT.'/../'.$path.'.'.$type.'.php';
		}
		require $file;
	}
	public static function getcontainer(){
	
		return self::$container;		 
	}

	public static function getmodule(){
	
		return self::$module;		 
	}
	public static function getcontroller(){
	
		return self::$controller;		 
	}
	public static function getaction(){
	
		return self::$action;		 
	}
	public static function getargs(){
	
		return self::$args;		 
	}
	public static function mysqli($key='',$value=''){
	
		return self::$container->mysqli($key,$value);
	}
	public static function service($name){
		return self::$container->service($name);
	}
	public static function view($name=''){
	// $name: public/type-login
	// $name: passport/login/index
		if(empty($name)){
			include MIN_ROOT.'/view/'.self::$module.'/'.self::$controller.'/'.self::$action.'.tpl';
		}else{
			include MIN_ROOT.'/view/'.$name.'.tpl';
		}
	}
	public static function run(){
		if(!self::$booted){
			self::$booted = TRUE;
			spl_autoload_register('self::autoload');			
			require MIN_ROOT.'/inc/common.inc';
			require MIN_ROOT.'/inc/mysqlidb.inc';
			require MIN_ROOT.'/inc/mindi.inc';
			self::setcontainer();
			self::dispatch();
		}
	}
}

// run

namespace\app::run();