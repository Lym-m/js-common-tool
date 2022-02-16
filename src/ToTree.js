export function toTree(data){
    if(!Array.isArray(data)) {
        return result;
    }
    const flag = data.every(item => {
        return 'id' in item && 'pid' in item;
    })
    if(!flag) throw new Error('invalid parameter');
    const result = [];
    const map = {};
    data.forEach(item => {
        map[item.id] = item;
    })
    data.forEach(item => {
        const parent = map[item.pid];
        if(parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    })
    return result;
}
