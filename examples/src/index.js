import {deepClone} from "../../src/DeepClone";
import {formatDateTime} from "../../src/FormatDateTime";
import {toTree} from "../../src/ToTree";
import {binarySearch, fastSort} from "../../index";
import {fibSearch} from "../../src/FibSearch";
import {groupBy} from "../../src/GroupBy";
import {mergeSort} from "../../src/MergeSort";
import {bfs} from "../../src/BFS";

/*  -----------------深拷贝-----------------------  */
const map = new Map();
map.set('key', 'value');
map.set('ym', 'yll');
const set = new Set();
set.add('ym');
set.add('yll');
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('lym');
    },
    func2: function (a, b) {
        return a + b;
    }
};
const newData = deepClone(target)
// console.log(newData);


/*  -----------------时间戳、标准时间转为时间日期字符串-----------------------  */
const timeStamp = Date.parse(new Date());
const time = new Date();
// console.log("timeStamp:"+formatDateTime(timeStamp, '-', true));
// console.log("timeStamp:"+formatDateTime(timeStamp, '.', true));
// console.log("timeStamp:"+formatDateTime(timeStamp, '.', false));

// console.log("time:"+formatDateTime(time, '-', true));
// console.log("time:"+formatDateTime(time, '.', true));
// console.log("time:"+formatDateTime(time, '.', false));
// console.log(formatDateTime({a: 1}, '.'));


/*  -----------------数组转为树-----------------------  */
const dataList = [
    {id: 1, pid: null, name: '1'},
    {id: 2, pid: 1, name: '2'},
    {id: 3, pid: 1, name: '3'},
    {id: 4, pid: 2, name: '4'}
]
const data = [
    {id: 1, pid: null, name: '1'},
    {id: 2, pid: 1, name: '2'},
    {pid: 1, name: '3'},
    {id: 4, pid: 2, name: '4'}
]
// console.log(toTree(dataList));
// console.log(toTree(data));

/*  -----------------快速排序-----------------------  */
const fastSortList = [2, 3, 1, 5, 8, 5, 10];
// console.log(fastSort(fastSortList));


/*  -----------------二分查找-----------------------  */
// console.log(binarySearch([1,2,3,5,5,8,10], 0, 6, 5));


/*  -----------------斐波那契查找-----------------------  */
// console.log(fibSearch(fastSortList), 5);


/*  -----------------分组-----------------------  */
const groupData = [
    {
        id: 1,
        date: '2022-01-20',
        name: 'ym',
        score: '88'
    }, {
        id: 2,
        date: '2022-01-20',
        name: 'yll',
        score: '44'
    }, {
        id: 3,
        date: '2022-01-21',
        name: 'ym',
        score: '99'
    }, {
        id: 4,
        date: '2022-01-21',
        name: 'yll',
        score: '55'
    }, {
        id: 5,
        date: '2022-01-22',
        name: 'ym',
        score: '100'
    }, {
        id: 6,
        date: '2022-01-22',
        name: 'yll',
        score: '66'
    }
]
// console.log(groupBy(groupData, 'date'));
// console.log(groupBy(groupData, 'name'));


/*  -----------------归并排序-----------------------  */
const mergeData = [1,6,9,45,7,3,6,7];
// console.log(mergeSort(mergeData));

/*  -----------------dfs-----------------------  */
const dfsData = {
    value: 'A',
    children: [
        {
            value: 'B',
            children: [
                {
                    value: 'D',
                    children: [
                        {
                            value: 'H',
                            children: []
                        }
                    ]
                },
                {
                    value: 'E',
                    children: []
                }
            ]
        },
        {
            value: 'C',
            children: [
                {
                    value: 'F',
                    children: []
                },
                {
                    value: 'G',
                    children: []
                }
            ]
        }
    ]
}
console.log(bfs(dfsData));
