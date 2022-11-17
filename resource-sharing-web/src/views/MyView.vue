<template>
  <div>
    <!-- 面包屑导航 -->
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/my' }">我的</el-breadcrumb-item>
        <el-breadcrumb-item>我要分享</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <!-- 选项 -->
      <el-row>
        <div class="myOption">
          <router-link :to="{ path: '/addArticle' }">我要分享</router-link>
        </div>
      </el-row>
      <!-- 内容 -->
      <el-row>
        <router-view></router-view>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--我的";
  },
};
</script>

<style lang="less" scoped>
</style>