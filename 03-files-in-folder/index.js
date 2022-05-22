const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) { throw err;}
  files.forEach((fileName) => {
    let {ext, name} = path.parse(fileName);
    fs.stat(path.join(__dirname, 'secret-folder', fileName), (err, stats) => {
      if(stats.isFile()) {
        let size = stats.size / 1000;
        console.log(`${name} - ${ext.slice(1)} - ${size}kb`);
      }
    });
  });
});