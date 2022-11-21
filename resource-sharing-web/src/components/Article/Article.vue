<template>
  <div class="ArticleBox">
    <h2>{{ Article.Title }}</h2>
    <div class="IssuerBox">
      <span>作者：{{ Article.IssuerName }}</span
      ><button class="followBtn" @click="addFollow">
        <span>+</span>{{ isfollow == 0 ? "关注" : "已关注" }}
      </button>
    </div>
    <div class="ContentBox" v-html="Article.Content">{{ Article.Content }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Article: {},
      isfollow: 0,
    };
  },
  created() {
    // document.title = "资源共享--文章详情";
    this.getArticle();
    this.isFollow();
  },
  computed: {
    // Article() {
    //   return this.$store.state.Article;
    // },
  },
  methods: {
    async getArticle() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/article/geta", {
        params: {
          ArticleId: this.$store.state.ArticleInfo.ArticleId,
          BuyerId: userInfo.id,
        },
      });
      console.log(res);
      // alert(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.Article = res.data.Article;
      // this.$store.dispatch("saveArticleAys", res.data.Article);
    },
    async isFollow() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/userinfo/isfollow", {
        params: {
          FollowerId: userInfo.id,
          WriterId: this.$store.state.ArticleInfo.IssuerId,
        },
      });
      console.log(res);
      if (res.meta.status !== 200) {
        this.isfollow = 0;
        return;
      }
      this.isfollow = 1;
    },
    async addFollow() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.post("/my/userinfo/follow", {
        FollowerId: userInfo.id,
        WriterId: this.$store.state.ArticleInfo.IssuerId,
        WriterName: this.$store.state.ArticleInfo.IssuerName,
        FollowState: this.isfollow == 0 ? 1 : 0,
        CreateTime: Date.now() + "",
      });
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.isFollow();
    },
  },
};
</script>

<style lang="less" >
.ArticleBox {
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 10px 10px 5px #ccc;
  padding: 10px;
  width: 700px;
  h2 {
    margin-top: 0;
  }
  .IssuerBox {
    .followBtn {
      margin-left: 20px;
      border-radius: 5px;
    }
  }
  .ContentBox {
    img {
      width: 500px;
    }
  }
}
</style>