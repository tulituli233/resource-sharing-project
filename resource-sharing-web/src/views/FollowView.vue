<template>
  <div class="FollowBox">
    <div class="MyfollowList">
      关注列表
      <div v-if="FollowList.length">
        <div
          class="MyfollowItem"
          v-for="(item, i) in FollowList"
          :key="i"
          @click="toMainPage(item.WriterId, item.WriterName)"
        >
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
      <div v-if="FArticleList.length" class="ALBox">
        <ArticleList :ArticleList="FArticleList"></ArticleList>
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
  },
  data() {
    return {
      FollowList: [],
      queryInfo: {
        cate: "",
        mark: "软考",
        pagenum: 1,
        pagesize: 5,
        hasSelect: true,
      },
      FArticleList: [],
    };
  },
  methods: {
    // 前往主页
    toMainPage(id, name) {
      // this.$router.replace(`/mainpage?IssuerId=${id}&IssuerName=${name}&t=${Date.now()}`);
      this.$store.commit("saveMainPageData", {
        IssuerId: id,
        IssuerName: name,
      });
      this.$router.push(`/mainpage`);
    },
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
      // this.$message.success(res.meta.message);
      this.FollowList = res.data.followlist;
      if (res.data.followlist.length != undefined) {
        this.getFAList();
      } else {
        this.FArticleList = [];
      }
    },
    async getFAList() {
      let FidArray = [];
      let fl = this.FollowList;
      fl.forEach((item) => {
        FidArray.push(item.WriterId);
      });
      const { data: res } = await this.$http.post("/my/article/getfalist", {
        FidArray,
        TopNum: 10,
      });
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        this.FArticleList = [];
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      console.log(res.data.FAList);
      let alists = [];
      if (typeof res.data.FAList[0].Tags == "string") {
        alists = res.data.FAList.map((item) => {
          item.Tags = item.Tags.split(",");
          item.Tags.pop();
          return item;
        });
      }
      this.FArticleList = alists;
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