var fs = require('fs')
  , ini = require('ini');

module.exports.parse = function(fileData) {
    var config = ini.parse(fileData);
    return config;
}