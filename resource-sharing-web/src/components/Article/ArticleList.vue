<template>
  <div class="ArticleListBox">
    <div
      class="listitem"
      v-for="(item, i) in alists"
      :key="i"
      @click="toArticle(item.ArticleId, item.IssuerId, item.IssuerName)"
    >
      <img :src="item.FirstImgUrl" alt="" />
      <div class="articleInfo">
        <h4>{{ item.Title }}</h4>
        <div class="brief">{{ item.Brief }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      alist: [],
    };
  },
  created() {
    // this.$nextTick(() => {
    //   this.alist = this.$store.state.indexArticleList;
    //   console.log(222);
    //   console.log(this.alist);
    // });
    // console.log(111);
    // console.log(this.alist);
  },
  computed: {
    alists() {
      return this.$store.state.indexArticleList;
    },
  },
  methods: {
    async toArticle(ArticleId, IssuerId, IssuerName) {
      // this.getArticle(ArticleId);
      let ArticleInfo = {
        ArticleId,
        IssuerId,
        IssuerName,
      };
      // this.getCommentList(ArticleId, IssuerId);
      this.$store.commit("saveArticleInfo", ArticleInfo);
      // this.$store.commit("saveIssuerId", IssuerId);
      this.$router.push("/article");
    },
    async getArticle(ArticleId) {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/article/geta", {
        params: {
          ArticleId: ArticleId,
          BuyerId: userInfo.id,
        },
      });
      console.log(res);
      // alert(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.$store.dispatch("saveArticleAys", res.data.Article);
    },
    async getCommentList(ArticleId) {
      const { data: res } = await this.$http.get("/my/comment/list", {
        params: {
          ArticleId,
        },
      });
      console.log(res.data.clist);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.$store.dispatch("saveCommentAys", res.data.clist);
    },
  },
};
</script>

<style lang="less" scoped>
.ArticleListBox {
  .listitem {
    // width: 100px;
    // height: 100px;
    // display: flex;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
      float: left;
    }
    .articleInfo {
      float: left;
      padding-left: 10px;
    }
  }
}
</style>