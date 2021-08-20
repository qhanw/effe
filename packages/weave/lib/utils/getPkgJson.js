"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readPkgJson;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readPkgJson(path) {
  try {
    const data = _fs().default.readFileSync(path, "utf8");

    return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
}