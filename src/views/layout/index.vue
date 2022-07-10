<template>
  <div class="layout-container">
    组件布局
    <!-- 子路由 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->
    <van-tabbar v-model="active" class="layout-tabbar">
      <van-tabbar-item>
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang='less'>
.layout-container{
    .layout-tabbar{
        i.toutiao{
            font-size: 40px;
        }
        span.text{
            font-size: 20px;
        }
    }
}
</style>
