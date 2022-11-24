<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/my' }">我的</el-breadcrumb-item>
        <el-breadcrumb-item>我要分享</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row> -->
    <!-- <el-card> -->
    <!-- 选项 -->
    <el-row class="routerIcon">
      <div class="myOption">
        <div class="linkItemBox">
          <div class="iconBox"><i class="el-icon-star-off"></i></div>
          <div class="linkBox">
            <router-link class="My-router-link" :to="{ path: '/myCollection' }"
              >我的收藏</router-link
            >
          </div>
        </div>
        <div class="linkItemBox">
          <div class="iconBox"><i class="el-icon-time"></i></div>
          <div class="linkBox">
            <router-link class="My-router-link" :to="{ path: '/myHistory' }"
              >历史记录</router-link
            >
          </div>
        </div>
        <div class="linkItemBox">
          <div class="iconBox"><i class="el-icon-shopping-cart-1"></i></div>
          <div class="linkBox">
            <router-link class="My-router-link" :to="{ path: '/myOrder' }"
              >我的购买</router-link
            >
          </div>
        </div>
        <div class="linkItemBox">
          <div class="iconBox"><i class="el-icon-s-order"></i></div>
          <div class="linkBox">
            <router-link class="My-router-link" :to="{ path: '/myShare' }"
              >我的分享</router-link
            >
          </div>
        </div>
        <div class="linkItemBox">
          <div class="iconBox"><i class="el-icon-folder-add"></i></div>
          <div class="linkBox">
            <router-link class="My-router-link" :to="{ path: '/addArticle' }"
              >我要分享</router-link
            >
          </div>
        </div>
        <div class="linkItemBox">
          <div class="iconBox"><i class="el-icon-edit"></i></div>
          <div class="linkBox">
            <router-link class="My-router-link" :to="{ path: '/myInfo' }"
              >我的资料</router-link
            >
          </div>
        </div>
      </div>
    </el-row>
    <!-- 内容 -->
    <el-row class="ContentBox">
      <router-view></router-view>
    </el-row>
    <!-- </el-card> -->
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
.routerIcon {
  background-color: #fff;
  width: 800px;
  padding-bottom: 20px;
  .myOption {
    .linkItemBox {
      overflow: hidden;
      float: left;
      padding: 10px 20px;
      position: relative;
      .linkBox {
        margin: 0 auto;
        padding: 5px 10px;
        .My-router-link {
          // margin-right: 20px;
          color: #000;
          text-decoration: none;
          position: absolute;
          width: 80px;
          /* height: 100px; */
          top: 0;
          left: 10px;
          /* vertical-align: text-top; */
          padding-top: 80px;
          text-align: center;
        }
      }
      .iconBox {
        margin: 0 auto;
        width: 60px;
        height: 60px;
        color: #007acc;
        font-size: 60px;
        padding-bottom: 10px;
      }
    }
  }
}
.ContentBox{
  margin-top: 20px;
  padding: 10px;
  width: 800px;
  background-color: #fff;
  box-shadow: 0 0 10px #000;
}
</style>