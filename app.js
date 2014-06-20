#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;

exec('find Devices -type f -iname "*.png" -not -path "*Appearance*"', function(error, stdout, stderr) {

  rawArray = stdout
    .toString('utf8')
    .split(/\r\n|[\n\r\u0085\u2028\u2029]/g)
    .filter(function(i){
      return i != '';
    });

  var devices = {};

  rawArray.forEach(function(path){
    var pathElements = path.split('/');
    var device = pathElements[1];
    var image = pathElements[2];
    var id = Number(image.split('.')[0]);

    if(devices[device] == undefined) {
      devices[device] = {};
    }

    devices[device][id] = {
      image: image,
      path: path
    };

  });

  console.log(devices);

});
