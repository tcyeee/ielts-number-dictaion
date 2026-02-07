<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
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
page {
  background-color: $uni-bg-color;
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
