var net = require('net');
var q = require('q');

var runCommand = function(cmd) {
  var deferred = q.defer();

  // Terminate with ENTER.
  cmd += '\r\n';

  var client = net.connect({port: 6969}, function() {
    console.log('Connected. Sending command:', cmd);
    client.write(cmd);
  });

  client.on('data', function(data) {
    client.end();
    // Get rid of the carriage return.
    deferred.resolve((data.toString() || '').replace(/\r\n$/, ''));
  });

  return deferred.promise;
};

module.exports = {
  runCommand: runCommand
};