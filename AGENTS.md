# AI Agent 开发指南

> 本文档为 AI 代理（如 Claude）提供项目上下文和开发指导，帮助快速理解项目并生成高质量代码。

## 项目概览

**项目**: IELTS Number Dictation Training App（雅思数字听写训练小程序）
**技术栈**: uni-app (Vue 3) + Pinia + SCSS + vue-i18n + 微信小程序
**当前版本**: 1.0.0
**主要特性**: 数字听写练习、进度跟踪、主题切换

## 快速理解项目

### 核心概念

1. **学习模块**: 电话号码、日期时间、价格、地址等不同类型的数字听写练习
2. **进度系统**: 跟踪用户准确率、每日目标、连续练习天数
3. **主题系统**: 采用混合模式，支持自动跟随系统 + 手动强制切换（Light/Dark）

### 文件组织原则

```
pages/           - 页面文件（按功能模块组织）
  index/         - 主页模块（tabbar 页面）
  profile/       - 设置相关子页面
locale/          - 国际化语言包
components/      - 可复用组件
stores/          - Pinia 状态管理
utils/           - 工具函数
static/          - 静态资源
```

## 代码风格指南

### Vue 组件结构

```vue
<template>
  <!-- 1. 根元素绑定 theme 属性 -->
  <view class="container" :data-theme="pageThemeAttr">
    <!-- 2. Safe Area 组件 -->
    <safe-area-top size="s" />

    <!-- 3. 页面内容 -->
    <view class="content">
      <!-- 内容 -->
    </view>
  </view>
</template>

<script>
// 1. 导入顺序：组件 > 工具 > Store > Mixin
import SafeAreaTop from "@/components/safe-area/safe-area-top.vue";
import { navigateTo } from "@/utils/router";
import themeMixin from "@/mixins/themeMixin.js";

export default {
  name: "PageName", // 组件名称

  mixins: [themeMixin],

  components: {
    SafeAreaTop,
  },

  data() {
    return {
      // 组件状态
    };
  },

  computed: {
    // 计算属性
  },

  methods: {
    // 方法
  },
};
</script>

<style lang="scss" scoped>
/* 直接使用全局 CSS 变量，无需定义主题变量 */
.container {
  background-color: var(--bg-color); /* 自动响应系统主题 */
  min-height: 100vh;
}

.card {
  background-color: var(--card-bg);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.text-sub {
  color: var(--text-sub);
}
</style>
```

### 样式编写规范

#### ✅ 推荐做法

```scss
/* 使用 CSS 变量 */
.text {
  color: var(--text-main);
  background-color: var(--card-bg);
}

/* 使用 SCSS 变量作为常量 */
.text {
  font-size: $uni-font-size-base;
  padding: $uni-spacing-col-base;
}

/* 透明度使用 opacity */
.text-faded {
  color: var(--text-sub);
  opacity: 0.8;
}
```

#### ❌ 避免做法

```scss
/* 不要使用 SCSS 颜色变量 */
.text {
  color: $text-main; /* ❌ 无法响应系统主题切换 */
}

/* 不要硬编码颜色 */
.card {
  background-color: #1a2332; /* ❌ 固定颜色，不会响应主题 */
}

/* 不要在 rgba() 中使用 CSS 变量 */
.text {
  color: rgba(var(--text-main), 0.8); /* ❌ 小程序不支持 */
}

/* 不要设置 page 全局样式 */
page {
  background-color: #111823; /* ❌ 会覆盖全局主题设置 */
}

/* 不要添加 data-theme 绑定 */
<view :data-theme="isDarkMode ? 'dark' : 'light'"> /* ❌ 已废弃，主题由系统控制 */
```

### 命名规范

#### 变量命名
```javascript
// 使用驼峰命名
const userInfo = {};
const isDarkMode = true;

// 常量使用大写下划线
const MAX_QUESTIONS = 50;
const API_BASE_URL = "https://api.example.com";
```

#### CSS 类命名
```scss
// 使用 kebab-case
.user-info { }
.section-title { }
.card-container { }

// 状态类使用单词
.active { }
.disabled { }
.loading { }
```

