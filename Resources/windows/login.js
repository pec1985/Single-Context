/*global Ti UI W tabGroup LOGIN_URL Utils tabGroup:true*/

// this is the login window. There is a xhr call that looks for credentials,
// if the username and password matches, close the window and open the 
// tab group
W.Login = function(){
	// create what's needed
	var win = UI.Win({
		file:'login.js',
		title:'Login'
	});
	var mainView = UI.Scroll({
		layout:'vertical'
	});
	var logo = Ti.UI.createImageView({
		top:20,left:20,right:20, height:'auto',
		image:'images/nophoto.jpeg'
	});
	
	mainView.add(logo);
	
	var userField = UI.TextField({
		top:10,
		clearButtonMode:true,
		autocorrect: false,
		autocapitalization: false,
		hintText:'username'
	});
	
	var pwdField = UI.TextField({
		top:10,
		clearButtonMode:true,
		passwordMask: true,
		hintText:'password'
	});
	
	mainView.add(userField);
	mainView.add(pwdField);
	
	var loginButton = UI.Button({
		title:'Login',
		left:20, right:20,
		top:20
	});
	
	mainView.add(loginButton);
	
	win.add(mainView);
	
	// function to check if the username and password match
	// don't be scared, this is simpler than what it looks like
	function checkUserPassword(callback){
		// this is the custom xhr call function defined in utils.js
		Utils.xhr(
			// we'll tell it where to look for the file
			{url:LOGIN_URL},
			// and what to do when the json comes back
			function(json){
				if(json.success){
					// check if they match
					if(json.credentials.username == userField.value && json.credentials.password == pwdField.value){
						UI.Alert({
							title:'Yes',
							message:'Login Sucess!'
						}).show();
						userField.value = '';	//empty the fields
						pwdField.value = '';	//empty the fields
						// callback() closes this window and opens the tabgroup
						callback();
					} else {
						UI.Alert({
							title:'Remember!',
							message:'Username: '+json.credentials.username+'\nPassword: '+json.credentials.password
						}).show();
					}
				}
			}
		);
	}
	
	// quick check to see if the user forgot to input a username or password
	function checkLogin(){
		if(!userField.value || !pwdField.value){
			UI.Alert({
				title:'Oh No!!!',
				message:'Either username or password is empty!!!'
			}).show();
			return false;
		} else {
			// ok, we're good now, let's see if they match
			checkUserPassword(
				// this is the call back function, after verification
				function(){
					win.close();
					tabGroup = W.TabGroup();
					tabGroup.open();
				}
			);
		}
	}
	
	// this is the event listener for the login button.
	loginButton.addEventListener('click', checkLogin);
	
	return win;	
};