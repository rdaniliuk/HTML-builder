const fs = require('fs');
const path = require('path');
const resultFolder = path.join(__dirname, 'project-dist');
const resultIndex = path.join(resultFolder, 'index.html');
const resultStyle = path.join(resultFolder, 'style.css');
const assets = path.join(__dirname,  'assets');
const assetsCopy = path.join(resultFolder, 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');



fs.rm(resultFolder, {recursive: true}, () => {
  fs.readdir(stylesFolder, (err, files) => {
    let data = [];
    let filterArray  = files.filter((fileName) => {return path.parse(fileName).ext === '.css';});
    filterArray.forEach((fileName, index) => {
      let filePath = path.join(stylesFolder, fileName);
      fs.readFile(filePath, (err, fileContent) => {
        data[index] = fileContent.toString();
        if (data.length == filterArray.length && !data.includes(undefined)) {
          fs.writeFile(resultStyle, data.join(''), () => {});
        }
      });
    });
  });
  fs.mkdir(resultFolder, () =>{
    fs.readFile(template.toString(), (err, fileContent) =>{
      let index = fileContent.toString();
      fs.readdir(components, (err, files) => {
        files.forEach(fileName => {
          fs.readFile(path.join(components, fileName), (err, fileContent) =>{
            index = index.replace(`{{${path.parse(fileName).name}}}`,fileContent.toString());
            fs.writeFile(resultIndex, index, () => {
            });
          });
        });
      }); 
    });
  });
  copyFiles(assets, assetsCopy);
});

function copyFiles(from, to) {
  fs.rm(to, {recursive: true}, () => {
    fs.mkdir(to, () => {
      fs.readdir(from, (err, files) => {
        files.forEach(fileName => {
          let filePath = path.join(from, fileName);
          let filePathCopy = path.join(to, fileName);
          fs.stat(filePath, (err, stats) =>{
            if(stats.isFile()) {
              fs.copyFile(filePath, filePathCopy, () => {});
            } else{
              copyFiles(filePath, filePathCopy);
            }
          });

        });
      });
    });
  });
}

