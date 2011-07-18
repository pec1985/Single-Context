/*global Ti log, UI */

// To use general functions: use this file and this namespace
var Utils = {};
(function(){
	Utils = {
		// this is self explanatory
		removeDuplicateElement:function(arrayName){
			var newArray=[];
			label:for(var i=0; i<arrayName.length;i++ ){
				for(var j=0; j<newArray.length;j++ ){
					if(newArray[j]==arrayName[i]){
						continue label;
					}
				}
				newArray[newArray.length] = arrayName[i];
			}
			return newArray;
		},
		
		// instead of writing all that xhr call code all the time,
		// use Utils.xhr() instead
		// takes two paramaters: params and callback
		// params takes two for now, the url and the type ('GET', 'POST', etc)
		// 'GET' is default, but the url is a must
		// callback is also a must
		
		// this is setup for json feeds, you'll need to modify it to suit your needs.
		xhr:function(params,callback){
			
			if(!params || !params.url){
				UI.Alert({
					title:'Yo Dude!',
					message:'Give the XHR call some params!!'
				});
				return false;
			}
			if(!callback){
				UI.Alert({
					title:'Yo Dude!',
					message:'Give the XHR call a callback!!'
				});
				return false;
			}
			if(!params.type){ params.type = 'GET'; }
			
			var xhr = Ti.Network.createHTTPClient();
			xhr.onload = function(){
				try{
					var json = JSON.parse(this.responseText);
					log.server.parse(this.responseText);
					callback(json);
				}catch(e){
					UI.Alert({
						title:'Oh No!!!',
						message:e
					}).show();
					log.server.error(this.responseText);
				}
			};
			xhr.onerror = function(){
				UI.Alert({
					title:'Oh No!!!',
					message:'Server Error!'
				}).show();
				log.server.error(this.responseText);
				log.server.error(this.status);
			};
			xhr.open(params.type,params.url);
			log.server.url(params.url);
			xhr.send();
		}
	};
})();
