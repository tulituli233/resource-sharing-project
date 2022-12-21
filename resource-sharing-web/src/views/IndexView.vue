<template>
  <div class="IndexViewBox">
    <div class="LunBox">
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="item in ArticleList" :key="item.ArticleId">
          <img
            :src="item.FirstImgUrl"
            alt=""
            @click="toArticle(item.ArticleId, item.IssuerId, item.IssuerName)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="ALBox">
      <ArticleList :ArticleList="ArticleList"></ArticleList>
    </div>
    <!-- <el-button @click="rews"></el-button> -->
  </div>
</template>

<script>
// import ArticleList from '@/components/Article/ArticleList.vue'
export default {
  // components:{
  //   ArticleList
  // },
  name: "IndexView",
  data() {
    return {
      LunList: [],
      ArticleList: [],
      ws: "",
    };
  },
  created() {
    document.title = "资源共享--首页";
    this.getIndexData();
  },
  methods: {
    async toArticle(ArticleId, IssuerId, IssuerName) {
      // this.getArticle(ArticleId);
      let ArticleInfo = {
        ArticleId,
        IssuerId,
        IssuerName,
      };
      this.$store.commit("saveArticleInfo", ArticleInfo);
      this.$router.push("/article");
    },
    async getIndexData() {
      const { data: res } = await this.$http.get("/my/article/IndexData");
      // console.log(res.data.IndexData);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      // res.data.IndexData;
      this.ArticleList = res.data.IndexData;
      this.LunList = res.data.IndexData;
    },
  },
};
</script>

<style lang="less" scoped>
.IndexViewBox {
  .LunBox {
    width: 800px;
    background-color: #fff;
    .el-carousel__item {
      width: 332px;
      height: 166px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ALBox {
    margin-top: 20px;
    width: 800px;
  }
}
</style>