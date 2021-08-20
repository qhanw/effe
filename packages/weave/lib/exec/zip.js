"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.builder = exports.describe = exports.command = void 0;

var _zip = _interopRequireDefault(require("../scripts/zip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 命令
const command = "zip"; // 描述

exports.command = command;
const describe = "同步发布版本号"; // 附带参数

exports.describe = describe;
const builder = {}; // 接收命令操作

exports.builder = builder;

const handler = argv => {
  (0, _zip.default)();
};

exports.handler = handler;