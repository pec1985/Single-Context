/*global Ti */

// this is the log file

// two namespaces, onw for the logs and the other to turn them on and off
var log = {};
var debug = {};

(function(){
	// this tells the logger whether they're on or off
	// can be changed in the debug window
	debug = {
		info:1,
		win:1,
		error:1,
		obj:1,
		json:1,
		server:{
			good:1,
			bad:1,
			parse:1,
			send:1
		}
	};
})();
(function(){
	// this is the actual log structure:
	// for example, for normal Ti.API.info(), we can use log.info('something')
	log={
		info:function(e){
			if(debug.info){ return Ti.API.info('<INFO> '+e);}
		},
		win:function(e){
			if(debug.win){ return Ti.API.info('<WINDOW> '+e);}
		},
		error:function(e){
			if(debug.error){ return Ti.API.error(e);}
		},
		obj:function(a,b){
			if(!b){
				if(debug.obj){ return Ti.API.info(JSON.stringify(a));}
			} else {
				if(debug.obj){ return Ti.API.info(a+' '+JSON.stringify(b));}
			}
		},
		json:function(e){
			if(debug.json){
				try{
					return Ti.API.info(JSON.parse(e));
				} catch(a){
					return Ti.API.info(JSON.parse(JSON.stringify(e)));
				}
			}
		},
		server:{
			url:function(e){
				if(debug.server.url){ return Ti.API.info('<SERVER - URL> '+e);}
			},
			error:function(e){
				if(debug.server.error){ return Ti.API.error('<SERVER - BAD> '+e);}
			},
			parse:function(e){
				if(debug.server.parse){ 
					try{
						return Ti.API.info(JSON.parse('<SERVER - PARSE> '+e));
					} catch(a){
						return Ti.API.info(JSON.parse(JSON.stringify('<SERVER - PARSE> '+e)));
					}
				}
			},
			send:function(e){
				if(debug.server.send){ return Ti.API.info('<SERVER - SEND> '+e);}
			}
		}
	};
})();
