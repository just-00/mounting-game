export enum Speed {
    fast = 0,
    normal = 1,
    slow = 2
}

export interface Status {
    size: number,
    speed: Speed,
    temperature: number,
}
