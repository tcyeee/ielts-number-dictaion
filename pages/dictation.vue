<template>
  <view class="container">
    <!-- Custom Navbar -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets.top + 'px' }">
      <view class="nav-left" @click="goBack">
        <text class="icon">✕</text>
      </view>
      <text class="nav-title">Number Dictation</text>
      <view class="nav-right">
        <text class="icon">?</text>
      </view>
    </view>

    <view class="content">
      <!-- Progress Section -->
      <view class="progress-section">
        <view class="progress-header">
          <view class="tag">PRICES & CURRENCIES</view>
          <text class="counter">Question <text class="highlight">{{ currentQuestion }}</text> of {{ totalQuestions }}</text>
        </view>
        <view class="progress-bar-bg">
          <view class="progress-bar-fill" :style="{ width: progressPercentage + '%' }"></view>
        </view>
      </view>

      <!-- Player Card -->
      <view class="player-card">
        <view class="player-header">
          <view class="icon-box">
            <text class="speaker-icon">🔊</text>
          </view>
          <view class="track-info">
            <text class="track-title">Listening Item #{{ currentQuestion.toString().padStart(2, '0') }}</text>
            <text class="track-subtitle">Focus: Decimal numbers</text>
          </view>
        </view>

        <!-- Visualizer Placeholder -->
        <view class="visualizer">
          <view class="bar" v-for="i in 5" :key="i" :style="{ height: (20 + Math.random() * 20) + 'px' }"></view>
        </view>

        <!-- Slider & Time -->
        <slider 
          class="audio-slider" 
          :value="currentProgress" 
          min="0" 
          :max="duration" 
          activeColor="#007aff" 
          backgroundColor="#3a3a3c" 
          block-size="12"
          @change="onSliderChange"
        />
        <view class="time-row">
          <text class="time-text">{{ formatTime(currentTime) }}</text>
          <text class="time-text">{{ formatTime(duration) }}</text>
        </view>

        <!-- Controls -->
        <view class="controls">
          <view class="control-btn sm" @click="rewind">
            <text class="control-icon">↺</text>
            <text class="control-label">-5s</text>
          </view>
          <view class="control-btn lg play-btn" @click="togglePlay">
            <text class="play-icon">{{ isPlaying ? '❚❚' : '▶' }}</text>
          </view>
          <view class="control-btn sm" @click="changeSpeed">
            <text class="control-icon">⏱</text>
            <text class="control-label">{{ playbackRate }}x</text>
          </view>
        </view>
      </view>

      <!-- Input Section -->
      <view class="input-section">
        <text class="input-label">Enter the number you hear</text>
        <view class="input-box">
          <input 
            type="digit" 
            class="number-input" 
            placeholder="0.00" 
            placeholder-class="placeholder-style"
            v-model="answer"
            :focus="true"
          />
        </view>
      </view>

      <!-- Actions -->
      <view class="actions">
        <button class="btn-primary" @click="submitAnswer">Submit Answer</button>
        <button class="btn-secondary" @click="notSure">I'm not sure</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      safeAreaInsets: { top: 44 }, // Default fallback
      currentQuestion: 3,
      totalQuestions: 10,
      currentTime: 2,
      duration: 5,
      isPlaying: false,
      playbackRate: 1.0,
      answer: ''
    }
  },
  computed: {
    progressPercentage() {
      return (this.currentQuestion / this.totalQuestions) * 100;
    },
    currentProgress() {
      return this.currentTime;
    }
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();
    if (sysInfo.safeAreaInsets) {
      this.safeAreaInsets = sysInfo.safeAreaInsets;
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s.toString().padStart(2, '0')}`;
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
    },
    rewind() {
      this.currentTime = Math.max(0, this.currentTime - 5);
    },
    changeSpeed() {
      const speeds = [1.0, 1.25, 1.5, 0.75];
      const idx = speeds.indexOf(this.playbackRate);
      this.playbackRate = speeds[(idx + 1) % speeds.length];
    },
    onSliderChange(e) {
      this.currentTime = e.detail.value;
    },
    submitAnswer() {
      console.log('Answer:', this.answer);
    },
    notSure() {
      console.log('Not sure');
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #15171e; // Dark blue-ish black
$card-bg: #1c2029;
$primary-blue: #007aff;
$text-color: #ffffff;
$text-secondary: #8e8e93;

.container {
  min-height: 100vh;
  background-color: $bg-color;
  color: $text-color;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: $bg-color;
  z-index: 100;

  .nav-title {
    font-size: 18px;
    font-weight: 600;
  }

  .icon {
    font-size: 20px;
    color: $text-color;
    padding: 8px;
  }
}

.content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Progress Section */
.progress-section {
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .tag {
    background-color: rgba($primary-blue, 0.2);
    color: $primary-blue;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 12px;
    letter-spacing: 0.5px;
  }

  .counter {
    font-size: 14px;
    color: $text-secondary;
    
    .highlight {
      color: $text-color;
      font-weight: bold;
    }
  }

  .progress-bar-bg {
    height: 6px;
    background-color: #2c2c2e;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: $primary-blue;
    border-radius: 3px;
    transition: width 0.3s ease;
  }
}

/* Player Card */
.player-card {
  background-color: $card-bg;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .player-header {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    
    .icon-box {
      width: 48px;
      height: 48px;
      background-color: rgba($primary-blue, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      
      .speaker-icon {
        font-size: 24px;
        color: $primary-blue;
      }
    }
    
    .track-info {
      display: flex;
      flex-direction: column;
      
      .track-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
      }
      
      .track-subtitle {
        font-size: 13px;
        color: $text-secondary;
      }
    }
  }

  .visualizer {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 20px;
    
    .bar {
      width: 4px;
      background-color: $primary-blue;
      border-radius: 2px;
      opacity: 0.6;
    }
  }

  .audio-slider {
    width: 100%;
    margin: 0;
  }

  .time-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 20px;
    
    .time-text {
      font-size: 12px;
      color: $text-secondary;
    }
  }

  .controls {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    .control-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      &.sm {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      &.lg {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        background-color: $primary-blue;
        box-shadow: 0 4px 12px rgba($primary-blue, 0.4);
      }
      
      .control-icon {
        font-size: 18px;
        color: $text-color;
        margin-bottom: 2px;
      }

      .play-icon {
        font-size: 24px;
        color: white;
      }
      
      .control-label {
        font-size: 10px;
        color: $text-secondary;
      }
    }
  }
}

/* Input Section */
.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  .input-label {
    font-size: 14px;
    color: $text-color;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .input-box {
    width: 100%;
    
    .number-input {
      width: 100%;
      height: 60px;
      background-color: transparent;
      border: 2px solid $primary-blue;
      border-radius: 12px;
      text-align: center;
      font-size: 24px;
      color: $text-color;
      font-weight: bold;
    }
  }
}

/* Actions */
.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  margin-bottom: 20px;

  button {
    width: 100%;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    
    &::after {
      border: none;
    }
  }

  .btn-primary {
    background-color: $primary-blue;
    color: white;
  }

  .btn-secondary {
    background-color: #2c2c2e;
    color: #8e8e93;
  }
}

/* Helper classes */
.placeholder-style {
  color: #3a3a3c;
}
</style>