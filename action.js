/*
 *	DEPENDENCIES
 */
var _ = require('lodash');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var Q = require('q');
var package = require('./package.json');

module.exports =  (function(){
	var obj = {};
	var self = this;
	
	var dirs = [
		// sub
		'core/controllers',
		'core/services',
		'public/css',
		'public/js',
		'public/images',
		// main
		'bin',
		'config',
		'core',
		'public',
		'views'
	];
	
	var files = [
		// lvl 2
		'/public/css/style.css',
		'/core/controllers/MainController.js',
		// lvl 1
		'/views/index.jade',
		'/views/error.jade',
		'/views/layout.jade',
		'/config/db.js',
		'/config/models.js',
		'/config/routes.js',
		'/config/config.js',
		'/core/bind.js',
		'/core/sockets.js',
		'/bin/www',
		'/app.js',
	];

	this.mkdir = function(path){
		fs.mkdirSync(path, 0755);
		console.log("    ", chalk.cyan('create'), ": ", path);
	};

	this.copy = function(file, destPath){
		var from = path.join(__dirname, 'templates', file);
		var to = destPath+file;
		
		var info = fs.readFileSync(from);
		fs.writeFileSync(to, info, { mode: 0666 });
		console.log("     ", chalk.cyan('create'), ': ', to);
	};

	return {
		handleCreate: function(destPath){
			if(!destPath) return console.log("try -h for help");
		
			var name = path.basename(path.resolve(destPath));

			// Create Main dir
			console.log("   ", chalk.magenta('Main'))
			self.mkdir(destPath);
			

			// Create Sub dirs
			console.log(chalk.magenta("\n    Folders"));
			for (var i = dirs.length - 1; i >= 0; i--) {
				self.mkdir(destPath+'/'+dirs[i]);
			};

			// Create Files
			console.log(chalk.magenta("\n    Files"))
			for (var i = files.length - 1; i >= 0; i--) {
				self.copy(files[i], destPath)
			};

			// Create Package JSON
			var pkg = {
				"name": "webjs",
				"version": "0.2.0",
				"private": true,
				"scripts": {
					"start": "node ./bin/www"
				},
				"dependencies": {
					"body-parser": "~1.13.2",
					"cookie-parser": "~1.3.5",
					"debug": "~2.2.0",
					"express": "~4.13.1",
					"jade": "~1.11.0",
					"morgan": "~1.6.1",
					"serve-favicon": "~2.3.0",
					"socket.io": "^1.3.6"
				}
			}

			pkg.dependencies['jade'] = '~1.11.0';
			// pkg.dependencies['stylus'] = '0.42.3';
			fs.writeFileSync(destPath+'/package.json', JSON.stringify(pkg, null, 2), { mode: 0666 });

			// Help info
			console.log("\n", "   ", chalk.magenta('Info'));
			console.log(chalk.gray("      ", "\# install dependencies"));
			console.log(chalk.yellow("      ", "$ cd "+destPath+" && npm install"))

			// Run app
			console.log("\n", "   ", chalk.magenta('Run'));
			console.log(chalk.gray("      ", "\# start app"));
			console.log(chalk.yellow("      ", "$ npm start"))

			// Done
			console.log(chalk.gray("\n", "    -- ", "DONE", " --\n"));
		}
	}
}());