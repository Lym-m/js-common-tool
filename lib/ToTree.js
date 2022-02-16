"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTree = toTree;

function toTree(data) {
  if (!Array.isArray(data)) {
    return result;
  }

  var flag = data.every(function (item) {
    return 'id' in item && 'pid' in item;
  });
  if (!flag) throw new Error('invalid parameter');
  var result = [];
  var map = {};
  data.forEach(function (item) {
    map[item.id] = item;
  });
  data.forEach(function (item) {
    var parent = map[item.pid];

    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}