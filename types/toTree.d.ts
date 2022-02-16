interface OriginData {
    id: string | number;
    pid: string | number;
    children?: Array<OriginData>
}

export declare function ToTree(data: Array<OriginData>)
