/*global Ti UI W tabGroup Utils hotels log*/

// this is the map window. Using the forward geolocation we can get the 
// map location of the address
W.Map = function(){
	var win = UI.Win({
		file:'map.js',
		title:'Map'
	});
	// create the empty map
	var map = Ti.Map.createView();
	
	// add the map to the window
	win.add(map);	

	// forward geolocation function
	Ti.Geolocation.forwardGeocoder(hotels.selected.address, function(e) {
		Log.Json(e);
		// create the pin and place it on the location
		var pin = Ti.Map.createAnnotation({
			latitude: e.latitude,
			longitude: e.longitude,
			title:hotels.selected.name
		});
		// ceneter the map on it
		map.region = {
			latitude: e.latitude,
			longitude: e.longitude,
			longitudeDelta:0.5,
			latitudeDelta:0.5
		};
		// add the pin to the map
		map.addAnnotation(pin);
	});
	return win;
};
