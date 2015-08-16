/*
 *	Dependencies
 */
var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

/*
 *	PATHS
 */
var path = {
	routes: '../config/routes',
	controllers: '../core/controllers/',
	services: '../core/services/'
}

/*
 *	Where the binding is happening
 */
var routes = require(path.routes);
var keys = Object.keys(routes);
for (var i = 0; i < keys.length; i++) {
	var key = keys[i];
	var pos = key.indexOf(" ");
	
	var method = (pos!=-1)? key.substring(0, pos): "all";
	method = method.toLowerCase();
	
	var route = key.substring(++pos);

	

	var value = routes[key];
	pos = -1;
	pos = value.indexOf(".");

	var controller = value.substring(0, pos);
	var action = value.substring(pos+1);

	var ctrl = undefined;
	
	try {
		ctrl = require(path.controllers+controller)[action];
	} catch(e) {}

	if(pos==-1){
		console.log(route, pos, value);
		ctrl = function(req, res){ res.render(value); };
	}

	// console.log(typeof ctrl, value);

	if(typeof ctrl == "function")
		router[method](route, ctrl);
};

/*
 * 	Services binding to global var
 */
exec("ls core/services", function(er, out){
	var services = out.split("\n");
	for (var i = 0; i < services.length; i++) {
		var service = services[i];
		if(service!=""){
			var name = service.substring(0, service.indexOf('.js'));
			global[name] = require(path.services+name);
		}
	};
})


console.log("----> Ready");
module.exports = router;