#### 文件命名
```
组件: kebab-case
  safe-area-top.vue
  circular-progress.vue

页面: kebab-case
  home-content.vue
  profile-content.vue

Store: camelCase
  user.ts
  settings.ts
```

## 国际化开发指南

> 项目已全面支持中英文切换，新增文本必须添加国际化支持。

### 1. 添加新文本

在 `locale/en.json` 和 `locale/zh-Hans.json` 中同时添加对应的键值对。保持结构清晰，建议按页面或模块分组。

```json
// locale/en.json
{
  "profile": {
    "settings": "Settings"
  }
}
```

### 2. 在组件中使用

**Template 中**：
```vue
<text>{{ $t('profile.settings') }}</text>
<custom-header :title="$t('profile.settings')" />
```

**Script 中**：
```javascript
uni.showToast({
  title: this.$t('common.success'),
  icon: 'success'
});
```

**Computed 属性** (推荐用于复杂逻辑)：
```javascript
computed: {
  headerTitle() {
    return this.$t('profile.settings');
  }
}
```

### 3. 平台特定规范 (uni-app / 微信小程序)

#### ⚠️ Template 语法限制
微信小程序对模板中的 JavaScript 表达式支持有限。**严禁在 template 中编写复杂逻辑**。

**❌ 错误示例**：
```vue
<!-- 不支持对象字面量参数 -->
<text>{{ $t('home.greeting', { name: userInfo.nickname || 'Guest' }) }}</text>

<!-- 不支持复杂运算 -->
<view :class="index % 2 === 0 ? 'even' : 'odd'"></view>
```

**✅ 正确示例**：
```vue
<!-- 使用 computed 属性 -->
<text>{{ greetingText }}</text>

<!-- Script -->
computed: {
  greetingText() {
    const name = this.userInfo.nickname || 'Guest';
    return this.$t('home.greeting', { name });
  }
}
```

#### ⚠️ 样式限制
- **禁止使用 `*` 选择器**：小程序不支持。
- **避免使用标签选择器**：如 `view {}`, `text {}`，应使用 class 选择器。
- **Scoped 样式**：组件默认启用 Scoped，修改子组件样式需用 `::v-deep`。

#### ⚠️ 响应式陷阱 (Vue 3 + Pinia)
- 修改 Store 中的对象/数组时，务必**替换引用**以确保视图更新。
- **❌ 错误**: `this.userInfo.name = 'New Name'`
- **✅ 正确**: `this.userInfo = { ...this.userInfo, name: 'New Name' }`

## 主题系统开发指南

> **重要**：项目采用混合主题方案。
> 1. **默认/Auto**: 自动跟随系统（CSS media query）。
> 2. **Manual**: 用户可手动强制 Light/Dark 模式，通过 CSS 变量重定义实现。

### 添加新页面时

**必须使用 themeMixin 并绑定 data-theme**：

1. **Template**: 根元素绑定 `data-theme`
```vue
<view class="container" :data-theme="pageThemeAttr">
  <!-- 页面内容 -->
</view>
```

2. **Script**: 引入 themeMixin
```javascript
import themeMixin from "@/mixins/themeMixin.js";

export default {
  mixins: [themeMixin],
  // ...
};
```

3. **Style**: 直接使用全局 CSS 变量
```scss
.container {
  background-color: var(--bg-color);
  min-height: 100vh;
}
```

### 修改现有页面时

**检查清单**：

- [ ] 是否引入了 `themeMixin`？ → **必须**
- [ ] 根元素是否绑定了 `:data-theme="pageThemeAttr"`？ → **必须**
- [ ] 是否所有颜色都使用 CSS 变量（`var(--xxx)`）？ → **必须**
- [ ] 根元素是否有 `background-color: var(--bg-color)`？ → **必须**

### 主题变量速查表

**修改配色时，仅需同步修改 `theme.json` 和 `App.vue` 两个文件。**

**1. 系统级 UI 配色 (`theme.json`)**
控制导航栏、Tab栏、下拉刷新背景等原生组件颜色。

