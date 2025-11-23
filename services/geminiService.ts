import { GoogleGenAI } from "@google/genai";
import { GeneratorParams, NovelLength } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNovelOutline = async (params: GeneratorParams): Promise<string> => {
  const { category, subGenre, tone, length, protagonistName, goldFinger, extraDetails } = params;

  // Helper to determine structure based on length
  const getStructureGuide = (len: NovelLength) => {
      if (len === NovelLength.Short) {
          return "分卷规划: 1-3 卷 (节奏紧凑，去除注水，直奔主题)";
      } else if (len === NovelLength.Medium) {
          return "分卷规划: 3-5 卷 (标准网文结构，起承转合完整)";
      } else {
          return "分卷规划: 5-8 卷或更多 (百万字长篇结构，铺垫世界观，多地图换图升级)";
      }
  };

  const prompt = `
    你是一位熟悉中国网文市场（起点、晋江、飞卢、刺猬猫）的白金级作家兼资深主编。
    任务：根据以下设定，创作一份详细的网文大纲。
    
    **核心参数：**
    - **所属频段/类别:** ${category} (极其重要，请严格遵守该类别的写作风格)
    - **篇幅/字数:** ${length}
    - **流派:** ${subGenre}
    - **基调:** ${tone}
    - **主角姓名:** ${protagonistName || '由你构思（符合类别风格）'}
    - **金手指/核心设定:** ${goldFinger || '自动匹配最适合该流派的金手指'}
    - **补充设定:** ${extraDetails || '无'}

    **风格指南 (根据类别调整):**
    1. **若为男频文**: 侧重升级体系严谨、地图宏大、爽点密集、装逼打脸、杀伐果断或利益至上。
    2. **若为女频文**: 侧重人物情感纠葛、心理描写细腻、大女主成长或甜宠互动，世界观服务于剧情和感情。
    3. **若为纯爱文**: 强调 1V1 双向奔赴，感情线无误会或误会快速解开，拒绝任何形式的背叛，发糖为主。
    4. **若为牛头人 (NTR)**: 侧重情感冲突、背叛感、主角的心理挣扎、苦主视角或黄毛视角（根据语境判断，若无指定默认苦主逆袭或沉沦），强调情感的“扭曲”与“刺激”。

    **篇幅指南:**
    严格按照 [${length}] 的体量进行剧情规划。
    ${length === NovelLength.Short ? "注意：短篇不需要过于庞大的世界观，聚焦于核心冲突的解决。" : ""}
    ${length === NovelLength.Long ? "注意：长篇需要设计可持续的升级体系（换地图）和长线伏笔。" : ""}

    **输出格式 (Markdown):**

    # [小说书名] (风格要符合 ${category})

    ## 1. 核心创意与卖点
    - **一句话简介:** (吸睛)
    - **核心看点:** (根据类别：是爽感、甜度、还是胃疼点？)
    - **读者定位:** (如：老书虫、考据党、CP粉、乐子人)

    ## 2. 人物小传
    - **主角:** 姓名、人设 (根据类别调整，如男频刚毅，女频飒爽/娇软)、核心驱动力。
    - **关键角色:** 
        - CP/伴侣 (如有): 互动模式。
        - 宿敌/反派: 制造冲突的关键人物。
        - (若是牛头人题材): 必须详细描述涉及情感纠葛的第三方角色。

    ## 3. 力量/世界体系
    - 简述境界/等级划分 (若是短篇可简化)。
    - 世界观背景 (修仙界/现代异能/赛博朋克等)。

    ## 4. 剧情大纲 (${getStructureGuide(length)})
    每卷请包含：
    - **卷名:**
    - **关键剧情:** 
        - 核心冲突
        - 感情线进展 (女频/纯爱/NTR重点描述)
        - 事业线/升级进展 (男频重点描述)
        - 高潮点

    ## 5. 避坑指南 & 编辑建议
    - 针对 ${category} + ${subGenre} + ${length} 组合的写作建议。
    - 如何处理该题材下的常见毒点。

    **语言:** 简体中文。
    **要求:** 逻辑自洽，情绪调动精准，符合网文商业逻辑。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9, 
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    return response.text || "生成内容为空，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("沟通天道失败（API 连接错误），请检查网络或稍后再试。");
  }
};