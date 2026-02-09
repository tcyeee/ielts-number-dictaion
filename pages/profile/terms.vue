<template>
  <view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
    <custom-header title="Terms of Service" />
    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <!-- Section 1 -->
        <view class="section">
          <text class="section-title">1. Acceptance of Terms</text>
          <text class="paragraph">
            By accessing and using this IELTS Number Dictation Training application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app. We reserve the right to update these terms at any time.
          </text>
        </view>

        <!-- Section 2 -->
        <view class="section">
          <text class="section-title">2. User Conduct</text>
          <text class="paragraph">
            Users agree to use the application for personal, non-commercial educational purposes only. You must not engage in any activity that interferes with or disrupts the service, including the use of automated systems or attempts to circumvent security measures.
          </text>
        </view>

        <!-- Section 3 -->
        <view class="section">
          <text class="section-title">3. Intellectual Property Rights</text>
          <text class="paragraph">
            All content, including audio recordings, practice materials, and software architecture, is the exclusive property of the application developers. You may not reproduce, distribute, or create derivative works without explicit written permission.
          </text>
        </view>

        <!-- Section 4 -->
        <view class="section">
          <text class="section-title">4. Limitation of Liability</text>
          <text class="paragraph">
            The application is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the service or any performance outcomes in external examinations like the IELTS.
          </text>
        </view>

        <!-- Footer -->
        <view class="footer">
          <view class="divider"></view>
          <text class="last-updated">Last Updated: June 15, 2024</text>
        </view>

        <!-- Bottom Safe Area -->
        <view class="safe-area-bottom"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  components: { CustomHeader },
  computed: {
    ...mapState(useUserStore, ["settings"]),
    isDarkMode() {
      return this.settings.isDarkMode;
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

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--accent-blue);
  margin-bottom: 12px;
  display: block;
}

.paragraph {
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.6;
  display: block;
}

.footer {
  margin-top: 40px;
  margin-bottom: 20px;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin-bottom: 24px;
}

.last-updated {
  font-size: 12px;
  color: var(--text-sub);
  opacity: 0.6;
  text-align: center;
  display: block;
}

.safe-area-bottom {
  height: env(safe-area-inset-bottom);
}
</style>
