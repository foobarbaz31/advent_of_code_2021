const fs = require('fs');
const indexTemplate = `
import { readFileSync } from 'fs';
import { resolve } from 'path';

function #FOLDERNAME(inputFileName: string) {
  const inputArray = readFileSync(resolve(\`\${__dirname}/\${inputFileName}\`), 'utf-8').split('\\n');
}

#FOLDERNAME('sample.txt');
`

const folderName = process.argv[2];
const fileContents = indexTemplate.replace(/#FOLDERNAME/g, folderName);

if(!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
} else {
  throw new Error(`${folderName} already exists`)
}

fs.writeFileSync(`${folderName}/index.ts`, fileContents);
fs.writeFileSync(`${folderName}/input.txt`,'');
fs.writeFileSync(`${folderName}/sample.txt`,'');