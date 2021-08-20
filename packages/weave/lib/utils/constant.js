"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CI_TARGET_DIR = exports.CI_TAG = exports.RELEASE_DIR = exports.INNER_PATH = exports.OUTER_PATH = exports.cwd = void 0;

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

const FILE_NAME = "package.json";
const cwd = process.cwd();
exports.cwd = cwd;
const OUTER_PATH = (0, _path().join)(cwd, FILE_NAME);
exports.OUTER_PATH = OUTER_PATH;
const INNER_PATH = (0, _path().join)(cwd, "src", FILE_NAME);
exports.INNER_PATH = INNER_PATH;
const RELEASE_DIR = (0, _path().join)(cwd, "release");
exports.RELEASE_DIR = RELEASE_DIR;
const _process$env = process.env,
      CI_TAG = _process$env.CI_COMMIT_REF_NAME,
      CI_TARGET_DIR = _process$env.CI_TARGET_DIR;
exports.CI_TARGET_DIR = CI_TARGET_DIR;
exports.CI_TAG = CI_TAG;