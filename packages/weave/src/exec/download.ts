import { Argv } from "yargs";
import download from "../scripts/download-dll";
// 命令
export const command = "download";

// 描述
export const describe = "下载打包依赖的Dll文件";

// 附带参数
export const builder = {};

// 接收命令操作
export const handler = (argv: Argv<any>["argv"]) => {
  download();
};
