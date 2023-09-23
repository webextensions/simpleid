#!/usr/bin/env node

const { program } = require('commander');

const {
    simpleid,
    simpleidUpperCase
} = require('./index.js');

const
    packageJson = require('./package.json'),
    packageName = packageJson.name,
    packageDescription = packageJson.description,
    packageVersion = packageJson.version;

program
    .name(packageName.split('/').pop())
    .description(packageDescription)
    .version(packageVersion);

program
    .option('-c, --case <type>', 'case of Simple ID (lower, upper) ;', 'lower')
    .option('-m, --multiple <count>', 'count of Simple IDs to generate (1, 2, 3, ...) ;', 1);

program.parse();

const options = program.opts();

const caseType = (options.case === 'upper') ? 'upper' : 'lower';

let count = Math.floor(Number(options.multiple)) || 1;
if (count < 1 || count === Infinity) {
    count = 1;
}

for (let i = 0; i < count; i++) {
    if (caseType === 'upper') {
        console.log(simpleidUpperCase());
    } else {
        console.log(simpleid());
    }
}
