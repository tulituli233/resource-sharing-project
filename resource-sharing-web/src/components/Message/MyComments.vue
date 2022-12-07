<template>
  <div class="replysBox">
    <p>评论回复</p>
    <div class="ReplyList" v-if="replyList != ''">
      <div
        class="replyItem"
        v-for="(item, i) in replyList"
        :key="i"
        @click="toArticle(item.ArticleId, item.FromId, item.FromName)"
      >
        <div class="name">
          {{ item.FromName }}&nbsp;&nbsp;<span style="color: #888">{{
            item.CommentType == 0 ? "评论了我的分享" : "回复了我的评论"
          }}</span>
        </div>
        <div class="content">{{ item.CommentContent }}</div>
        <div class="time" v-text="toTime(item.CreateTime)"></div>
      </div>
    </div>
    <div v-else class="noBox">暂时没有数据</div>
  </div>
</template>

<script>
export default {
  name: "MyComments",
  created() {
    document.title = "资源共享--回复";
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.getReplyList();
  },
  data() {
    return {
      replyList: "",
      userInfo: "",
    };
  },
  methods: {
    toTime(time) {
      let t = new Date(time - 0).toLocaleString();
      return t;
    },
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
    async getReplyList() {
      const { data: res } = await this.$http.get("/my/chat/replyList", {
        params: {
          UserId: this.userInfo.id,
        },
      });
      console.log(res.data.replyList);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      // this.$message.success(res.meta.message);
      this.replyList = res.data.replyList;
    },
  },
};
</script>

<style lang="less" scoped>
.replysBox {
  > p {
    padding-left: 10px;
  }
  .ReplyList {
    padding: 10px;
    .replyItem {
      padding: 10px;
      border-top: 1px solid #000;
      .name {
      }
      .content {
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