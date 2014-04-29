var fs = require('fs')
  , ini = require('ini')
  , path = require('path')
  , extend = require('node.extend');

module.exports.parseFile = function(filePath, inheritanceLevel, cb) {
    parseFileIntern(filePath, inheritanceLevel, cb);
};

function parseFileIntern(filePath, inheritanceLevel, cb, mergedConfig) {
    if (typeof inheritanceLevel === 'function') {
        cb = inheritanceLevel;
        inheritanceLevel = undefined;
    }
    inheritanceLevel = getRealInheritanceLevel(inheritanceLevel);

    fs.exists(filePath, function(exists) {
        
        if (!exists) {
            handleInheritance(inheritanceLevel, filePath, cb, mergedConfig);
        } else {
            fs.readFile(filePath, 'ascii', function(err, fileData) {
                if (err) {
                    cb(err);
                    return;
                }

                var config = ini.parse(fileData);
                mergedConfig = mergeConfig(config, mergedConfig);

                handleInheritance(inheritanceLevel, filePath, cb, mergedConfig);
            });
        }
    });
}

module.exports.parseFileSync = function(filePath, inheritanceLevel) {
    
};

function handleInheritance(inheritanceLevel, filePath, cb, mergedConfig) {
    if (inheritanceLevel > 1) {
        var parentFile = getParentFile(filePath).toLowerCase(); //Work with absolute paths.
        filePath = path.resolve(filePath).toLowerCase(); //Work with absolute paths.
        if (parentFile != filePath) {            
            parseFileIntern(parentFile, inheritanceLevel-1, cb, mergedConfig);
            return;
        }
    }

    cb(null, mergedConfig);
}
function getParentFile(filePath) {
    var curentFileDir = path.dirname(filePath);
    currentFileDir = path.join(curentFileDir, '..');
    filePath = path.join(currentFileDir, path.basename(filePath));
    return path.resolve(path.normalize(filePath));
}

function mergeConfig(config1, config2) {
    return extend(true, config1, config2);
}

function getRealInheritanceLevel(level) {
    if (typeof level === 'number') {
        return Math.max(level, 1);
    }
    
    return 1;
}