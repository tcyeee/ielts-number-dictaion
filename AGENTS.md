# AI Agent 开发指南

> 本文档为 AI 代理（如 Claude）提供项目上下文和开发指导，帮助快速理解项目并生成高质量代码。

## 项目概览

**项目**: IELTS Number Dictation Training App（雅思数字听写训练小程序）
**技术栈**: uni-app (Vue 3) + Pinia + SCSS + 微信小程序
**当前版本**: 1.0.0
**主要特性**: 数字听写练习、进度跟踪、主题切换

## 快速理解项目

### 核心概念

1. **学习模块**: 电话号码、日期时间、价格、地址等不同类型的数字听写练习
2. **进度系统**: 跟踪用户准确率、每日目标、连续练习天数
3. **主题系统**: 支持浅色/暗色主题动态切换，所有页面统一实现

### 文件组织原则

```
pages/           - 页面文件（按功能模块组织）
  index/         - 主页模块（tabbar 页面）
  profile/       - 设置相关子页面
components/      - 可复用组件
stores/          - Pinia 状态管理
utils/           - 工具函数
static/          - 静态资源
```

## 代码风格指南

### Vue 组件结构

```vue
<template>
  <!-- 1. 根元素必须包含主题绑定 -->
  <view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
    <!-- 2. Safe Area 组件 -->
    <safe-area-top size="s" />

    <!-- 3. 页面内容 -->
    <view class="content">
      <!-- 内容 -->
    </view>
  </view>
</template>

<script>
// 1. 导入顺序：组件 > 工具 > Store > 类型
import SafeAreaTop from "@/components/safe-area/safe-area-top.vue";
import { navigateTo } from "@/utils/router";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "PageName", // 组件名称

  components: {
    SafeAreaTop,
  },

  data() {
    return {
      // 组件状态
    };
  },

  computed: {
    // 1. Store 状态
    ...mapState(useUserStore, ["settings"]),

    // 2. 主题状态（必需）
    isDarkMode() {
      return this.settings.isDarkMode;
    },

    // 3. 其他计算属性
  },

  methods: {
    // 方法
  },
};
</script>

<style lang="scss" scoped>
/* 1. 主题变量定义 */
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

/* 2. 组件样式 */
.container {
  background-color: var(--bg-color); /* 使用 CSS 变量 */
  min-height: 100vh;
}

/* 3. 子元素样式 */
.card {
  background-color: var(--card-bg);
  color: var(--text-main);
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
/* 不要使用 SCSS 主题变量 */
.text {
  color: $text-main; /* ❌ 无法响应主题切换 */
}

/* 不要硬编码颜色 */
.card {
  background-color: #1a2332; /* ❌ 固定颜色 */
}

/* 不要在 rgba() 中使用 CSS 变量 */
.text {
  color: rgba(var(--text-main), 0.8); /* ❌ 不支持 */
}

/* 不要设置 page 全局样式 */
page {
  background-color: $bg-color; /* ❌ 会覆盖页面主题 */
}
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

## 主题系统开发指南

### 添加新页面时

**必须遵循的步骤**：

1. **Template**: 在根元素添加主题绑定
```vue
<view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
```

2. **Script**: 导入 store 并添加 computed
```javascript
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

computed: {
  ...mapState(useUserStore, ["settings"]),
  isDarkMode() {
    return this.settings.isDarkMode;
  },
}
```

3. **Style**: 定义 CSS 变量并使用
```scss
/* 定义变量 */
.container[data-theme="light"] { /* 浅色变量 */ }
.container[data-theme="dark"] { /* 暗色变量 */ }

/* 使用变量 */
.container {
  background-color: var(--bg-color);
  min-height: 100vh;
}
```

### 修改现有页面时

**检查清单**：

- [ ] 是否已有 `:data-theme` 绑定？
- [ ] 是否导入了 user store？
- [ ] 是否有 `isDarkMode` computed？
- [ ] 是否定义了两套 CSS 变量？
- [ ] 是否所有颜色都使用 CSS 变量？
- [ ] 根元素是否有 `background-color: var(--bg-color)`？

### 主题变量速查表

```scss
/* 页面和容器 */
background-color: var(--bg-color);     // 页面背景
background-color: var(--card-bg);      // 卡片背景
background-color: var(--hover-bg);     // 悬停背景

