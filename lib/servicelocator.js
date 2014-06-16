"use strict";
var ServiceLocator = function() {
    var servicelocator = {};
    servicelocator.config = {};
    var resources = [];

    var constructor = function() {
        return servicelocator;
    };

    servicelocator.has = function(key) {
        if (typeof resources[key] === 'undefined') {
            return false;
        }else{
            return true;
        }
    };

    servicelocator.set = function(key, value) {
        resources[key] = value;
    };

    servicelocator.get = function(key) {
        if (typeof resources[key] === 'undefined') {
            try{
                servicelocator.set(key, require(getConfigKey(key).file));
            } catch (err) {
                resources[key] = undefined;
                //throw new Error('resource not exist');
            }
        }
        return resources[key];
    };

    servicelocator.setConfig = function(configJson) {
        servicelocator.config = configJson;
    };

    servicelocator.getConfig = function() {
        return servicelocator.config;
    };

    var getConfigKey = function(key) {
        return servicelocator.config[key];
    };

    servicelocator.setLogger = function(logger) {
        servicelocator.set('logger', logger);
    };

    return constructor.apply(null, arguments);
};

module.exports = ServiceLocator;

var ServiceLocatorSingleton = new ServiceLocator();
module.exports.getInstance = function(){return ServiceLocatorSingleton};


