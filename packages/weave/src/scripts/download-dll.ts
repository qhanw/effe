import fs from "fs";
import ora from "ora";
import chalk from "chalk";
import { join } from "path";
import request from "request";
// import { exec } from "child_process";
import rc from "../utils/getRc";
import getPkgJson from "../utils/getPkgJson";
import { OUTER_PATH, cwd } from "../utils/constant";

const dUrl = "http://dll.xjjj.co";
const dllPath = join(cwd, "dll");
const spinner = ora();

// const exec = require("child_process").exec;
// 删除历史 dll
// exec("rm -rf dll");

function download(u: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(join(dllPath, u.filename));
    spinner.start(`start download: ${u.filename} ... `);

    request(u.addr)
      .pipe(stream)
      .on("close", () => {
        spinner.succeed(chalk.green(`download: ${u.filename} succeed!!!`));
        resolve();
      })
      .on("error", (e: Error) => {
        spinner.fail(chalk.red(`download: ${u.filename} failed!!!`));
        reject(e);
        process.exit(1);
      });
  });
}

export default async () => {
  const dep = getPkgJson(OUTER_PATH).dllDependencies;

  const urls = Object.entries(dep).map(([key, val]: any) => ({
    addr: [rc.domain || dUrl, val, `${key}.dll`].join("/"),
    filename: `${key}.dll`,
  }));

  spinner.info(
    chalk.blue(`start download dlls: ${chalk.yellow(Object.keys(dep))}`)
  );

  fs.rmSync(dllPath, { force: true, recursive: true });
  fs.mkdirSync(dllPath);

  let i = 0;
  do {
    const u = urls[i];
    await download(u).catch((e) => console.log(chalk.red(e)));
    i += 1;
  } while (i < urls.length);

  spinner.stopAndPersist({
    text: chalk.greenBright("download dll completed"),
    symbol: "🦄",
  });
};
