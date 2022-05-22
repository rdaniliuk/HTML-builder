const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const destFile = path.join(__dirname, 'project-dist', 'bundle.css');
let data = [];
console.log(stylesFolder);


fs.readdir(stylesFolder, (err, files) => {
  let filterArray  = files.filter((fileName) => {return path.parse(fileName).ext === '.css';});
  filterArray.forEach((fileName, index) => {
    let filePath = path.join(stylesFolder, fileName);
    fs.readFile(filePath, (err, fileContent) => {
      data[index] = fileContent.toString();
      if (data.length == filterArray.length && !data.includes(undefined)) {
        fs.writeFile(destFile, data.join(''), () => {});
      }
    });
  });
});
