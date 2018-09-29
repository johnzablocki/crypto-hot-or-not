const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildDir = path.resolve(__dirname, 'build');
const sourceFile = path.resolve(__dirname, 'contracts', 'HotOrNot.sol');

fs.removeSync(buildDir);

fs.ensureDir(buildDir);
const source = fs.readFileSync(sourceFile, 'utf8');
const compiled = solc.compile(source, 1).contracts;

for (let contract in compiled) {
    const outputFile = path.resolve(buildDir, contract.substr(1, contract.length));
    fs.writeJSONSync(`${outputFile}.json`, compiled[contract]);
}

