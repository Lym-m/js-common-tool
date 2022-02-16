"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;

var _DeepClone = require("./DeepClone");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ArrayBasedStruct = /*#__PURE__*/function () {
  function ArrayBasedStruct() {
    _classCallCheck(this, ArrayBasedStruct);

    this.__items = [];
  }
  /**
   *获取所有元素
   *
   * @returns 元素集合
   * @memberof Stack
   */


  _createClass(ArrayBasedStruct, [{
    key: "getItems",
    value: function getItems() {
      return (0, _DeepClone.deepClone)(this.__items);
    }
    /**
     *数据结构实例中是否包含元素
     *
     * @readonly
     * @member ArrayBasedStruct
     */

  }, {
    key: "isEmpty",
    get: function get() {
      return this.__items.length === 0;
    }
    /**
     *数据结构实例的元素个数
     *
     * @readonly
     * @member ArrayBasedStruct
     */

  }, {
    key: "size",
    get: function get() {
      return this.__items.length;
    }
    /**
     *清空数据结构中的元素
     *
     * @member ArrayBasedStruct
     */

  }, {
    key: "clear",
    value: function clear() {
      this.__items.length = 0;
    }
  }]);

  return ArrayBasedStruct;
}();

function isFunction(func) {
  if (!func || toString.call(func) !== '[object Function]') return false;
  return true;
}

var Stack = /*#__PURE__*/function (_ArrayBasedStruct) {
  _inherits(Stack, _ArrayBasedStruct);

  var _super = _createSuper(Stack);

  function Stack() {
    _classCallCheck(this, Stack);

    return _super.call(this);
  }
  /**
   *将新元素入栈
   *
   * @param {*} element
   * @member Stack
   */


  _createClass(Stack, [{
    key: "push",
    value: function push(element) {
      return this.__items.push(element);
    }
    /**
     *栈顶元素出栈
     *
     * @returns 栈顶元素
     * @member Stack
     */

  }, {
    key: "pop",
    value: function pop() {
      return this.__items.pop();
    }
    /**
     *查看栈顶元素
     *
     * @returns 栈顶元素
     * @member Stack
     */

  }, {
    key: "peek",
    value: function peek() {
      if (!this.__items.length) return undefined;
      return (0, _DeepClone.deepClone)(this.__items[this.__items.length - 1]);
    }
    /**
     *遍历栈结构
     *
     * @param {function} callback
     * @param {boolean} [reversal=false]
     * @member Stack
     */

  }, {
    key: "traverse",
    value: function traverse(callback) {
      var reversal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // 检查回调函数
      if (!isFunction(callback)) return;
      var items = this.getItems(this.__items);
      var from = reversal ? items.length - 1 : 0;
      var to = reversal ? 0 : items.length - 1; // 循环条件

      var loopCondition = function loopCondition(current) {
        if (reversal) {
          return current >= to;
        } else {
          return current <= to;
        }
      }; // 游标前进


      var stepIn = function stepIn(current) {
        if (reversal) {
          return current - 1;
        } else {
          return current + 1;
        }
      }; // 进行遍历


      for (var index = from; loopCondition(index); index = stepIn(index)) {
        var element = items[index];
        callback(element, index);
      }
    }
    /**
     *转为字符串
     *
     * @returns
     * @memberof Stack
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.__items.map(function (element) {
        return element.toString();
      }).join(' ');
    }
  }]);

  return Stack;
}(ArrayBasedStruct);

exports.Stack = Stack;