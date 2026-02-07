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
.round-{
  &sm { border-radius: 8rpx; }
  &md { border-radius: 12rpx; }
  &lg { border-radius: 16rpx; }
  &xl { border-radius: 24rpx; }
  &pill { border-radius: 999rpx; }
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
