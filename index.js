const FsExtra = require('fs-extra');
const Process = require('process');

try {
    let args = Process.argv;

    let projectName = args[2] || 'demo';

    console.log('\x1b[0m' + '\x1b[34m' + `create project, ${projectName} start` + '\x1b[0m');

    FsExtra.copySync('./template', `${projectName}`);

    console.log();
    console.log('\x1b[0m' + '\x1b[32m' + `copy template to ${projectName} done` + '\x1b[0m');
    console.log();

    // update package.json
    let package = require(`./${projectName}/package.json`);

    let packgeJson = JSON.parse(JSON.stringify(package));

    packgeJson.name = projectName;

    FsExtra.writeFileSync(`./${projectName}/package.json`, JSON.stringify(packgeJson, null, 4));
} catch (error) {
    console.log();
    console.log('\x1b[0m' + '\x1b[31m' + `${error instanceof Error ? error.message : error}` + '\x1b[0m');
    console.log();
}
