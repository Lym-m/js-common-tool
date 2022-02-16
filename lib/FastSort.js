"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastSort = fastSort;

function fastSort(list) {
  if (!Array.isArray(list)) throw new Error('invalid parameter, parameter should be array');

  if (list.length < 2) {
    return list;
  }

  var left = [],
      right = [];
  var index = Math.floor(list.length / 2);
  var value = list.splice(index, 1)[0];

  for (var i = 0; i < list.length; i++) {
    if (list[i] < value) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  return fastSort(left).concat([value], fastSort(right));
}