<template>
  <view class="container" :data-theme="pageThemeAttr">
    <custom-header title="Daily Practice Goal" />

    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <text class="page-description">
          Set your daily target to stay consistent and improve your IELTS listening score.
        </text>

        <!-- Goal Options -->
        <view class="card">
          <view v-for="(option, index) in goalOptions" :key="option" class="goal-item" @click="selectGoal(option)">
            <text class="goal-text">{{ option }} Questions</text>
            <view v-if="dailyGoal === option" class="check-icon">
              <text class="check-mark">✓</text>
            </view>
            <view v-if="index < goalOptions.length - 1" class="divider"></view>
          </view>
        </view>

        <!-- Info Box -->
        <view class="info-box">
          <view class="info-icon-wrapper">
            <view class="info-icon">i</view>
          </view>
          <text class="info-text">
            Most students who score 7.0 or higher complete at least <text class="highlight">30 questions</text> daily for 4 consecutive weeks.
          </text>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";
import themeMixin from "@/mixins/themeMixin.js";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "DailyPracticeGoal",

  mixins: [themeMixin],

  components: {
    CustomHeader,
  },

  data() {
    return {
      goalOptions: [10, 20, 30, 50],
    };
  },

  computed: {
    ...mapState(useUserStore, ["settings"]),
    dailyGoal() {
      return this.settings.dailyGoal;
    },
  },

  methods: {
    ...mapActions(useUserStore, ["setDailyGoal"]),

    selectGoal(goal) {
      this.setDailyGoal(goal);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  /* Adjust top padding based on header height (approx) + spacing */
  padding-top: calc(var(--status-bar-height) + 44px + 20px);
}

.page-description {
  font-size: 14px;
  color: var(--text-sub);
  margin-bottom: 24px;
  line-height: 1.5;
  display: block;
}

.card {
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  margin-bottom: 32px;
}

.goal-item {
  position: relative;
  padding: 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:active {
    opacity: 0.7;
  }
}

.goal-text {
  font-size: 16px;
  color: var(--text-main);
  font-weight: 500;
}

.check-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--accent-blue);
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-mark {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.divider {
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 1px;
  background-color: var(--border-color);
}

.info-box {
  background-color: rgba(43, 134, 255, 0.1);
  border: 1px solid rgba(43, 134, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.info-icon-wrapper {
  margin-right: 12px;
  flex-shrink: 0;
}

.info-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent-blue);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: serif; /* For a serif 'i' */
}

.info-text {
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.5;
}

.highlight {
  color: var(--accent-blue);
  font-weight: bold;
}
</style>
