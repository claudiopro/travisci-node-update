'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const request = require('request');
const semver = require('semver');

const RELEASES_URL = 'https://nodejs.org/download/release/index.json';

const PATCH = 3, MINOR = 2, MAJOR = 1;

function updater(dir, callback) { 
  request(RELEASES_URL, function(err, response, body) {
    const versions = JSON.parse(body).map(function(item) {
        return semver.clean(item.version);
      });

    function bump(version) {
      const matching = versions.find(function(other) {
        // Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4
        // Allows changes that do not modify the left-most non-zero digit in the [major, minor, patch] tuple.
        // In other words, this allows patch and minor updates for versions 1.0.0 and above, patch updates
        // for versions 0.X >=0.1.0, and no updates for versions 0.0.X.
        // https://www.npmjs.com/package/semver#caret-ranges-123-025-004
        return semver.satisfies(other, '^' + version);
      });

      const level = version.split('.').length;

      switch (level) {
        case PATCH:
          return matching;
        case MINOR:
          return [semver.major(matching), semver.minor(matching)].join('.');
        case MAJOR:
          return String(semver.major(matching));
      }
    }

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
          return bump(String(version));
        });
      } else {
        doc.node_js = bump(String(doc.node_js));
      }
    
      fs.writeFileSync(travisConfigFilename, yaml.safeDump(doc));

      callback(null, {success: true, yaml: doc});
    } catch (e) {
      callback(e, null);
    }
  });
}

module.exports = updater;
