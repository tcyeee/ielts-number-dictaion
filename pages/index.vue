<template>
  <view class="page-wrapper">
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
        <view class="notification-btn">
          <!-- Bell Icon SVG -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9599 4.07997 18.2599 5.37997 18.2599H18.66C19.96 18.2599 20.45 16.9599 19.74 15.7699L18.59 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
            <path d="M13.87 3.20001C13.56 3.11001 13.24 3.04001 12.91 3.01001C12.62 2.98001 12.32 2.98001 12.02 3.00001C9.64003 3.14001 7.59003 4.90001 7.23003 7.28001" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.90002 21.18C9.36002 20.64 9.02002 19.88 9.02002 19.06" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
          </svg>
        </view>
      </view>

      <!-- Progress Section -->
      <view class="section">
        <text class="section-title">Your Progress</text>
        <view class="progress-cards">
          <!-- Accuracy Card -->
          <view class="card progress-card">
            <view class="circular-chart" :style="{'--percentage': 85, '--color': '#2b86ff'}">
              <view class="chart-content">
                <text class="chart-value">85%</text>
              </view>
              <svg viewBox="0 0 36 36" class="circular-svg">
                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle" stroke-dasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </view>
            <text class="card-label">Accuracy</text>
            <text class="card-subtext success">+5% today</text>
          </view>

          <!-- Daily Goal Card -->
          <view class="card progress-card">
            <view class="circular-chart orange" :style="{'--percentage': 60, '--color': '#ff6b35'}">
              <view class="chart-content">
                <text class="chart-value">12/20</text>
              </view>
              <svg viewBox="0 0 36 36" class="circular-svg">
                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle" stroke-dasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </view>
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

      <!-- Bottom Navigation -->
      <view class="bottom-nav">
        <view class="nav-item active">
          <text class="nav-icon">🏠</text>
        </view>
        <view class="nav-item">
          <text class="nav-icon">📊</text>
        </view>
        <view class="nav-item">
          <text class="nav-icon">⚙️</text>
        </view>
        <view class="nav-item">
          <text class="nav-icon">👤</text>
        </view>
      </view>

      <!-- Spacer for bottom nav -->
      <view class="bottom-spacer"></view>

    </view>
  </view>
</template>

<script>
import SafeArea from "@/components/safe-area/safe-area.vue";

export default {
  components: {
    SafeArea,
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
$bg-color: #111823;
$card-bg: #1a2332;
$text-main: #ffffff;
$text-sub: #8b9bb4;
$accent-blue: #2b86ff;
$accent-orange: #ff6b35;
$accent-green: #00d26a;

page {
  background-color: $bg-color;
  min-height: 100vh;
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

.circular-chart {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 24rpx;
}

.circular-svg {
  width: 100%;
  height: 100%;
  transform: rotate(0deg); /* Adjust starting point if needed */
}

.circle-bg {
  fill: none;
  stroke: #253145;
  stroke-width: 2.8;
}

.circle {
  fill: none;
  stroke: $accent-blue;
  stroke-width: 2.8;
  stroke-linecap: round;
  /* Stroke dasharray calculated based on percentage */
}

.orange .circle {
  stroke: $accent-orange;
}

.chart-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-value {
  color: $text-main;
  font-size: 36rpx;
  font-weight: bold;
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

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 120rpx;
  background-color: $card-bg;
  border-radius: 60rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
  z-index: 100;
  padding: 0 20rpx;
}

.nav-item {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.nav-icon {
  font-size: 40rpx;
  color: $text-sub;
}

.nav-item.active .nav-icon {
  color: $accent-blue;
}

.bottom-spacer {
  height: 160rpx;
}
</style>
