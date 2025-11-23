export enum NovelCategory {
  Male = '男频 (热血/升级/后宫)',
  Female = '女频 (言情/大女主/宫斗)',
  PureLove = '纯爱 (1V1/甜宠/双洁)',
  NTR = '牛头人 (NTR/背叛/苦主)',
}

export enum NovelSubGenre {
  Classic = '凡人流 (传统升级)',
  System = '系统流 (签到/加点/任务)',
  Simulation = '模拟器流 (人生重开)',
  Steady = '苟道流 (长生/稳健)',
  GroupChat = '聊天群/幕后流',
  Cthulhu = '诡秘修仙 (克苏鲁/异变)',
  Invincible = '无敌流 (开局巅峰)',
  Stream = '脑洞流 (直播/科技修仙)',
  Infinite = '无限流/诸天万界',
}

export enum Tone {
  HotBlooded = '热血爽文 (杀伐果断)',
  Funny = '轻松搞笑 (沙雕/迪化)',
  Serious = '正剧向 (宏大叙事)',
  Dark = '黑暗风 (利己/魔道)',
  Emotional = '虐恋情深 (催泪/胃疼)',
}

export enum NovelLength {
  Short = '短篇 (20万字以内)',
  Medium = '中篇 (20万-100万字)',
  Long = '长篇 (100万-300万字)',
}

export interface GeneratorParams {
  category: NovelCategory;
  subGenre: NovelSubGenre;
  tone: Tone;
  length: NovelLength;
  protagonistName: string;
  goldFinger: string; // The "Cheat" or unique advantage
  extraDetails: string;
}

export interface GeneratedContent {
  title: string;
  concept: string;
  outline: string;
}