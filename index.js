const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
  .on('data', (data) => {
    results.push(data);
  })
  .on('error', (err) => {
    console.log(`🔎 | index | error | ERROR:`, err);
  })
  .on('end', () => {
    console.log(`🔎 | index | end | results:`, results);
    console.log(`🔎 | index | end | DONE`);
  });
