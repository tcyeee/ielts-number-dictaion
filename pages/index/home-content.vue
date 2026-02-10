<template>
  <safe-area size="s" />
  <view class="container" :data-theme="pageThemeAttr">
    <!-- Header Section -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
        <view class="user-text">
          <text class="app-name">{{ $t('app.name') }}</text>
          <text class="greeting">{{ greetingText }}</text>
        </view>
      </view>
    </view>

    <!-- Progress Section -->
    <view class="progress-section">
      <!-- Accuracy Card -->
      <view class="progress-card">
        <circular-progress :percentage="85" color="#2b86ff" label="85%" :size="140" />
        <text class="card-label">{{ $t('home.accuracy') }}</text>
      </view>

      <!-- Daily Goal Card -->
      <view class="progress-card">
        <circular-progress :percentage="60" color="#9d65ff" label="12/20" :size="140" />
        <text class="card-label">{{ $t('home.dailyGoal') }}</text>
      </view>
    </view>

    <!-- Action Section -->
    <view class="action-section">
      <!-- Start Button -->
      <view class="start-btn" hover-class="btn-hover" @click="startPractice">
        <text class="start-text"> ▶ {{ $t('home.start') }}</text>
      </view>

      <!-- Adaptive Mix Button -->
      <view class="adaptive-btn" hover-class="btn-hover" @click="goToPreferences">
        <view class="icon--feather--zap icon-size-16 adaptive-icon"></view>
        <text class="adaptive-text">{{ adaptiveMixText }}</text>
      </view>

      <!-- Description -->
      <text class="description-text">
        {{ $t('home.adaptiveDesc') }}
      </text>
    </view>
  </view>

  <!-- Safe Area Bottom -->
  <safe-area-bottom />
</template>

<script>
import SafeArea from "@/components/safe-area/safe-area-top.vue";
import SafeAreaBottom from "@/components/safe-area/safe-area-bottom.vue";
import CircularProgress from "@/components/circular-progress/circular-progress.vue";
import { navigateTo } from "@/utils/router";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import themeMixin from "@/mixins/themeMixin.js";

export default {
  mixins: [themeMixin],
  components: {
    SafeArea,
    SafeAreaBottom,
    CircularProgress,
  },
  data() {
    return {
      // Data for progress can be dynamic in future
    };
  },
  computed: {
    ...mapState(useUserStore, ["settings", "userInfo"]),
    greetingText() {
      const name =
        this.userInfo && this.userInfo.nickname
          ? this.userInfo.nickname
          : "Alex";
      // Manual fallback for runtime-only build
      return this.$t("home.greeting", { name }).replace("{name}", name);
    },
    adaptiveMixText() {
      const count = 10;
      return this.$t("home.adaptiveMix", { count }).replace("{count}", count);
    },
  },
  methods: {
    toSettings() {
      // Navigate to profile tab or settings page
      uni.switchTab({ url: "/pages/index/profile" }).catch(() => {
        navigateTo("profile");
      });
    },
    startPractice() {
      navigateTo("dictation");
    },
    goToPreferences() {
      navigateTo("profileQuestionPreferences");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  background-color: var(--bg-color);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60rpx;
  margin-top: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  border: 2rpx solid var(--accent-blue);
}

.user-text {
  display: flex;
  flex-direction: column;
}

.app-name {
  color: var(--text-main);
  font-size: 32rpx;
  font-weight: bold;
}

.greeting {
  color: var(--text-sub);
  font-size: 24rpx;
  margin-top: 4rpx;
}

.settings-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-sub);
}

/* Progress Section */
.progress-section {
  display: flex;
  justify-content: space-between;
  gap: 30rpx;
  margin-bottom: auto; /* Push content below to bottom */
}

.progress-card {
  flex: 1;
  background-color: var(--card-bg);
  border-radius: 40rpx;
  padding: 60rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1rpx solid var(--border-color);
}

.card-label {
  color: var(--text-sub);
  font-size: 24rpx;
  font-weight: bold;
  letter-spacing: 2rpx;
  margin-top: 30rpx;
  text-transform: uppercase;
}

/* Action Section */
.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100rpx;
  width: 100%;
}

.start-btn {
  width: 80%;
  height: 120rpx;
  background: linear-gradient(90deg, #2b86ff 0%, #9d65ff 100%);
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(43, 134, 255, 0.3);
  transition: transform 0.2s;
}

.btn-hover {
  transform: scale(0.98);
  opacity: 0.9;
}

.start-text {
  color: white;
  font-size: 36rpx;
  font-weight: bold;
  letter-spacing: 4rpx;
}

.adaptive-btn {
  background-color: var(--card-bg);
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  border: 1rpx solid var(--border-color);
}

.adaptive-icon {
  color: #9d65ff;
  margin-right: 16rpx;
}

.adaptive-text {
  color: var(--text-main);
  font-size: 24rpx;
  font-weight: bold;
  letter-spacing: 2rpx;
  text-transform: uppercase;
}

.description-text {
  color: var(--text-sub);
  font-size: 24rpx;
  text-align: center;
  line-height: 1.5;
  max-width: 80%;
}
</style>
