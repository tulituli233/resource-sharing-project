<template>
  <div class="FMBox">
    <div v-if="footmarkList != ''">
      <div
        class="fmItem"
        v-for="(item, i) in footmarkList"
        :key="i"
        @click="toArticle(item.ArticleId, item.WriterId, item.WriterName)"
      >
        <div class="TitleBox">{{ item.Title }}</div>
        <div class="IssuerBox">{{ item.WriterName }}</div>
        <div class="timeBox" v-text="toTime(item.ReTime)"></div>
        <div class="CateBox">{{ item.CateName }}</div>
      </div>
    </div>
    <div v-else class="noBox">暂时没有数据</div>
  </div>
</template>

<script>
export default {
  created() {
    // document.title = "资源共享--我的收藏";
    // console.log(this.footmarkList.lenght != 0);
    // console.log(this.footmarkList.lenght);
    
  },
  props: {
    footmarkList: {
      type: Array|String,
    },
  },
  methods: {
    toTime(time) {
      let t = new Date(time - 0).toLocaleString();
      return t;
    },
    toArticle(ArticleId, IssuerId, IssuerName) {
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
  },
};
</script>

<style lang="less" scoped>
.FMBox {
  margin-top: 20px;
  width: 100%;
  .fmItem {
    background-color: #ccc;
    padding: 10px;
    position: relative;
    margin-bottom: 10px;
    .TitleBox {
      font-size: 18px;
      font-weight: 600;
    }
    .CateBox {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px;
      background-color: rgb(47, 153, 234);
    }
  }
  .noBox {
    text-align: center;
  }
}
</style>