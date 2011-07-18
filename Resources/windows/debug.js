/*global Ti iPhone Android W UI debug refreshWindows*/
W.Debug = function(){
	var win = UI.Win({
		file:'debug.js',
		title:'Debug Window'
	});
	var includes = UI.Button({title:'Refresh'});
	
	win.rightNavButton=includes;
	
	var view0 = Ti.UI.createTableViewRow();
	var label0 = Ti.UI.createLabel({left:10,right:100,text:'showMem'});
	var switch0 = Ti.UI.createSwitch({right:10,value:false});
	view0.add(label0);
	view0.add(switch0);

	var view1 = Ti.UI.createTableViewRow();
	var label1 = Ti.UI.createLabel({left:10,right:100,text:'log.info'});
	var switch1 = Ti.UI.createSwitch({right:10,value:true});
	view1.add(label1);
	view1.add(switch1);

	var view2 = Ti.UI.createTableViewRow();
	var label2 = Ti.UI.createLabel({left:10,right:100,text:'log.win'});
	var switch2 = Ti.UI.createSwitch({right:10,value:true});
	view2.add(label2);
	view2.add(switch2);

	var view3 = Ti.UI.createTableViewRow();
	var label3 = Ti.UI.createLabel({left:10,right:100,text:'log.error'});
	var switch3 = Ti.UI.createSwitch({right:10,value:true});
	view3.add(label3);
	view3.add(switch3);

	var view4 = Ti.UI.createTableViewRow();
	var label4 = Ti.UI.createLabel({left:10,right:100,text:'log.obj'});
	var switch4 = Ti.UI.createSwitch({right:10,value:true});
	view4.add(label4);
	view4.add(switch4);

	var view41 = Ti.UI.createTableViewRow();
	var label41 = Ti.UI.createLabel({left:10,right:100,text:'log.json'});
	var switch41 = Ti.UI.createSwitch({right:10,value:true});
	view41.add(label41);
	view41.add(switch41);

	var view5 = Ti.UI.createTableViewRow();
	var label5 = Ti.UI.createLabel({left:10,right:100,text:'log.server.url'});
	var switch5 = Ti.UI.createSwitch({right:10,value:true});
	view5.add(label5);
	view5.add(switch5);

	var view6 = Ti.UI.createTableViewRow();
	var label6 = Ti.UI.createLabel({left:10,right:100,text:'log.server.error'});
	var switch6 = Ti.UI.createSwitch({right:10,value:true});
	view6.add(label6);
	view6.add(switch6);

	var view7 = Ti.UI.createTableViewRow();
	var label7 = Ti.UI.createLabel({left:10,right:100,text:'log.server.parse'});
	var switch7 = Ti.UI.createSwitch({right:10,value:true});
	view7.add(label7);
	view7.add(switch7);

	var view8 = Ti.UI.createTableViewRow();
	var label8 = Ti.UI.createLabel({left:10,right:100,text:'log.server.send'});
	var switch8 = Ti.UI.createSwitch({right:10,value:true});
	view8.add(label8);
	view8.add(switch8);

	var table = Ti.UI.createTableView({
		data:[
			view0,
			view1,
			view2,
			view3,
			view4,
			view41,
			view5,
			view6,
			view7,
			view8
		]
	});

	switch0.addEventListener('change', function(e){
		if(e.value){
			Ti.App.fireEvent('showMem');
		}
		if(!e.value){
			Ti.App.fireEvent('hideMem');
		}		
	});
	switch1.addEventListener('change', function(e){
		debug.info=e.value;
	});
	switch2.addEventListener('change', function(e){
		debug.win=e.value;
	});
	switch3.addEventListener('change', function(e){
		debug.error=e.value;
	});
	switch4.addEventListener('change', function(e){
		debug.obj=e.value;
	});
	switch41.addEventListener('change', function(e){
		debug.json=e.value;
	});
	switch5.addEventListener('change', function(e){
		debug.server.url=e.value;
	});
	switch6.addEventListener('change', function(e){
		debug.server.error=e.value;
	});
	switch7.addEventListener('change', function(e){
		debug.server.parse=e.value;
	});
	switch8.addEventListener('change', function(e){
		debug.server.send=e.value;
	});
	
	includes.addEventListener('click', refreshWindows);
	win.add(table);
	
	return win;
};