function add0(m) {
    return m < 10 ? '0' + m : m
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

export function formatDateTime(timeStamp, dateSeparator, addZero){
    const type = getType(timeStamp);
    if(typeof timeStamp === "number" || type === '[object Date]'){
        let time;
        if(typeof timeStamp === "number") {
            if (timeStamp.length === 10) {
                timeStamp = timeStamp * 1000;
            }
            time = new Date(timeStamp);
        } else {
            time = timeStamp;
        }
        const y = time.getFullYear();
        const m = time.getMonth() + 1;
        const d = time.getDate();
        const h = time.getHours();
        const mm = time.getMinutes();
        const s = time.getSeconds();
        if(addZero) {
            return y + dateSeparator.toString() + add0(m) + dateSeparator.toString() + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
        } else {
            return y + dateSeparator.toString() + m + dateSeparator.toString() + d + ' ' + h + ':' + mm + ':' + s;
        }
    } else {
        throw new Error('Invalid timestamp input');
    }
}
