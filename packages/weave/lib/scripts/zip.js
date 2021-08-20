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

function _archiver() {
  const data = _interopRequireDefault(require("archiver"));

  _archiver = function _archiver() {
    return data;
  };

  return data;
}

var _getPkgJson2 = _interopRequireDefault(require("../utils/getPkgJson"));

var _getRc = _interopRequireDefault(require("../utils/getRc"));

var _constant = require("../utils/constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinner = (0, _ora().default)(); // weave zip  归档文件资源

var _default = () => {
  var _getPkgJson;

  spinner.start("Start packing files");
  const version = (_getPkgJson = (0, _getPkgJson2.default)(_constant.OUTER_PATH)) === null || _getPkgJson === void 0 ? void 0 : _getPkgJson.version;
  const zipFilesName = ["{alpha,latest}.yml", `luban Setup ${version}.{exe,exe.blockmap}`];

  if (!_fs().default.existsSync(_constant.RELEASE_DIR)) {
    spinner.warn(_chalk().default.yellow("应用还未打包，请打包后再压缩文件！！！"));
  } else {
    const CI_DIR = _constant.CI_TARGET_DIR || (0, _path().join)(_constant.cwd, _getRc.default.zipDir || "dist");
    const DIR = (0, _path().join)(CI_DIR, _constant.CI_TAG || `v${version}`);
    if (!_fs().default.existsSync(CI_DIR)) _fs().default.mkdirSync(CI_DIR);
    if (!_fs().default.existsSync(DIR)) _fs().default.mkdirSync(DIR);

    const output = _fs().default.createWriteStream((0, _path().join)(DIR, "luban.zip")); // Sets the compression level.


    const archive = (0, _archiver().default)("zip", {
      zlib: {
        level: 9
      }
    });
    output.on("close", () => {
      spinner.info(archive.pointer() + " total bytes");
      spinner.succeed(_chalk().default.green("archiver has been finalized and the output file descriptor has closed."));
    });
    output.on("end", () => spinner.fail("Data has been drained"));
    archive.on("warning", err => {
      if (err.code === "ENOENT") {// log warning
      } else {
        throw err;
      }
    });
    archive.on("error", err => {
      throw err;
    }); // pipe archive data to the file

    archive.pipe(output);
    archive.glob(zipFilesName, {
      cwd: _constant.RELEASE_DIR,
      matchBase: true
    });
    archive.finalize();
  }
};

exports.default = _default;