   /**
    * PPT 盒子
    * 李清清 2012-05-17
    */
    function PPTBox()
    {
        this.uid = PPTBoxHelper.getId();
        PPTBoxHelper.instance[this.uid] = this;
        
        this.autoplayer = 4;
        this._box = [];
        this._curIndex = 0;
		this.background_id = '' ;
		this.id='';
		this.onclass='';
		this.outclass='';
		this.process=0;
    }
    PPTBox.prototype =
    {
         
        _play : function(){
            clearInterval(this._autoplay);
            var idx = this._curIndex+1;
            if(idx>=this._box.length){idx=0;}
            this.changeIndex(idx,this.process);
            this.autorun();

        },
        
        changeIndex : function(idx,flag){
		
			clearInterval(this.process_run);
            var parame = this._box[idx];
             this.moveElement(parame.url,parame.href,parame.backcolor);
		     
            
			this.imgs[this._curIndex].className = this.outclass;
			this.imgs[idx].className = this.onclass;
			if(this.process==1){
				 this.imgs[this._curIndex].style.width = '0%';
				if(flag==0){	 
					this.imgs[idx].style.width = '100%';	
				}else{
					var t=Math.floor(this.autoplayer*500/25);
					var eventstr = "PPTBoxHelper.instance['"+this.uid+"'].progress("+idx+")";
					this.process_run=setInterval(eventstr,t); 
				}
			}
            this._curIndex = idx;
        },
        mouseoverPic:function(idx){
			
            this.changeIndex(idx,0);
            this.autorun();
        },
        add:function (imgParam){
            this._box[this._box.length] = imgParam;
        },
        show : function () {
			if (!_$(this.id)) return false;
			if(this.background_id){
				this.back_ground = _$(this.background_id);	
			}
			this.elem = _$(this.id);
			this.elem2 = this.elem.parentNode;
			this.imgs = _$(this.uid+"_imagebox").getElementsByTagName("span");
           this.autorun();
        },
		
		moveElement:function (url,href,backcolor) {
			
			this.elem.src=url;
			this.elem2.href=href;
			 
			if(this.background_id){
				this.back_ground.style.backgroundColor=backcolor;
			}
		},
		next:function(){
			var idx = this._curIndex+1;
            if(idx>=this._box.length){idx=0;}
            this.changeIndex(idx,0);
            this.autorun();
		
		},
		pre:function(){
			var idx = this._curIndex-1;
            if(idx<0){idx=this._box.length-1;}
            this.changeIndex(idx,0);
			this.autorun();
		},
		autorun:function(){

			if(this.autoplayer>0){
               clearInterval(this._autoplay);
               var eventstr = "PPTBoxHelper.instance['"+this.uid+"']._play()";
               this._autoplay = setInterval(eventstr,this.autoplayer*1000);
            }		
		},
		progress:function(img_id){
			var wt = parseInt(this.imgs[this._curIndex].style.width);
			if(wt<100){
				this.imgs[this._curIndex].style.width = (wt+4)+'%';
			}else{
				clearInterval(this.process_run);
			}
		
		}	
    }
    var PPTBoxHelper =
    {
        count: 0,
        instance: {},
        getId: function() { return '_ppt_box-' + (this.count++); }
    };