var fs = require('fs');
var zlib = require('zlib');

var files = process.argv.slice(2);

files.forEach(function(path) {
  var outpath = path + '.js';
  fs.readFile(path, function(err, data) {
    zlib.deflate(data, function(err, buf) {
      fs.writeFileSync(outpath, 'var data = window.atob("' + buf.toString('base64') + '");');
    });
  });
});

