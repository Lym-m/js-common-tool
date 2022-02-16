import {deepClone} from "./DeepClone";

class ArrayBasedStruct {
    constructor() {
        this.__items = []
    }

    /**
     *获取所有元素
     *
     * @returns 元素集合
     * @memberof Stack
     */
    getItems () {
        return deepClone(this.__items)
    }

    /**
     *数据结构实例中是否包含元素
     *
     * @readonly
     * @member ArrayBasedStruct
     */
    get isEmpty() {
        return this.__items.length === 0
    }

    /**
     *数据结构实例的元素个数
     *
     * @readonly
     * @member ArrayBasedStruct
     */
    get size() {
        return this.__items.length
    }

    /**
     *清空数据结构中的元素
     *
     * @member ArrayBasedStruct
     */
    clear() {
        this.__items.length = 0
    }
}

function isFunction (func) {
    if (!func || toString.call(func) !== '[object Function]') return false
    return true
}

export class Stack extends ArrayBasedStruct{
    constructor() {
        super()
    }

    /**
     *将新元素入栈
     *
     * @param {*} element
     * @member Stack
     */
    push(element) {
        return this.__items.push(element)
    }

    /**
     *栈顶元素出栈
     *
     * @returns 栈顶元素
     * @member Stack
     */
    pop() {
        return this.__items.pop()
    }

    /**
     *查看栈顶元素
     *
     * @returns 栈顶元素
     * @member Stack
     */
    peek() {
        if (!this.__items.length) return undefined
        return deepClone(this.__items[this.__items.length - 1])
    }

    /**
     *遍历栈结构
     *
     * @param {function} callback
     * @param {boolean} [reversal=false]
     * @member Stack
     */
    traverse(callback, reversal = false) {
        // 检查回调函数
        if (!isFunction(callback)) return

        const items = this.getItems(this.__items);
        const from = reversal ? items.length - 1 : 0;
        const to = reversal ? 0 : items.length - 1;
        // 循环条件
        const loopCondition = function (current) {
            if (reversal) {
                return current >= to
            } else {
                return current <= to
            }
        };
        // 游标前进
        const stepIn = function (current) {
            if (reversal) {
                return current - 1
            } else {
                return current + 1
            }
        };

        // 进行遍历
        for (let index = from; loopCondition(index); index = stepIn(index)) {
            const element = items[index];
            callback(element, index)
        }
    }

    /**
     *转为字符串
     *
     * @returns
     * @memberof Stack
     */
    toString() {
        return this.__items.map(element => element.toString()).join(' ')
    }
}
