<script>
export default {
  onLaunch: function () {
    console.log("App Launch");

    // 监听系统主题变化
    uni.onThemeChange((res) => {
      console.log("全局主题变化:", res.theme);
      // 通知所有页面系统主题已变更
      uni.$emit("systemThemeChange", res);
    });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*
 * 全局 CSS 变量定义 - 混合主题方案
 * 支持：自动跟随系统 + 手动切换主题
 * 参考文档：https://uniapp.dcloud.net.cn/tutorial/darkmode.html
 */

/* 默认浅色主题 */
page {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-main: #1a1a1a;
  --text-sub: #666666;
  --text-placeholder: rgba(26, 26, 26, 0.4);
  --text-disable: rgba(26, 26, 26, 0.2);
  --accent-blue: #2b86ff;
  --accent-orange: #ff6b35;
  --accent-green: #00d26a;
  --accent-red: #ff5252;
  --border-color: rgba(0, 0, 0, 0.1);
  --hover-bg: rgba(0, 0, 0, 0.05);
  --mask-bg: rgba(0, 0, 0, 0.6);
  --nav-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);

  background-color: var(--bg-color);
}

/* 自动跟随系统 - 使用 CSS media query */
@media (prefers-color-scheme: dark) {
  page {
    --bg-color: #111823;
    --card-bg: #1a2332;
    --text-main: #ffffff;
    --text-sub: #8b9bb4;
    --text-placeholder: rgba(255, 255, 255, 0.4);
    --text-disable: rgba(255, 255, 255, 0.2);
    --accent-blue: #2b86ff;
    --accent-orange: #ff6b35;
    --accent-green: #00d26a;
    --accent-red: #ff5252;
    --border-color: rgba(255, 255, 255, 0.1);
    --hover-bg: rgba(255, 255, 255, 0.05);
    --mask-bg: rgba(0, 0, 0, 0.6);
    --nav-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.6),
      0 0 16rpx rgba(255, 255, 255, 0.08);
  }
}

/* 手动强制浅色主题 - 覆盖 media query */
[data-theme="light"] {
  --bg-color: #f5f5f5 !important;
  --card-bg: #ffffff !important;
  --text-main: #1a1a1a !important;
  --text-sub: #666666 !important;
  --text-placeholder: rgba(26, 26, 26, 0.4) !important;
  --text-disable: rgba(26, 26, 26, 0.2) !important;
  --accent-blue: #2b86ff !important;
  --accent-orange: #ff6b35 !important;
  --accent-green: #00d26a !important;
  --accent-red: #ff5252 !important;
  --border-color: rgba(0, 0, 0, 0.1) !important;
  --hover-bg: rgba(0, 0, 0, 0.05) !important;
  --mask-bg: rgba(0, 0, 0, 0.6) !important;
  --nav-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12) !important;
}

/* 手动强制暗色主题 - 覆盖 media query */
[data-theme="dark"] {
  --bg-color: #111823 !important;
  --card-bg: #1a2332 !important;
  --text-main: #ffffff !important;
  --text-sub: #8b9bb4 !important;
  --text-placeholder: rgba(255, 255, 255, 0.4) !important;
  --text-disable: rgba(255, 255, 255, 0.2) !important;
  --accent-blue: #2b86ff !important;
  --accent-orange: #ff6b35 !important;
  --accent-green: #00d26a !important;
  --accent-red: #ff5252 !important;
  --border-color: rgba(255, 255, 255, 0.1) !important;
  --hover-bg: rgba(255, 255, 255, 0.05) !important;
  --mask-bg: rgba(0, 0, 0, 0.6) !important;
  --nav-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.6),
    0 0 16rpx rgba(255, 255, 255, 0.08) !important;
}

[class^="icon--"],
[class*=" icon--"] {
  display: inline-block;
  width: 20px; // 默认大小，能被后面的icon-size-xx覆盖
  height: 20px;
  background-color: currentColor; // 颜色由字体颜色决定
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-position: center;
  mask-position: center;
}

.icon-color-error {
  color: #af6b66;
}

// 大小类
@for $i from 10 through 70 {
  .icon-size-#{$i} {
    width: #{$i}px;
    height: #{$i}px;
  }
}

@mixin icon($svg-url) {
  -webkit-mask-image: url("#{$svg-url}");
  mask-image: url("#{$svg-url}");
}

