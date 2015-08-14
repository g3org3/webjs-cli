#!/usr/bin/env node


/**
 * Module dependencies
 */

var program = require('commander');
var version = require('./package.json').version;
program
  .version('0.0.1')
  .option('-v, --version', 'version')
  .parse(process.argv);

console.log('webjs:');

if (program.version) console.log(version);