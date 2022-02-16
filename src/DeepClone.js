// 可继续遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
// 不可继续遍历的数据类型
const booleanTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funTag = '[object Function]';
// 装进一个数组里，便于后面判断
const deepTags = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 判断是否为引用类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function')
}

// 获取实际的数据类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneReg(target) {
    const reFlags = /\w*$/;
    const result = new target.constructor(target.source, reFlags.exec(target));
    result.lastIndex = target.lastIndex;
    return result;
}

function cloneSymbol(target) {
    return Object(Symbol.prototype.valueOf.call(target));
}

function cloneFunction(target) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funString = target.toString();
    if (target.prototype) {
        const param = paramReg.exec(funString);
        const body = bodyReg.exec(funString);
        if (body) {
            if (param) {
                const paramList = param[0].split(',');
                return new Function(...paramList, body[0]);
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
    const Ctor = target.constructor;
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
}

//
export function deepClone(target, map = new WeakMap()) {
    // 原始类型直接返回
    if (!isObject(target)) return target;
    // 根据 target 不同类型进行不同操作
    const type = getType(target);
    let cloneTarget;
    if (deepTags.includes(type)) {
        cloneTarget = getInit(target);
    } else {
        return cloneOtherType(target, type);
    }
    // 处理循环
    if(map.get(target)) {
        return target;
    }
    map.set(target, cloneTarget);
    // 处理map和set
    if(type === setTag) {
        target.forEach(item => {
            cloneTarget.add(deepClone(item));
        })
        return cloneTarget;
    }
    if(type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, deepClone(value));
        })
        return cloneTarget;
    }
    // 处理对象和数组
    for (const key in target) {
        cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
}
