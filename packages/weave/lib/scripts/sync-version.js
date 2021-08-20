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

var _getPkgJson2 = _interopRequireDefault(require("../utils/getPkgJson"));

var _constant = require("../utils/constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// weave sync  同步版本号
var _default = () => {
  var _getPkgJson;

  const spinner = (0, _ora().default)("start synchronize version").start();
  const version = (_getPkgJson = (0, _getPkgJson2.default)(_constant.OUTER_PATH)) === null || _getPkgJson === void 0 ? void 0 : _getPkgJson.version;
  const inner = (0, _getPkgJson2.default)(_constant.INNER_PATH);
  inner.version = version;

  try {
    _fs().default.writeFileSync(_constant.INNER_PATH, JSON.stringify(inner, null, 2));
  } catch (e) {
    console.error(e);
  }

  spinner.succeed(_chalk().default.green("synchronize version success!!!"));
  spinner.stop();
};

exports.default = _default;