const fs = require('fs');
const { stdin, exit } = require('process');
const path = require('path');
let inputDate = '';


console.log('Привет, напиши сообщение или exit для выхода');
stdin.on('data', data => {
  if(data.toString() === 'exit\r\n') {
    exit();
  }
  inputDate += data.toString();
  fs.writeFile(
    path.join(__dirname, 'text.txt'),
    inputDate,
    (err) => {
      if (err) throw err;
    }
  );
});

process.on('exit', () => {
  console.log('сеанс завершён, заходите снова');
});
process.on('SIGINT', ()=>{
  process.exit();
});
