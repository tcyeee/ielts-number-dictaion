<template>
  <view class="card chart-card">
    <view class="chart-header">
      <view>
        <text class="section-title">Weekly Performance</text>
        <text class="chart-big-value">{{ percentage }}</text>
      </view>
      <view class="date-badge">
        <text class="date-text">{{ dateRange }}</text>
      </view>
    </view>

    <view class="chart-content">
      <!-- Y-Axis Labels -->
      <view class="y-axis">
        <view class="label-wrapper" style="top: 0">
          <text class="axis-label">100%</text>
        </view>
        <view class="label-wrapper" style="top: 50%">
          <text class="axis-label">50%</text>
        </view>
        <view class="label-wrapper" style="top: 100%">
          <text class="axis-label">0%</text>
        </view>
      </view>

      <view class="chart-area">
        <view class="plot-area">
          <!-- Grid Lines -->
          <view class="grid-line" style="top: 0"></view>
          <view class="grid-line" style="top: 50%"></view>
          <view class="grid-line" style="top: 100%"></view>

          <!-- CSS Bar Chart -->
          <view class="chart-bars">
            <view v-for="(bar, index) in bars" :key="index" class="bar-container">
              <view class="bar-fill" :style="{ height: bar.height + '%' }"></view>
            </view>
          </view>
        </view>

        <!-- X-Axis Labels -->
        <view class="chart-labels">
          <view class="label-container" v-for="(day, index) in days" :key="index">
            <text class="label-text">{{ day }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "WeeklyPerformanceChart",
  props: {
    days: {
      type: Array,
      default: () => ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    },
    percentage: {
      type: [String, Number],
      default: "88%",
    },
    dateRange: {
      type: String,
      default: "OCT 18 - 24",
    },
    values: {
      type: Array,
      default: () => [20, 60, 50, 40, 60, 20, 80],
    },
  },
  computed: {
    bars() {
      // Ensure we have values for all days
      return this.days.map((_, index) => {
        const val = this.values[index] !== undefined ? this.values[index] : 0;
        // Cap height at 100
        const height = Math.min(Math.max(val, 0), 100);

        return {
          height,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .chart-content {
    display: flex;
    align-items: flex-start;

    .y-axis {
      position: relative;
      height: 200rpx; // Match chart height
      min-width: 70rpx;

      .label-wrapper {
        position: absolute;
        right: 20rpx;
        transform: translateY(-50%);
      }

      .axis-label {
        color: $text-sub;
        font-size: 20rpx;
        line-height: 1;
      }
    }

    .chart-area {
      flex: 1;
      width: 100%;

      .plot-area {
        position: relative;
        height: 200rpx;
        width: 100%;
      }

      .grid-line {
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        background-color: rgba(187, 187, 187, 0.05);
        z-index: 0;
      }

      .chart-bars {
        position: relative; // To appear above grid lines
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 10rpx;
        box-sizing: border-box;

        .bar-container {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          .bar-fill {
            width: 70%;
            background-color: #2b86ff;
            border-radius: 8rpx;
            min-height: 8rpx; // ensure small values are visible
          }
        }
      }

      .chart-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;
        padding: 0 10rpx;
        box-sizing: border-box;
        width: 100%;

        .label-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .label-text {
          color: $text-sub;
          font-size: 20rpx;
        }
      }
    }
  }
}
</style>
