<template>
  <div class="LikesBox">
    <p>收到的赞</p>
    <div class="LikesList" v-if="LikesList != ''">
      <div
        class="replyItem"
        v-for="(item, i) in LikesList"
        :key="i"
        @click="toArticle(item.ArticleId, item.WriterId, item.WriterName)"
      >
        <div class="name">
          {{ item.UserName }}&nbsp;&nbsp;<span style="color: #888"
            >点赞了我的分享</span
          >
        </div>
        <div class="Article">{{ item.Title }}</div>
        <div class="time">{{ item.CreateTime | dateFormat }}</div>
      </div>
    </div>
    <div v-else class="noBox">暂时没有数据</div>
  </div>
</template>

<script>
export default {
  name: "MyLikes",
  created() {
    document.title = "资源共享--收到的赞";
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.getLikesList();
  },
  data() {
    return {
      LikesList: "",
      userInfo: "",
    };
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
    async getLikesList() {
      const { data: res } = await this.$http.get("/my/chat/LikesList", {
        params: {
          UserId: this.userInfo.id,
        },
      });
      console.log(res.data.LikesList);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      // this.$message.success(res.meta.message);
      this.LikesList = res.data.LikesList;
    },
    async toArticle(ArticleId, IssuerId, IssuerName) {
      let ArticleInfo = {
        ArticleId,
        IssuerId,
        IssuerName,
      };
      this.$store.commit("saveArticleInfo", ArticleInfo);
      this.$router.push("/article");
    },
  },
};
</script>

<style lang="less" scoped>
.LikesBox {
  > p {
    padding-left: 10px;
  }
  .LikesList {
    padding: 10px;
    .replyItem {
      padding: 10px;
      border-top: 1px solid #000;
      .name {
      }
      .Article {
        font-size: 20px;
      }
      .time {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .noBox {
    text-align: center;
  }
}
</style>