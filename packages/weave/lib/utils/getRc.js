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

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

var _constant = require("./constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRc() {
  const rcPath = (0, _path().join)(_constant.cwd, ".weaverc.js");

  if (_fs().default.existsSync(rcPath)) {
    return require((0, _path().join)(_constant.cwd, ".weaverc.js"));
  }
}

var _default = getRc();

exports.default = _default;