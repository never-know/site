Min.event = {
 
	bind : function( elem, type, options ){
		if(!elem) return;
		var events = Min.cache.data( elem, 'e' + type ) || Min.cache.data( elem, 'e' + type, [] );
		
		// 将事件函数添加到缓存中; 先进后出 
		options.handler = options.handler || options;
		events.push( options );
		 
		// 同一事件类型只注册一次事件，防止重复注册
		if( events.length === 1 ){
			var eventHandler = this.eventHandler( elem );
			Min.cache.data( elem, type + 'Handler', eventHandler );
			 
			 
			if( elem.addEventListener ){
				elem.addEventListener( type, eventHandler, false );
			}
			else if( elem.attachEvent ){
				elem.attachEvent( 'on' + type, eventHandler );
			}
			 
		}
	},
	
	childBind : function(elem, type, options){
		
		if(!elem) return;
		
		var tags = elem.getElementsByTagName(options.tag);
		
		for(var i=0 , tag; tag =tags[i++]; ){
		
			this.bind(tag,type,options);
			
		}
	},
	
	unbind : function( elem, type, option ){
	
		if( !elem ) return;
		
		var options = Min.cache.data( elem , 'e' + type );
		
		if( !options ) return;
			
		// 如果没有传入要删除的事件处理函数则删除该事件类型的缓存
		if( !option ){
			options = undefined;		
		}
		// 如果有具体的事件处理函数则只删除一个
		else{
			for( var i = options.length , fn ; fn = options[--i];){
			
				if( fn === option || fn.handler === option.handler || fn.handler === option ){
					options.splice( i, 1 );
				}				
			}
		}		
	 
		// 删除事件和缓存
		if( !options || !options.length ){
			var eventHandler = Min.cache.data( elem, type + 'Handler' );			
			if( elem.addEventListener ){
				elem.removeEventListener( type, eventHandler, false );
			}
			else if( elem.attachEvent ){
				elem.detachEvent( 'on' + type, eventHandler );
			}		
			Min.cache.removeData( elem, type + 'Handler' );
			Min.cache.removeData( elem, 'e' + type );
		}
	},
		
	// 依次执行事件绑定的函数
	eventHandler : function( elem ){
		return function( event ){

			event = Min.event.fixEvent( event || window.event );
			
			if( !event.currentTarget ){
                event.currentTarget =  elem;
            }	
			
			event.delegateEvent = elem;
			
			var type = event.type,
				orginalTarget = event.target,
				options = Min.cache.data( elem, 'e' + type );
				console.log(options);
			 
			for(var i=options.length, option; option = options[--i];){
		
				var isDelegate = false;
				
				if( option.selector) {
				
					var target = orginalTarget;
					
					for( ; target !== elem; target = target.parentNode || elem ){
						if( Min.event.delegateFilter(target, option.selector) ){
							isDelegate = true;
							event.delegateEvent = target;
							break;
						}                        
					}      
				}
				if( option.selector== undefined || isDelegate ){
					if ( option.once == true ){
						Min.event.unbind( elem, type,option);
					} 
					
					if( option.handler.call(elem, event) === false ){
						event.preventDefault();
                        event.stopPropagation();	
					}	 
				}
				
			}

		 
		}
	},
	
	 delegateFilter : function( elem, selector ){
        var tagName,  name, index,
			className = elem.className,
			s = selector.split(',');
		for(var i=0,sel; sel=s[i++];){
			
			if( ~sel.indexOf('.') ){
			// class
				
				index = sel.indexOf( '.' );
				name = ' ' + sel.substring( index + 1 ) + ' ';    
				tagName = sel.substring( 0, index ).toUpperCase();
				if( (!tagName || elem.tagName === tagName) && (className && !!~(' ' + className + ' ').indexOf(name))) return true;
			}else if( ~sel.indexOf('#') ){
			// id
				index = sel.indexOf( '#' );
				name = sel.substring( index + 1 );    
				tagName = sel.substring( 0, index ).toUpperCase();
				if((!tagName || elem.tagName === tagName) && (elem.id === name))return true;  
			// tag				
			}else if( elem.tagName.toLowerCase() === sel) return true;
		}
		return false;
    },
	
	// 修复IE浏览器支持常见的标准事件的API
	fixEvent : function( e ){
		// 支持DOM 2级标准事件的浏览器无需做修复
		if ( e.target ) return e; 
		
		var event = {}, name;
		
		event.target = e.srcElement || document;
		
		if( event.target.nodeType === 3 ){
            event.target = event.target.parentNode;
        }
		
		event.preventDefault = function(){
			e.returnValue = false;
		};		
		event.stopPropagation = function(){
			e.cancelBubble = true;
		};
		// IE6/7/8在原生的window.event中直接写入自定义属性
		// 会导致内存泄漏，所以采用复制的方式
		for( name in e ){
			event[name] = e[name];
		}				
		return event;
	},
	
	stopPropagation : function (event) {
        var e = event || window.event;
         if(e.stopPropagation){
			e.preventDefault();
			e.stopPropagation()
		 }else{
			e.cancelBubble = true;
			e.returnValue = false;
		}
    },
	
	getEventCoords : function(e) {
		var x = 0;
		var y = 0;
		if ( Min.UA.belowIE8 ) {
			y = e.clientY;
			x = e.clientX;
			if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
				y = e.clientY + document.body.scrollTop;
				x = e.clientX + document.body.scrollLeft
			} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				y = e.clientY + document.documentElement.scrollTop;
				x = e.clientX + document.documentElement.scrollLeft
			}
		} else {
			y = e.clientY;
			x = e.clientX;
			y += window.pageYOffset;
			x += window.pageXOffset
		}
		return {
			'x': x,
			'y': y
		}
	},
	target : function(e){
	
		var target = e.target || e.srcElement || document;
		
		 return target.nodeType === 3 ? target.parentNode :target;

	}
	
	
	
}