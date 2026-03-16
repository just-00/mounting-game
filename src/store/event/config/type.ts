export enum GameRoute {
  Ice = "Ice",
  Sea = "Sea",
}

// 支线相关
export enum SnowOtherEventKey {
  // 野兽相关
  // 熊
  Bear_1 = "ice_enc_bear_1",
  Bear_2 = "ice_enc_bear_2",
  // 雪狐
  FOX_1 = "FOX_1",

  // 探索相关
  // 温泉
  HotSpring_1 = "ice_enc_hot_spring_1",
  HotSpring_2 = "ice_enc_hot_spring_2",

  // 邂逅
  // 叔叔 送食物 => 失温急救
  Uncle = "Uncle_1",
  // 小女孩

  // 小狗 喂摸3次后得到XX
  DOG = "DOG",

  // 小鸡

  // 物品相关
  // 鸡油菌
  MushroomJiYou = "MushroomJiYou",
  // 香菇
  MushroomXiangGu = "MushroomXiangGu",
  // 毒蝇菌
  MushroomDuYing = "MushroomDuYing",
  // 鹅膏菌
  MushroomEGao = "MushroomEGao",
  // 见手青
  MushroomJianShouQing = "MushroomJianShouQing",
  // 尖尖的棍子
  Stick = "Stick",

  // 危险类
  // 山体滑坡
  LandSlide = "LandSlide",
  // 冰道
  IceRoad = "IceRoad",
}

export enum SnowOtherOptionKey {
  // 野兽类
  // 熊
  Bear_1_1 = "Bear_1_1",
  Bear_1_2 = "Bear_1_2",
  Bear_2_1 = "Bear_2_1",
  Bear_2_2 = "Bear_2_2",
  Bear_2_3 = "Bear_2_3",
  // 雪狐
  FOX_1_1 = "FOX_1_1",
  FOX_1_2 = "FOX_1_2",
  FOX_1_3 = "FOX_1_3",
  FOX_1_4 = "FOX_1_4",

  // 探索类
  // 温泉
  HotSpring_1_1 = "HotSpring_1_1",
  HotSpring_1_2 = "HotSpring_1_2",
  HotSpring_2_1 = "HotSpring_2_1",
  HotSpring_2_2 = "HotSpring_2_2",

  // 蘑菇
  MushroomJiYou_1 = "MushroomJiYou_1",
  MushroomJiYou_2 = "MushroomJiYou_2",
  MushroomXiangGu_1 = "MushroomXiangGu_1",
  MushroomXiangGu_2 = "MushroomXiangGu_2",
  MushroomDuYing_1 = "MushroomDuYing_1",
  MushroomDuYing_2 = "MushroomDuYing_2",
  MushroomEGao_1 = "MushroomEGao_1",
  MushroomEGao_2 = "MushroomEGao_2",
  MushroomJianShouQing_1 = "MushroomJianShouQing_1",
  MushroomJianShouQing_2 = "MushroomJianShouQing_2",

  // 物品累
  //长矛
  Stick_1 = "Stick_1",
  Stick_2 = "Stick_2",

  // 危险类
  // 山体滑坡
  LandSlide_1 = "LandSlide_1",
  LandSlide_2 = "LandSlide_2",
  LandSlide_3 = "LandSlide_3",

  // 冰路
  IceRoad_1 = "IceRoad_1",
  IceRoad_2 = "IceRoad_2",
  IceRoad_3 = "IceRoad_3",
}

// 状态相关
export enum SnowStatusEventKey {
  Hunger_Before = "Hunger_Before",
  Hunger = "Hunger",
}

export enum SnowStatusOptionKey {
  Hunger_Before_1 = "Hunger_Before_1",
  Hunger_Before_2 = "Hunger_Before_2",
}

// 主线相关
export enum SnowMainEventKey {
  IceMain_RestStop_3 = "ice_main_rest_stop_3",
  IceMain_Icefall_5_5 = "ice_main_icefall_5_5",
  IceMain_RestStop_8 = "ice_main_rest_stop_8",
  IceMain_IceLake_9 = "ice_main_ice_lake_9",
  IceMain_RestStop_15 = "ice_main_rest_stop_15",
  IceMain_NightLake_18 = "IceMain_NightLake_18",
  IceMain_Common_GoodEnd = "IceMain_Common_GoodEnd",
  IceMain_Common_BadEnd = "IceMain_Common_BadEnd",
  IceMain_Arrest_BadEnd = "IceMain_Arrest_BadEnd",
  IceMain_Lost_BadEnd = "IceMain_Lost_BadEnd",
}

export enum SnowMainOptionKey {
  IceMain_RestStop_3_1 = "IceMain_RestStop_3_1",
  IceMain_RestStop_3_2 = "IceMain_RestStop_3_2",
  IceMain_RestStop_3_3 = "IceMain_RestStop_3_3",
  IceMain_RestStop_3_4 = "IceMain_RestStop_3_4",
  IceMain_Icefall_5_5_1 = "IceMain_Icefall_5_5_1",
  IceMain_Icefall_5_5_2 = "IceMain_Icefall_5_5_2",
}
