var ini = require('../lib/cascade-ini.js');
var fs = require('fs');

exports.testNoInheritance = function(test) {
    test.expect(5);
    var config = ini.parseFile('./test/configs/test.ini', function(err, config) {
        test.equal(config.A.prop1, 'value1');
        test.equal(config.A.prop2, '134');
        test.equal(config.B.prop2, 'value2');
        test.equal(config.C.prop3, 'value3');
        test.deepEqual(config.C.proparray, ['a','b','c']);
        test.done();
    });
};

exports.testSimpleInheritanceDefaultLevel = function(test) {
    test.expect(4);
    var config = ini.parseFile('./test/configs/child1/test.ini', function(err, config) {
        test.equal(config.A.prop1, 'overriden1');
        test.strictEqual(config.A.prop2, undefined);
        test.strictEqual(config.B, undefined);
        test.strictEqual(config.C, undefined);
        test.done();
    });
};

exports.testSimpleInheritanceInvalidLevel1 = function(test) {
    test.expect(4);
    var config = ini.parseFile('./test/configs/child1/test.ini', -1, function(err, config) {
        test.equal(config.A.prop1, 'overriden1');
        test.strictEqual(config.A.prop2, undefined);
        test.strictEqual(config.B, undefined);
        test.strictEqual(config.C, undefined);
        test.done();
    });
};

exports.testSimpleInheritanceInvalidLevel2 = function(test) {
    test.expect(4);
    var config = ini.parseFile('./test/configs/child1/test.ini', 'a', function(err, config) {
        test.equal(config.A.prop1, 'overriden1');
        test.strictEqual(config.A.prop2, undefined);
        test.strictEqual(config.B, undefined);
        test.strictEqual(config.C, undefined);
        test.done();
    });
};

exports.testSimpleInheritanceFileNotFound = function(test) {
    test.expect(1);
    var config = ini.parseFile('./test/configs/child1/test2.ini', 3, function(err, config) {
        test.equal(config.A.prop1, 'overriden2');
        test.done();
    });
};

exports.testSimpleInheritance2Levels = function(test) {
    test.expect(5);
    var config = ini.parseFile('./test/configs/child1/test.ini', 2, function(err, config) {
        test.equal(config.A.prop1, 'overriden1');
        test.equal(config.A.prop2, '134');
        test.equal(config.B.prop2, 'value2');
        test.equal(config.C.prop3, 'value3');
        test.deepEqual(config.C.proparray, ['a','b','c']);
        test.done();
    });
};