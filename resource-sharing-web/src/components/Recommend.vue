<template>
  <div class="recommendBox">
    <div class="recommendItemBox" v-for="(item, i) in RecommendList" :key="i">
      <div class="headerBox">
        {{ item.RecommendName }}
        <span class="iconfont" :class="item.iconClass"></span>
      </div>
      <div class="bodyBox">
        <div
          class="bodyItem"
          v-for="(item1, i1) in item.aList"
          :key="i1"
          @click="toArticle(item1.ArticleId, item1.IssuerId, item1.IssuerName)"
        >
          <!-- <router-link class="My-router-link" :to="{ path: '/article' }"
            >{{ item1.Title }}</router-link
          > -->
          {{ item1.Title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getRecommendList();
  },
  data() {
    return {
      RecommendList: [
        {
          RecommendName: "火热分享",
          iconClass: "icon-huore",
          aList: [],
        },
        {
          RecommendName: "优质分享",
          iconClass: "icon-youshi_youzhi",
          aList: [],
        },
        {
          RecommendName: "最新分享",
          iconClass: "icon-xin",
          aList: [],
        },
      ],
    };
  },
  methods: {
    async getRecommendList() {
      const { data: res } = await this.$http.get("/my/article/RecommendList");
      console.log(res.data.RecommendList);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      // res.data.RecommendList;
      this.RecommendList[0].aList = res.data.RecommendList[0];
      this.RecommendList[1].aList = res.data.RecommendList[1];
      this.RecommendList[2].aList = res.data.RecommendList[2];
    },
    async toArticle(ArticleId, IssuerId, IssuerName) {
      let ArticleInfo = {
        ArticleId,
        IssuerId,
        IssuerName,
      };
      this.$store.commit("saveArticleInfo", ArticleInfo);
      this.$router.push({
        path: "/article",
        query: {
          t: Date.now(),
        },
      });
      // this.$router.push(`/article?t=${Date.now()}`);
      // this.$router.go(0);
    },
  },
};
</script>

<style lang="less" scoped>
.recommendBox {
  .recommendItemBox {
    width: 340px;
    background-color: #fff;
    margin-bottom: 10px;
    box-shadow: 10px 10px 5px #ccc;
    .headerBox {
      position: relative;
      background-color: #fca60b;
      color: #fff;
      padding: 10px;
      .iconfont {
        position: absolute;
        right: 20px;
        font-size: 20px;
      }
    }
    .bodyBox {
      padding: 10px;
      .bodyItem {
        width: 300px;
        // 单行省略
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        padding: 5px;
        border-bottom: 1px dashed #ccc;
        font-size: 18px;
      }
    }
  }
}
</style>