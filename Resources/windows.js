/*global Ti */

// here we define the "W" namesapce for the windows
var W = {};
// this is in a function
function refreshWindows(){
	Ti.include('windows/login.js');
	Ti.include('windows/list.js');
	Ti.include('windows/info.js');
	Ti.include('windows/gallery.js');
	Ti.include('windows/tabgroup.js');
	Ti.include('windows/map.js');
}
// this is our debug window
Ti.include('windows/debug.js');

// this will refresh the windows.
// this is good, so that you don't have to restart the app
// every time you make a small change, the button to fire this
// is in the debug window.
refreshWindows();


/*
 * windows in this app work this have this structure:
 * 
 * =============== mywindow.js ================================================
 *	W.MyWindow = function(){
 * 		// declare the window
 *		var win = UI.Win({
 *	 		file:'something.js', // <------ this is the name of the file, for debuging purposes only
 *	 		title:'My Window'
 *		});
 *	 
 * 		// create everthing for this window
 * 
 * 		// add it's listeners
 * 
 *		// return the window
 *	 	return win;
 * 	};
 * ============================================================================
 * 
 * Now, to open the window, we can either assign it to a var:
 *  
 *	var myWin = W.MyWindow();
 * 	myWin.open();
 * 
 * Or not assign it at all
 * 
 * 	W.MyWindow().open();
 * 
 */