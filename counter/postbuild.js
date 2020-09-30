const Fs = require('fs');

try {
    console.log();
    console.log('\x1b[0m' + '\x1b[34m' + `copy ./src/index.html to ./dist start` + '\x1b[0m');

    Fs.copyFileSync('./src/index.html', './dist/index.html');

    console.log();
    console.log('\x1b[0m' + '\x1b[32m' + `copy ./src/index.html to ./dist done` + '\x1b[0m');
    console.log();
} catch (e) {
    console.log();
    console.log('\x1b[0m' + '\x1b[31m' + `${e instanceof Error ? e.message : e}` + '\x1b[0m');
    console.log();
}
