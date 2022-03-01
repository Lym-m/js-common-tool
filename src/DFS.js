import {Stack} from "./Stack";

export function dfs(node){
    const stack = new Stack();
    const nodes = [];
    if(node) {
        stack.push(node);
        while (stack.size) {
            const first = stack.pop();
            const children = first.children || [];
            nodes.push(first);
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }
    return nodes;
}
