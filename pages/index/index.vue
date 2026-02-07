<template>
  <view class="page-root">
    <swiper class="tab-swiper" :current="currentTab" :duration="250" @change="onSwiperChange">
      <swiper-item>
        <scroll-view scroll-y class="tab-scroll">
          <home-content />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y class="tab-scroll">
          <history-content />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y class="tab-scroll">
          <profile-content />
        </scroll-view>
      </swiper-item>
    </swiper>
    <bottom-nav :current="currentTab" @change="onTabChange" />
  </view>
</template>

<script>
import HomeContent from "./home-content.vue";
import HistoryContent from "./history-content.vue";
import ProfileContent from "./profile-content.vue";
import BottomNav from "@/components/nav/bottom-nav.vue";

export default {
  components: {
    HomeContent,
    HistoryContent,
    ProfileContent,
    BottomNav,
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  onLoad(query) {
    if (query && query.tab !== undefined) {
      const tab = parseInt(query.tab, 10);
      if (tab >= 0 && tab <= 2) {
        this.currentTab = tab;
      }
    }
  },
  methods: {
    onSwiperChange(e) {
      this.currentTab = e.detail.current;
    },
    onTabChange(index) {
      this.currentTab = index;
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: $bg-color;
}

.tab-swiper {
  height: 100vh;
}

.tab-scroll {
  height: 100%;
}
</style>
