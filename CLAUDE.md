# IELTS Number Dictation Training App

## 项目概述

这是一个基于 uniapp 开发的雅思数字听写训练微信小程序，帮助用户提高雅思听力考试中的数字听写能力。支持多种数字类型练习（电话号码、日期、价格、地址等），提供进度跟踪和个性化设置。

## 技术栈

- **框架**: uni-app (Vue 3)
- **状态管理**: Pinia
- **样式**: SCSS + CSS Variables
- **国际化**: vue-i18n
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
├── locale/                    # 国际化语言包
│   ├── en.json               # 英文
│   ├── zh-Hans.json          # 简体中文
│   └── index.ts              # i18n 配置
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

## 国际化系统实现

### 技术方案

项目采用 `vue-i18n` (v9) 实现多语言支持：

1. **语言包管理**：所有语言文件存放在 `locale/` 目录下（`en.json`, `zh-Hans.json`）。
2. **持久化**：用户语言偏好存储在本地缓存 `language` 中，并通过 `UserStore` 管理。
3. **初始化**：App 启动时优先读取本地缓存，无缓存则默认为简体中文 (`zh-Hans`)。
4. **动态切换**：通过 `UserStore.setLanguage()` 动作更新 state 并同步修改 `i18n.global.locale`。

### 使用方式

- **Template**: `{{ $t('home.greeting') }}`
- **Script**: `this.$t('common.save')`
- **Keys**: 使用嵌套结构，如 `page.section.key` (e.g., `profile.dailyGoal`)。

## 主题系统实现

### 技术方案

项目采用 **混合主题方案**，同时支持自动跟随系统和手动切换：

1. **theme.json**：定义 light/dark 主题的颜色变量（系统级 UI）
2. **manifest.json**：在 mp-weixin 配置中启用 `darkmode: true`
3. **pages.json**：使用 `@variableName` 引用 theme.json 中的变量（导航栏等系统 UI）
4. **App.vue**：使用 CSS media query + data-theme 属性选择器定义全局 CSS 变量
5. **themeMixin.js**：全局 mixin，自动为所有页面注入主题响应能力
6. **user store**：管理用户主题偏好（`themeMode`: 'auto' | 'light' | 'dark'）
7. **支持三种模式**：
   - **Auto**（默认）：自动跟随系统设置（微信深色模式）
   - **Light**：强制浅色模式，不受系统设置影响
   - **Dark**：强制暗色模式，不受系统设置影响

> 📖 **官方文档**：https://uniapp.dcloud.net.cn/tutorial/darkmode.html

### 主题配置文件

- `/theme.json` - 定义浅色/暗色主题的颜色变量（用于系统级 UI）
- `/manifest.json` - 启用暗黑模式支持（`mp-weixin.darkmode: true`）
- `/pages.json` - 使用 `@variableName` 引用主题变量
- `/App.vue` - 定义全局 CSS 变量（media query + data-theme 覆盖）
- `/stores/user.ts` - 管理用户主题偏好（`themeMode`）
- `/mixins/themeMixin.js` - 全局主题 mixin，自动注入到所有页面
- `/main.js` - 全局注册 themeMixin
- `/uni.scss` - SCSS 变量映射到 CSS 变量（无需修改）

### 主题维护指南

修改配色时，只需修改以下两个文件：

1. **`theme.json`**：控制原生导航栏、Tab栏等系统级 UI 颜色。
2. **`App.vue`**：控制页面内部组件的 CSS 变量值。

**注意**：`uni.scss` 已配置为引用 CSS 变量（如 `$bg-color: var(--bg-color)`），因此无需手动修改 SCSS 变量。

### 全局 CSS 变量定义（App.vue）

```scss
/* 默认浅色主题 */
page {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-main: #1a1a1a;
  --text-sub: #666666;
  /* ... 其他变量 */
  background-color: var(--bg-color);
}

/* 自动跟随系统 - CSS media query */
@media (prefers-color-scheme: dark) {
  page {
    --bg-color: #111823;
    --card-bg: #1a2332;
    --text-main: #ffffff;
    --text-sub: #8b9bb4;
    /* ... 其他变量 */
  }
}

/* 手动强制浅色主题 - 覆盖 media query */
page[data-theme="light"] {
  --bg-color: #f5f5f5 !important;
  --card-bg: #ffffff !important;
  /* ... 其他变量 */
}

/* 手动强制暗色主题 - 覆盖 media query */
page[data-theme="dark"] {
  --bg-color: #111823 !important;
  --card-bg: #1a2332 !important;
  /* ... 其他变量 */
}
```

**CSS 优先级**：手动设置（`data-theme`） > CSS media query > 默认样式

### 页面主题实现模式

所有页面通过全局 mixin 自动获得主题响应能力：

**Template 层**
```vue
<template>
  <!-- 绑定 pageThemeAttr，由 themeMixin 自动提供 -->
  <view class="container" :data-theme="pageThemeAttr">
    <!-- 页面内容 -->
  </view>
</template>
```

**Script 层**
```javascript
// 无需手动导入 themeMixin，已全局注册
export default {
  // pageThemeAttr 由 themeMixin 自动注入
  // 正常编写页面逻辑即可
};
```

