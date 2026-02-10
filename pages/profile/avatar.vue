<template>
  <view class="container" :data-theme="pageThemeAttr">
    <custom-header title="Edit Profile" />
    <view class="content">
      <view class="avatar-wrapper">
        <button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <view class="avatar-container">
            <image :src="avatarUrl" class="avatar-image" mode="aspectFill" />
            <view class="avatar-overlay">
              <view class="camera-icon">
                <view class="camera-body">
                  <view class="camera-lens"></view>
                </view>
              </view>
              <text class="change-text">CHANGE PHOTO</text>
            </view>
          </view>
        </button>
      </view>

      <view class="form-group">
        <text class="label">NICKNAME</text>
        <view class="input-container">
          <input class="input" type="nickname" v-model="nickname" @blur="onNicknameBlur" placeholder="Enter nickname" placeholder-class="input-placeholder" />
        </view>
      </view>

      <view class="footer">
        <button class="save-btn" @click="saveChanges" :loading="loading">Save Changes</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import CustomHeader from "@/components/nav/custom-header.vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";
import themeMixin from "@/mixins/themeMixin.js";

declare const uni: any;

export default defineComponent({
  mixins: [themeMixin],
  components: {
    CustomHeader,
  },
  data() {
    return {
      avatarUrl: "",
      nickname: "",
      avatarChanged: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["userInfo", "loading"]),
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions(useUserStore, ["syncUserProfile", "fetchUserProfile"]),

    initData() {
      // Initialize with store data
      this.nickname = this.userInfo.name || "";
      this.avatarUrl =
        this.userInfo.avatar || "https://via.placeholder.com/150";
    },

    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail;
      this.avatarUrl = avatarUrl;
      this.avatarChanged = true;
    },

    onNicknameBlur(e: any) {
      // Ensure we capture the value from the event if v-model missed it (sometimes happens with type="nickname")
      if (e.detail.value) {
        this.nickname = e.detail.value;
      }
    },

    async saveChanges() {
      if (!this.nickname.trim()) {
        uni.showToast({
          title: "Nickname cannot be empty",
          icon: "none",
        });
        return;
      }

      uni.showLoading({ title: "Saving..." });

      try {
        let avatarBase64 = undefined;

        if (this.avatarChanged) {
          // Convert local image to Base64
          avatarBase64 = await this.imageToBase64(this.avatarUrl);
        }

        await this.syncUserProfile({
          nickname: this.nickname,
          ...(avatarBase64 ? { avatarBase64 } : {}),
        });

        uni.showToast({
          title: "Saved successfully",
          icon: "success",
        });

        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error) {
        uni.showToast({
          title: "Failed to save",
          icon: "none",
        });
        console.error(error);
      } finally {
        uni.hideLoading();
      }
    },

    imageToBase64(path: string): Promise<string> {
      return new Promise((resolve, reject) => {
        // If it's already a base64 string or http url that we don't want to convert (though avatarChanged should prevent this)
        if (path.startsWith("data:") || path.startsWith("http")) {
          // If it is http, we might need to download it first if we really wanted to re-upload,
          // but here we only call this if avatarChanged is true, which implies it's a temp file path from chooseAvatar
          if (path.startsWith("http")) {
            // In case logic slips, just return null or handle download.
            // For now assume temp path.
          }
        }

        uni.getFileSystemManager().readFile({
          filePath: path,
          encoding: "base64",
          success: (res: any) => {
            // Append data URI scheme
            const base64 = "data:image/jpeg;base64," + res.data;
            resolve(base64);
          },
          fail: (err: any) => {
            reject(err);
          },
        });
      });
    },
  },
});
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: var(--bg-color);
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

.avatar-btn {
  background: none;
  padding: 0;
  margin: 0;
  border: none;
  line-height: normal;
  border-radius: 50%;
  &::after {
    border: none;
  }
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border-color);
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
    border: 2px solid var(--bg-color); // Cutout effect
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
  color: var(--text-sub);
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 10px;
  display: block;
  text-transform: uppercase;
}

.input-container {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-color);
}

.input {
  color: var(--text-main);
  font-size: 16px;
  width: 100%;
  height: 24px; // Ensure enough height
}

.input-placeholder {
  color: #999;
}

.footer {
  padding-bottom: 40px;
  margin-top: 40px;
}

.save-btn {
  background-color: var(--accent-blue);
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