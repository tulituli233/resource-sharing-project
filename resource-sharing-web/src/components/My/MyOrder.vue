<template>
  <div class="OrderBox">
    <div class="titleBOx">我的购买</div>
    <!-- <FootMarkList :footmarkList="footmarkList"></FootMarkList> -->
    <div class="MyOrderListBox">
      <div v-if="MyOrder != ''">
        <div
          class="MOLItem"
          v-for="(item, i) in MyOrder"
          :key="i"
          @click="toArticle(item.ArticleId, item.SellerId, item.SellerName)"
        >
          <div class="TitleBox">{{ item.Title }}</div>
          <div class="NandT">
            <div class="SellerBox">{{ item.SellerName }}</div>
            <div class="timeBox" v-text="toTime(item.ReTime)"></div>
          </div>
          <div class="priceBox">${{ item.price }}</div>
        </div>
      </div>
      <div v-else class="noBox">暂时没有数据</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--我的购买";
    this.getMyOrder();
  },
  data() {
    return {
      MyOrder: "",
    };
  },
  methods: {
    async getMyOrder() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/buy/orderlist", {
        params: {
          BuyerId: userInfo.id,
        },
      });

      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      console.log(res.data.MyOrder);
      this.MyOrder = res.data.MyOrder;
    },
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
.OrderBox {
  // width: 800px;
  .MyOrderListBox {
    margin-top: 20px;
    width: 100%;
    .MOLItem {
      position: relative;
      background-color: #ccc;
      padding: 10px;
      margin-bottom: 10px;
      .TitleBox {
        font-size: 18px;
        font-weight: 600;
      }
      .NandT{
        overflow: hidden;
        .SellerBox{
          float: left;
          font-weight: 600;
        }
        .timeBox{
          float: left;
          margin-left: 20px;
        }
      }
      .priceBox {
        position: absolute;
        height: 55px;
        line-height: 55px;
        top: 0;
        right: 0;
        float: right;
        padding: 5px 20px;
        background-color: gold;
        font-size: 30px;
        color: #fff;
      }
    }
    .noBox {
      text-align: center;
    }
  }
}
.titleBOx {
  padding: 10px;
  background-color: #007acc;
}
</style>