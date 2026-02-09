<template>
  <view class="container" :data-theme="isDarkMode ? 'dark' : 'light'">
    <!-- Custom Navbar -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px', height: (statusBarHeight + 44) + 'px' }">
      <view class="nav-left" @click="goBack">
        <text class="back-arrow">❮</text>
      </view>
      <text class="nav-title">Practice Results</text>
      <view class="nav-right"></view>
    </view>

    <!-- Content -->
    <scroll-view scroll-y class="content" :style="{ paddingTop: (statusBarHeight + 44) + 'px' }">
      <view class="inner-content">

        <!-- Score Circle -->
        <view class="score-section">
          <view class="progress-circle" :style="progressStyle">
            <view class="progress-inner">
              <text class="score-main">{{score}}</text>
              <text class="score-divider">/</text>
              <text class="score-total">{{total}}</text>
            </view>
          </view>
          <text class="result-title">Great job, Alex!</text>
          <text class="result-subtitle">You're getting better at prices.</text>
        </view>

        <!-- Stats Cards -->
        <view class="stats-row">
          <view class="stat-card">
            <view class="stat-header">
              <text class="stat-icon">⏱️</text>
              <text class="stat-label">Time Spent</text>
            </view>
            <text class="stat-value">{{timeSpent}}</text>
          </view>
          <view class="stat-card">
            <view class="stat-header">
              <text class="stat-icon">⚡</text>
              <text class="stat-label">Accuracy</text>
            </view>
            <text class="stat-value">{{accuracy}}</text>
          </view>
        </view>

        <!-- Review Questions -->
        <view class="review-section">
          <text class="section-title">Review Questions</text>

          <view v-for="(item, index) in questions" :key="index" class="question-card">
            <view class="card-top">
              <text class="question-meta">QUESTION {{item.id}} — {{item.type}}</text>
              <view class="play-btn">
                <text class="play-icon">▶</text>
              </view>
            </view>

            <view class="answer-section">
              <template v-if="item.correct">
                <view class="answer-row">
                  <text class="answer-text text-white">{{item.answer}}</text>
                  <text class="status-icon-check">✔</text>
                </view>
              </template>
              <template v-else>
                <view class="answer-row mb-1">
                  <text class="answer-text text-red">{{item.userAnswer}}</text>
                  <text class="status-icon-cross">✖</text>
                </view>
                <view class="answer-row">
                  <text class="answer-text text-green">{{item.answer}}</text>
                  <view class="badge-correct">
                    <text class="badge-text">CORRECT</text>
                  </view>
                </view>
              </template>
            </view>
          </view>
        </view>

        <!-- Buttons -->
        <view class="action-buttons">
          <button class="btn btn-primary" @click="tryAgain">
            <text class="btn-text">↻ Try Again</text>
          </button>
          <button class="btn btn-secondary" @click="goHome">
            <text class="btn-text">🏠 Home</text>
          </button>
        </view>

        <view class="bottom-spacer"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  data() {
    return {
      statusBarHeight: 20, // default fallback
      score: 8,
      total: 10,
      timeSpent: "02:45",
      accuracy: "80%",
      questions: [
        {
          id: 1,
          type: "PRICE",
          answer: "$45.00",
          correct: true,
          userAnswer: "$45.00",
        },
        {
          id: 2,
          type: "DATE",
          answer: "5th August",
          correct: false,
          userAnswer: "15th August",
        },
        {
          id: 3,
          type: "PHONE",
          answer: "0412 345 678",
          correct: true,
          userAnswer: "0412 345 678",
        },
        {
          id: 4,
          type: "TIME",
          answer: "3:30 PM",
          correct: true,
          userAnswer: "3:30 PM",
        },
        {
          id: 5,
          type: "DATE",
          answer: "Jan 24, 2024",
          correct: true,
          userAnswer: "Jan 24, 2024",
        },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["settings"]),
    isDarkMode() {
      return this.settings.isDarkMode;
    },
    progressStyle() {
      const percentage = (this.score / this.total) * 100;
      return {
        background: `conic-gradient(#2979ff ${percentage}%, #2c2c2e 0)`,
      };
    },
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();
    this.statusBarHeight = sysInfo.statusBarHeight || 20;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    tryAgain() {
      // Logic to restart
      uni.redirectTo({ url: "/pages/dictation" });
    },
    goHome() {
      uni.reLaunch({ url: "/pages/index/index" });
    },
  },
};
</script>

