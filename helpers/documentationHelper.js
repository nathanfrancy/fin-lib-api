var fin = require('fin-lib');
var fs = require('fs');
var documentation = JSON.parse(fs.readFileSync('node_modules/fin-lib/documentation.json', 'utf8'));

var getResult = function(name, parameters) {
    return new Promise(function(resolve, reject) {
        var found = false;
        var fn = null;

        for (var i in documentation) {
            if (documentation[i].name === name) {
                fn = documentation[i];
                found = true;
                break;
            }
        }

        // If not found or function is null, reject. Otherwise try to get a result.
        if (found == false || fn == null) {
            reject(new Error("Unable to find this endpoint."));
        } else {

            var valid = true;

            for (var j in fn.parameters) {
                if (parameters.hasOwnProperty(fn.parameters[j])) {
                    continue;
                }
                else {
                    valid = false;
                    reject(new Error("Didn't include " + fn.parameters[j] + " required parameter."));
                }
            }

            if (valid) {

                // Combine arguments into an array based on the order they are found in the documentation
                // so the function will align all variables correctly.
                var arguments = [];
                for (var k in parameters) {
                    var index = fn.parameters.indexOf(k);
                    if (index != -1) {
                        arguments[index] = parameters[k];
                    }
                }

                var result = null;

                if (arguments.length === 1) {

                }

                switch (arguments.length) {
                    case 1:
                        result = fin[name](arguments[0]);
                        break;
                    case 2:
                        result = fin[name](arguments[0], arguments[1]);
                        break;
                    case 3:
                        result = fin[name](arguments[0], arguments[1], arguments[2]);
                        break;
                    case 4:
                        result = fin[name](arguments[0], arguments[1], arguments[2], arguments[3]);
                        break;
                    case 5:
                        result = fin[name](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                        break;
                    default:
                        result = null;
                }
                resolve(result);
            }

        }
    });
};

module.exports = {
    getResult: getResult,
    documentation: documentation
};