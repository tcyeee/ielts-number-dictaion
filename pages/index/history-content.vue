<template>
  <safe-area size="s" />
  <view class="container" :data-theme="pageThemeAttr">

    <!-- Header -->
    <view class="header">
      <text class="page-title">Training History</text>
    </view>

    <!-- Stats Cards -->
    <view class="stats-row">
      <view class="card stat-card">
        <text class="stat-label">Average Accuracy</text>
        <text class="stat-value">88%</text>
        <view class="stat-change success">
          <text class="icon">↗</text>
          <text>+2.4%</text>
        </view>
      </view>
      <view class="card stat-card">
        <text class="stat-label">Total Sessions</text>
        <text class="stat-value">124</text>
        <text class="stat-sub">This month</text>
      </view>
    </view>

    <!-- Weekly Performance Chart -->
    <weekly-performance-chart :days="days" />

    <!-- Recent Sessions -->
    <view class="section">
      <view class="section-header">
        <text class="section-title-small">Recent Sessions</text>
      </view>

      <view class="session-list">
        <view class="card session-card" v-for="(session, index) in filteredSessions" :key="index">
          <view class="session-left">
            <view class="session-icon" :class="getSessionTypeClass(session.type)">
              <text class="icon-text">{{ session.icon }}</text>
            </view>
            <view class="session-info">
              <text class="session-title">{{ session.title }}</text>
              <text class="session-date">{{ session.date }}</text>
            </view>
          </view>
          <view class="session-right">
            <text class="session-score">{{ session.score }}</text>
            <text class="session-percent" :class="getScoreClass(session.percent)">{{ session.percent }}%</text>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
import SafeArea from "@/components/safe-area/safe-area-top.vue";
import WeeklyPerformanceChart from "@/components/chart/weekly-performance-chart.vue";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  components: {
    SafeArea,
    WeeklyPerformanceChart,
  },
  data() {
    return {
      days: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      tabs: ["All Sessions", "Numbers", "Dates", "Prices", "Addresses"],
      currentTab: 0,
      sessions: [
        {
          type: "Numbers",
          title: "Phone Numbers",
          date: "Today, 2:45 PM",
          score: "18/20",
          percent: 90,
          icon: "📱",
        },
        {
          type: "Dates",
          title: "Dates & Times",
          date: "Yesterday, 10:15 AM",
          score: "15/20",
          percent: 75,
          icon: "📅",
        },
        {
          type: "Prices",
          title: "Prices",
          date: "Oct 23, 5:30 PM",
          score: "20/20",
          percent: 100,
          icon: "🏷️",
        },
        {
          type: "Addresses",
          title: "Addresses",
          date: "Oct 22, 9:00 AM",
          score: "16/20",
          percent: 80,
          icon: "📍",
        },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["settings"]),
    filteredSessions() {
      if (this.currentTab === 0) return this.sessions;
      const type = this.tabs[this.currentTab];
      return this.sessions.filter((s) => s.type === type);
    },
  },
  methods: {
    getScoreClass(percent) {
      if (percent >= 90) return "success";
      if (percent >= 70) return "warning";
      return "danger";
    },
    getSessionTypeClass(type) {
      const map = {
        Numbers: "type-blue",
        Dates: "type-purple",
        Prices: "type-green",
        Addresses: "type-orange",
      };
      return map[type] || "type-blue";
    },
    navigateTo(url) {
      uni.navigateTo({
        url: url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx 40rpx calc(40rpx + 120rpx + 5vh) 40rpx;
  background-color: var(--bg-color);
  min-height: 100vh;
}

/* Header */
.header {
  margin-top: 20rpx;
  margin-bottom: 40rpx;

  .page-title {
    color: var(--text-main);
    font-size: 36rpx;
    font-weight: bold;
  }
}

/* Stats Cards */
.stats-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
}

.stat-card {
  width: 48%;
  background-color: var(--card-bg);
  border-radius: 24rpx;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .stat-label {
    color: var(--text-sub);
    font-size: 24rpx;
    margin-bottom: 16rpx;
  }

  .stat-value {
    color: var(--text-main);
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
  }

  .stat-change {
    display: flex;
    align-items: center;
    font-size: 24rpx;

    &.success {
      color: var(--accent-green);
    }

    .icon {
      margin-right: 4rpx;
    }
  }

  .stat-sub {
    color: var(--text-sub);
    font-size: 24rpx;
  }
}

/* Tabs */
.tabs {
  display: flex;
  margin-bottom: 30rpx;
  overflow-x: auto;

  .tab-item {
    margin-right: 40rpx;
    padding-bottom: 16rpx;
    position: relative;
    white-space: nowrap;

    .tab-text {
      color: var(--text-sub);
      font-size: 28rpx;
      font-weight: 500;
    }

    &.active {
      .tab-text {
        color: var(--accent-blue);
        font-weight: bold;
      }

      .active-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4rpx;
        background-color: var(--accent-blue);
        border-radius: 4rpx;
      }
    }
  }
}

/* Session List */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;

  .section-title-small {
    color: var(--text-main);
    font-size: 32rpx;
    font-weight: bold;
  }

  .see-all {
    color: var(--accent-blue);
    font-size: 26rpx;
  }
}

.session-card {
  background-color: var(--card-bg);
  border-radius: 32rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-color);

  .session-left {
    display: flex;
    align-items: center;

    .session-icon {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30rpx;

      .icon-text {
        font-size: 40rpx;
      }

      &.type-blue {
        background-color: rgba(43, 134, 255, 0.15);
        .icon-text {
          color: #2b86ff;
        }
      }
      &.type-purple {
        background-color: rgba(124, 77, 255, 0.15);
        .icon-text {
          color: #7c4dff;
        }
      }
      &.type-green {
        background-color: rgba(0, 200, 83, 0.15);
        .icon-text {
          color: #00c853;
        }
      }
      &.type-orange {
        background-color: rgba(255, 152, 0, 0.15);
        .icon-text {
          color: #ff9800;
        }
      }
    }

    .session-info {
      display: flex;
      flex-direction: column;

      .session-title {
        color: var(--text-main);
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .session-date {
        color: var(--text-sub);
        font-size: 26rpx;
      }
    }
  }

  .session-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .session-score {
      color: var(--text-main);
      font-size: 34rpx;
      font-weight: 800;
      margin-bottom: 8rpx;
    }

    .session-percent {
      font-size: 26rpx;
      font-weight: 800;

      &.success {
        color: var(--accent-green);
      }
      &.warning {
        color: var(--accent-orange);
      }
      &.danger {
        color: var(--accent-red);
      }
    }
  }
}
</style>
