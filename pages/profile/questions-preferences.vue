<template>
  <view class="container" :data-theme="pageThemeAttr">
    <custom-header title="Question Preferences" />
    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <!-- Reset Card -->
        <view class="reset-card">
          <view class="reset-header">
            <text class="reset-title">Reset Question Weights</text>
          </view>
          <text class="reset-desc">The system adjusts frequency based on your scores in each category. Resetting will clear your personalized learning history and restore default probabilities.</text>
          <view class="reset-action">
            <button class="reset-btn" @click="onReset">Reset</button>
          </view>
        </view>

        <text class="section-desc">Select the types of numbers you want to practice. All categories are selected by default.</text>

        <!-- Categories List -->
        <view class="card">
          <view v-for="(cat, index) in categories" :key="cat.id" class="setting-item" :class="{ 'no-border': index === categories.length - 1 }" @click="toggleCategory(cat.id)">
            <view class="setting-left">
              <view class="icon-box" :class="cat.bgClass">
                <view :class="['icon', cat.icon]"></view>
              </view>
              <text class="setting-label">{{ cat.label }}</text>
            </view>
            <view class="setting-right">
              <checkbox :checked="isSelected(cat.id)" color="#2b86ff" style="transform:scale(0.9); pointer-events: none" class="custom-checkbox" />
            </view>
          </view>
        </view>

        <text class="note">Note: At least one category must be selected to start a practice session.</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import themeMixin from "@/mixins/themeMixin.js";

export default {
  name: "QuestionsPreferences",
  mixins: [themeMixin],
  components: {
    CustomHeader,
  },
  data() {
    return {
      categories: [
        {
          id: "Date",
          label: "Date",
          icon: "icon--fluent--calendar-date-24-regular",
          bgClass: "bg-blue",
        },
        {
          id: "Time",
          label: "Time",
          icon: "icon--feather--clock",
          bgClass: "bg-orange",
        },
        {
          id: "Phone",
          label: "Phone",
          icon: "icon--f7--phone",
          bgClass: "bg-green",
        },
        {
          id: "Price",
          label: "Price",
          icon: "icon--bx--dollar-circle",
          bgClass: "bg-red",
        },
        {
          id: "Measurement",
          label: "Measurement",
          icon: "icon--feather--sliders",
          bgClass: "bg-purple",
        },
        {
          id: "Address",
          label: "Address",
          icon: "icon--mynaui--map-pinned",
          bgClass: "bg-orange-dark",
        },
        {
          id: "Quantity",
          label: "Quantity",
          icon: "icon--feather--box",
          bgClass: "bg-teal",
        },
        {
          id: "Percentage",
          label: "Percentage",
          icon: "icon--feather--percent",
          bgClass: "bg-indigo",
        },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["settings"]),
    selectedTypes() {
      return this.settings.questionTypes;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["updateQuestionTypes", "resetQuestionTypes"]),

    isSelected(id) {
      return this.selectedTypes.includes(id);
    },

    toggleCategory(id) {
      const current = [...this.selectedTypes];
      const index = current.indexOf(id);

      if (index > -1) {
        // Unchecking
        if (current.length <= 1) {
          uni.showToast({
            title: "At least one category required",
            icon: "none",
          });
          return;
        }
        current.splice(index, 1);
      } else {
        // Checking
        current.push(id);
      }

      this.updateQuestionTypes(current);
    },

    onReset() {
      uni.showModal({
        title: "Reset Weights",
        content: "Are you sure you want to reset all learning probabilities?",
        confirmText: "Reset",
        confirmColor: "#2b86ff",
        success: (res) => {
          if (res.confirm) {
            this.resetQuestionTypes();
            uni.showToast({
              title: "Reset Successful",
              icon: "success",
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding-top: 20px;
  background-color: var(--bg-color);
}

.content-scroll {
  height: calc(100vh - 44px);
}

.content-wrapper {
  padding: 20px 16px;
  padding-top: calc(44px + var(--status-bar-height) + 20px);
  padding-bottom: 40px;
}

/* Reset Card */
.reset-card {
  background-color: var(
    --card-bg
  ); /* Using card-bg but maybe should be slightly different or specific style */
  /* To match the dark/blue card in the design, we might need specific colors or just stick to theme */
  /* The design shows a dark blue card. Let's try to adapt to theme or use a specific style */
  background: rgba(43, 134, 255, 0.1); /* Light blue tint */
  border: 1px solid rgba(43, 134, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}

[data-theme="dark"] .reset-card {
  background: rgba(43, 134, 255, 0.15);
  border-color: rgba(43, 134, 255, 0.3);
}

.reset-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 12px;
  display: block;
}

.reset-desc {
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.5;
  display: block;
  margin-bottom: 20px;
}

.reset-action {
  display: flex;
  justify-content: flex-end;
}

.reset-btn {
  background-color: rgba(43, 134, 255, 0.2);
  color: var(--accent-blue);
  font-size: 14px;
  font-weight: 600;
  padding: 0 24px;
  height: 36px;
  line-height: 36px;
  border-radius: 18px;
  border: none;
  margin: 0;
}

.reset-btn::after {
  border: none;
}

/* Section Description */
.section-desc {
  font-size: 14px;
  color: var(--text-sub);
  margin-bottom: 16px;
  display: block;
  line-height: 1.5;
}

/* Categories Card */
.card {
  background-color: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.setting-item.no-border {
  border-bottom: none;
}

.setting-left {
  display: flex;
  align-items: center;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.icon {
  width: 20px;
  height: 20px;
  background-color: currentColor; /* Inherit from parent color */
}

.setting-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-main);
}

/* Icon Colors */
.bg-blue {
  background-color: rgba(43, 134, 255, 0.1);
  color: #2b86ff;
}
.bg-orange {
  background-color: rgba(255, 107, 53, 0.1);
  color: #ff6b35;
}
.bg-green {
  background-color: rgba(0, 210, 106, 0.1);
  color: #00d26a;
}
.bg-red {
  background-color: rgba(255, 82, 82, 0.1);
  color: #ff5252;
}
.bg-purple {
  background-color: rgba(156, 39, 176, 0.1);
  color: #9c27b0;
}
.bg-orange-dark {
  background-color: rgba(255, 152, 0, 0.1);
  color: #ff9800;
}
.bg-teal {
  background-color: rgba(0, 150, 136, 0.1);
  color: #009688;
}
.bg-indigo {
  background-color: rgba(63, 81, 181, 0.1);
  color: #3f51b5;
}

/* Note */
.note {
  font-size: 12px;
  color: var(--text-sub);
  text-align: center;
  display: block;
  opacity: 0.8;
  padding: 0 16px;
}

.footer-spacer {
  height: 20px;
}
</style>
