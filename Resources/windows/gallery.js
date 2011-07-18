/*global Ti UI W hotels log BASE_URL Utils*/


// this window will look in the array of images and fill the screen
// the more hotels are viewed on the detail window, the more images
// the array will have

W.Gallery = function(){
	var win = UI.Win({
		file:'gallery.js',
		title:'Image Gallery'
	});

	var mainView;
	var populated = false;

	// this function will be called on window focus
	function populateWin(populated){
		// I'm still not convinced about this.
		if(populated){
			win.remove(mainView);
		} 
		mainView = UI.Scroll({
			showVerticalScrollIndicator:true,
			layout:'horizontal',
			contentWidth:320
		});
		
		// get the array of images and remove any duplicates
		hotels.images = Utils.removeDuplicateElement(hotels.images);
		
		// now, loop through the array and create image views to populate the scroll view
		for(var i = 0;i<hotels.images.length;i++){
			
			var image = Ti.UI.createImageView({
				image: hotels.images[i],
				width:70, height:70,
				left:5,right:5,
				top:5, bottom:5,
				id:i
			}); 
			// add each image to the scroll view
			mainView.add(image);
		}
		
		// add the scroll view to the window
		win.add(mainView);
		
		// change the flag so we can remove the view later and not make duplicates
		populated = true;
	}
	
	// populate our window on focus!
	win.addEventListener('focus', function(){
		populateWin(populated);
	});
	return win;
};