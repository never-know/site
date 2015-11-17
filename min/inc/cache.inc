<?php
 
class cache(){
 
	private $bin;
	
	public function set($bin,$id,$data,$expire = 0){
	
		$bin->save($id,$data,$expire);
	}
 
 
}

class cacheFile(){


}

class cacheRedis(){


}

class cacheDB(){




}
 