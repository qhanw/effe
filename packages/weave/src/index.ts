import semver from "semver";
import { resolve } from "path";
import chalk from "chalk";
import yargs from "yargs";

const log = console.log;

// node version >= v14.14.0
if (!semver.satisfies(process.version, ">= v14.14.0")) {
  log(chalk.red("✘ The generator will only work with Node v14.14.0 and up!"));
  process.exit(1);
}

yargs(process.argv.slice(2))
  .commandDir(resolve(__dirname, "./exec"), { recurse: true })
  .example("sync", "同步版发布本号")
  .help("h")
  .alias("h", "help")
  .version("version", require("../package.json").version)
  .alias("v", "version")
  .epilog(
    ` use ${"weave <command> -h"} or ${"weave <command> --help"} for more information about <command>`
  ).argv;
