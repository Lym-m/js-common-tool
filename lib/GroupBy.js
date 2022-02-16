"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBy = groupBy;

var group = function group(list, fn) {
  var groups = {};
  list.forEach(function (item) {
    var group = JSON.stringify(fn(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
};

function groupBy(list, key) {
  var flag = list.every(function (item) {
    return key in item;
  });
  if (!flag) throw new Error('invalid parameter');
  return group(list, function (item) {
    return [item[key]];
  });
}