```json
{
  "light": {
    "navBgColor": "#f5f5f5",
    "bgColor": "#f5f5f5"
  },
  "dark": {
    "navBgColor": "#111823",
    "bgColor": "#111823"
  }
}
```

**2. 页面级 UI 配色 (`App.vue`)**
控制页面内部文字、按钮、卡片等颜色。

```scss
/* 页面和容器 */
--bg-color: #f5f5f5;           // 页面背景
--card-bg: #ffffff;            // 卡片背景

/* 文字 */
--text-main: #1a1a1a;          // 主要文字
--text-sub: #666666;           // 次要文字

/* 强调色 */
--accent-blue: #2b86ff;        // 蓝色（主色）
```

**3. SCSS 变量映射 (`uni.scss`)**
**无需修改**。该文件已配置为自动引用 CSS 变量：
`$bg-color: var(--bg-color);`

### 修改全局主题颜色

如需修改主题颜色，请遵循以下步骤：

1.  **编辑 `theme.json`**: 修改系统原生组件颜色。
2.  **编辑 `App.vue`**: 修改页面内部 CSS 变量值（同时修改 `page` 和 `@media (prefers-color-scheme: dark)` 下的变量）。

## 常见开发场景

### 场景 1: 创建新的设置页面

```vue
<template>
  <!-- 直接使用 class，无需 data-theme 绑定 -->
  <view class="container">
    <custom-header title="设置标题" />

    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <!-- 设置项 -->
        <view class="card">
          <view class="setting-item">
            <text class="setting-title">设置名称</text>
            <switch color="#2b86ff" />
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  components: { CustomHeader },

  computed: {
    // 如需使用其他设置，可以映射 settings
    ...mapState(useUserStore, ["settings"]),
  },

  methods: {
    ...mapActions(useUserStore, ["updateNotificationSettings"]),
  },
};
</script>

<style lang="scss" scoped>
/* 直接使用全局 CSS 变量，无需定义主题变量 */
.container {
  min-height: 100vh;
  background-color: var(--bg-color);  /* 自动响应系统主题 */
}

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.setting-title {
  color: var(--text-main);
}
</style>
```

### 场景 2: 添加新的 Store

```typescript
// stores/practice.ts
import { defineStore } from 'pinia';

export const usePracticeStore = defineStore('practice', {
  state: () => ({
    currentSession: null,
    history: [],
  }),

  getters: {
    sessionCount: (state) => state.history.length,
  },

  actions: {
    startSession() {
      // 开始新的练习
    },

    endSession(results) {
      // 结束练习并保存结果
      this.history.push(results);
    },
  },
});
```

### 场景 3: 使用路由导航

```javascript
import { navigateTo } from "@/utils/router";

// 在 methods 中使用
methods: {
  goToSettings() {
    navigateTo("profileNotification");
  },

  goBack() {
    uni.navigateBack();
  },
}
```

## 调试技巧

### 主题调试

```javascript
// 在页面 onShow 中获取系统主题
onShow() {
  const systemInfo = uni.getSystemInfoSync();
  console.log('当前系统主题:', systemInfo.theme); // 'light' 或 'dark'
}

// 监听主题变化（页面级别）
onThemeChange(res) {
  console.log('主题已切换为:', res.theme); // 'light' 或 'dark'
}

// 全局监听主题变化（App.vue）
uni.onThemeChange((res) => {
  console.log('全局主题变化:', res.theme);
});
```

### 样式调试

```scss
// 临时添加边框查看布局
.debug {
  border: 1px solid red !important;
}

// 查看元素层级
.debug * {
  outline: 1px solid rgba(255, 0, 0, 0.3);
}
```

## 常见问题及解决方案

### Q1: 页面背景不随系统主题变化

**原因**: 根元素缺少 `background-color: var(--bg-color)`

**解决**:
```scss
.container {
  background-color: var(--bg-color);
  min-height: 100vh; // 确保铺满全屏
}
```

### Q2: 部分元素颜色不变

**原因**: 使用了硬编码颜色或 SCSS 变量

**解决**:
```scss
/* ❌ 错误 - 硬编码颜色 */
.text {
  color: #1a1a1a;
}

/* ❌ 错误 - SCSS 变量 */
.text {
  color: $text-main;
}

/* ✅ 正确 - CSS 变量 */
.text {
  color: var(--text-main);
}
```

