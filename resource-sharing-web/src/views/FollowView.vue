<template>
  <div class="FollowBox">
    <div class="MyfollowList">
      关注列表
      <div v-if="FollowList.length">
        <div class="MyfollowItem" v-for="(item, i) in FollowList" :key="i">
          <el-avatar size="large" class="avatar">{{
            item.WriterName
          }}</el-avatar>
          <div class="Wname">{{ item.WriterName }}</div>
        </div>
      </div>
      <div class="noDataBox" v-else>快去关注你的第一个分享者吧~</div>
    </div>
    <div class="FollowALBox">
      <div class="ALTitle">关注动态</div>
      <div v-if="ArticleList.length" class="ALBox">
        <ArticleList :ArticleList="ArticleList"></ArticleList>
      </div>
      <div class="noDataBox" v-else>这里还什么都没有呢~</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--动态";
    this.getFollowList();
    this.getArticleList();
  },
  data() {
    return {
      FollowList: [],
      queryInfo: {
        cate: "",
        mark: "",
        pagenum: 2,
        pagesize: 5,
        hasSelect: true,
      },
      ArticleList: [],
    };
  },
  methods: {
    async getFollowList(ArticleId) {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/userinfo/followlist", {
        params: {
          FollowerId: userInfo.id,
        },
      });
      console.log(res);
      // alert(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return;
        this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.FollowList = res.data.followlist;
    },
    async getArticleList() {
      const { data: res } = await this.$http.post(
        "/my/article/alist",
        this.queryInfo
      );
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        this.ArticleList = [];
        return;
        this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      console.log(res.data.alist);
      let alists = [];
      if (typeof res.data.alist[0].Tags == "string") {
        alists = res.data.alist.map((item) => {
          item.Tags = item.Tags.split(",");
          item.Tags.pop();
          return item;
        });
      }
      this.ArticleList = alists;
    },
  },
};
</script>

<style lang="less" scoped>
.FollowBox {
  .MyfollowList {
    width: 800px;
    background-color: #fff;
    padding: 5px 0 0 5px;
    box-shadow: 0 0 10px #000;
    margin-bottom: 20px;
    overflow: hidden;
    .MyfollowItem {
      width: 50px;
      padding: 5px 10px;
      float: left;
      .avatar {
        display: block;
        margin: 0 auto;
        background-color: #3a8ee6;
      }
      .Wname {
        padding-top: 5px;
        text-align: center;
        word-break: break-all;
      }
    }
  }
  .FollowALBox {
    width: 800px;
    .ALBox {
    }
    .ALTitle {
      padding: 5px;
      color: #fff;
      font-size: 18px;
      background-color: #3a8ee6;
    }
  }
}
</style>