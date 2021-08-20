"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.builder = exports.describe = exports.command = void 0;

var _downloadDll = _interopRequireDefault(require("../scripts/download-dll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 命令
const command = "download"; // 描述

exports.command = command;
const describe = "下载打包依赖的Dll文件"; // 附带参数

exports.describe = describe;
const builder = {}; // 接收命令操作

exports.builder = builder;

const handler = argv => {
  (0, _downloadDll.default)();
};

exports.handler = handler;