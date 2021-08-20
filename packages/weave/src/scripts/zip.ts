import fs from "fs";
import ora from "ora";
import chalk from "chalk";
import { join } from "path";
import archiver from "archiver";
import getPkgJson from "../utils/getPkgJson";
import rc from "../utils/getRc";

import {
  cwd,
  OUTER_PATH,
  RELEASE_DIR,
  CI_TAG,
  CI_TARGET_DIR,
} from "../utils/constant";

const spinner = ora();

// weave zip  归档文件资源
export default () => {
  spinner.start("Start packing files");
  const version = getPkgJson(OUTER_PATH)?.version;
  const zipFilesName = [
    "{alpha,latest}.yml",
    `luban Setup ${version}.{exe,exe.blockmap}`,
  ];

  if (!fs.existsSync(RELEASE_DIR)) {
    spinner.warn(chalk.yellow("应用还未打包，请打包后再压缩文件！！！"));
  } else {
    const CI_DIR = CI_TARGET_DIR || join(cwd, rc.zipDir || "dist");
    const DIR = join(CI_DIR, CI_TAG || `v${version}`);

    if (!fs.existsSync(CI_DIR)) fs.mkdirSync(CI_DIR);
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

    const output = fs.createWriteStream(join(DIR, "luban.zip"));

    // Sets the compression level.
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      spinner.info(archive.pointer() + " total bytes");

      spinner.succeed(
        chalk.green(
          "archiver has been finalized and the output file descriptor has closed."
        )
      );
    });

    output.on("end", () => spinner.fail("Data has been drained"));

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        // log warning
      } else {
        throw err;
      }
    });

    archive.on("error", (err) => {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);
    archive.glob(zipFilesName, { cwd: RELEASE_DIR, matchBase: true });

    archive.finalize();
  }
};
