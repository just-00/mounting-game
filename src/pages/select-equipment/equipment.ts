export const MAX_SIZE = 55
export const MAX_WEIGHT = 20

export const EQUIPMENTS: {
    key: string;
    size: number;
    weight: number;
    name: string;
    src: string;
    tips?: string;
}[] = [
    // 生存保障类
    {
        key: 'lightTent',
        name: '轻便帐篷',
        weight: 1.2,
        size: 8,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/a9a6e98d1c534ebbbd3c3f6ef570cd16.jpeg%7Etplv-a9rns2rl98-image_raw_b.png'
    },
    {
        key: 'warmTent',
        name: '保暖帐篷',
        weight: 3.5,
        size: 15,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/8fd6f7d3f9b341f290fec4dbe18d87cb.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    {
        key: 'sleepingBag',
        name: '睡袋',
        weight: 1.8,
        size: 7,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/5f22f0ba94e84abe958fc4315d716a97.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    {
        key: 'firstAidKit',
        name: '急救包',
        weight: 0.8,
        size: 2,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/f1e23c2d67ba42f58e54537a221a3dc0.jpeg~tplv-a9rns2rl98-image_pre_watermark_1_5b.png',
    },
    {
        key: 'survivalBlanket',
        name: '救生毯',
        weight: 0.1,
        size: 0.5,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/13821f95dd364c5b89e3fe0878d709b1.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    // 食物类
    {
        key: 'sportsDrink',
        name: '运动饮料',
        weight: 0.55,
        size: 0.5,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/f7687b0575eb4b93bed2d507d9bf7469.jpeg~tplv-a9rns2rl98-image_raw_b.png',
    },
    {
        key: 'compressedBiscuit',
        name: '压缩饼干',
        weight: 0.3,
        size: 0.3,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/3496e6a51d6844c181b139902585ac63.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    {
        key: 'selfHeatingPot',
        name: '自热锅',
        weight: 1.2,
        size: 2,
        tips: '幸福感up',
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/a708a7c3a2144e008ebc9de3d92cc654.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    // 登山器材类
    {
        key: 'hikingPole',
        name: '登山杖',
        weight: 0.3,
        size: 0, // 拿在手上，体积忽略
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/92d30f20f1dc43ecb2af663b3c54867c.jpeg~tplv-a9rns2rl98-image_pre_watermark_1_5b.png',
    },
    {
        key: 'crampons',
        name: '冰爪',
        weight: 0.8,
        size: 2,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/6098beb7bcbb45a6bc07a0f3089258fe.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    // 特殊用品
    {
        key: 'powerBank',
        name: '充电宝',
        weight: 0.3,
        size: 0.4,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/fe9e901e20464deca6cc04ccb32dd21a.jpeg~tplv-a9rns2rl98-image_raw_b.png',
    },
    {
        key: 'bearBell',
        name: '熊铃',
        weight: 0.05,
        size: 0, // 体积极小忽略
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/e5cd0abe1e0042a48178066b5e8d7c24.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
    {
        key: 'headlamp',
        name: '头灯',
        weight: 0.2,
        size: 0.2,
        src: 'https://raw.githubusercontent.com/just-00/game-image-cdn/main/5f5e831e03f54acda4f83438d5d5c9d8.jpeg%7Etplv-a9rns2rl98-image_raw_b.png',
    },
]