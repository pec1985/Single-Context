/*global Ti UI W hotels log BASE_URL Utils tab*/

// this window shows the datails of the hotel chosen from the previous window
// it will fetch an external file depending on which hotel was chosen
W.Info = function(){
	
	// every thing on this window, except for the title, is empty
	// and will be populated after the xhr call

	// ------ create what's needed --------
	var win = UI.Win({
		file:'info.js',
		title:'Details'
	});
	
	var mapButton = UI.Button({
		title:'Show in map'
	});
	
	win.rightNavButton = mapButton;
	
	var mainView = UI.Scroll({
		layout:'vertical',
		backgroundColor:'#ddd'
	});
	
	var title = Ti.UI.createLabel({
		left:10,top:10,right:10,
		text:'',
		height:'auto',
		textAlign:'center',
		font:{
			fontSize:20,
			fontWeight:'bold'
		}
	});
	
	var image = Ti.UI.createImageView({
		left:10,top:10,right:10,
		image:'',
		height:'auto'
	});
	var address = Ti.UI.createLabel({
		left:10,top:10,right:10,
		text:'',
		height:'auto',
		font:{
			fontSize:14,
			fontWeight:'bold'
		}
	});
	
	var hotelInfo = Ti.UI.createLabel({
		left:10,top:10,right:10,
		text:'',
		height:'auto'
	});
	
	// add every thing to the scrollview
	mainView.add(title);
	mainView.add(image);
	mainView.add(address);
	mainView.add(hotelInfo);

	// add the scroll view to the window
	win.add(mainView);
	

	// open the map with this button
	mapButton.addEventListener('click', function(){
		tab[0].open(W.Map());
	});
	
	// this is the custom xhr call function defined in utils.js
	Utils.xhr(
		// we'll tell it where to look for the file
		{url:BASE_URL+'hotel_'+hotels.selectedId+'.json'},
		// and what to do when the json comes back
		function(json){
			// populate everything
			hotels.selected = json.details;
			log.json(json);
			hotels.images.push(hotels.selected.image);
			title.text = hotels.selected.name;
			image.image = hotels.selected.image;
			address.text = hotels.selected.address;
			hotelInfo.text = hotels.selected.description;
		}
	);
	return win;
};