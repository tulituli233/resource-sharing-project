<template>
  <div class="shareBox">
    <div class="titleBOx">我的分享</div>
    <div v-if="ArticleList" class="ALBox">
      <ArticleList :ArticleList="ArticleList"></ArticleList>
    </div>
    <div class="noDataBox" v-else>你还没有分享呦~</div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--我的分享";
    this.getMyShare();
  },
  data() {
    return {
      ArticleList: [],
    };
  },
  methods: {
    async getMyShare() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/article/getmyshare", {
        params: {
          IssuerId: userInfo.id,
        },
      });
      console.log(res);
      // alert(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return;
        this.$message.error(res.meta.message);
      }
      //   this.$message.success(res.meta.message);
      this.ArticleList = res.data.alist;
    },
  },
};
</script>

<style lang="less" scoped>
.shareBox {
  .ALBox {
    width: 780px;
  }
}
.titleBOx {
  padding: 10px;
  background-color: #007acc;
}
</style>