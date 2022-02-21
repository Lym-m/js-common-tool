export function debounce<F extends (...args: any) => any>(fn: F, delay: number) {
    let timer: number;
    return function<T>(this: T, ...args: Parameters<F>) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
}
