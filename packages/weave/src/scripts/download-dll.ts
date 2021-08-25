import fs from "fs";
import { join } from "path";
import got from "got";
import ora from "ora";
import chalk from "chalk";

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
    spinner.start(`start download: ${u.filename} ... `);

    const st = got.stream(u.addr);
    // st.retryCount = retryCount

    st.on("response", (response) => {
      const { statusCode } = response;
      if (statusCode === 200) {
        const stream = fs.createWriteStream(join(dllPath, u.filename));
        st.pipe(stream);
      }
    })
      .on("downloadProgress", (progress) => {
        const { transferred, total, percent } = progress;

        const per = (percent * 100).toFixed(2);

        spinner.text = `Downloading[${u.filename}]: ${per}% ${transferred}/${total}`;

        if (total && percent === 1) {
          spinner.succeed(chalk.green(`download: ${u.filename} succeed!!!`));
        }
      })
      // spinner.succeed(chalk.green(`download: ${u.filename} succeed!!!`));
      .on("end", () => resolve())

      .on("error", (e) => {
        spinner.fail(chalk.red(`download: ${u.filename} failed!!!`));
        spinner.fail(chalk.red(`ERROR: ${e}`));

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
    text: chalk.greenBright("download dlls completed!!!"),
    symbol: "🦄",
  });
};
