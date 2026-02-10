<template>
  <safe-area size="s" />
  <view class="container" :data-theme="pageThemeAttr">

    <!-- Header -->
    <view class="header">
      <text class="page-title">{{ $t('history.title') }}</text>
    </view>

    <!-- Stats Cards -->
    <view class="stats-row">
      <view class="card stat-card">
        <text class="stat-label">{{ $t('history.avgAccuracy') }}</text>
        <text class="stat-value">88%</text>
        <view class="stat-change success">
          <text class="icon">↗</text>
          <text>+2.4%</text>
        </view>
      </view>
      <view class="card stat-card">
        <text class="stat-label">{{ $t('history.totalSessions') }}</text>
        <text class="stat-value">124</text>
        <text class="stat-sub">{{ $t('history.thisMonth') }}</text>
      </view>
    </view>

    <!-- Weekly Performance Chart -->
    <weekly-performance-chart :days="days" />

    <!-- Category Statistics -->
    <view class="section">
      <view class="section-header">
        <text class="section-title-small">{{ $t('history.practiceStats') }}</text>
      </view>

      <view class="session-list">
        <view class="card session-card" v-for="(stat, index) in categoryStats" :key="index">
          <view class="session-left">
            <view class="session-icon" :class="stat.bgClass">
              <view :class="['icon', stat.icon]"></view>
            </view>
            <view class="session-info">
              <text class="session-title">{{ $t('category.' + stat.id) }}</text>
              <text class="session-date">{{ totalText(stat.count) }}</text>
            </view>
          </view>
          <view class="session-right">
            <text class="session-score">{{ stat.accuracy }}%</text>
            <text class="session-percent" :class="getScoreClass(stat.accuracy)">{{ $t('history.accuracy') }}</text>
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
import { QUESTION_CATEGORIES } from "@/utils/constants.js";

export default {
  components: {
    SafeArea,
    WeeklyPerformanceChart,
  },
  data() {
    return {
      days: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      categoryStats: QUESTION_CATEGORIES.map((cat) => ({
        ...cat,
        count: Math.floor(Math.random() * 100),
        accuracy: Math.floor(Math.random() * 30) + 70,
      })),
    };
  },
  computed: {
    ...mapState(useUserStore, ["settings"]),
  },
  methods: {
    totalText(count) {
      // Manual fallback for runtime-only build
      return this.$t("history.total", { count }).replace("{count}", count);
    },
    getScoreClass(percent) {
      if (percent >= 90) return "success";
      if (percent >= 70) return "warning";
      return "danger";
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

      .icon {
        width: 48rpx;
        height: 48rpx;
        background-color: currentColor;
      }
    }

    /* Icon Colors */
    .bg-blue {
      background-color: rgba(43, 134, 255, 0.1);
      color: #2b86ff;
    }
    .bg-orange {
      background-color: rgba(255, 107, 53, 0.1);
      color: #ff6b35;
    }
    .bg-green {
      background-color: rgba(0, 210, 106, 0.1);
      color: #00d26a;
    }
    .bg-red {
      background-color: rgba(255, 82, 82, 0.1);
      color: #ff5252;
    }
    .bg-purple {
      background-color: rgba(156, 39, 176, 0.1);
      color: #9c27b0;
    }
    .bg-orange-dark {
      background-color: rgba(255, 152, 0, 0.1);
      color: #ff9800;
    }
    .bg-teal {
      background-color: rgba(0, 150, 136, 0.1);
      color: #009688;
    }
    .bg-indigo {
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
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