/* 文字 */
color: var(--text-main);               // 主要文字
color: var(--text-sub);                // 次要文字

/* 强调色 */
color: var(--accent-blue);             // 蓝色（主色）
color: var(--accent-orange);           // 橙色（警告）
color: var(--accent-green);            // 绿色（成功）

/* 边框 */
border-color: var(--border-color);     // 边框颜色
```

## 常见开发场景

### 场景 1: 创建新的设置页面

```vue
<template>
  <view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
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
    ...mapState(useUserStore, ["settings"]),
    isDarkMode() {
      return this.settings.isDarkMode;
    },
  },

  methods: {
    ...mapActions(useUserStore, ["updateSettings"]),
  },
};
</script>

<style lang="scss" scoped>
/* CSS 变量定义 */
.container[data-theme="light"] {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-main: #1a1a1a;
  --text-sub: #666666;
  --border-color: rgba(0, 0, 0, 0.1);
}

.container[data-theme="dark"] {
  --bg-color: #111823;
  --card-bg: #1a2332;
  --text-main: #ffffff;
  --text-sub: #8b9bb4;
  --border-color: rgba(255, 255, 255, 0.1);
}

.container {
  min-height: 100vh;
  background-color: var(--bg-color);
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
// 在页面 onShow 中打印主题状态
onShow() {
  const userStore = useUserStore();
  console.log('当前主题:', userStore.settings.isDarkMode ? 'dark' : 'light');
  console.log('本地存储:', uni.getStorageSync('theme'));
}
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

### Q1: 页面背景不随主题变化

**原因**: 根元素缺少 `background-color: var(--bg-color)`

**解决**:
```scss
.container {
  background-color: var(--bg-color);
  min-height: 100vh; // 确保铺满全屏
}
```

### Q2: 部分元素颜色不变

**原因**: 使用了 SCSS 变量而非 CSS 变量

**解决**:
```scss
/* ❌ 错误 */
.text {
  color: $text-main;
}

/* ✅ 正确 */
.text {
  color: var(--text-main);
}
```

### Q3: 主题切换后页面不刷新

**原因**: 未绑定 `:data-theme` 或 `isDarkMode` 未正确关联

**解决**:
```vue
<!-- 1. 确保模板有绑定 -->
<view :data-theme="isDarkMode ? 'dark' : 'light'">

<!-- 2. 确保 computed 正确 -->
<script>
computed: {
  ...mapState(useUserStore, ["settings"]),
  isDarkMode() {
    return this.settings.isDarkMode;
  },
}
</script>
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

/* ✅ 或者直接定义半透明变量 */
.container[data-theme="light"] {
  --text-main-faded: rgba(26, 26, 26, 0.8);
}
```

## 性能优化建议

### 1. 避免频繁的主题切换操作
```javascript
// ❌ 避免在循环或频繁触发的事件中切换主题
onScroll() {
  // 不要在这里切换主题
}

// ✅ 主题切换应该是用户主动操作
toggleTheme() {
  this.updateDarkMode(!this.isDarkMode);
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

1. **完全遵循现有代码风格**：参考 `pages/index/profile-content.vue` 等已有页面
2. **主题系统必须实现**：所有新页面都必须支持主题切换
3. **使用项目已有组件**：如 `custom-header`, `safe-area-top` 等
4. **保持一致性**：颜色、间距、圆角等使用统一的设计规范
5. **添加必要注释**：复杂逻辑必须有注释说明

### 修改代码时请注意

1. **不要破坏主题系统**：保留所有 CSS 变量和主题绑定
2. **不要移除关键导入**：如 Pinia store 导入
3. **保持向后兼容**：修改 API 时考虑现有调用
4. **测试主题切换**：修改样式后必须验证两种主题
5. **保持文件结构**：不要随意移动文件或重命名

### 推荐的工作流程

1. **理解需求** → 明确要实现什么功能
2. **查看现有代码** → 找类似功能的实现参考
3. **遵循规范编写** → 按照本文档的规范编写代码
4. **验证主题切换** → 确保浅色/暗色主题都正常
5. **测试功能** → 验证功能逻辑正确性

---

**文档版本**: 1.0
**最后更新**: 2026-02-09
**维护者**: tcyeee
