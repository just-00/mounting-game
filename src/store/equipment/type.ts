
export interface Equipment{
    key: string;
    size: number;
    weight: number;
    name: string;
    // 图片地址
    src: string;
    // 备注
    tips?: string;
    // 只可用一次
    disposable?: boolean;
    // 升高体温
    warm?: number
    // 用一次要多少分钟
    useTime?: number
    count?: number
}
