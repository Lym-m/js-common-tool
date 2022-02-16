export function binarySearch(list, low, high, key) {
    if(!Array.isArray(list) || typeof low !== 'number' || typeof high !== 'number' || typeof key !== 'number'){
        throw new Error('invalid parameter');
    }
    if(low > high) {
        return -1;
    }
    let middleIndex = Math.floor((low + high)/2);
    let middleValue = list[middleIndex];
    if (key > middleValue) {
        //向右递归
        return binarySearch(list, middleIndex + 1, high, key);
    } else if (key < middleValue) {
        //向左递归
        return binarySearch(list, low, middleIndex - 1, key);
    } else {
        let resIndexList = [];
        //向mid索引值得左边扫描
        let temp = middleIndex - 1;
        while (true) {
            if (temp < 0 || list[temp] !== key) {
                //退出
                break;
            }
            resIndexList.push(temp);
            temp--;
        }
        resIndexList.push(middleIndex)
        //向右扫描
        temp = middleIndex + 1;
        while (true) {
            if (temp > list.length - 1 || list[temp] !== key) {
                //退出
                break;
            }
            resIndexList.push(temp);
            temp++;
        }
        return resIndexList;
    }
}
