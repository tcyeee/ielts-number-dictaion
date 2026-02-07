<template>
  <view class="bottom-nav">
    <view class="nav-slider" :style="{ transform: 'translateX(' + current * 100 + '%)' }"></view>
    <view class="nav-item" :class="{ active: current === 0 }" @click="switchTab('home')" @touchstart="onTouchStart(0)" @touchend="onTouchEnd(0)">
      <view class="nav-icon-wrapper" :class="{ pressed: pressedIndex === 0 }">
        <view class="nav-icon icon" :class="current === 0 ? 'icon--fluent--home-48-filled' : 'icon--fluent--home-32-regular'"></view>
      </view>
    </view>
    <view class="nav-item" :class="{ active: current === 1 }" @click="switchTab('history')" @touchstart="onTouchStart(1)" @touchend="onTouchEnd(1)">
      <view class="nav-icon-wrapper" :class="{ pressed: pressedIndex === 1 }">
        <view class="nav-icon icon" :class="current === 1 ? 'icon--mdi--chart-box' : 'icon--mdi--chart-box-outline'"></view>
      </view>
    </view>
    <view class="nav-item" :class="{ active: current === 2 }" @click="switchTab('profile')" @touchstart="onTouchStart(2)" @touchend="onTouchEnd(2)">
      <view class="nav-icon-wrapper" :class="{ pressed: pressedIndex === 2 }">
        <view class="nav-icon icon" :class="current === 2 ? 'icon--mingcute--user-2-fill' : 'icon--mingcute--user-2-line'"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "bottom-nav",
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pressedIndex: -1,
    };
  },
  methods: {
    switchTab(route) {
      const TAB_ROUTES = ["home", "history", "profile"];
      const idx = TAB_ROUTES.indexOf(route);
      if (idx === this.current) return;
      this.$emit("change", idx);
    },
    onTouchStart(index) {
      this.pressedIndex = index;
    },
    onTouchEnd(index) {
      this.pressedIndex = -1;
    },
  },
};
</script>

<style lang="scss">
.bottom-nav {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 120rpx;
  background-color: #232e42;
  border: 5rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 60rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.6),
    0 0 16rpx rgba(255, 255, 255, 0.08);
  z-index: 100;
  padding: 0 10rpx;
}

.nav-slider {
  position: absolute;
  left: 10rpx;
  top: 50%;
  transform: translateX(0);
  width: calc(100% / 3 - 20rpx / 3);
  height: 96rpx;
  margin-top: -48rpx;
  background-color: rgba($accent-blue, 0.15);
  border-radius: 48rpx;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.nav-item {
  flex: 1;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 48rpx;
  position: relative;
  z-index: 1;
}

.nav-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.nav-icon-wrapper.pressed {
  transform: scale(0.8);
}

.nav-icon {
  width: 48rpx;
  height: 48rpx;
  transition: transform 0.2s ease;
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}
</style>
