<template>
  <!-- Button Mode (for open-type support like contact) -->
  <button
    v-if="openType"
    class="menu-item contact-btn"
    :open-type="openType"
    @contact="$emit('contact', $event)"
    @click="$emit('click', $event)"
  >
    <view class="item-left">
      <view class="icon-box" :class="iconBgClass">
        <view :class="icon" :style="{ width: '40rpx', height: '40rpx', color: iconColor }"></view>
      </view>
      <text class="item-text">{{ title }}</text>
    </view>
    
    <slot name="right">
      <view class="item-right" v-if="value || showArrow">
        <text v-if="value" class="value-text">{{ value }}</text>
        <text v-if="showArrow" class="arrow">›</text>
      </view>
    </slot>
  </button>

  <!-- Normal View Mode -->
  <view
    v-else
    class="menu-item"
    @click="$emit('click', $event)"
  >
    <view class="item-left">
      <view class="icon-box" :class="iconBgClass">
        <view :class="icon" :style="{ width: '40rpx', height: '40rpx', color: iconColor }"></view>
      </view>
      <text class="item-text">{{ title }}</text>
    </view>
    
    <slot name="right">
      <view class="item-right" v-if="value || showArrow">
        <text v-if="value" class="value-text">{{ value }}</text>
        <text v-if="showArrow" class="arrow">›</text>
      </view>
    </slot>
  </view>
</template>

<script>
export default {
  name: "ProfileMenuItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      default: "#ffffff",
    },
    iconBgClass: {
      type: String,
      default: "blue",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    openType: {
      type: String,
      default: "",
    },
  },
  emits: ["click", "contact"],
};
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 32rpx;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: var(--hover-bg);
  }
}

.item-left {
  display: flex;
  align-items: center;
}

.icon-box {
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;

  &.purple {
    background-color: rgba(157, 101, 255, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(62, 45, 107, 0.4);
    }
  }

  &.red {
    background-color: rgba(255, 82, 82, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(62, 28, 40, 0.4);
    }
  }

  &.teal {
    background-color: rgba(0, 191, 165, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(22, 54, 50, 0.4);
    }
  }

  &.blue {
    background-color: rgba(43, 134, 255, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(26, 44, 66, 0.4);
    }
  }

  &.green {
    background-color: rgba(0, 210, 106, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(22, 54, 30, 0.4);
    }
  }

  &.yellow {
    background-color: rgba(255, 179, 0, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(66, 49, 10, 0.4);
    }
  }

  &.orange {
    background-color: rgba(255, 107, 53, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(66, 30, 15, 0.4);
    }
  }

  &.grey {
    background-color: rgba(139, 155, 180, 0.1);
    @media (prefers-color-scheme: dark) {
      background-color: rgba(45, 50, 60, 0.4);
    }
  }
}

.item-text {
  font-size: 30rpx;
  color: var(--text-main);
  font-weight: 500;
}

.item-right {
  display: flex;
  align-items: center;
}

.value-text {
  font-size: 28rpx;
  color: var(--accent-blue);
  font-weight: 600;
  margin-right: 12rpx;
}

.arrow {
  font-size: 32rpx;
  color: var(--text-sub);
  font-weight: 400;
  opacity: 0.5;
}

.contact-btn {
  background-color: transparent;
  line-height: inherit;
  border-radius: 0;
  border: none;
  margin: 0;
  text-align: left;
  font-size: inherit;
  color: inherit;

  &::after {
    border: none;
  }
}
</style>
