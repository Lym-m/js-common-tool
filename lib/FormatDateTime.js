"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDateTime = formatDateTime;

function add0(m) {
  return m < 10 ? '0' + m : m;
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function formatDateTime(timeStamp, dateSeparator, addZero) {
  var type = getType(timeStamp);

  if (typeof timeStamp === "number" || type === '[object Date]') {
    var time;

    if (typeof timeStamp === "number") {
      if (timeStamp.length === 10) {
        timeStamp = timeStamp * 1000;
      }

      time = new Date(timeStamp);
    } else {
      time = timeStamp;
    }

    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();

    if (addZero) {
      return y + dateSeparator.toString() + add0(m) + dateSeparator.toString() + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    } else {
      return y + dateSeparator.toString() + m + dateSeparator.toString() + d + ' ' + h + ':' + mm + ':' + s;
    }
  } else {
    throw new Error('Invalid timestamp input');
  }
}