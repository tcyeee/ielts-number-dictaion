<template>
  <view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
    <custom-header title="Questions Per Session" />

    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <view class="options-list">
          <view v-for="(option, index) in options" :key="index" class="option-card" :class="{ 'active': selectedOption === option.value }" @click="selectOption(option.value)">
            <text class="option-text">{{ option.label }}</text>
            <view v-if="selectedOption === option.value" class="check-circle">
              <text class="check-icon">✓</text>
            </view>
          </view>
        </view>

        <text class="description-text">
          Select how many numbers you want to transcribe in a single practice session. Shorter sessions are better for quick drills.
        </text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  components: {
    CustomHeader,
  },
  data() {
    return {
      options: [
        { label: "5 Questions", value: 5 },
        { label: "10 Questions", value: 10 },
        { label: "20 Questions", value: 20 },
        { label: "50 Questions", value: 50 },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["settings"]),
    isDarkMode() {
      return this.settings.isDarkMode;
    },
    selectedOption() {
      return this.settings.questionsPerSession;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["setQuestionsPerSession"]),
    selectOption(value) {
      this.setQuestionsPerSession(value);
    },
  },
};
</script>

<style lang="scss" scoped>
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

.container {
  min-height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
}

.content-scroll {
  flex: 1;
  width: 100%;
}

.content-wrapper {
  padding: 24px;
  padding-top: calc(var(--status-bar-height) + 44px + 24px);
  padding-bottom: 40px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.option-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &.active {
    border-color: var(--accent-blue);
    background-color: rgba(43, 134, 255, 0.05);

    .option-text {
      color: var(--text-main);
      font-weight: bold;
    }
  }
}

.option-text {
  font-size: 16px;
  color: var(--text-main);
  font-weight: 500;
}

.check-circle {
  width: 24px;
  height: 24px;
  background-color: var(--accent-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
}

.description-text {
  font-size: 14px;
  color: var(--text-sub);
  text-align: center;
  line-height: 1.6;
  padding: 0 16px;
  display: block;
}
</style>
