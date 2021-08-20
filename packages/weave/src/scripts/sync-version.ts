import fs from "fs";
import ora from "ora";
import chalk from "chalk";
import getPkgJson from "../utils/getPkgJson";

import { OUTER_PATH, INNER_PATH } from "../utils/constant";

// weave sync  同步版本号
export default () => {
  const spinner = ora("start synchronize version").start();

  const version = getPkgJson(OUTER_PATH)?.version;
  const inner = getPkgJson(INNER_PATH);

  inner.version = version;

  try {
    fs.writeFileSync(INNER_PATH, JSON.stringify(inner, null, 2));
  } catch (e) {
    console.error(e);
  }

  spinner.succeed(chalk.green("synchronize version success!!!"));
  spinner.stop();
};
