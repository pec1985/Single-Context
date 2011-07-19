/*global Ti log*/

// this is our main "UI" file. Any general changes, like the barColor of the windows,
// for example, can be changed here and will affect all of the windows.
//
// thanks to this, we can can UI.Window() instead of Ti.UI.createWindow()
var UI = {};
(function(){
	UI = {
		Alert:function(e){
			if(!e){ e = {}; }
			return Ti.UI.createAlertDialog(e);
		},
		Button:function(e){
			if(!e){ e = {}; }
			if(!e.height){ e.height = 44; }
			return Ti.UI.createButton(e);
		},
		// this is not implemented in this app yet, but it works great
		Nav:function(e){
			if(!e){ e = {}; }
			if(!e.window){ e.window = this.Win(); }
			var win = Ti.UI.createWindow();
			var nav = Ti.UI.iPhone.createNavigationGroup({
			   window: e.window
			});
			win.add(nav);
			win.next = function(a){
				nav.open(a);
			};
			return win;
		},
		// the scrollview is a crazy beast, let's give it default values
		Scroll:function(e){
			if(!e){ e = {}; }
			if(!e.contentWidth){ e.contentWidth = 'auto'; }
			if(!e.contentHeight){ e.contentHeight = 'auto'; }
			if(!e.top){ e.top = 0; }
			if(!e.bottom){ e.bottom = 0; }
			if(!e.left){ e.left = 0; }
			if(!e.right){ e.right = 0; }
			return Ti.UI.createScrollView(e);
		},
		// so, I want all my textfields to be hight 44,
		// and left and right 20
		TextField:function(e){
			if(!e){ e = {}; }
			if(!e.borderStyle){ e.borderStyle = 3;}
			if(!e.left){ e.left = 20;}
			if(!e.right){ e.right = 20;}
			if(!e.height){ e.height = 44;}
			return Ti.UI.createTextField(e);
		},
		Win:function(e){
			if(!e){ e = {}; }
			// just for fun, let's give all the widows a grey barColor
			// (can be overwritten)
			if(!e.backgroundColor){ e.backgroundColor = '#ccc'; }
			if(!e.barColor){ e.barColor = '#999'; }
			var win = Ti.UI.createWindow(e);
			// some log event listeners
			win.addEventListener('open', function(){
				Log.Win(e.file + ' opened');
			});
			win.addEventListener('focus', function(){
				Log.Win(e.file + ' focused');
			});
			win.addEventListener('close', function(){
				Log.Win(e.file + ' closed');
			});
			return win;
		}
	};
})();