<template>
  <view class="container">
    <custom-header title="Edit Profile" />
    <view class="content">
      <view class="avatar-wrapper" @click="changeAvatar">
        <view class="avatar-container">
          <image :src="avatarUrl" class="avatar-image" mode="aspectFill" />
          <view class="avatar-overlay">
            <view class="camera-icon">
              <!-- Simple camera icon representation using CSS or text if no icon available -->
              <view class="camera-body">
                <view class="camera-lens"></view>
              </view>
            </view>
            <text class="change-text">CHANGE PHOTO</text>
          </view>
        </view>
      </view>

      <view class="form-group">
        <text class="label">NICKNAME</text>
        <view class="input-container">
          <input class="input" v-model="nickname" placeholder="Enter nickname" placeholder-class="input-placeholder" />
        </view>
      </view>

      <view class="footer">
        <button class="save-btn" @click="saveChanges">Save Changes</button>
      </view>
    </view>
  </view>
</template>

<script>
import CustomHeader from "@/components/nav/custom-header.vue";

export default Vue.extend({
  components: {
    CustomHeader,
  },
  data() {
    return {
      // Default placeholder avatar or user's current avatar
      avatarUrl: "https://via.placeholder.com/150",
      nickname: "Alex",
    };
  },
  methods: {
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.avatarUrl = res.tempFilePaths[0];
        },
      });
    },
    saveChanges() {
      // Mock save functionality
      uni.showLoading({ title: "Saving..." });
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: "Saved successfully",
          icon: "success",
        });
        // Here you would typically emit an event or update global state
      }, 1500);
    },
  },
});
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 0 20px;
  // Adjust padding top to account for custom header (safe area + 44px header height)
  padding-top: calc(var(--status-bar-height) + 44px + 30px);
  display: flex;
  flex-direction: column;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.avatar-image {
  width: 100%;
  height: 100%;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.camera-icon {
  margin-bottom: 4px;
  // CSS Camera Icon
  .camera-body {
    width: 24px;
    height: 18px;
    background-color: #fff;
    border-radius: 2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: "";
      position: absolute;
      top: -3px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 3px;
      background-color: #fff;
      border-radius: 1px 1px 0 0;
    }
  }

  .camera-lens {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid $bg-color; // Cutout effect
  }
}

.change-text {
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.form-group {
  margin-bottom: auto; // Push footer to bottom if needed, or just standard spacing
}

.label {
  color: $text-sub;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 10px;
  display: block;
  text-transform: uppercase;
}

.input-container {
  background-color: $card-bg;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.input {
  color: $text-main;
  font-size: 16px;
  width: 100%;
}

.input-placeholder {
  color: $uni-text-color-grey;
}

.footer {
  padding-bottom: 40px;
  margin-top: 40px;
}

.save-btn {
  background-color: $accent-blue;
  color: #ffffff;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  border: none;

  &:active {
    opacity: 0.9;
  }
}
</style>