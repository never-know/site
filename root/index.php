<?php
	error_reporting(E_ALL);
	$start=microtime(true);
 
 
	define('MIN_ROOT', __DIR__.'/../min');
	define('MIN_SITE','ybcoming.com');
	// init environment
	/*
	if (!isset($_SERVER['SERVER_PROTOCOL']) || $_SERVER['SERVER_PROTOCOL'] != 'HTTP/1.1' ) {
	  header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
      exit;
	}
	if ( empty($_SERVER['HTTP_HOST']) || strlen($_SERVER['HTTP_HOST']) > 30 || substr_count($_SERVER['HTTP_HOST'], '.') > 3 || substr_count($_SERVER['HTTP_HOST'], ':') > 1 || !preg_match('/^[a-z0-9][a-z0-9-_:\.]+$/', $_SERVER['HTTP_HOST']) || is_numeric(strtr( $_SERVER['HTTP_HOST'],'.:','11'))) {   
      header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
      exit;
    }
	*/
 
	require MIN_ROOT.'/inc/app.inc';
	
	
	
 
	$end	= microtime(true);
 
//	echo $end-$start;

  
       
    
