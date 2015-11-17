<?php  
	function &drupal_static($name) {
		static $data = array();  
		if (isset($data[$name])) {
			return $data[$name];
		} 
		if (isset($name)) {
			$data[$name] = null;
			return $data[$name];
		}  
	}
	
	function ip_address() {
		static  $ip_address = '';
		Global $reverse_proxy_addresses;
		if (!isset($ip_address)) {
			$ip_address = $_SERVER['REMOTE_ADDR'];

			if ( $conf['reverse_proxy']==1 ) {
       
				if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
					// If an array of known reverse proxy IPs is provided, then trust
					// the XFF header if request really comes from one of them.
					// $reverse_proxy_addresses = variable_get('reverse_proxy_addresses', array());

					// Turn XFF header into an array.
					$forwarded = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);

					// Trim the forwarded IPs; they may have been delimited by commas and spaces.
					$forwarded = array_map('trim', $forwarded);

					// Tack direct client IP onto end of forwarded array.
					$forwarded[] = $ip_address;

					// Eliminate all trusted IPs.
					$untrusted = array_diff($forwarded, $reverse_proxy_addresses);

					// The right-most IP is the most specific we can trust.
					$ip_address = array_pop($untrusted);
				}
			}
		}

		return $ip_address;
	}
 

	function request_not_found() {
		header("HTTP/1.0 404 Not Found");
		die('<html><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><p>Please go <a href="javascript: history.back(1)">back</a> and try again.</p><hr /><p>Powered By: <a href="http://kissmvc.com">KISSMVC</a></p></body></html>');
	}
	
	function save_gz($data,$filename){
		$gzdata = gzencode($data,6);
		$fp = fopen($filename, "w");
		fwrite($fp, $gzdata);
		fclose($fp);	
	}
	function flash($type,$message){
	echo $message;
	exit;
	
	}
    function validate($type,$value){
		$pattern = [
			'username'	=> '/^[a-zA-Z0-9\-_\x{4e00}-\x{9fa5}]{2,31}$/u',
			'email'		=> '/^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i',
			'phone'		=> '/^1[\d]{10}/',
			'alphabet'	=> '/^[a-z]+$/i',
		];
		
		return preg_match($pattern[$type],$value);
	
	
	}
	function ajax_return($type,$value){

		exit(json_encode(array($type=>$value)));
	}	