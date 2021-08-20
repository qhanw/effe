"use strict";

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function _semver() {
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

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _yargs() {
  const data = _interopRequireDefault(require("yargs"));

  _yargs = function _yargs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = console.log; // node version >= v14.14.0

if (!_semver().default.satisfies(process.version, ">= v14.14.0")) {
  log(_chalk().default.red("✘ The generator will only work with Node v14.14.0 and up!"));
  process.exit(1);
}

(0, _yargs().default)(process.argv.slice(2)).commandDir((0, _path().resolve)(__dirname, "./exec"), {
  recurse: true
}).example("sync", "同步版发布本号").help("h").alias("h", "help").version("version", require("../package.json").version).alias("v", "version").epilog(` use ${"weave <command> -h"} or ${"weave <command> --help"} for more information about <command>`).argv;