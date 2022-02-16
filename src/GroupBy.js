const group = (list, fn) => {
    const groups = {};
    list.forEach(item => {
        const group = JSON.stringify(fn(item));
        groups[group] = groups[group] || [];
        groups[group].push(item);
    })
    return Object.keys(groups).map(group => {
        return groups[group];
    })
}

export function groupBy(list, key) {
    const flag = list.every(item => {
        return key in item;
    })
    if(!flag) throw new Error('invalid parameter');
    return group(list, item => {
        return [item[key]];
    })
}
