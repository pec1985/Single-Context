/*global Ti */

// this is the log file

// two namespaces, onw for the logs and the other to turn them on and off
var Log = {};
var Debug = {};

(function(){
	// this tells the logger whether they're on or off
	// can be changed in the Debug window
	Debug = {
		Info:1,
		Win:1,
		Error:1,
		Obj:1,
		Json:1,
		Server:{
			URL:1,
			ERROR:1,
			PARSE:1,
			SEND:1
		}
	};
})();
(function(){
	// this is the actual log structure:
	// for example, for normal Ti.API.info(), we can use Log.Info('something')
	Log={
		Info:function(e){
			if(Debug.Info){ return Ti.API.info('<INFO> '+e);}
		},
		Win:function(e){
			if(Debug.Win){ return Ti.API.info('<WINDOW> '+e);}
		},
		Error:function(e){
			if(Debug.Wrror){ return Ti.API.error(e);}
		},
		Obj:function(a,b){
			if(!b){
				if(Debug.Obj){ return Ti.API.info(JSON.stringify(a));}
			} else {
				if(Debug.Obj){ return Ti.API.info(a+' '+JSON.stringify(b));}
			}
		},
		Json:function(e){
			if(Debug.Json){
				try{
					return Ti.API.info(JSON.parse(e));
				} catch(a){
					return Ti.API.info(JSON.parse(JSON.stringify(e)));
				}
			}
		},
		Server:{
			URL:function(e){
				if(Debug.Server.URL){ return Ti.API.info('<SERVER - URL> '+e);}
			},
			ERROR:function(e){
				if(Debug.Server.ERROR){ return Ti.API.error('<SERVER - BAD> '+e);}
			},
			PARSE:function(e){
				if(Debug.Server.PARSE){ 
					try{
						return Ti.API.info(JSON.parse('<SERVER - PARSE> '+e));
					} catch(a){
						return Ti.API.info(JSON.parse(JSON.stringify('<SERVER - PARSE> '+e)));
					}
				}
			},
			SEND:function(e){
				if(Debug.Server.SEND){ return Ti.API.info('<SERVER - SEND> '+e);}
			}
		}
	};
})();