### Q3: 如何在代码中获取当前主题

**方法 1**: 使用 `uni.getSystemInfoSync()`
```javascript
const systemInfo = uni.getSystemInfoSync();
const currentTheme = systemInfo.theme; // 'light' 或 'dark'
```

**方法 2**: 监听主题变化
```javascript
// 页面级别
export default {
  onThemeChange(res) {
    console.log('当前主题:', res.theme);
  }
}

// 全局级别（App.vue）
uni.onThemeChange((res) => {
  console.log('主题切换为:', res.theme);
});
```

### Q4: CSS 变量在 rgba() 中不工作

**原因**: 小程序不支持在 `rgba()` 中使用 CSS 变量

**解决**:
```scss
/* ❌ 不支持 */
.text {
  color: rgba(var(--text-main), 0.8);
}

/* ✅ 使用 opacity */
.text {
  color: var(--text-main);
  opacity: 0.8;
}

/* ✅ 或者在 App.vue 中定义半透明变量 */
page {
  --text-main-faded: rgba(26, 26, 26, 0.8);
}
@media (prefers-color-scheme: dark) {
  page {
    --text-main-faded: rgba(255, 255, 255, 0.8);
  }
}
```

### Q5: 微信开发者工具如何测试暗黑模式

**步骤**:
1. 打开微信开发者工具
2. 点击顶部菜单栏 **模拟器** → **切换到暗色模式**
3. 或者点击 **模拟器** → **编译配置** → 勾选 **使用暗色模式**
4. 页面应自动响应主题变化

## 性能优化建议

### 1. 主题性能优化
```javascript
// ✅ 主题由系统控制，无需手动管理
// 使用 CSS 变量自动响应主题变化，性能最优

// ✅ 如需在代码中响应主题变化，使用 onThemeChange
onThemeChange(res) {
  // 仅在必要时执行逻辑（如重新加载图片等）
  if (res.theme === 'dark') {
    // 执行暗色主题相关操作
  }
}
```

### 2. 使用虚拟列表处理大数据
```vue
<!-- 历史记录等长列表使用虚拟滚动 -->
<recycle-list :list-data="longList">
  <template v-slot="{ item }">
    <!-- 列表项 -->
  </template>
</recycle-list>
```

### 3. 图片懒加载
```vue
<image :src="imageUrl" lazy-load mode="aspectFill" />
```

## AI Agent 特别说明

### 生成代码时请遵循

1. **完全遵循现有代码风格**：参考 `pages/profile/notification.vue` 等已有页面
2. **主题系统自动响应**：所有新页面自动支持主题切换，使用 CSS 变量即可
3. **使用项目已有组件**：如 `custom-header`, `safe-area-top` 等
4. **保持一致性**：颜色、间距、圆角等使用统一的设计规范
5. **添加必要注释**：复杂逻辑必须有注释说明

### 修改代码时请注意

1. **不要破坏主题系统**：始终使用 CSS 变量（`var(--xxx)`），不要硬编码颜色
2. **不要添加主题相关代码**：不要添加 `:data-theme` 绑定或 `isDarkMode` 状态
3. **保持向后兼容**：修改 API 时考虑现有调用
4. **测试主题切换**：在微信开发者工具中切换暗色模式，验证样式正确
5. **保持文件结构**：不要随意移动文件或重命名

### 推荐的工作流程

1. **理解需求** → 明确要实现什么功能
2. **查看现有代码** → 找类似功能的实现参考
3. **遵循规范编写** → 按照本文档的规范编写代码
4. **验证主题切换** → 在微信开发者工具中切换暗色模式，确保样式正常
5. **测试功能** → 验证功能逻辑正确性

---

**文档版本**: 2.0
**最后更新**: 2026-02-09
**维护者**: tcyeee

**更新日志**:
- v2.0 (2026-02-09): 采用 uni-app 官方推荐的暗黑模式方案，移除手动主题切换
- v1.0 (2026-02-09): 初始版本，手动主题切换（已废弃）
