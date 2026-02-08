<template>
  <view class="container">
    <custom-header title="Notification Settings" />
    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <!-- Notification Toggles Card -->
        <view class="card">
          <view class="setting-item">
            <view class="setting-info">
              <text class="setting-title">Daily Reminder</text>
              <text class="setting-desc">Get a nudge to practice your dictation daily.</text>
            </view>
            <switch :checked="dailyReminder" @change="onToggleChange('dailyReminder', $event)" color="#2b86ff" style="transform:scale(0.8)" />
          </view>

          <view class="divider"></view>

          <view class="setting-item">
            <view class="setting-info">
              <text class="setting-title">Weekly Progress Report</text>
              <text class="setting-desc">Receive a summary of your weekly performance.</text>
            </view>
            <switch :checked="weeklyProgress" @change="onToggleChange('weeklyProgress', $event)" color="#2b86ff" style="transform:scale(0.8)" />
          </view>

          <view class="divider"></view>

          <view class="setting-item">
            <view class="setting-info">
              <text class="setting-title">New Practice Modules</text>
              <text class="setting-desc">Alerts when new number sets or lessons are added.</text>
            </view>
            <switch :checked="newModules" @change="onToggleChange('newModules', $event)" color="#2b86ff" style="transform:scale(0.8)" />
          </view>
        </view>

        <!-- Practice Schedule Section -->
        <view class="section-header">
          <text class="section-title">PRACTICE SCHEDULE</text>
        </view>

        <view class="card">
          <picker mode="time" :value="practiceTime" @change="onTimeChange">
            <view class="schedule-item">
              <view class="left-content">
                <view class="icon-box">
                  <view class="clock-icon">
                    <view class="clock-hand hour"></view>
                    <view class="clock-hand minute"></view>
                  </view>
                </view>
                <text class="schedule-label">Practice Time</text>
              </view>

              <view class="right-content">
                <view class="time-badge">
                  <text class="time-text">{{ practiceTime }}</text>
                </view>
                <text class="arrow">›</text>
              </view>
            </view>
          </picker>
        </view>

        <text class="description-text">
          Choose a time that works best for you to maintain your practice streak. Consistent daily practice is key to IELTS listening success.
        </text>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";

export default {
  components: {
    CustomHeader,
  },
  data() {
    return {
      dailyReminder: true,
      weeklyProgress: true,
      newModules: true,
      practiceTime: "20:00",
    };
  },
  methods: {
    onToggleChange(key, event) {
      this[key] = event.detail.value;
      // Here you would typically save the setting to storage or backend
    },
    onTimeChange(e) {
      this.practiceTime = e.detail.value;
      // Save time setting
    },
  },
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
  padding-top: calc(var(--status-bar-height) + 44px + 24px);
  padding-bottom: 40px;
}

.card {
  background-color: $card-bg;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.setting-item {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-info {
  flex: 1;
  margin-right: 16px;
}

.setting-title {
  font-size: 16px;
  color: $text-main;
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
}

.setting-desc {
  font-size: 12px;
  color: $text-sub;
  line-height: 1.4;
  display: block;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  margin: 0 16px;
}

.section-header {
  margin-top: 32px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 12px;
  color: $text-sub;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.schedule-item {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-content {
  display: flex;
  align-items: center;
}

.icon-box {
  width: 32px;
  height: 32px;
  background-color: rgba($accent-blue, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

/* Pure CSS Clock Icon */
.clock-icon {
  width: 16px;
  height: 16px;
  border: 1.5px solid $accent-blue;
  border-radius: 50%;
  position: relative;
}

.clock-hand {
  position: absolute;
  background-color: $accent-blue;
  border-radius: 1px;
  transform-origin: bottom center;
  left: 50%;
  bottom: 50%;
  transform: translateX(-50%);

  &.hour {
    width: 1.5px;
    height: 4px;
    transform: translateX(-50%) rotate(45deg);
  }

  &.minute {
    width: 1.5px;
    height: 6px;
    transform: translateX(-50%) rotate(0deg);
  }
}

.schedule-label {
  font-size: 16px;
  color: $text-main;
  font-weight: 500;
}

.right-content {
  display: flex;
  align-items: center;
}

.time-badge {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 6px 10px;
  border-radius: 6px;
  margin-right: 8px;
}

.time-text {
  color: $accent-blue;
  font-size: 14px;
  font-weight: bold;
}

.arrow {
  color: $text-sub;
  font-size: 18px;
  margin-left: 4px;
}

.description-text {
  margin-top: 16px;
  font-size: 13px;
  color: $text-sub;
  line-height: 1.5;
  display: block;
}
</style>
