function fib(maxSize) {
    let f = new Array(maxSize);
    f[0] = 1;
    f[1] = 1;
    for (let i = 2; i < maxSize; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f;
}
export function fibSearch(arr, key) {
    let low = 0;
    let high = length = arr.length - 1;
    let k = 0;//表示斐波那契分割值得下标
    let mid = 0;//存放mid值
    let f = fib(length);
    //获取斐波那契分割值得下标
    while (high > f[k] - 1) {
        k++;
    }
    //因为f[k]值，可能大于a的长度，因此我们需要构建一个新的数组
    //用arr数组的最后的数组填充arr数组
    arr = [...arr];
    for (let i = high + 1; i < f[k]; i++) {
        arr.push(arr[high]);
    }
    //使用while来循环处理，找到我们的数key
    while (low <= high) {//只要这个条件满足，就可以找
        mid = low + f[k - 1] - 1;
        if (key < arr[mid]) {
            high = mid - 1; //我们应该继续向数组的前面查找（左边）
            //1.全部元素 = 前面的元素 + 后面的元素
            //2.f[k] = f[k-1] + f[k-2]
            //因为前面 f[k-1]个元素，所以可以继续拆分f[k-1] = f[k-2]+f[k-3]
            //即下次循环mid = f[k-1-1] -1
            k--;
        } else if (key > arr[mid]) {
            low = mid + 1; //我们应该继续向数组的后面查找(右边)
            //1.全部元素 = 前面的元素 + 后面的元素
            //2.f[k] = f[k-1] + f[k-2]
            //3，因为后面我们有f[k-2]，所以可以继续拆分 f[k-2] = f[k-3]+f[k-4]
            //4.即在f[k-2]的前面进行查找 k-=2
            //5.即下次循环mid = f[k-1-2] -1
            k -= 2;
        } else {
            //找到
            //需要确定，返回的是哪个下标,因为可能找到扩充的元素的下标
            if (mid <= length) {
                return mid;
            } else {
                return length;
            }
        }
    }
    return -1
}
