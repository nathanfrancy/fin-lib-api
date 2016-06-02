var fs = require('fs');
var documentation = JSON.parse(fs.readFileSync('node_modules/fin-lib/documentation.json', 'utf8'));

var getResult = function(name, parameters) {
    return new Promise(function(resolve, reject) {
        var found = false;

        for (var i in documentation) {
            if (documentation[i].name === name) {
                resolve(documentation[i]);
                found = true;
                break;
            }
        }

        if (found == false) {
            reject(new Error("Unable to find this endpoint."));
        }
    });
};

module.exports = {
    getResult: getResult,
    documentation: documentation
};