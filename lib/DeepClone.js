"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = deepClone;

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// 可继续遍历的数据类型
var mapTag = '[object Map]';
var setTag = '[object Set]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';
var argsTag = '[object Arguments]'; // 不可继续遍历的数据类型

var booleanTag = '[object Boolean]';
var dateTag = '[object Date]';
var numberTag = '[object Number]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var errorTag = '[object Error]';
var regexpTag = '[object RegExp]';
var funTag = '[object Function]'; // 装进一个数组里，便于后面判断

var deepTags = [mapTag, setTag, arrayTag, objectTag, argsTag]; // 判断是否为引用类型

function isObject(target) {
  var type = _typeof(target);

  return target !== null && (type === 'object' || type === 'function');
} // 获取实际的数据类型


function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  var Ctor = target.constructor;
  return new Ctor();
}

function cloneReg(target) {
  var reFlags = /\w*$/;
  var result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneFunction(target) {
  var bodyReg = /(?<={)(.|\n)+(?=})/m;
  var paramReg = /(?<=\().+(?=\)\s+{)/;
  var funString = target.toString();

  if (target.prototype) {
    var param = paramReg.exec(funString);
    var body = bodyReg.exec(funString);

    if (body) {
      if (param) {
        var paramList = param[0].split(',');
        return _construct(Function, _toConsumableArray(paramList).concat([body[0]]));
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funString);
  }
}

function cloneOtherType(target, type) {
  var Ctor = target.constructor;

  switch (type) {
    case booleanTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);

    case regexpTag:
      return cloneReg(target);

    case symbolTag:
      return cloneSymbol(target);

    case funTag:
      return cloneFunction(target);

    default:
      return null;
  }
} //


function deepClone(target) {
  var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  // 原始类型直接返回
  if (!isObject(target)) return target; // 根据 target 不同类型进行不同操作

  var type = getType(target);
  var cloneTarget;

  if (deepTags.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  } // 处理循环


  if (map.get(target)) {
    return target;
  }

  map.set(target, cloneTarget); // 处理map和set

  if (type === setTag) {
    target.forEach(function (item) {
      cloneTarget.add(deepClone(item));
    });
    return cloneTarget;
  }

  if (type === mapTag) {
    target.forEach(function (value, key) {
      cloneTarget.set(key, deepClone(value));
    });
    return cloneTarget;
  } // 处理对象和数组


  for (var key in target) {
    cloneTarget[key] = deepClone(target[key], map);
  }

  return cloneTarget;
}