export function fullList(basicList, dataList){
    const dataMap = new Map(dataList.map(item => {
        for(let key in item) {
            return [Number(key), item[key]]
        }
    }));
    const resultMap = new Map();
    basicList.forEach(item => {
        let itemValue = 0;
        if(dataMap.has(item)) {
            itemValue = dataMap.get(item);
        }
        resultMap.set(item, itemValue);
    })
    return resultMap;
}
