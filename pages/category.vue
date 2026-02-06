<template>
  <view class="container">
    <!-- Header -->
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-bar">
        <view class="nav-btn" @click="goBack">
          <text class="icon">&lt;</text>
        </view>
        <text class="title">Session Setup</text>
        <view class="nav-btn">
          <text class="icon">i</text>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="content">
      <!-- Categories -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">Select Categories</text>
          <text class="section-subtitle">Choose types of numbers to practice</text>
        </view>
        
        <view class="category-list">
          <view 
            v-for="(item, index) in categories" 
            :key="index"
            class="category-item"
            @click="toggleCategory(index)"
          >
            <view class="category-left">
              <view class="category-icon-box">
                <text class="category-icon">{{ item.icon }}</text>
              </view>
              <text class="category-name">{{ item.name }}</text>
            </view>
            <view class="checkbox" :class="{ 'checkbox-checked': item.checked }">
              <text v-if="item.checked" class="check-mark">✓</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Speed -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">Adjust Speed</text>
          <text class="section-subtitle">Control the dictation pace</text>
        </view>
        <view class="segment-control">
          <view 
            v-for="speed in speeds" 
            :key="speed"
            class="segment-item"
            :class="{ 'segment-active': selectedSpeed === speed }"
            @click="selectedSpeed = speed"
          >
            <text class="segment-text" :class="{ 'segment-text-active': selectedSpeed === speed }">{{ speed }}x</text>
          </view>
        </view>
      </view>

      <!-- Count -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">Number of Questions</text>
          <text class="section-subtitle">How long should this session be?</text>
        </view>
        <view class="segment-control">
          <view 
            v-for="count in counts" 
            :key="count"
            class="segment-item"
            :class="{ 'segment-active': selectedCount === count }"
            @click="selectedCount = count"
          >
            <text class="segment-text" :class="{ 'segment-text-active': selectedCount === count }">{{ count }}</text>
          </view>
        </view>
      </view>
      
      <!-- Spacer for bottom button -->
      <view style="height: 100px;"></view>
    </scroll-view>

    <!-- Footer Button -->
    <view class="footer">
      <view class="start-btn" @click="startTraining">
        <text class="play-icon">▶</text>
        <text class="btn-text">START TRAINING</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 20, // Default fallback
      categories: [
        { id: 'whole', name: 'Whole Numbers', icon: '123', checked: true },
        { id: 'date', name: 'Dates & Years', icon: '📅', checked: true },
        { id: 'price', name: 'Prices & Currency', icon: '💵', checked: false },
        { id: 'time', name: 'Times & Durations', icon: '🕒', checked: false },
        { id: 'phone', name: 'Phone Numbers', icon: '📞', checked: false },
      ],
      speeds: [0.75, 1.0, 1.25],
      selectedSpeed: 1.0,
      counts: [10, 20, 50],
      selectedCount: 20
    }
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();
    this.statusBarHeight = sysInfo.statusBarHeight || 20;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    toggleCategory(index) {
      this.categories[index].checked = !this.categories[index].checked;
    },
    startTraining() {
      const selectedCategories = this.categories.filter(c => c.checked).map(c => c.id);
      if (selectedCategories.length === 0) {
        uni.showToast({
          title: 'Select at least one category',
          icon: 'none'
        });
        return;
      }
      
      console.log('Starting training with:', {
        categories: selectedCategories,
        speed: this.selectedSpeed,
        count: this.selectedCount
      });
      
      // Navigate to dictation page (assuming it exists based on pages.json)
      uni.navigateTo({
        url: `/pages/dictation?categories=${selectedCategories.join(',')}&speed=${this.selectedSpeed}&count=${this.selectedCount}`
      });
    }
  }
}
</script>

<style>
/* Global resets */
page {
  background-color: #111827;
  color: #F9FAFB;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #111827;
}

/* Header */
.header {
  background-color: #111827;
  padding-bottom: 10px;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  color: #3B82F6;
  font-size: 20px;
  font-weight: bold;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #F9FAFB;
}

/* Content */
.content {
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}

.section {
  margin-bottom: 30px;
}

.section-header {
  margin-bottom: 15px;
}

.section-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #F9FAFB;
  margin-bottom: 4px;
}

.section-subtitle {
  display: block;
  font-size: 14px;
  color: #9CA3AF;
}

/* Category List */
.category-list {
  background-color: #1F2937;
  border-radius: 12px;
  padding: 0 16px;
}

.category-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #374151;
}

.category-item:last-child {
  border-bottom: none;
}

.category-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.category-icon-box {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.category-icon {
  font-size: 20px;
}

.category-name {
  font-size: 16px;
  color: #F9FAFB;
}

.checkbox {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.checkbox-checked {
  background-color: #3B82F6;
  border-color: #3B82F6;
}

.check-mark {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* Segment Control */
.segment-control {
  background-color: #1F2937;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  flex-direction: row;
}

.segment-item {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}

.segment-active {
  background-color: #3B82F6;
}

.segment-text {
  color: #9CA3AF;
  font-size: 14px;
  font-weight: 500;
}

.segment-text-active {
  color: #FFFFFF;
}

/* Footer */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: #111827; /* Fallback for transparency */
  background: linear-gradient(to top, #111827 80%, rgba(17, 24, 39, 0));
}

.start-btn {
  background-color: #3B82F6;
  height: 56px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
}

.start-btn:active {
  opacity: 0.9;
  transform: scale(0.98);
}

.play-icon {
  color: white;
  font-size: 18px;
  margin-right: 8px;
}

.btn-text {
  color: white;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
}
</style>
