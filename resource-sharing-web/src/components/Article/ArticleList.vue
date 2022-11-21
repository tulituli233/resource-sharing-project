<template>
  <div class="ArticleListBox">
    <div
      class="listitem"
      v-for="(item, i) in alists"
      :key="i"
      @click="toArticle(item.ArticleId, item.IssuerId, item.IssuerName)"
    >
      <div class="ImgBox">
        <img :src="item.FirstImgUrl" alt="" />
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
        <el-row class="IconRow"
          ><span>点赞</span>{{ item.Likes }}<span class="viewsIcon">浏览</span
          >{{ item.Views }}</el-row
        >
      </div>
      <div class="articleInfo">
        <div class="IssuerBox">
          <span class="spanName">{{ item.IssuerName }}</span>
          <span class="spanTime" v-text="toTime(item.CreateTime)"></span>
        </div>
        <span class="TitleSpan">{{ item.Title }}</span>
        <div class="brief">简介:{{ item.Brief }}</div>
        <div class="TagBox">
          标签:
          <el-tag
            size="mini"
            type="warning"
            class="eltagItem"
            v-for="(item1, i1) in item.Tags"
            :key="i1"
            >{{ item1 }}
          </el-tag>
        </div>
      </div>
      <div class="cateBox">{{item.CateName}}</div>
      <div class="priceBox" :class="item.Price==0?'cGreen':'cYellow'">{{item.Price==0?'免费':`$${item.Price}`}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      alist: [],
      value: 3.7,
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
      let alists = this.$store.state.indexArticleList.map((item) => {
        item.Tags = item.Tags.split(",");
        item.Tags.pop();
        return item;
      });
      return alists;
    },
  },
  methods: {
    toTime(time) {
      let t = new Date(0 - time).toLocaleString();
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
  width: 800px;
  border: 1px solid #ccc;
  padding: 10px;
  .listitem {
    position: relative;
    margin-top: 5px;
    overflow: hidden;
    // border-bottom: 1px solid #fff;
    background-color: #fff;
    padding: 10px;
    .ImgBox {
      float: left;
      img {
        width: 140px;
        height: 100px;
      }
      .IconRow {
        padding: 5px 0;
        .viewsIcon {
          margin-left: 20px;
        }
      }
    }
    .articleInfo {
      float: left;
      padding-left: 10px;
      .IssuerBox{
        width: 500px;
        overflow: hidden;
        .spanName{
          float: left;
        }
        .spanTime{
          float: right;
        }
      }
      .TitleSpan {
        margin: 5px;
        font-size: 18px;
        font-weight: 600;
      }
      .brief {
        height: 57px;
      }
      .TagBox {
        color: #e6a23c;
        .eltagItem {
          margin-right: 10px;
        }
      }
    }
    .cateBox{
      position: absolute;
      top: 0;
      right: 50px;
      background-color: rgb(61, 197, 247);
      padding: 3px;
    }
    .priceBox{
      position: absolute;
      right: 0;
      top: 0;
      padding: 3px;
    }
    .cGreen{
      background-color: rgb(59, 223, 59);
    }
    .cYellow{
      background-color: rgb(255, 255, 39);
    }
  }
}
</style>