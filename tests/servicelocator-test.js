"use strict";
var testSuite = require('mocha').describe;
var testCase = require('mocha').test;

var ServiceLocator = require('../lib/servicelocator.js');
var SL;

testSuite('Servislocator-Suite: ', function(){

    beforeEach(function(){
        SL = new ServiceLocator();
    });

    testCase('ServiceLocator is an Object', function(){
        SL.should.be.type('object');
    });

    testCase('ServiceLocator has no resource FooBar until set', function(){
        SL.has('FooBar').should.be.false;
    });

    testCase('ServiceLocator has resource Foo if set', function(){
        SL.set('Foo','Bar');
        SL.has('Foo').should.be.true;
    });

    testCase('ServiceLocator has resource Foo if set and the value is Bar', function(){
        SL.set('Foo','Bar');
        SL.get('Foo').should.be.exactly('Bar');
    });

    testCase('ServiceLocator config ist an empty Object by default', function(){
        SL.should.have.property('config',{});
    });

    testCase('package.json should set to ServiceLocator config', function(){
        SL.setConfig({"packagejson":{"file":"../package.json"}});
        SL.should.have.property('config',{"packagejson":{"file":"../package.json"}});
    });

    testCase('The "name" property of package.json should be "cr-servicelocator"', function(){
        SL.setConfig({"packagejson":{"file":"../package.json"}});
        SL.get('packagejson').name.should.equal('cr-servicelocator');
    });

    testCase('The author in the package.json should be "Michael Bauer"', function(){
        SL.setConfig({"packagejson":{"file":"../package.json"}});
        SL.get('packagejson').author.should.equal('Michael Bauer');
    });

    testCase('a resource that not exist should return undefined', function(){
        (SL.get('resource') === undefined).should.be.true;
    });

    testCase('two instances of the service locators should be the same object', function(){
        var SL2 = ServiceLocator.getInstance();
        var SL3 = ServiceLocator.getInstance();
               
        SL2.should.be.exactly(SL3);

        SL2.set('Foo','Bar');
        SL3.get('Foo').should.be.exactly('Bar');
    });

});