<style lang="scss">
$bg-color: #121418;
$card-bg: #1e2025;
$primary-blue: #2979ff;
$success-green: #00c853;
$error-red: #ff5252;
$text-main: #ffffff;
$text-sub: #889096;

/* 浅色主题变量 */
.container[data-theme="light"] {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-main: #1a1a1a;
  --text-sub: #666666;
  --accent-blue: #2b86ff;
  --accent-orange: #ff6b35;
  --accent-green: #00d26a;
  --border-color: rgba(0, 0, 0, 0.1);
  --hover-bg: rgba(0, 0, 0, 0.05);
}

/* 暗色主题变量 */
.container[data-theme="dark"] {
  --bg-color: #111823;
  --card-bg: #1a2332;
  --text-main: #ffffff;
  --text-sub: #8b9bb4;
  --accent-blue: #2b86ff;
  --accent-orange: #ff6b35;
  --accent-green: #00d26a;
  --border-color: rgba(255, 255, 255, 0.1);
  --hover-bg: rgba(255, 255, 255, 0.05);
}

page {
  background-color: $bg-color;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* height set dynamically */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--bg-color);
  z-index: 100;

  .nav-left {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .back-arrow {
    color: var(--text-main);
    font-size: 20px;
  }

  .nav-title {
    color: var(--text-main);
    font-size: 18px;
    font-weight: 600;
  }

  .nav-right {
    width: 40px;
  }
}

.content {
  flex: 1;
  width: 100%;
}

.inner-content {
  padding: 20px;
  padding-bottom: 40px;
}

/* Score Section */
.score-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  .progress-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;

    .progress-inner {
      width: 108px;
      height: 108px;
      background-color: var(--bg-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
    }

    .score-main {
      font-size: 36px;
      font-weight: bold;
      color: var(--text-main);
    }
    .score-divider {
      font-size: 24px;
      color: var(--text-sub);
      margin: 0 2px;
    }
    .score-total {
      font-size: 24px;
      color: var(--text-sub);
    }
  }

  .result-title {
    font-size: 24px;
    font-weight: bold;
    color: var(--text-main);
    margin-bottom: 8px;
  }

  .result-subtitle {
    font-size: 14px;
    color: var(--text-sub);
  }
}

/* Stats Cards */
.stats-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  .stat-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    width: 48%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .stat-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .stat-icon {
    font-size: 16px;
    margin-right: 6px;
  }

  .stat-label {
    color: var(--text-sub);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .stat-value {
    color: var(--text-main);
    font-size: 24px;
    font-weight: bold;
  }
}

/* Review Section */
.review-section {
  width: 100%;
  margin-bottom: 30px;

  .section-title {
    color: var(--text-main);
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    display: block;
  }

  .question-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .question-meta {
    color: var(--text-sub);
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .play-btn {
    width: 32px;
    height: 32px;
    background-color: rgba(41, 121, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-icon {
    color: $primary-blue;
    font-size: 12px;
    margin-left: 2px; /* Visual correction */
  }

  .answer-section {
    display: flex;
    flex-direction: column;
  }

  .answer-row {
    display: flex;
    align-items: center;
  }

  .mb-1 {
    margin-bottom: 8px;
  }

  .answer-text {
    font-size: 16px;
    font-weight: 600;
    margin-right: 8px;
  }

  .text-white {
    color: var(--text-main);
  }
  .text-red {
    color: $error-red;
    text-decoration: line-through;
  }
  .text-green {
    color: $success-green;
  }

  .status-icon-check {
    color: $success-green;
    font-size: 14px;
    background-color: rgba(0, 200, 83, 0.2);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .status-icon-cross {
    color: $error-red;
    font-size: 14px;
    background-color: rgba(255, 82, 82, 0.2);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .badge-correct {
    background-color: rgba(0, 200, 83, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .badge-text {
    color: $success-green;
    font-size: 10px;
    font-weight: bold;
  }
}

/* Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  .btn-text {
    font-size: 16px;
    font-weight: 600;
  }
}

.btn-primary {
  background-color: $primary-blue;
  .btn-text {
    color: white;
  }
}

.btn-secondary {
  background-color: var(--card-bg);
  .btn-text {
    color: white;
  }
}

.bottom-spacer {
  height: 30px;
}
</style>
