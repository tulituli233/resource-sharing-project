<template>
  <div class="SellBox">
    <p>兑换消息</p>
    <div class="SellList" v-if="SellList != ''">
      <div
        class="replyItem"
        v-for="(item, i) in SellList"
        :key="i"
        @click="toArticle(item.ArticleId, item.SellerId, item.SellerName)"
      >
        <div class="name">
          {{ item.BuyerName }}&nbsp;&nbsp;<span style="color: #888"
            >兑换了我的分享</span
          >
        </div>
        <div class="Article">{{ item.Title }}</div>
        <div class="time" v-text="toTime(item.CreateTime)"></div>
        <div class="priceBox">+{{ item.price }}</div>
      </div>
    </div>
    <div v-else class="noBox">暂时没有数据</div>
  </div>
</template>

<script>
export default {
  name: "MyLikes",
  created() {
    document.title = "资源共享--兑换消息";
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.getSellList();
  },
  data() {
    return {
      SellList: "",
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
    async getSellList() {
      const { data: res } = await this.$http.get("/my/chat/SellList", {
        params: {
          UserId: this.userInfo.id,
        },
      });
      console.log(res.data.SellList);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      // this.$message.success(res.meta.message);
      this.SellList = res.data.SellList;
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
.SellBox {
  > p {
    padding-left: 10px;
  }
  .SellList {
    padding: 10px;
    .replyItem {
      position: relative;
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
      .priceBox {
        position: absolute;
        height: 55px;
        line-height: 55px;
        top: 10px;
        right: 10px;
        float: right;
        padding: 5px 20px;
        background-color: #FCA60B;
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .noBox {
    text-align: center;
  }
}
</style>