<template>
  <view class="segment-control">
    <view
      v-for="(option, index) in options"
      :key="index"
      class="segment-option"
      :class="{ active: modelValue === option.value }"
      @click="handleSelect(option.value)"
    >
      {{ option.label }}
    </view>
  </view>
</template>

<script>
export default {
  name: "SegmentControl",
  props: {
    options: {
      type: Array,
      required: true,
      // Expected format: [{ label: 'Label', value: 'value' }]
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ["update:modelValue", "change"],
  methods: {
    handleSelect(value) {
      if (this.modelValue !== value) {
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.segment-control {
  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 12rpx;
  padding: 6rpx;
  gap: 4rpx;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.segment-option {
  padding: 8rpx 24rpx;
  font-size: 24rpx;
  color: var(--text-sub);
  border-radius: 8rpx;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  &.active {
    background-color: var(--accent-blue);
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 2rpx 8rpx rgba(43, 134, 255, 0.25);
  }
}
</style>
