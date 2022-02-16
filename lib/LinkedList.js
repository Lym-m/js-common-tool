"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedList = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = /*#__PURE__*/_createClass(function Node(data) {
  _classCallCheck(this, Node);

  this.value = data;
  this.next = null;
});

var LinkedList = /*#__PURE__*/function () {
  function LinkedList() {
    _classCallCheck(this, LinkedList);

    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  _createClass(LinkedList, [{
    key: "addLast",
    value: function addLast(data) {
      // 对参数做一个非空验证
      if (!data) {
        throw new Error('invalid parameter');
      } // 创建一个节点


      var node = new Node(data); // 判断链表是否为空

      if (this.size === 0) {
        // 更新尾部节点，更新头部节点
        this.tail = this.head = node;
      } else {
        // 设置尾部节点的引用
        this.tail.next = node; // 将最新的尾部节点更新到tail

        this.tail = node;
      } // 更新一下长度


      this.size++;
    }
  }, {
    key: "addFirst",
    value: function addFirst(data) {
      // 对参数做一个非空验证
      if (!data) {
        throw new Error('invalid parameter');
      } // 创建一个node节点


      var node = new Node(data); // 判断当前链表是否为空

      if (this.size === 0) {
        this.head = this.tail = node;
      } else {
        // 将整个链表作为新节点的next引用
        node.next = this.head; // 将node赋值给head

        this.head = node;
      } // 更新一下长度


      this.size++;
    }
  }, {
    key: "find",
    value: function find(data) {
      // 对参数做一个非空验证
      if (!data) {
        throw new Error('invalid parameter');
      } // 获取到整个节点


      var linkedList = this.head; // 循环判断

      while (linkedList && linkedList.next && linkedList.value !== data) {
        linkedList = linkedList.next;
      }

      return linkedList;
    }
  }, {
    key: "removeFirst",
    value: function removeFirst() {
      // 定义一个返回值
      var res = null; // 判断当前链表不为空

      if (this.size !== 0) {
        res = this.head; // 跳过head节点，将head指向head的next

        this.head = this.head.next;
        res.next = null; // 维护一下长度

        this.size--; // 判断删除完，链表为空，清空一下尾部节点的引用

        this.tail = this.size ? this.tail : null;
      } else {
        // 如果链表为空，调用删除操作，就报一个警告
        throw new Error("the linkedList is empty! cann‘t execute delete operation");
      }

      return res;
    }
  }, {
    key: "removerLast",
    value: function removerLast() {
      // 定义一个返回值
      var res = null; // 拿到所有节点

      var linkedList = this.head; // 判断当前链表是否只有一个节点

      if (this.size === 1) {
        res = this.head;
        this.head = this.tail = null;
        res.next = null;
      } // 判断是链表为为空


      if (this.size === 0) {
        // 如果链表为空，调用删除操作，就报一个警告
        throw new Error('the linkedList is empty! cann‘t execute delete operation');
      } else {
        // 循环找倒数第二个节点
        while (linkedList && linkedList.next && linkedList.next.next) {
          linkedList = linkedList.next;
        }

        res = linkedList.next; // 将最后一个引用置为空

        linkedList.next = null; // 维护一下尾部节点

        this.tail = linkedList; // 维护一下长度

        this.size--;
      }

      return res;
    }
  }, {
    key: "remover",
    value: function remover(data) {
      // 定义一个返回值
      var res = null; // 对参数做一个非空验证

      if (!data) {
        throw new Error('invalid parameter');
      } // 拿到整个链表


      var linkedList = this.head; // 判断链表只有一个节点

      if (this.size === 1 && linkedList.value === data) {
        res = linkedList; // 维护一下头部节点和尾部节点

        this.head = this.tail = null;
      } else {
        // 循环找到指定节点的父级
        while (linkedList && linkedList.next && linkedList.next.value !== data) {
          linkedList = linkedList.next;
        } // 判断是否存在


        if (linkedList && linkedList.next) {
          // 存下删除节点
          res = linkedList.next; // 删除指定节点

          linkedList.next = linkedList.next.next;
        } else {
          throw new Error('the linkedList is not find data, cann‘t execute delete operation');
        }
      } // 判断一下删除节点是否为最后一个节点


      this.tail = linkedList.next ? this.tail : null; // 删除节点的next指向清空

      res.next = null; // 维护一下

      this.size--;
      return res;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.size === 0;
    }
  }, {
    key: "insert",
    value: function insert(data, ele) {
      // 验证两个参数不能为空
      if (!data || !ele) {
        throw new Error('invalid parameter');
      } // 拿到整个链表


      var linkedList = this.head; // 循环查找匹配

      while (linkedList && linkedList.value !== data) {
        linkedList = linkedList.next;
      } // 验证结果，结果只能是两个，找到，没找到


      if (linkedList) {
        // 生成一个节点
        var node = new Node(ele); // 将匹配到的节点的next引用指向新节点的next引用

        node.next = linkedList.next; // 将新节点赋值给 匹配到的节点

        linkedList.next = node; // 判断一下是否是插入到了最后一个元素

        this.tail = node.next ? this.tail : node; // 维护一下长度

        this.size++;
      } else {
        throw new Error('There is no element matching the insertion position！');
      }
    }
  }]);

  return LinkedList;
}();

exports.LinkedList = LinkedList;