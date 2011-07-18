/*global Ti UI W tabGroup LOGIN_URL tab*/

// this is the tab group file
W.TabGroup = function(){
	// create the group
	var group = Ti.UI.createTabGroup();
	
	// instead of assigning vars to the tabs, we'll add them to the global
	// tab array for later use.
	//
	// for example, tab[0].open( next window );
	tab[0] = Ti.UI.createTab({
		title:'List',
		icon:'KS_nav_ui.png',
		window:W.List()
	});
	tab[1] = Ti.UI.createTab({
		title:'Images',
		icon:'KS_nav_ui.png',
		window:W.Gallery()
	});
	tab[2] = Ti.UI.createTab({
		title:'Debug',
		icon:'KS_nav_ui.png',
		window:W.Debug()
	});
	
	// add them to the group
	group.addTab(tab[0]);
	group.addTab(tab[1]);
	group.addTab(tab[2]);
	
	// this is part of the debug, make sure the memory message window also closes
	group.addEventListener('close', function(){
		Ti.App.fireEvent('hideMem');
	});
	
	return group;
};
