"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;

function binarySearch(list, low, high, key) {
  if (!Array.isArray(list) || typeof low !== 'number' || typeof high !== 'number' || typeof key !== 'number') {
    throw new Error('invalid parameter');
  }

  if (low > high) {
    return -1;
  }

  var middleIndex = Math.floor((low + high) / 2);
  var middleValue = list[middleIndex];

  if (key > middleValue) {
    //向右递归
    return binarySearch(list, middleIndex + 1, high, key);
  } else if (key < middleValue) {
    //向左递归
    return binarySearch(list, low, middleIndex - 1, key);
  } else {
    var resIndexList = []; //向mid索引值得左边扫描

    var temp = middleIndex - 1;

    while (true) {
      if (temp < 0 || list[temp] !== key) {
        //退出
        break;
      }

      resIndexList.push(temp);
      temp--;
    }

    resIndexList.push(middleIndex); //向右扫描

    temp = middleIndex + 1;

    while (true) {
      if (temp > list.length - 1 || list[temp] !== key) {
        //退出
        break;
      }

      resIndexList.push(temp);
      temp++;
    }

    return resIndexList;
  }
}