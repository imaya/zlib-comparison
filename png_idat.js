var fs = require('fs');
var zlib = require('zlib');

var files = process.argv.slice(2);

files.forEach(function(path) {
  var outpath = path + '.js';
  fs.readFile(path, function(err, data) {
    fs.writeFileSync(outpath, 'var data = window.atob("' + getImageData(data).toString('base64') + '");');
  });
});


function getImageData(png) {
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {number} */
  var chunkType;
  /** @type {number} */
  var chunkData;
  /** @type {number} */
  var chunkCRC32;
  /** @type {number} */
  var chunkLength;
  /** @type {number} */
  var tmplen;

  for(i = 8, il = png.length; i < il;) {
    // Length
    chunkLength = (
        (png[i++] << 24) |
        (png[i++] << 16) |
        (png[i++] <<  8) |
        (png[i++])
    ) >>> 0;
    // Type
    chunkType = String.fromCharCode.apply(null, Array.prototype.slice.call(png, i, i += 4));
    // Data
    if (chunkType === 'IDAT') {
      return png.slice(i, i + chunkLength);
    }
    i += chunkLength;
    // CRC-32
    i += 4;
  }
  throw new Error('IDAT chunk not found');
}

/* vim:set expandtab ts=2 sw=2 tw=80: */
