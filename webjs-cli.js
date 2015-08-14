#!/usr/bin/env node


/**
 * Module dependencies
 */

var program = require('commander');
var _ = require('lodash');
var version = require('./package.json').version;

program
	.version(version, '-v');


process.argv = _.map(process.argv, function(arg) {
	return (arg === '-V') ? '-v' : arg;
});

program
	.usage("")
	.option('new <name>', 'new webjs project')
	.parse(process.argv);

if (program.new) console.log("new webjs project")