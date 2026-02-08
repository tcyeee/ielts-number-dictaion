<template>
  <safe-area size="s" />
  <view class="container">
    <!-- Header Section -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
        <view class="user-text">
          <text class="app-name">IELTS Dictation</text>
          <text class="greeting">Keep it up, Alex!</text>
        </view>
      </view>
    </view>

    <!-- Progress Section -->
    <view class="section">
      <text class="section-title">Your Progress</text>
      <view class="progress-cards">
        <!-- Accuracy Card -->
        <view class="card progress-card" hover-class="card-hover">
          <circular-progress :percentage="85" color="#2b86ff" label="85%" />
          <text class="card-label">Accuracy</text>
          <text class="card-subtext success">+5% today</text>
        </view>

        <!-- Daily Goal Card -->
        <view class="card progress-card" hover-class="card-hover">
          <circular-progress :percentage="60" color="#ff6b35" label="12/20" />
          <text class="card-label">Daily Goal</text>
          <text class="card-subtext">8 remaining</text>
        </view>
      </view>
    </view>

    <!-- Training Modules Section -->
    <view class="section">
      <text class="section-title" @click="toCategory">Training Modules</text>
      <view class="modules-list">
        <!-- Mixed Mode Card -->
        <view class="card mixed-card" @click="toCategory">
          <view class="mixed-header">
            <view class="module-icon-box mixed-icon-box">
              <text class="module-icon icon--streamline-plump--street-sign-remix" />
            </view>
            <view class="mixed-info">
              <view class="mixed-title-row">
                <text class="mixed-title">{{mixedMode.title}}</text>
                <view class="mixed-tag">
                  <text class="mixed-tag-text">{{mixedMode.tag}}</text>
                </view>
              </view>
              <text class="mixed-sub">{{mixedMode.sub}}</text>
            </view>
          </view>

          <view class="mixed-progress-section">
            <view class="progress-labels">
              <text class="progress-label">Overall Mastery</text>
              <text class="progress-value">{{mixedMode.progress}}%</text>
            </view>
            <view class="progress-bar-bg mixed-bar-bg">
              <view class="progress-bar-fill mixed-bar-fill" :style="{width: mixedMode.progress + '%'}"></view>
            </view>
          </view>
        </view>

        <!-- Other Modules -->
        <view class="card module-list-item" v-for="(item, index) in modules" :key="index" hover-class="card-hover">
          <view class="module-icon-box list-icon-box">
            <view :class="['module-icon', item.icon]" style="color: #fff;"></view>
          </view>
          <view class="module-content">
            <view class="module-header">
              <text class="module-title">{{item.title}}</text>
              <text class="module-percent">{{item.progress}}%</text>
            </view>
            <view class="progress-bar-bg">
              <view class="progress-bar-fill" :style="{width: item.progress + '%'}"></view>
            </view>
          </view>
        </view>
      </view>
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

