<template>
  <div class="ArticleViewBox">
    <div class="ArticleLeftBox">
      <Article :ArticleInfo="ArticleInfo" ref="mychild"></Article>
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
  computed: {
    ArticleInfo: {
      get() {
        this.clickParent();
        return this.$store.state.ArticleInfo;
      },
    },
  },
  methods: {
    clickParent() {
      try {
        this.$refs.mychild.parentHandleclick("hhh");
      } catch (error) {
        // console.log('error==',error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ArticleViewBox {
  overflow: hidden;
  .ArticleLeftBox {
    float: left;
    width: 800px;
    padding-bottom: 20px;
  }
  .ArticleRightBox {
  }
}
</style>