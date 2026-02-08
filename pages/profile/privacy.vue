<template>
  <view class="container">
    <custom-header title="Privacy Policy" />
    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <text class="last-updated">LAST UPDATED: OCTOBER 2023</text>

        <text class="paragraph intro">
          Welcome to our Privacy Policy. Your privacy is critically important to us. This policy explains how we handle your information when you use our IELTS Number Dictation Training application.
        </text>

        <!-- Section 1 -->
        <view class="section">
          <view class="section-header">
            <view class="dot blue"></view>
            <text class="section-title">Information We Collect</text>
          </view>
          <text class="paragraph">
            We collect minimal personal information to provide you with a personalized learning experience. This includes:
          </text>
          <view class="list">
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">
                <text class="bold">Profile Data:</text> Your chosen display name and avatar image.
              </text>
            </view>
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">
                <text class="bold">Usage Statistics:</text> Session scores, practice streaks, and progress through training levels.
              </text>
            </view>
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">
                <text class="bold">Device Information:</text> Operating system version and language settings for optimization.
              </text>
            </view>
          </view>
        </view>

        <!-- Section 2 -->
        <view class="section">
          <view class="section-header">
            <view class="dot purple"></view>
            <text class="section-title">How We Use Your Data</text>
          </view>
          <text class="paragraph">
            Your data is used strictly for improving your learning outcomes and app functionality:
          </text>
          <view class="list">
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">To track and display your progress and daily streaks.</text>
            </view>
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">To sync your settings and learning history across your devices.</text>
            </view>
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">To provide insights on areas where your dictation accuracy can be improved.</text>
            </view>
            <view class="list-item">
              <text class="bullet">•</text>
              <text class="list-text">We do not sell your personal information to third parties.</text>
            </view>
          </view>
        </view>

        <!-- Section 3 -->
        <view class="section">
          <view class="section-header">
            <view class="dot green"></view>
            <text class="section-title">Data Security</text>
          </view>
          <text class="paragraph">
            We implement industry-standard security measures to protect your data. Your information is encrypted during transmission using SSL/TLS protocols and stored securely. We regularly review our data collection and storage practices to ensure unauthorized access is prevented.
          </text>
        </view>

        <!-- Footer -->
        <view class="footer">
          <view class="divider"></view>
          <text class="footer-text">
            If you have any questions about this Privacy Policy, please contact us through the profile settings.
          </text>
        </view>

        <!-- Bottom Safe Area -->
        <view class="safe-area-bottom"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";

export default {
  components: { CustomHeader },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
  padding-top: 30rpx;
}

.content-scroll {
  flex: 1;
  width: 100%;
}

.content-wrapper {
  padding: 24px;
  /* Add padding top to account for fixed header (StatusBar + 44px nav) */
  padding-top: calc(var(--status-bar-height) + 44px + 24px);
  padding-bottom: 40px;
}

.last-updated {
  font-size: 12px;
  color: $accent-blue;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
  letter-spacing: 0.5px;
}

.paragraph {
  font-size: 14px;
  color: $text-sub;
  line-height: 1.6;
  margin-bottom: 24px;
  display: block;

  &.intro {
    font-size: 15px;
  }
}

.section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;

  &.blue {
    background-color: $accent-blue;
    box-shadow: 0 0 8px rgba($accent-blue, 0.4);
  }

  &.purple {
    background-color: #a855f7; /* Purple color matching design */
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
  }

  &.green {
    background-color: $accent-green;
    box-shadow: 0 0 8px rgba($accent-green, 0.4);
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: $text-main;
}

.list {
  margin-top: 12px;
  padding-left: 4px;
}

.list-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  align-items: flex-start;
}

.bullet {
  color: $text-sub;
  margin-right: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.list-text {
  flex: 1;
  font-size: 14px;
  color: $text-sub;
  line-height: 1.6;
}

.bold {
  color: $text-main;
  font-weight: bold;
}

.footer {
  margin-top: 20px;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 24px;
}

.footer-text {
  font-size: 13px;
  color: rgba($text-sub, 0.8);
  text-align: center;
  line-height: 1.5;
  display: block;
}

.safe-area-bottom {
  height: env(safe-area-inset-bottom);
}
</style>