// spell-checker: disable
/* prettier-ignore */
.icon{
	color: $uni-text-color;
    &--fontisto--bell{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 24'%3E%3Cpath fill='%23000' d='M19.945 15.512c-.8-.786-1.619-1.6-1.619-5.44a7.835 7.835 0 0 0-6.539-7.717l-.046-.006a1.5 1.5 0 1 0-2.471.005l-.003-.005c-3.753.623-6.579 3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619 5.44A3.135 3.135 0 0 0 3.137 21h4.367a3 3 0 1 0 6 0h4.37a3.135 3.135 0 0 0 2.076-5.484l-.003-.003zm-9.441 6.613A1.127 1.127 0 0 1 9.379 21h2.251a1.127 1.127 0 0 1-1.126 1.125m7.36-3.376H3.138a.886.886 0 0 1-.625-1.509c1.34-1.34 2.418-2.612 2.418-7.17a5.572 5.572 0 0 1 11.144 0c0 4.578 1.089 5.84 2.418 7.17a.886.886 0 0 1-.625 1.509z'/%3E%3C/svg%3E")}
    &--fluent--home-32-regular{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' d='M16.81 4.3a1.25 1.25 0 0 0-1.62 0l-9.75 8.288a1.25 1.25 0 0 0-.44.953V26.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a2.5 2.5 0 0 1 2.5-2.5h5.004a2.5 2.5 0 0 1 2.5 2.5v7a.5.5 0 0 0 .5.5H26.5a.5.5 0 0 0 .5-.5V13.54a1.25 1.25 0 0 0-.44-.952zm-2.915-1.523a3.25 3.25 0 0 1 4.21 0l9.75 8.287A3.25 3.25 0 0 1 29 13.54V26.5a2.5 2.5 0 0 1-2.5 2.5h-4.996a2.5 2.5 0 0 1-2.5-2.5v-7a.5.5 0 0 0-.5-.5H13.5a.5.5 0 0 0-.5.5v7a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 3 26.5V13.54a3.25 3.25 0 0 1 1.145-2.476z'/%3E%3C/svg%3E")}
    &--fluent--home-48-filled{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23000' d='M26.394 5.855a3.78 3.78 0 0 0-4.788 0L8.431 16.597A3.91 3.91 0 0 0 7 19.628v19.485C7 41.26 8.713 43 10.825 43h4.35C17.288 43 19 41.26 19 39.113V30.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5v8.613C29 41.26 30.712 43 32.825 43h4.35C39.288 43 41 41.26 41 39.113V19.628a3.91 3.91 0 0 0-1.431-3.031z'/%3E%3C/svg%3E")}
    &--mdi--chart-box-outline{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2zm2 2H5V5h14v14.1M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2'/%3E%3C/svg%3E")}
    &--mdi--chart-box{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z'/%3E%3C/svg%3E")}
    &--mingcute--user-2-line{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%23000' d='M16 14a5 5 0 0 1 4.995 4.783L21 19v1a2 2 0 0 1-1.85 1.995L19 22H5a2 2 0 0 1-1.995-1.85L3 20v-1a5 5 0 0 1 4.783-4.995L8 14zm0 2H8a3 3 0 0 0-2.995 2.824L5 19v1h14v-1a3 3 0 0 0-2.824-2.995zM12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6'/%3E%3C/g%3E%3C/svg%3E")}
    &--mingcute--user-2-fill{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Cpath d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%23000' d='M16 14a5 5 0 0 1 4.995 4.783L21 19v1a2 2 0 0 1-1.85 1.995L19 22H5a2 2 0 0 1-1.995-1.85L3 20v-1a5 5 0 0 1 4.783-4.995L8 14zM12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10'/%3E%3C/g%3E%3C/svg%3E")}
    &--fluent--calendar-date-24-regular{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3zm1.75 5.5h-15v9.25c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75zm-5.505 1.695q1 0 1.587.532q.585.532.586 1.441q0 .522-.269.93a1.86 1.86 0 0 1-.732.642q.557.26.857.708q.3.45.3 1.016q0 .937-.635 1.487q-.635.549-1.689.549q-1.06 0-1.697-.552q-.637-.551-.637-1.484q0-.572.303-1.026q.303-.453.85-.698a1.85 1.85 0 0 1-.726-.642a1.66 1.66 0 0 1-.266-.93q0-.908.586-1.44q.585-.533 1.582-.533m-3.775.074v7.133H9.038v-5.708l-1.743.596v-1l2.773-1.021zm3.77 3.96q-.517 0-.827.322q-.31.323-.31.854q0 .523.305.835q.305.313.842.313t.837-.303t.3-.845q0-.526-.314-.852q-.315-.325-.833-.325m.005-3.081q-.454 0-.718.285t-.263.779q0 .488.266.776q.265.288.72.288t.72-.288q.267-.287.266-.776q0-.465-.268-.764q-.27-.3-.723-.3M17.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25V7h15v-.75a1.75 1.75 0 0 0-1.75-1.75'/%3E%3C/svg%3E")}
    &--f7--phone{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'%3E%3Cpath fill='%23000' d='M39.156 50.934c4.078 0 6.774-1.102 9.164-3.774c.188-.187.352-.398.54-.586c1.406-1.57 2.062-3.117 2.062-4.593c0-1.688-.984-3.258-3.07-4.712l-6.82-4.734c-2.11-1.453-4.571-1.617-6.54.328l-1.804 1.805c-.54.539-1.008.563-1.547.234c-1.242-.797-3.797-3.023-5.532-4.757c-1.828-1.805-3.609-3.82-4.523-5.297c-.328-.54-.281-.985.258-1.524l1.781-1.805c1.969-1.968 1.805-4.453.352-6.538l-4.758-6.82c-1.43-2.087-3-3.048-4.688-3.071c-1.476-.024-3.023.656-4.593 2.062c-.211.188-.399.352-.61.516c-2.648 2.39-3.75 5.086-3.75 9.14c0 6.704 4.125 14.86 11.696 22.43c7.523 7.524 15.703 11.696 22.382 11.696m.024-3.61c-5.977.117-13.64-4.476-19.711-10.523c-6.117-6.094-10.922-14.016-10.805-19.992c.047-2.579.938-4.805 2.79-6.399c.14-.14.28-.258.444-.375c.68-.61 1.454-.937 2.11-.937c.703 0 1.312.257 1.758.96l4.547 6.82c.492.727.539 1.548-.188 2.274l-2.062 2.063c-1.641 1.617-1.5 3.586-.328 5.156c1.335 1.805 3.656 4.43 5.437 6.211c1.805 1.805 4.64 4.336 6.445 5.695c1.57 1.172 3.563 1.29 5.18-.328l2.062-2.062c.727-.727 1.524-.68 2.25-.211l6.82 4.547c.704.468.985 1.054.985 1.758c0 .68-.328 1.43-.96 2.132a6 6 0 0 1-.352.446c-1.617 1.828-3.844 2.718-6.422 2.765'/%3E%3C/svg%3E")}
    &--bx--dollar-circle{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8'/%3E%3Cpath fill='%23000' d='M12 11c-2 0-2-.63-2-1s.7-1 2-1s1.39.64 1.4 1h2A3 3 0 0 0 13 7.12V6h-2v1.09C9 7.42 8 8.71 8 10c0 1.12.52 3 4 3c2 0 2 .68 2 1s-.62 1-2 1c-1.84 0-2-.86-2-1H8c0 .92.66 2.55 3 2.92V18h2v-1.08c2-.34 3-1.63 3-2.92c0-1.12-.52-3-4-3'/%3E%3C/svg%3E")}
    &--mynaui--map-pinned{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='m6.5 17l-2 4h15l-2-4M12 11a2 2 0 1 0 0-4a2 2 0 0 0 0 4'/%3E%3Cpath d='M12.448 17.84a.71.71 0 0 1-.896 0C7.69 14.78 3.588 8.487 7.733 3.94C8.865 2.697 10.4 2 12 2s3.135.697 4.267 1.939c4.145 4.547.044 10.84-3.82 13.902'/%3E%3C/g%3E%3C/svg%3E")}
    &--streamline-plump--street-sign-remix{@include icon("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M9.33 1.119C10.688 1.069 12.91 1 14.947 1H24q.43 0 .805.035a3.55 3.55 0 0 1 2.645 1.55c.534.775.743 1.677.768 2.481c.04 1.254.087 3.384.122 6.934h4.713c2.036 0 4.259.069 5.617.119c1.274.047 2.582.52 3.577 1.517c1.05 1.052 2.732 2.934 4.114 5.41a5.03 5.03 0 0 1 0 4.907c-1.382 2.477-3.064 4.36-4.114 5.411c-.995.997-2.303 1.47-3.577 1.517c-1.358.05-3.58.119-5.617.119h-4.667v12h3.25a2 2 0 1 1 0 4H16.363a2 2 0 1 1 0-4h3.25V23.523q0-1.873.004-3.523h-4.67c-2.036 0-4.259-.069-5.617-.12c-1.274-.046-2.582-.519-3.577-1.516c-1.05-1.052-2.732-2.934-4.114-5.41a5.03 5.03 0 0 1 0-4.907c1.382-2.477 3.064-4.36 4.114-5.411c.995-.997 2.303-1.47 3.577-1.517M19.63 16h-4.683c-1.962 0-4.127-.066-5.47-.116c-.408-.016-.709-.16-.892-.345c-.893-.895-2.31-2.486-3.453-4.535a1.03 1.03 0 0 1 0-1.008c1.144-2.05 2.56-3.64 3.453-4.535c.183-.185.484-.33.893-.345C10.82 5.066 12.985 5 14.947 5h4.836l-.002.066c-.053 1.668-.12 4.887-.15 10.934m8.739 0c.01 2.136.017 4.625.017 7.523V27h4.667c1.962 0 4.127-.066 5.47-.116c.408-.015.708-.16.892-.345c.893-.895 2.31-2.486 3.453-4.535a1.03 1.03 0 0 0 0-1.008c-1.144-2.05-2.56-3.64-3.453-4.535c-.184-.185-.484-.33-.893-.345a157 157 0 0 0-5.47-.116z' clip-rule='evenodd'/%3E%3C/svg%3E")}
    &--feather--edit{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEgNEg0YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48cGF0aCBkPSJNMTguNSAyLjVhMi4xMjEgMi4xMjEgMCAwIDEgMyAzTDEyIDE1bC00IDEgMS00IDkuNS05LjV6IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48L3N2Zz4=")}
    &--feather--sun{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI1IiBzdHJva2U9IiNmZmIzMDAiIHN0cm9rZS13aWR0aD0iMiIgLz48cGF0aCBkPSJNMTIgMXYyTTEyIDIxdjJNNC4yMiA0LjIybDEuNDIgMS40Mk0xOC4zNiAxOC4zNmwxLjQyIDEuNDJNMSAxMmgyTTIxIDEyaDJNNC4yMiAxOS43OGwxLjQyLTEuNDJNMTguMzYgNS42NGwxLjQyLTEuNDIiIHN0cm9rZT0iI2ZmYjMwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+PC9zdmc+")}
    &--feather--bell{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTggOEE2IDYgMCAwMDYgOGMwIDctMyA5LTMgOWgxOHMtMy0yLTMtOSIgc3Ryb2tlPSIjOWQ2NWZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48cGF0aCBkPSJNMTMuNzMgMjFhMiAyIDAgMDEtMy40NiAwIiBzdHJva2U9IiM5ZDY1ZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--feather--list{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCA2aDEzTTggMTJoMTNNOCAxOGgxM00zIDZoLjAxTTMgMTJoLjAxTTMgMThoLjAxIiBzdHJva2U9IiMyYjg2ZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--feather--globe{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSiTTEyIDEyaDIwTTEyIDJhMTUuMyAxNS4zIDAgMDE0IDEwIDE1LjMgMTUuMyAwIDAxLTQgMTAgMTUuMyAxNS4zIDAgMDEtNCAxMCAxNS4zIDE1LjMgMCAwMTQtMTB6IiBzdHJva2U9IiMwMGQyNmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--feather--shield{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMjJzOC00IDgtMTBWNWwtOC0zLTggM3Y3YzAgNiA4IDEwIDggMTB6IiBzdHJva2U9IiNmZjZiMzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--feather--file-text{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjh6IiBzdHJva2U9IiMwMEJGQTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjxwYXRoIGQ9Ik0xNCAydjZoNiIgc3Ryb2tlPSIjMDBCRkE1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48cGF0aCBkPSJNMTYgMTNIOCIgc3Ryb2tlPSIjMDBCRkE1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48cGF0aCBkPSJNMTYgMTdIOCIgc3Ryb2tlPSIjMDBCRkE1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48cGF0aCBkPSJNMTAgOUg4IiBzdHJva2U9IiMwMEJGQTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--feather--info{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgc3Ryb2tlPSIjOGI5YmI0IiBzdHJva2Utd2lkdGg9IjIiIC8+PHBhdGggZD0iTTEyIDE2di00TTEyIDhoLjAxIiBzdHJva2U9IiM4YjliYjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--feather--target{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgc3Ryb2tlPSIjZmY1MjUyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiBzdHJva2U9IiNmZjUyNTIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIHN0cm9rZT0iI2ZmNTI1MiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+PC9zdmc+")}
    &--feather--sliders{@include icon("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bGluZSB4MT0iNCIgeTE9IjIxIiB4Mj0iNCIgeTI9IjE0IiBzdHJva2U9IiMwMGQyNmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjxsaW5lIHgxPSI0IiB5MT0iMTAiIHgyPSI0IiB5Mj0iMyIgc3Ryb2tlPSIjMDBkMjZhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48bGluZSB4MT0iMTIiIHkxPSIyMSIgeDI9IjEyIiB5Mj0iMTIiIHN0cm9rZT0iIzAwZDI2YSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+PGxpbmUgeDE9IjEyIiB5MT0iOCIgeDI9IjEyIiB5Mj0iMyIgc3Ryb2tlPSIjMDBkMjZhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48bGluZSB4MT0iMjAiIHkxPSIyMSIgeDI9IjIwIiB5Mj0iMTYiIHN0cm9rZT0iIzAwZDI2YSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+PGxpbmUgeDE9IjIwIiB5MT0iMTIiIHgyPSIyMCIgeTI9IjMiIHN0cm9rZT0iIzAwZDI2YSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+PGxpbmUgeDE9IjEiIHkxPSIxNCIgeDI9IjciIHkyPSIxNCIgc3Ryb2tlPSIjMDBkMjZhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz48bGluZSB4MT0iOSIgeTE9IjgiIHgyPSIxNSIgeTI9IjgiIHN0cm9rZT0iIzAwZDI2YSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+PGxpbmUgeDE9IjE3IiB5MT0iMTYiIHgyPSIyMyIgeTI9IjE2IiBzdHJva2U9IiMwMGQyNmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPjwvc3ZnPg==")}
    &--icon{@include icon("")}
}

/* prettier-ignore */
.text-{
  &primary   { color: $uni-text-color; }
  &inverse { color: $uni-text-color-inverse; }
  &grey { color: $uni-text-color-grey; }
  &placeholder { color: $uni-text-color-placeholder; }
  &disable { color: $uni-text-color-disable; }
}

/* prettier-ignore */
.bg-{
  &-primary { background-color: $uni-bg-color; }
  &-grey { background-color: $uni-bg-color-grey; }
  &-hover { background-color: $uni-bg-color-hover; }
  &-mask { background-color: $uni-bg-color-mask; }
}

/* prettier-ignore */
.color-{
  &primary { color: $uni-color-primary; }
  &success { color: $uni-color-success; }
  &warning { color: $uni-color-warning; }
  &error { color: $uni-color-error; }
}

/* prettier-ignore */
.border- {
  &-primary {
    border-color: $uni-border-color;
  }
}

/* prettier-ignore */
.font-{
  &2xl { font-size: $uni-font-size-xxl; }  // 页面大标题 / 报价单标题
  &xl  { font-size: $uni-font-size-xl; }  // 页面主标题 / 重要状态
  &lg  { font-size: $uni-font-size-lg; }  // 区块标题
  &base  { font-size: $uni-font-size-base; }  // 卡片标题 / 列表项标题
  &sm  { font-size: $uni-font-size-sm; }  // 正文
  &xs  { font-size: $uni-font-size-xs; }  // 辅助说明
  &2xs { font-size: $uni-font-size-xxs; }  // 标签、小字
}

/* prettier-ignore */
.round-{
  &sm { border-radius: $uni-border-radius-sm; }
  &md { border-radius: $uni-border-radius-base; }
  &lg { border-radius: $uni-border-radius-lg; }
  &xl { border-radius: 24rpx; }
  &pill { border-radius: 999rpx; }
  &circle { border-radius: $uni-border-radius-circle; }
}

$space-scale: (
  2xs: 4rpx,
  xs: 8rpx,
  sm: 12rpx,
  md: 16rpx,
  lg: 24rpx,
  xl: 32rpx,
  2xl: 40rpx,
);

/* prettier-ignore */
@each $name, $size in $space-scale {
  .m-#{$name} { margin: $size; }
  .mt-#{$name} { margin-top: $size; }
  .mr-#{$name} { margin-right: $size; }
  .mb-#{$name} { margin-bottom: $size; }
  .ml-#{$name} { margin-left: $size; }

  .p-#{$name} { padding: $size; }
  .pt-#{$name} { padding-top: $size; }
  .pr-#{$name} { padding-right: $size; }
  .pb-#{$name} { padding-bottom: $size; }
  .pl-#{$name} { padding-left: $size; }
}

$shadow-color: rgba(0, 0, 0, 0.06);
/* prettier-ignore */
.shadow-{
  &sm { box-shadow: 0 4rpx 12rpx $shadow-color; }
  &md { box-shadow: 0 8rpx 24rpx $shadow-color; }
  &lg { box-shadow: 0 16rpx 40rpx $shadow-color; }
}

.center {
  display: flex;
  justify-items: center;
  align-items: center;
}

.w-full {
  width: 100%;
}
</style>
