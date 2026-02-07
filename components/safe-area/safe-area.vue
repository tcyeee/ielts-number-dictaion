<template>
  <view class="safe-area" :style="{ height: heightStyle }">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "safe-area",
  props: {
    size: {
      type: String,
      default: "s", // s, m, l
    },
  },
  data() {
    return {
      statusBarHeight: 0,
      navBarHeight: 0,
    };
  },
  computed: {
    heightStyle() {
      let h = 0;
      if (this.size === "s") {
        h = this.statusBarHeight;
        return `${h}px`;
      } else if (this.size === "m") {
        h = this.statusBarHeight + this.navBarHeight;
        return `${h}px`;
      } else if (this.size === "l") {
        h = this.statusBarHeight + this.navBarHeight;
        return `calc(${h}px + 5vh)`;
      }
      return "0px";
    },
  },
  mounted() {
    this.initDimensions();
  },
  methods: {
    initDimensions() {
      const sys = uni.getSystemInfoSync();
      this.statusBarHeight = sys.statusBarHeight || 20;

      let navHeight = 44; // Default fallback

      // #ifdef MP-WEIXIN
      try {
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
        if (menuButtonInfo) {
          const gap = menuButtonInfo.top - this.statusBarHeight;
          // Ensure gap is reasonable
          const safeGap = gap > 0 ? gap : 4;
          navHeight = safeGap * 2 + menuButtonInfo.height;
        }
      } catch (e) {
        console.error("getMenuButtonBoundingClientRect failed", e);
      }
      // #endif

      this.navBarHeight = navHeight;
    },
  },
};
</script>

<style scoped>
.safe-area {
  width: 100%;
  transition: height 0.3s ease;
}
</style>
