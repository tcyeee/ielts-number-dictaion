# IELTS Number Dictation Training App

## 项目概述

这是一个基于 uniapp 开发的雅思数字听写训练微信小程序，帮助用户提高雅思听力考试中的数字听写能力。支持多种数字类型练习（电话号码、日期、价格、地址等），提供进度跟踪和个性化设置。

## 技术栈

- **框架**: uni-app (Vue 3)
- **状态管理**: Pinia
- **样式**: SCSS + CSS Variables
- **平台**: 微信小程序（mp-weixin）
- **主题**: 支持浅色/暗色主题动态切换

## 项目结构

```
ielts-number-dictaion/
├── pages/                      # 页面文件
│   ├── index/                  # 主页模块
│   │   ├── index.vue          # 主页容器（tabbar）
│   │   ├── home-content.vue   # 首页内容
│   │   ├── history-content.vue # 历史记录
│   │   └── profile-content.vue # 个人中心
│   ├── dictation.vue          # 听写页面
│   ├── result.vue             # 结果页面
│   └── profile/               # 设置子页面
│       ├── avatar.vue         # 编辑个人资料
│       ├── notification.vue   # 通知设置
│       ├── privacy.vue        # 隐私政策
│       ├── questions-per-session.vue # 题目数量
│       └── terms.vue          # 服务条款
├── components/                # 组件
│   ├── nav/                   # 导航组件
│   ├── safe-area/            # 安全区域组件
│   └── chart/                # 图表组件
├── stores/                    # Pinia 状态管理
│   └── user.ts               # 用户状态（主题、设置、用户信息）
├── utils/                     # 工具函数
│   └── router.ts             # 路由工具
├── static/                    # 静态资源
├── uni.scss                   # 全局 SCSS 变量
├── theme.json                 # 主题配置（uniapp 原生暗黑模式）
├── App.vue                    # 应用入口
├── pages.json                 # 页面配置
└── manifest.json              # 应用配置
```

## 核心功能

### 1. 数字听写训练
- 电话号码听写
- 日期时间听写
- 价格金额听写
- 地址邮编听写
- 混合模式练习

### 2. 进度跟踪
- 准确率统计
- 每日目标
- 连续练习天数（Streak）
- 历史记录查看

### 3. 个性化设置
- **主题切换**：支持浅色/暗色主题
- **语言设置**：EN/CN
- **题目数量**：5/10/20/50题
- **通知设置**：每日提醒、周报等

## 主题系统实现

### 技术方案
项目采用混合主题方案：
1. **uniapp 原生暗黑模式**：通过 `theme.json` + `pages.json` 配置系统级 UI（导航栏等）
2. **CSS 变量**：页面级别使用 CSS 变量实现动态主题切换
3. **Pinia 状态管理**：通过 user store 管理主题状态，持久化到本地存储

### 主题配置文件
- `/theme.json` - uniapp 主题配置，定义 light/dark 颜色变量
- `/stores/user.ts` - 主题状态管理，包含 `isDarkMode` 状态
- `/uni.scss` - SCSS 变量定义（保留用于兼容）

### 页面主题实现模式

每个支持主题的页面需要：

**1. Template 层**
```vue
<template>
  <view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
    <!-- 页面内容 -->
  </view>
</template>
```

**2. Script 层**
```javascript
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  computed: {
    ...mapState(useUserStore, ["settings"]),
    isDarkMode() {
      return this.settings.isDarkMode;
    },
  },
};
```

**3. Style 层**
```scss
/* 浅色主题变量 */
.container[data-theme="light"] {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-main: #1a1a1a;
  --text-sub: #666666;
  --accent-blue: #2b86ff;
  --accent-orange: #ff6b35;
  --accent-green: #00d26a;
  --border-color: rgba(0, 0, 0, 0.1);
  --hover-bg: rgba(0, 0, 0, 0.05);
}

/* 暗色主题变量 */
.container[data-theme="dark"] {
  --bg-color: #111823;
  --card-bg: #1a2332;
  --text-main: #ffffff;
  --text-sub: #8b9bb4;
  --accent-blue: #2b86ff;
  --accent-orange: #ff6b35;
  --accent-green: #00d26a;
  --border-color: rgba(255, 255, 255, 0.1);
  --hover-bg: rgba(255, 255, 255, 0.05);
}

/* 使用 CSS 变量 */
.container {
  background-color: var(--bg-color);
  min-height: 100vh;
}

.card {
  background-color: var(--card-bg);
  color: var(--text-main);
}
```

### 已支持主题的页面

**主要页面：**
- ✅ pages/index/profile-content.vue
- ✅ pages/index/home-content.vue
- ✅ pages/index/history-content.vue
- ✅ pages/dictation.vue
- ✅ pages/result.vue

