<template>
  <view class="circular-progress" :style="{width: size + 'rpx', height: size + 'rpx'}">
    <view class="progress-track"></view>
    <view class="progress-half-clip right-clip">
      <view class="progress-bar-arc right-arc" :style="{
        width: size + 'rpx',
        height: size + 'rpx',
        transform: 'rotate(' + rightDeg + 'deg)',
        borderTopColor: color,
        borderRightColor: color
      }"></view>
    </view>
    <view class="progress-half-clip left-clip">
      <view class="progress-bar-arc left-arc" :style="{
        width: size + 'rpx',
        height: size + 'rpx',
        transform: 'rotate(' + leftDeg + 'deg)',
        borderBottomColor: color,
        borderLeftColor: color
      }"></view>
    </view>
    <view class="chart-content">
      <text class="chart-value">{{ label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "circular-progress",
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#2b86ff",
    },
    size: {
      type: Number,
      default: 160,
    },
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    rightDeg() {
      return -180 + (Math.min(this.percentage, 50) / 50) * 180;
    },
    leftDeg() {
      if (this.percentage <= 50) return 180;
      return 180 - ((this.percentage - 50) / 50) * 180;
    },
  },
};
</script>

<style lang="scss" scoped>
.circular-progress {
  position: relative;
}

.progress-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 10rpx solid #253145;
  box-sizing: border-box;
}

.progress-half-clip {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.right-clip {
  right: 0;
}

.left-clip {
  left: 0;
}

.progress-bar-arc {
  border-radius: 50%;
  border: 10rpx solid transparent;
  box-sizing: border-box;
  position: absolute;
  top: 0;
}

.right-arc {
  right: 0;
}

.left-arc {
  left: 0;
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
</style>
