const Fs = require('fs');

try {
    console.log('\x1b[0m' + '\x1b[34m' + `remove dist start` + '\x1b[0m');

    Fs.rmdirSync('./dist', {
        recursive: true,
    });

    console.log();
    console.log('\x1b[0m' + '\x1b[32m' + `remove dist done` + '\x1b[0m');
    console.log();
} catch (e) {
    console.log();
    console.log('\x1b[0m' + '\x1b[31m' + `${e instanceof Error ? e.message : e}` + '\x1b[0m');
    console.log();
}
