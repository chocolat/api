var path = require('path');
var fs = require('fs');

global.current_mixin_name = null;

// This line is important! It sets up the globals for the api
require('api');

// Temporary way to stop node.js quitting immediately until we add an events.EventEmitter
process.stdin.resume();


var loadedMixins = [];

// Keep the event loop running until uv_async is less buggy
setInterval(function () {}, 250);


global.objc_msgSend = function() {
    global.private_objc_msgSend.apply({ sync: false }, arguments);
};
global.objc_msgSendSync = function() {
    return global.private_objc_msgSend.apply({ sync: true }, arguments);
};
global.objc_msgSendThread = function() {
    return global.private_objc_msgSend.apply({ sync: true, thread: true }, arguments);
};

global.sayHelloTo = function(person) {
    console.log("Hello, " + person + "!");
};


global.call_function_as = function(mixinname, func, args) {
    try {
        global.current_mixin_name = mixinname;
        func.apply({}, args);
    }
    finally {
        global.current_mixin_name = null;
    }
};

global.load_initjs = function(mixinPath, mixinID) {

    // Look in loadedMixins for this mixin
    // Remove any that match mixinPath
    loadedMixins = loadedMixins.filter(function (aMixin) { return aMixin.path !== mixinPath; });

    // Read the source from disk
    var pathToMain = path.join(mixinPath, "init.js");
    var pathToPackageJson = path.join(mixinPath, "package.json");

    // Try to use package.json if it exists
    if (fs.existsSync(pathToPackageJson)) {
        try {
            var json = JSON.parse(fs.readFileSync(pathToPackageJson, "utf8"));
            if (typeof json !== "undefined" && typeof json.main !== "undefined") {
                pathToMain = path.join(mixinPath, json.main);
            }
        } catch(e) {
            // Parsing failed? Looks like we are using init.js
        }
    }
    
    // Add our new Mixin    
    loadedMixins.push({ "path": mixinPath, "id": mixinID });

    // Remove from the module cache
    var keys = Object.keys(require.cache);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        delete require.cache[key];
    }

    // Run the code!
    try {
        if (fs.existsSync(pathToMain)) {
            require(pathToMain);            
        }
    }
    finally {
        // Remember, the above line may throw, so put anything else here
    }
};