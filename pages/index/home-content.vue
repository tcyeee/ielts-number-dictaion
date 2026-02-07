<template>
  <safe-area size="m" />
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
      <view class="notification-btn">
        <text class="icon icon--fontisto--bell icon-size-24"></text>
      </view>
    </view>

    <!-- Progress Section -->
    <view class="section">
      <text class="section-title">Your Progress</text>
      <view class="progress-cards">
        <!-- Accuracy Card -->
        <view class="card progress-card">
          <circular-progress :percentage="85" color="#2b86ff" label="85%" />
          <text class="card-label">Accuracy</text>
          <text class="card-subtext success">+5% today</text>
        </view>

        <!-- Daily Goal Card -->
        <view class="card progress-card">
          <circular-progress :percentage="60" color="#ff6b35" label="12/20" />
          <text class="card-label">Daily Goal</text>
          <text class="card-subtext">8 remaining</text>
        </view>
      </view>
    </view>

    <!-- Training Modules Section -->
    <view class="section">
      <text class="section-title" @click="toCategory">Training Modules</text>
      <view class="modules-grid">
        <view class="card module-card" v-for="(item, index) in modules" :key="index">
          <view class="module-icon-box">
            <!-- Dynamic Icon Rendering based on type -->
            <text class="module-icon">{{item.icon}}</text>
          </view>
          <text class="module-title">{{item.title}}</text>
          <text class="module-sub">{{item.sub}}</text>
          <view class="progress-bar-bg">
            <view class="progress-bar-fill" :style="{width: item.progress + '%'}"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- Weekly Streak Section -->
    <view class="streak-card">
      <view class="streak-info">
        <text class="streak-label">WEEKLY STREAK</text>
        <text class="streak-days">5 Days</text>
      </view>
      <view class="streak-indicators">
        <view class="streak-circle checked">✓</view>
        <view class="streak-circle checked">✓</view>
        <view class="streak-circle locked">🔒</view>
      </view>
    </view>

  </view>

  <button class="contact-link" open-type="contact">联系客服</button>

  <view class="copyright">
    <text>© 2026 IELTS Dictation. All rights reserved.</text>
  </view>

  <!-- Safe Area Bottom -->
  <safe-area-bottom />

  <!-- Bottom Navigation -->
  <bottom-nav />
</template>

<script>
import SafeArea from "@/components/safe-area/safe-area-top.vue";
import BottomNav from "@/components/bottom-nav/bottom-nav.vue";
import SafeAreaBottom from "@/components/safe-area/safe-area-bottom.vue";
import CircularProgress from "@/components/circular-progress/circular-progress.vue";

export default {
  components: {
    SafeArea,
    BottomNav,
    SafeAreaBottom,
    CircularProgress,
  },
  data() {
    return {
      modules: [
        {
          title: "Phone Numbers",
          sub: "Master digit groups",
          icon: "📱",
          progress: 70,
        },
        {
          title: "Dates & Times",
          sub: "Months & years",
          icon: "📅",
          progress: 45,
        },
        {
          title: "Prices",
          sub: "Currencies & decimals",
          icon: "💵",
          progress: 80,
        },
        {
          title: "Addresses",
          sub: "Postal codes & streets",
          icon: "🗺️",
          progress: 30,
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    toCategory() {
      uni.navigateTo({
        url: "/pages/category",
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: $bg-color;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

.container {
  padding: 40rpx;
  padding-bottom: 0;
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

/* Modules Grid */
.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30rpx;
}

.module-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30rpx;
}

.module-icon-box {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba($accent-blue, 0.1);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.module-icon {
  font-size: 40rpx;
}

.module-title {
  color: $text-main;
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.module-sub {
  color: $text-sub;
  font-size: 22rpx;
  margin-bottom: 30rpx;
  line-height: 1.4;
}

.progress-bar-bg {
  width: 100%;
  height: 8rpx;
  background-color: #253145;
  border-radius: 4rpx;
  overflow: hidden;
}

.copyright {
  text-align: center;
  padding: 40rpx 0;

  text {
    font-size: 24rpx;
    color: $text-sub;
  }
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

.contact-link {
  background-color: transparent;
  color: rgb(173, 173, 173);
  font-size: 25rpx;
  margin-top: 80rpx;
  border: none;
  line-height: 1.5;

  &::after {
    border: none;
  }
}
</style>
