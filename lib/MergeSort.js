"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeSort = mergeSort;

function merge(left, right) {
  var result = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
}

function mergeSort(list) {
  if (!Array.isArray(list)) throw new Error('');
  if (list.length < 2) return list;
  var middleIdx = Math.floor(list.length / 2);
  var left = list.slice(0, middleIdx);
  var right = list.slice(middleIdx);
  return merge(mergeSort(left), mergeSort(right));
}