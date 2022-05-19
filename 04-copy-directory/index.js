const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');


fs.rm(folderCopy, {recursive: true}, () => {
  fs.mkdir(folderCopy, () => {
    fs.readdir(folder, (err, files) => {
      files.forEach(fileName => {
        let filePath = path.join(folder, fileName);
        let filePathCopy = path.join(folderCopy, fileName);
        fs.copyFile(filePath, filePathCopy, () => {});
      });
    });
  });
});