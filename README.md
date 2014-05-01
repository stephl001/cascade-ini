# cascade-ini

Builds a configuration object by merging all ini files with the same name on a given directory path.

[![Build Status](https://travis-ci.org/stephl001/cascade-ini.svg?branch=master)](https://travis-ci.org/stephl001/cascade-ini)

# example

``` js
var ini = require('cascade-ini');

//Reads a single ini file.
ini.parseFile('path/to/ini/file', function(err, config) {
  console.log(config);
});

//Merges all file.ini found in directories: path/to/ini/, path/to/ and path/
ini.parseFile('path/to/ini/file.ini', 3, function(err, config) {
  console.log(config);
});
```

# methods

``` js
var ini = require('cascade-ini');
```

## parseFile(path, hierarchyLevel, cb)

Given a path to a ini file, this method will read all ini files with the same name as the requested one starting at `path` and going up the directory hierarchy until `hierarchyLevel` is reached or the root drive is found. For every file found, all properties are merged into the previous one with the child file having precedence over the parent one.

If you set `hierarchyLevel` to an invalid value or simply do not specify it, 1 will be used. The value of `hierarchyLevel` represents the number of directories that will be searched for the ini file up the directory tree.

You must provide a valid `path` argument pointing to a valid ini file.

# install

With [npm](https://npmjs.org) do:

```
npm install cascade-ini
```

# license

MIT
