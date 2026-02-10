<template>
  <view class="container" :data-theme="pageThemeAttr">
    <!-- Background Pattern (CSS based) -->
    <view class="bg-pattern"></view>

    <view class="content">
      <!-- Logo Section -->
      <view class="logo-section">
        <image class="logo" src="/static/logo.png" mode="aspectFit" />
      </view>

      <!-- Title Section -->
      <view class="title-section">
        <view class="main-title">
          <text>IELTS</text>
          <text class="highlight">Number</text>
        </view>
        <view class="main-title">Master</view>
        <text class="subtitle">Adaptive training for high scores</text>
      </view>

      <!-- Badges Section -->
      <view class="badges-section">
        <view class="badge">
          <text class="badge-icon">✓</text>
          <text class="badge-text">EXPERT VERIFIED</text>
        </view>
        <view class="badge">
          <text class="badge-icon">↗</text>
          <text class="badge-text">9.0 OPTIMIZED</text>
        </view>
      </view>

      <!-- Spacer -->
      <view class="spacer"></view>

      <!-- Action Section -->
      <view class="action-section">
        <button class="btn-primary" hover-class="btn-hover" @click="handleGetStarted">
          <text>Get Started</text>
          <text class="btn-icon">→</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import themeMixin from "@/mixins/themeMixin.js";
import { goHome } from "@/utils/router";

export default {
  name: "WelcomePage",
  mixins: [themeMixin],
  methods: {
    handleGetStarted() {
      goHome();
    },
    handleSignIn() {
      uni.showToast({
        title: "Login feature coming soon",
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  /* Simulating the dark gradient background */
  background: radial-gradient(
    circle at 50% 30%,
    rgba(43, 134, 255, 0.1) 0%,
    rgba(0, 0, 0, 0) 60%
  );
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 48rpx;
  padding-top: 15vh;
  padding-bottom: env(safe-area-inset-bottom);
}

.logo-section {
  margin-bottom: 60rpx;

  .logo {
    width: 180rpx;
    height: 180rpx;
    border-radius: 44rpx;
    box-shadow: 0 20rpx 40rpx rgba(95, 61, 196, 0.3);
  }
}

.title-section {
  text-align: center;
  margin-bottom: 60rpx;

  .main-title {
    font-size: 64rpx;
    font-weight: 700;
    line-height: 1.2;
    color: var(--text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
  }

  .highlight {
    color: var(--accent-blue);
  }

  .subtitle {
    display: block;
    margin-top: 24rpx;
    font-size: 32rpx;
    color: var(--text-sub);
  }
}

.badges-section {
  display: flex;
  gap: 24rpx;
  margin-bottom: 40rpx;

  .badge {
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 12rpx 24rpx;
    background: var(--hover-bg);
    border: 1px solid var(--border-color);
    border-radius: 100rpx;

    .badge-icon {
      font-size: 24rpx;
      color: var(--text-sub);
    }

    .badge-text {
      font-size: 20rpx;
      font-weight: 600;
      color: var(--text-sub);
      letter-spacing: 1rpx;
    }
  }
}

.spacer {
  flex: 1;
}

.action-section {
  width: 100%;
  padding-bottom: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32rpx;

  .btn-primary {
    width: 100%;
    height: 112rpx;
    background: linear-gradient(90deg, #4c6ef5 0%, #7048e8 100%);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    color: #ffffff;
    font-size: 34rpx;
    font-weight: 600;
    border: none;
    box-shadow: 0 8rpx 24rpx rgba(112, 72, 232, 0.3);

    &::after {
      border: none;
    }

    .btn-icon {
      font-size: 36rpx;
    }
  }

  .btn-hover {
    transform: translateY(2rpx);
    opacity: 0.9;
  }

  .login-link {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 28rpx;

    .text-gray {
      color: var(--text-sub);
    }

    .text-link {
      color: #4c6ef5;
      font-weight: 600;
    }
  }
}
</style>