**Style 层**
```scss
/* 直接使用全局 CSS 变量，自动响应主题变化 */
.container {
  background-color: var(--bg-color);
  min-height: 100vh;
}

.card {
  background-color: var(--card-bg);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}
```

### themeMixin 工作原理

`themeMixin` 全局 mixin 为所有页面自动注入：
- `pageThemeAttr` computed：根据用户设置返回 'light'、'dark' 或 undefined（auto）
- `handleThemeChange()` 方法：响应全局主题切换事件
- 生命周期钩子：自动监听和清理主题变化事件

### 主题变量速查表

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
| `--mask-bg` | rgba(0,0,0,0.6) | rgba(0,0,0,0.6) | 遮罩背景 |

### 如何测试主题切换

#### 测试自动跟随系统（Auto 模式）
1. 在**个人中心**将主题设置为 **Auto**
2. 在微信开发者工具中：**模拟器** → **切换到暗色模式**
3. 或在手机微信中：**我** → **设置** → **通用** → **深色模式**
4. 观察页面自动响应系统主题变化

#### 测试手动切换主题
1. 进入**个人中心**页面
2. 点击 **Theme** 设置项
3. 在 **Auto / Light / Dark** 三个选项中切换
4. 观察页面立即响应主题变化
5. 切换到其他页面，验证主题全局生效

#### 测试优先级
- **Auto 模式**：跟随系统设置（默认）
- **Light 模式**：强制浅色，不受系统影响
- **Dark 模式**：强制暗色，不受系统影响

## 开发规范

### 1. 样式规范
- **所有颜色必须使用 CSS 变量**（`var(--xxx)`），以支持主题自动切换
- **SCSS 变量**（`$xxx`）仅用于编译时常量（如尺寸、字体大小、间距等）
- **不要硬编码颜色值**，所有颜色都应使用 CSS 变量
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
2. 创建页面文件，直接使用全局 CSS 变量
3. **无需**添加 `:data-theme` 绑定
4. **无需**导入 user store 或添加 `isDarkMode` computed
5. 直接使用 `var(--xxx)` 引用全局 CSS 变量

### 修改主题颜色

1. 编辑 `/theme.json` - 修改导航栏等系统级 UI 颜色
2. 编辑 `/App.vue` - 修改全局 CSS 变量定义（浅色和暗色两套）
3. **注意**：修改后需要同时更新 `page` 默认样式和 `@media (prefers-color-scheme: dark)` 中的样式

### 调试主题切换

1. **微信开发者工具**：点击 **模拟器** → **切换到暗色模式**
2. **真机测试**：在微信中开启/关闭深色模式
3. 检查页面是否自动响应系统主题变化
4. 验证所有颜色都正确切换（背景、文字、边框等）

## 注意事项

### 1. 微信小程序平台限制 (uni-app)
- ⚠️ **模板语法限制**：Template 中不能使用复杂的 JS 表达式（如对象字面量参数 `{{ $t('key', { name: 'val' }) }}`）。必须将逻辑移至 `computed` 属性。
- ⚠️ **CSS 限制**：
  - 不支持 `*` 通配符选择器。
  - `rgba()` 中不能使用 CSS 变量（需用 opacity 或拆分变量）。
  - 本地背景图需转 base64 或使用网络图片（`<image>` 标签支持本地路径）。
- ⚠️ **API 差异**：
  - 使用 `uni.xxx` 替代 `wx.xxx` 以保持跨平台兼容性（虽本项目仅发布微信）。
  - `uni.getStorageSync` 是同步方法，注意异常处理。

### 2. 主题相关
- ⚠️ **禁止**在页面中使用 `page { background-color: xxx; }` 全局设置，会覆盖主题
- ⚠️ **禁止**添加 `:data-theme` 绑定或 `isDarkMode` 状态，主题由系统控制
- ⚠️ 确保根元素有 `background-color: var(--bg-color)` 和 `min-height: 100vh`
- ⚠️ 新增页面必须使用 CSS 变量，否则无法响应主题切换

### 2. 样式相关
- ⚠️ **禁止**使用硬编码颜色（如 `#ffffff`、`#000000`），必须使用 CSS 变量
- ⚠️ `rgba()` 等颜色函数中不能直接使用 CSS 变量，需要拆分或使用 `opacity` 属性
- ⚠️ SCSS 变量在编译时确定，无法响应运行时主题切换，仅用于常量（尺寸、间距）

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

#### v3 - 混合主题方案（当前版本）
- ✅ 实现混合主题方案：支持自动跟随系统 + 手动切换
- ✅ 添加三段式主题选择器：Auto / Light / Dark
- ✅ 创建 themeMixin 全局 mixin，自动为所有页面注入主题响应能力
- ✅ 在个人中心添加主题切换按钮，用户可自由选择主题模式
- ✅ 主题偏好持久化到本地存储
- ✅ 更新 CLAUDE.md 和 AGENTS.md 文档

#### v2 - 纯自动跟随系统方案（已废弃）
- ~~采用 uni-app 官方推荐的 CSS media query 方案~~
- ~~移除手动主题切换~~
- ~~简化页面代码~~

#### v1 - 初始手动主题切换实现（已废弃）
- ~~实现手动浅色/暗色主题切换功能~~
- ~~使用 Pinia store 管理主题状态~~
- ~~主题状态持久化到本地存储~~

---

**最后更新**: 2026-02-09
