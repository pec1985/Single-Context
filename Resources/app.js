/*global Ti UI W log*/

/*
 * This is a demo app, very simple.
 * This demonstrates how to structure well your app.
 * Everything here is global and runs from app.js
 * 
 * All the windows have a namespace of 'W' and are in the windows folder.
 * There is a "windows.js" file where all the window files need to be included in.
 * 
 * This app also has a "debugger", which is a window that allows you to turn
 * console logs on and off, as well as a memory message.
 * 
 * The memory message is a very small window that refreshes every two seconds and displays the amount 
 * of memory on the device. As long as you stay within the tabgroup, that message will display
 * always, unless turned off.
 * 
 * The debugger also has a button that will re-include all of the windows. So, if you are running
 * the app on the simulator and make a change to a window, close that window, and press the refresh
 * button, then open the window again and you'll see the changes.
 * 
 * If you need to include some common function to the app, something that will be used more than once,
 * use the utils.js in the utils folder. Place it inside of the Utils namespace. Avoid creating more
 * variables than needed.
 * 
 * 
 * If you structure the app like this, you will not need to use the url method to create windows
 * and you wont have to Ti.include() all of those files in every window as you probably did in the past.
 */

/*
 * Disclosure, the information displayed in this app is taken from static json files (created by me) and they, may very well,
 *  be outdated and inaccurate. The purpose of this app is to demonstrate a structure.
 * 
 */

// add all the files that we need for the app, but remember, EVERTHING is global, be careful
Ti.include('utils/ui.js');
Ti.include('utils/log.js');
Ti.include('utils/utils.js');
Ti.include('windows.js');

// general global vars:
var BASE_URL = 'https://s3.amazonaws.com/pedruqui/tests/';
var LOGIN_URL = 'https://s3.amazonaws.com/pedruqui/tests/login.json';
var login;
var tabGroup;

// this is in case the user denies location permision, always good to have a backup plan 
var LOC = {lng:-71.056419,lat:42.356892};

// all the tabs will be stored in this array
var tab = [];

// this will build as the app moves on. 
var hotels = {
	list:[],
	images:[],
	selectedId:null,
	selected:{}
};

// this not necessary in this app, but if you'd like to get the user's location on your app,
// it's always a good idea to do it when the app starts.
(function(){
	// this is inside a function so that nothing here scapes
	// and else become global
	
	// open the login window after verification of the location
	function startApp(){
		login = W.Login();
		login.open();
	}
	// this is a flag to make sure the geolocation event does not fire more than once
	var x = true;
	
	// function to get location
	function getLocationAndStartApp(e){
		log.json(e);
		// here we use the "x" flag
		if(x){
			// if success, great, we have a real location, start the app!
			if(e.success){
				LOC = {lat:e.coords.latitude,lng:e.coords.longitude};
				log.info('Real Location');
				startApp();
			}
			// if no success, that's ok, we defined a "fake" location up top
			// start the app!!!
			else {
				log.info('Fake Location');
				startApp();
			}
			// change the flag to false
			x=false;
		}
		// double check that location is not fired more than once
		Ti.Geolocation.removeEventListener('location',getLocationAndStartApp);
	}
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 10;
	Ti.Geolocation.purpose = "To locate you!";
	
	// call the location event listener
	Ti.Geolocation.addEventListener('location',getLocationAndStartApp);
})();

// this is for debugging: show memory at all times.
// code taken from the Kitchen Sink and modified.
(function(){
	var messageWin = UI.Win({
		height:30,
		width:250,
		top:10,
		borderRadius:10,
		touchEnabled:false
	});
	var messageView = Ti.UI.createView({
		id:'messageview',
		height:30,
		width:250,
		borderRadius:10,
		backgroundColor:'#000',
		opacity:0.7,
		touchEnabled:false
	});
	
	var messageLabel = Ti.UI.createLabel({
		id:'messagelabel',
		text:'',
		color:'#fff',
		width:250,
		height:'auto',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center'
	});
	messageWin.add(messageView);
	messageWin.add(messageLabel);
	
	// this app event will show the message
	Ti.App.addEventListener('showMem', function(){
		setInterval(function(){
			messageLabel.text = Ti.Platform.availableMemory;
		},2000);
		messageWin.open();	
	});
	// this app event will hide the message
	Ti.App.addEventListener('hideMem', function(){
		messageWin.close();
	});
})();
