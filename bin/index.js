#!/usr/bin/env node

const updater = require('..');
const dir = process.argv[2] || '.';

updater(dir, function(err, result) {
  if (err) {
  	console.log('Error:', err);
    process.exit(1);
  }
  console.log(result);
});
