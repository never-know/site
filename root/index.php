<?php
	error_reporting(E_ALL);
	
	//	$start=microtime(true);
 
	define('DOC_ROOT', __DIR__);
	define('MIN_ROOT', DOC_ROOT.'/../min');
	define('LOG_ROOT', DOC_ROOT.'/../log');

	define('MIN_SITE','www.annqi.com');
	define('COOKIE_DOMAIN','.annqi.com');

	require MIN_ROOT.'/inc/app.inc';
	
	//	$end	= microtime(true);

