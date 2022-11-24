<template>
  <div class="ArticleListBox">
    <div
      class="listitem"
      v-for="(item, i) in ArticleList"
      :key="i"
      @click="toArticle(item.ArticleId, item.IssuerId, item.IssuerName)"
    >
      <div class="ImgBox">
        <img :src="item.FirstImgUrl" alt="" />
        <el-rate
          v-model="item.Grade"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="item.Grade + ''"
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
      <div class="cateBox">{{ item.CateName }}</div>
      <div class="priceBox" :class="item.Price == 0 ? 'cGreen' : 'cYellow'">
        {{ item.Price == 0 ? "免费" : `$${item.Price}` }}
      </div>
      <span class="spanTime" v-text="toTime(item.CreateTime)"></span>
    </div>

    <!-- <div class="hasSelect" v-if="queryInfo.hasSelect">
      <div :a="inputTopVal" :c="CateVal"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    queryInfo: {
      type: Object,
      default: () => {
        return {
          cate: "",
          mark: "",
          pagenum: 1,
          pagesize: 10,
          hasSelect: false,
        };
      },
    },
    ArticleList: {
      type: Array,
    },
  },
  data() {
    return {
      alist: [],
      value: 3.7,
      // queryInfo: {
      //   cate: "",
      //   mark: "",
      //   pagenum: 1,
      //   pagesize: 10,
      // },
      alists: [],
    };
  },
  created() {
    // this.getArticleList();
    // console.log(1);
    // this.$nextTick(() => {
    //   this.alist = this.$store.state.indexArticleList;
    //   console.log(222);
    //   console.log(this.alist);
    // });
    // console.log(111);
    // console.log(this.alist);
  },
  computed: {
    // inputTopVal() {
    //   console.log(321);
    //   // this.queryInfo.mark = this.$store.state.inputTopVal;
    //   // this.queryInfo.mark
    //   this.getArticleList();
    //   return this.queryInfo.mark;
    // },
    // CateVal() {
    //   console.log(321);
    //   // this.queryInfo.mark = this.$store.state.inputTopVal;
    //   // this.queryInfo.mark
    //   this.getArticleList();
    //   return this.queryInfo.cate;
    // },
    // alists() {
    //   // let indexArticleList = this.$store.state.indexArticleList;
    //   // console.log(typeof indexArticleList[0].Tags);
    //   let alists = [];
    //   if (typeof indexArticleList[0].Tags == "string") {
    //     alists = indexArticleList.map((item) => {
    //       item.Tags = item.Tags.split(",");
    //       item.Tags.pop();
    //       return item;
    //     });
    //   }
    //   return alists;
    // },
  },
  methods: {
    toTime(time) {
      let t = new Date(0 - time).toLocaleString();
      return t;
    },
    async getArticleList() {
      const { data: res } = await this.$http.post(
        "/my/article/alist",
        this.queryInfo
      );
      console.log(res.data.alist);
      this.alists = alists;
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.message);
        return;
      }
      // this.$message.success(res.meta.message);
      let alists = [];
      if (typeof res.data.alist[0].Tags == "string") {
        alists = res.data.alist.map((item) => {
          item.Tags = item.Tags.split(",");
          item.Tags.pop();
          return item;
        });
      }
      this.alists = alists;
      // this.$store.dispatch("indexArticleListAys", res.data.alist);
      // this.$store.commit("indexArticleList", res.data.alist);
      // window.sessionStorage.setItem("token", res.data);
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
  // width: 800px;
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
      .IssuerBox {
        width: 500px;
        overflow: hidden;
        .spanName {
          float: left;
        }
      }
      .TitleSpan {
        margin: 5px;
        font-size: 18px;
        font-weight: 600;
      }
      .brief {
        height: 57px;
        width: 600px;
      }
      .TagBox {
        color: #e6a23c;
        .eltagItem {
          margin-right: 10px;
        }
      }
    }
    .cateBox {
      position: absolute;
      top: 0;
      right: 50px;
      background-color: rgb(61, 197, 247);
      padding: 3px;
    }
    .priceBox {
      position: absolute;
      right: 0;
      top: 0;
      padding: 3px;
    }
    .cGreen {
      background-color: rgb(59, 223, 59);
    }
    .cYellow {
      background-color: rgb(255, 255, 39);
    }
    .spanTime {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px;
    }
  }
}
</style>