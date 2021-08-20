import { Argv } from "yargs";

import zip from "../scripts/zip";
// 命令
export const command = "zip";

// 描述
export const describe = "同步发布版本号";

// 附带参数
export const builder = {};

// 接收命令操作
export const handler = (argv: Argv<any>["argv"]) => {
  zip();
};
