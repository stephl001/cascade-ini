var ini = require('../lib/cascade-ini.js');
var fs = require('fs');

exports.testOpenRoot = function(test){
    test.expect(5);
    var config = ini.parse(fs.readFileSync('./test/configs/test.ini', 'ascii'));

    test.equal(config.A.prop1, 'value1');
    test.equal(config.A.prop2, '134');
    test.equal(config.B.prop2, 'value2');
    test.equal(config.C.prop3, 'value3');
    test.deepEqual(config.C.proparray, ['a','b','c']);
    test.done();
};