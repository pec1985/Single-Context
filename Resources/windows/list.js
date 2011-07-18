/*global Ti UI W tabGroup hotels tab log BASE_URL Utils login*/

// this window, which is a root window, displays a list of hotels from an
// external json file. The list is in a table view with a searchbar
W.List = function(){
	// ------ create what's needed --------
	var win = UI.Win({
		file:'list.js',
		title:'Listing'
	});
	
	var logoutButton = UI.Button({
		title:'Logout'
	});
	
	win.leftNavButton = logoutButton;
	
	var search = Ti.UI.createSearchBar();
	var table = Ti.UI.createTableView({
		style:1,
		search:search
	});
	
	win.add(table);
	
	// ----- event listeners --------
	table.addEventListener('click', function(e){
		hotels.selectedId = e.rowData.id;
		tab[0].open(W.Info());
	});
	logoutButton.addEventListener('click', function(){
		tabGroup.close();
		login.open();
	});
	
	// this is the custom xhr call function defined in utils.js
	Utils.xhr(
		// we'll tell it where to look for the file
		{url:BASE_URL+'hotels.json'},
		// and what to do when the json comes back
		function(json){
			hotels.list = json.hotels;
			var tableData = [];
			// loop through the json file and create the rows
			for(var i = 0; i<hotels.list.length; i++){
				var row = Ti.UI.createTableViewRow({
					title:hotels.list[i].name,
					hasDetail:true,
					id:hotels.list[i].id
				});
				tableData[i] = row;
			}
			// populate the table view
			table.data = tableData;
		}
	);

	return win;
};