export default {
  components: {
    SafeArea,
    SafeAreaBottom,
    CircularProgress,
  },
  data() {
    return {
      mixedMode: {
        title: "Mixed Mode",
        tag: "ALL CATEGORIES",
        sub: "Phones, Dates, Prices & Addresses",
        progress: 62,
      },
      modules: [
        {
          title: "Phone Numbers",
          sub: "Master digit groups",
          icon: "icon--f7--phone-fill",
          progress: 70,
        },
        {
          title: "Dates & Times",
          sub: "Months & years",
          icon: "icon--fluent--calendar-date-28-filled",
          progress: 45,
        },
        {
          title: "Prices",
          sub: "Currencies & decimals",
          icon: "icon--bxs--dollar-circle",
          progress: 80,
        },
        {
          title: "Addresses",
          sub: "Postal codes & streets",
          icon: "icon--mynaui--map-pinned-solid",
          progress: 30,
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    toCategory() {
      navigateTo("category");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  padding-bottom: 180rpx;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50rpx;
  margin-top: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  border: 2rpx solid $accent-blue;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.app-name {
  color: $text-main;
  font-size: 36rpx;
  font-weight: bold;
}

.greeting {
  color: $text-sub;
  font-size: 28rpx;
  margin-top: 4rpx;
}

.notification-btn {
  width: 80rpx;
  height: 80rpx;
  background-color: $card-bg;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Common Section */
.section {
  margin-bottom: 50rpx;
}

.section-title {
  color: $text-main;
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  display: block;
}

.card {
  background-color: $card-bg;
  border-radius: 30rpx;
  padding: 30rpx;
  transition: all 0.2s ease;
}

.card-hover {
  transform: scale(0.98);
  opacity: 0.9;
}

/* Progress Cards */
.progress-cards {
  display: flex;
  justify-content: space-between;
}

.progress-card {
  width: 47%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
}

.card-label {
  color: $text-main;
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.card-subtext {
  font-size: 24rpx;
  color: $text-sub;
}

.success {
  color: $accent-green;
}
/* Modules List */
.modules-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

/* Mixed Mode Card */
.mixed-card {
  background: linear-gradient(145deg, #2b1f3d 0%, #1e1e2e 100%);
  border: 2rpx solid #4a3b69;
  padding: 36rpx;
  position: relative;
  overflow: hidden;
}

.mixed-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40rpx;
}

.mixed-icon-box {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #8a4fff 0%, #5e35b1 100%);
  border-radius: 24rpx;
  margin-right: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(138, 79, 255, 0.3);
}

.mixed-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100rpx;
}

.mixed-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.mixed-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  margin-right: 20rpx;
}

.mixed-tag {
  background-color: rgba(138, 79, 255, 0.2);
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
  border: 1rpx solid rgba(138, 79, 255, 0.4);
}

.mixed-tag-text {
  color: #a77dff;
  font-size: 20rpx;
  font-weight: bold;
  letter-spacing: 1rpx;
}

.mixed-sub {
  color: #9ca3af;
  font-size: 26rpx;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.progress-label {
  color: #9ca3af;
  font-size: 26rpx;
  font-weight: 500;
}

.progress-value {
  color: #fff;
  font-size: 26rpx;
  font-weight: bold;
}

.mixed-bar-bg {
  height: 16rpx;
  background-color: #2e2440;
  border-radius: 8rpx;
}

.mixed-bar-fill {
  background: linear-gradient(90deg, #8a4fff 0%, #d500f9 100%);
  border-radius: 8rpx;
  height: 100%;
}

/* List Items */
.module-list-item {
  display: flex;
  align-items: center;
  padding: 36rpx;
  border: 1rpx solid #253145;
}

.list-icon-box {
  width: 90rpx;
  height: 90rpx;
  background-color: #1a2332;
  border-radius: 24rpx;
  margin-right: 30rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid #253145;
}

.module-content {
  flex: 1;
}

.module-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  align-items: center;
}

.module-title {
  color: $text-main;
  font-size: 32rpx;
  font-weight: bold;
}

.module-percent {
  color: $text-main;
  font-size: 32rpx;
  font-weight: bold;
}

.module-icon {
  color: #bda4fd;
}

.progress-bar-bg {
  width: 100%;
  height: 12rpx;
  background-color: #253145;
  border-radius: 6rpx;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: $accent-blue;
  border-radius: 4rpx;
}

/* Streak Section */
.streak-card {
  background-color: #151e2c; /* Slightly darker/different shade */
  border-radius: 30rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #253145;
  margin-bottom: 60rpx;
}

.streak-info {
  display: flex;
  flex-direction: column;
}

.streak-label {
  color: $accent-blue;
  font-size: 24rpx;
  font-weight: bold;
  letter-spacing: 2rpx;
  margin-bottom: 10rpx;
  text-transform: uppercase;
}

.streak-days {
  color: $text-main;
  font-size: 48rpx;
  font-weight: bold;
}

.streak-indicators {
  display: flex;
  gap: 16rpx;
}

.streak-circle {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.checked {
  background-color: $accent-blue;
  color: white;
}

.locked {
  background-color: $card-bg;
  color: $text-sub;
}
</style>
