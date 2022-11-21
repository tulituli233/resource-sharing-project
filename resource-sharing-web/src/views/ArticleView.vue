<template>
  <div class="ArticleViewBox">
    <div class="ArticleLeftBox">
      <Article></Article>
      <Comment></Comment>
    </div>
    <div class="ArticleRightBox"></div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--文章详情";
  },
};
</script>

<style lang="less" scoped>
.ArticleViewBox {
  overflow: hidden;
  .ArticleLeftBox {
    float: left;
    width: 800px;
  }
  .ArticleRightBox{}
}
</style>