**Profile 子页面：**
- ✅ pages/profile/avatar.vue
- ✅ pages/profile/notification.vue
- ✅ pages/profile/privacy.vue
- ✅ pages/profile/questions-per-session.vue
- ✅ pages/profile/terms.vue

### 主题变量映射

| CSS 变量 | 浅色主题 | 暗色主题 | 用途 |
|---------|---------|---------|------|
| `--bg-color` | #f5f5f5 | #111823 | 页面背景 |
| `--card-bg` | #ffffff | #1a2332 | 卡片背景 |
| `--text-main` | #1a1a1a | #ffffff | 主要文字 |
| `--text-sub` | #666666 | #8b9bb4 | 次要文字 |
| `--accent-blue` | #2b86ff | #2b86ff | 蓝色强调 |
| `--accent-orange` | #ff6b35 | #ff6b35 | 橙色强调 |
| `--accent-green` | #00d26a | #00d26a | 绿色强调 |
| `--border-color` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) | 边框颜色 |
| `--hover-bg` | rgba(0,0,0,0.05) | rgba(255,255,255,0.05) | 悬停背景 |

## 开发规范

### 1. 样式规范
- **新页面优先使用 CSS 变量**（`var(--xxx)`），以支持主题切换
- **SCSS 变量**（`$xxx`）仅用于编译时常量（如尺寸、字体大小）
- 保持 `uni.scss` 中的变量定义，用于向后兼容

### 2. 组件规范
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 组件必须有明确的 `name` 属性

### 3. 路由规范
- 使用 `utils/router.ts` 中的 `navigateTo` 工具函数
- 路由名称在 `router.ts` 中统一管理

### 4. 状态管理规范
- 使用 Pinia 管理全局状态
- Store 文件放在 `/stores` 目录
- 使用 TypeScript 编写 store

### 5. 图标规范
- 使用 CSS Mask 方式实现图标（见 `App.vue`）
- 图标类名格式：`icon--{库名}--{图标名}`
- 通过 `color` 属性控制图标颜色

## 常见任务

### 添加新页面并支持主题

1. 在 `pages.json` 中注册页面
2. 创建页面文件，按照主题实现模式编写
3. 在根元素添加 `:data-theme` 绑定
4. 导入 user store 并添加 `isDarkMode` computed
5. 定义 CSS 变量并使用 `var(--xxx)` 引用

### 修改主题颜色

1. 编辑 `/theme.json` - 修改导航栏等系统级颜色
2. 编辑 `/App.vue` - 修改全局 CSS 变量定义
3. 编辑各页面的 CSS 变量定义（如需页面特定颜色）

### 调试主题切换

1. 进入"个人中心"页面
2. 切换 "Dark Mode" 开关
3. 检查页面是否正确响应主题变化
4. 检查本地存储是否正确保存（key: "theme"）

## 注意事项

### 1. 主题相关
- ⚠️ 不要在页面中使用 `page { background-color: $bg-color; }` 全局设置
- ⚠️ 确保根元素有 `background-color: var(--bg-color)` 和 `min-height: 100vh`
- ⚠️ 新增页面必须添加主题支持，否则会显示不一致

### 2. 样式相关
- ⚠️ 避免使用硬编码颜色，使用 CSS 变量
- ⚠️ `rgba()` 等颜色函数中不能直接使用 CSS 变量，需要拆分或使用 `opacity` 属性
- ⚠️ SCSS 变量在编译时确定，无法响应运行时主题切换

### 3. 性能相关
- ⚠️ 避免在 `onShow` 中频繁操作 DOM
- ⚠️ 大列表使用虚拟滚动
- ⚠️ 图片使用懒加载

### 4. 兼容性相关
- ⚠️ 项目仅支持微信小程序平台
- ⚠️ CSS Grid 在小程序中有限支持，优先使用 Flex
- ⚠️ 部分 CSS 属性在小程序中不支持，需测试验证

## 构建和部署

### 开发环境
```bash
npm run dev:mp-weixin
```

### 生产构建
```bash
npm run build:mp-weixin
```

### 微信开发者工具
1. 打开微信开发者工具
2. 导入项目目录：`unpackage/dist/dev/mp-weixin`
3. 填写 AppID（manifest.json 中配置）

## 联系方式

- 项目维护者：tcyeee
- 问题反馈：通过应用内"Contact Us"功能

## 更新日志

### 2026-02-09
- ✅ 实现完整的浅色/暗色主题切换功能
- ✅ 所有主要页面和 profile 子页面支持主题切换
- ✅ 主题状态持久化到本地存储
- ✅ 优化主题切换性能和用户体验

---

**最后更新**: 2026-02-09
