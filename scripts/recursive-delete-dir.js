const fs = require('fs');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));

const { log } = console;

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        log(`Deleting file: ${chalk.yellow(path)}/${chalk.red(file)}`);
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  } else log(chalk.yellow(`${path} directory has already been deleted`));
};
const buildDirectory = `./${argv.dir}`;
log(chalk.green(`Start deleting directory ${chalk.yellow(buildDirectory)}`));
deleteFolderRecursive(buildDirectory);
log(chalk.green(`Finished deleting directory ${chalk.yellow(buildDirectory)}`));
