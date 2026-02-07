<template>
  <safe-area size="s" />
  <view class="container">

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
    <view class="card chart-card">
      <view class="chart-header">
        <view>
          <text class="section-title">Weekly Performance</text>
          <text class="chart-big-value">88%</text>
        </view>
        <view class="date-badge">
          <text class="date-text">OCT 18 - 24</text>
        </view>
      </view>

      <view class="chart-area">
        <!-- Simple SVG Line Chart -->
        <svg viewBox="0 0 300 100" class="line-chart-svg">
          <!-- Gradient Definition -->
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#2b86ff" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#2b86ff" stop-opacity="0" />
            </linearGradient>
          </defs>
          <!-- Area -->
          <path d="M0,80 Q30,40 50,50 T100,60 T150,40 T200,80 T250,20 T300,50 V100 H0 Z" fill="url(#gradient)" />
          <!-- Line -->
          <path d="M0,80 Q30,40 50,50 T100,60 T150,40 T200,80 T250,20 T300,50" fill="none" stroke="#2b86ff" stroke-width="3" stroke-linecap="round" />
        </svg>

        <!-- X-Axis Labels -->
        <view class="chart-labels">
          <text class="label-text" v-for="(day, index) in days" :key="index">{{ day }}</text>
        </view>
      </view>
    </view>

    <!-- Tabs -->
    <view class="tabs">
      <view class="tab-item" :class="{ active: currentTab === index }" v-for="(tab, index) in tabs" :key="index" @click="currentTab = index">
        <text class="tab-text">{{ tab }}</text>
        <view class="active-indicator" v-if="currentTab === index"></view>
      </view>
    </view>

    <!-- Recent Sessions -->
    <view class="section">
      <view class="section-header">
        <text class="section-title-small">Recent Sessions</text>
        <text class="see-all">See All</text>
      </view>

      <view class="session-list">
        <view class="card session-card" v-for="(session, index) in filteredSessions" :key="index">
          <view class="session-left">
            <view class="session-icon">
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
export default {
  components: {
    SafeArea,
  },
  data() {
    return {
      days: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      tabs: ["All Sessions", "Numbers", "Dates", "Prices"],
      currentTab: 0,
      sessions: [
        {
          type: "Numbers",
          title: "Large Numbers",
          date: "Today, 2:45 PM",
          score: "18/20",
          percent: 90,
          icon: "123",
        },
        {
          type: "Dates",
          title: "Historical Dates",
          date: "Yesterday, 10:15 AM",
          score: "15/20",
          percent: 75,
          icon: "📅",
        },
        {
          type: "Prices",
          title: "Retail Prices",
          date: "Oct 23, 5:30 PM",
          score: "20/20",
          percent: 100,
          icon: "💵",
        },
        {
          type: "Numbers",
          title: "Decimals & Fractions",
          date: "Oct 22, 9:00 AM",
          score: "16/20",
          percent: 80,
          icon: "⅐",
        },
      ],
    };
  },
  computed: {
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
}

/* Header */
.header {
  margin-top: 20rpx;
  margin-bottom: 40rpx;

  .page-title {
    color: $text-main;
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
  background-color: $card-bg;
  border-radius: 24rpx;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .stat-label {
    color: $text-sub;
    font-size: 24rpx;
    margin-bottom: 16rpx;
  }

  .stat-value {
    color: $text-main;
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
  }

  .stat-change {
    display: flex;
    align-items: center;
    font-size: 24rpx;

    &.success {
      color: $accent-green;
    }

    .icon {
      margin-right: 4rpx;
    }
  }

  .stat-sub {
    color: $text-sub;
    font-size: 24rpx;
  }
}

/* Chart Card */
.chart-card {
  background-color: $card-bg;
  border-radius: 30rpx;
  padding: 40rpx 30rpx;
  margin-bottom: 40rpx;

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30rpx;

    .section-title {
      color: $text-sub;
      font-size: 28rpx;
      display: block;
      margin-bottom: 10rpx;
    }

    .chart-big-value {
      color: $text-main;
      font-size: 56rpx;
      font-weight: bold;
    }

    .date-badge {
      background-color: rgba(43, 134, 255, 0.2);
      padding: 8rpx 16rpx;
      border-radius: 12rpx;

      .date-text {
        color: $accent-blue;
        font-size: 24rpx;
        font-weight: bold;
      }
    }
  }

  .chart-area {
    width: 100%;

    .line-chart-svg {
      width: 100%;
      height: 200rpx;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      padding: 0 10rpx;

      .label-text {
        color: $text-sub;
        font-size: 20rpx;
      }
    }
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
      color: $text-sub;
      font-size: 28rpx;
      font-weight: 500;
    }

    &.active {
      .tab-text {
        color: $accent-blue;
        font-weight: bold;
      }

      .active-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4rpx;
        background-color: $accent-blue;
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
    color: $text-main;
    font-size: 32rpx;
    font-weight: bold;
  }

  .see-all {
    color: $accent-blue;
    font-size: 26rpx;
  }
}

.session-card {
  background-color: $card-bg;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .session-left {
    display: flex;
    align-items: center;

    .session-icon {
      width: 80rpx;
      height: 80rpx;
      background-color: rgba(17, 24, 35, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;

      .icon-text {
        font-size: 32rpx;
        color: $accent-blue;
      }
    }

    .session-info {
      display: flex;
      flex-direction: column;

      .session-title {
        color: $text-main;
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .session-date {
        color: $text-sub;
        font-size: 24rpx;
      }
    }
  }

  .session-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .session-score {
      color: $text-main;
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 8rpx;
    }

    .session-percent {
      font-size: 24rpx;
      font-weight: bold;

      &.success {
        color: $accent-green;
      }
      &.warning {
        color: $accent-orange;
      }
      &.danger {
        color: #ff3b30;
      }
    }
  }
}
</style>
