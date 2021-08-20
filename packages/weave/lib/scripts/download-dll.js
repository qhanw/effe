"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _ora() {
  const data = _interopRequireDefault(require("ora"));

  _ora = function _ora() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _request() {
  const data = _interopRequireDefault(require("request"));

  _request = function _request() {
    return data;
  };

  return data;
}

var _getRc = _interopRequireDefault(require("../utils/getRc"));

var _getPkgJson = _interopRequireDefault(require("../utils/getPkgJson"));

var _constant = require("../utils/constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const dUrl = "http://dll.xjjj.co";
const dllPath = (0, _path().join)(_constant.cwd, "dll");
const spinner = (0, _ora().default)(); // const exec = require("child_process").exec;
// 删除历史 dll
// exec("rm -rf dll");

function download(u) {
  return new Promise((resolve, reject) => {
    const stream = _fs().default.createWriteStream((0, _path().join)(dllPath, u.filename));

    spinner.start(`start download: ${u.filename} ... `);
    (0, _request().default)(u.addr).pipe(stream).on("close", () => {
      spinner.succeed(_chalk().default.green(`download: ${u.filename} succeed!!!`));
      resolve();
    }).on("error", e => {
      spinner.fail(_chalk().default.red(`download: ${u.filename} failed!!!`));
      reject(e);
      process.exit(1);
    });
  });
}

var _default = /*#__PURE__*/_asyncToGenerator(function* () {
  const dep = (0, _getPkgJson.default)(_constant.OUTER_PATH).dllDependencies;
  const urls = Object.entries(dep).map(([key, val]) => ({
    addr: [_getRc.default.domain || dUrl, val, `${key}.dll`].join("/"),
    filename: `${key}.dll`
  }));
  spinner.info(_chalk().default.blue(`start download dlls: ${_chalk().default.yellow(Object.keys(dep))}`));

  _fs().default.rmSync(dllPath, {
    force: true,
    recursive: true
  });

  _fs().default.mkdirSync(dllPath);

  let i = 0;

  do {
    const u = urls[i];
    yield download(u).catch(e => console.log(_chalk().default.red(e)));
    i += 1;
  } while (i < urls.length);

  spinner.stopAndPersist({
    text: _chalk().default.greenBright("download dll completed"),
    symbol: "🦄"
  });
});

exports.default = _default;