const fs = require('fs');
const {stdout} = process;

const stream = fs.createReadStream('./01-read-file/text.txt', 'utf-8');
stream.pipe(stdout);

