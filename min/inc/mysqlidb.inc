<?php
namespace min\inc;
class mysqlidb{

	private $active_db	= 'default';
	private $ref; 
	private $conf =array();
	private $connections = array();

	public function  __construct($db_key='',$conf_key=''){
		if(!empty($db_key)){
			$this->set_active_db($db_key,$conf_key);
		}
	}
	 
	public function set_active_db($db_key ='default',$conf_key =''){
		$old_key			= $this->active_db;
		$this->active_db 	= $db_key;
		if(empty($this->conf[$db_key])){
			if(empty($conf_key)){
				$conf_array	= explode('_',$db_key);
				$conf_key	= $conf_array[0];
			}
			include MIN_ROOT.'/conf/db/'.$conf_key.'.conf';		
		}
		return $this;		
	}
	private function connect_db(){
	
		if(empty($connections[$this->active_db])){
			$info	= $this->conf[$this->active_db];
			$this->connections[$this->active_db]	= mysqli_connect($info['host'],$info['user'],$info['pwd'],$info['dbname'],$info['port']);
		}
		return $this->connections[$this->active_db];
	}
	public function query($type,$sql,$marker='',$param){
		
		$stmt 		= mysqli_prepare($this->connect_db(),$sql);
		$merge		= array($stmt,$marker);
		foreach($param as $value){
			$merge[]=&$value;		
		}
		if(empty($this->ref)){
			$this->ref	= new ReflectionFunction('mysqli_stmt_bind_param');		
		}
		$this->ref->invokeArgs($merge);
				
		if(mysqli_stmt_execute($stmt)){
			
			switch($type){
				case 'update' :	
				case 'delete' :
					$result	= mysqli_stmt_affected_rows($stmt);
					break;	
				case 'insert' :
					$result	= mysqli_stmt_insert_id($stmt);
					break;
				case 'single' :	
					$result_single = mysqli_stmt_get_result($stmt);				
					$result	= mysqli_fetch_assoc($result_single);
					break;
				case 'couple' :
					$result_couple = mysqli_stmt_get_result($stmt);
					$result	= mysqli_fetch_all($result_couple);
					break;				
			}
			mysqli_stmt_close($stmt);
			return $result;
			
		}else{		
			return false;		
		}	
	} 
	
	public function query_without_prepare($type,$sql){
	
		if( $result	= mysqli_query($this->connect_db(),$sql)){
			switch($type){
				case 'update' :
				case 'delete' :
					$result	= mysqli_affected_rows($this->connect_db());
					break;
				case 'insert' :
					$result	= mysqli_insert_id($this->connect_db());
					break;
				case 'single' :	
					$result	= mysqli_fetch_assoc($result);
					break;
				case 'couple' :
					$result	= mysqli_fetch_all($result);
					break;
			}
		}else{
			return false;
		}
		
	}
	
	public function transaction_start() {
		
		return mysqli_begin_transaction($this->connect_db());
	}
	
	public function transaction_commit() {
	
		return mysqli_commit($this->connect_db());
	}
		 
	public function transaction_rollback() {
		 
		return mysqli_rollback($this->connect_db());
	}
	
	public function autocommit($mode){
	
		return mysqli_autocommit($this->connect_db(),$mode);
	}
		
}