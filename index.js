'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// TODO: make async
function bump(version) {
  return String((Number(version) * 100 + 1) / 100);
}

function updater(dir, callback) { 
  // Get document, or throw exception on error 
  try {
    const travisConfigFilename = path.join(dir, '.travis.yml');
    const doc = yaml.safeLoad(fs.readFileSync(travisConfigFilename), 'utf8');
  
    if (doc.language !== 'node_js') {
      callback(null, {message: 'Not a Node module'});
      return;
    }
  
    if (doc.node_js === undefined) {
      callback(null, {message: 'Missing Node version enumeration'});
      return;
    }
  
    if (Array.isArray(doc.node_js)) {
      doc.node_js = doc.node_js.map(function(version) {
        // FIXME: figure out latest minor version for this major version :-)
        return bump(version);
      });
    } else {
      doc.node_js = bump(doc.node_js);
    }
  
    fs.writeFileSync(travisConfigFilename, yaml.safeDump(doc));

    callback(null, {success: true, yaml: doc});
  } catch (e) {
    callback(e, null);
  }
}

module.exports = updater;
