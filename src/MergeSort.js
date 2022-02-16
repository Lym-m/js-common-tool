function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if(left[0] < right[0]){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}

export function mergeSort(list) {
    if(!Array.isArray(list)) throw new Error('');
    if(list.length < 2) return list;
    let middleIdx = Math.floor(list.length / 2);
    const left = list.slice(0, middleIdx);
    const right = list.slice(middleIdx);
    return merge(mergeSort(left), mergeSort(right));
}
