/**
 * ================================
 * IELTS Listening – Number Question Domain Model
 * ================================
 *
 * 该模型用于存储雅思听力中与数字相关的填空题。
 *
 * 设计目标：
 * - 支持自动判分
 * - 支持多种合法答案格式
 * - 支持容错（大小写、空格、逗号）
 * - 支持分类训练
 * - 支持未来 AI 自动出题
 * - 支持音频播放
 *
 * 建议：该实体可用于前端渲染 + 后端存储（推荐配合 Zod / class-validator）
 */


/* ======================================================
   Main Entity
====================================================== */

/**
 * 核心实体：ListeningNumberQuestion
 *
 * 表示一道雅思听力数字题
 */
export interface ListeningNumberQuestion {
    /** UUID 数据库生成 */
    id: string
    /** 难度等级 */
    difficulty: Difficulty
    /** 数字结构类型（决定判分策略） */
    inputCategory: InputCategory
    /** 问题分类 */
    trainingCategory: TrainingCategory
    /** 听力音频 */
    audio: AudioContent
    /** 题目展示 */
    question: QuestionContent
    /** 标准答案 */
    answer: StandardAnswer
    /** 创建时间 */
    createdAt?: Date
    /** 更新时间 */
    updatedAt?: Date
}

// Re-export enums for convenience if needed, but users should import from ./enums
export { Difficulty, InputCategory, QuestionType };

/* ======================================================
Sub Models
====================================================== */

/**
 * 听力音频内容
 */
export interface AudioContent {

    /**
     * 听力原文脚本
     * 用于：
     * - AI 生成 TTS
     * - 后台审核
     * - Debug
     */
    script: string

    /**
     * 音频文件地址
     *
     * 可为空：
     * - 开发阶段未生成音频
     * - 使用 TTS 实时生成
     */
    audioUrl?: string | null
}

/**
 * 题目主体信息
 */
export interface QuestionContent {
    /**
     * 展示给用户的提示文本
     *
     * 示例：
     * "Phone number:"
     */
    prompt: string
}



/**
 * 标准答案结构
 *
 * 只存“标准形态”
 * 判分时统一 normalize
 */
export interface StandardAnswer {

    /**
     * 原始标准答案（用于展示 / Debug）
     *
     * 示例：
     * "3,200,000"
     */
    raw: string

    /**
     * 标准化后的值（用于判分）
     *
     * 类型根据 category 决定：
     * number / string / ISO date / minute number
     */
    value: string | number

    /**
     * 单位（可选）
     *
     * 示例：
     * "%", "$", "hectares"
     */
    unit?: string

    /**
     * 常见错误（用于分析）
     */
    commonMistakes?: string[]
}
