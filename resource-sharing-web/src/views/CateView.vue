<template>
  <div class="CateViewBox">
    <!-- <div class="selectBox">
      <div style="margin-top: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.mark"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> 
      </div>
    </div> -->
    <div class="CateViewLeft">
      <div class="CateBox">
        <div class="CateLeft">
          <div class="yijiCate">一级分类：</div>
          <div class="erjiCate">二级分类：</div>
        </div>
        <div class="CateRight" ref="c1">
          <div
            class="CateItem"
            v-for="(item, i) in this.$store.state.CateList"
            :key="i"
            @click="erjiCate(item.value)"
          >
            <div class="yijiCate">
              {{ item.label }}
            </div>
            <div class="erjiCateBox" :class="i == 0 ? 'erjiCate1' : ''">
              <div
                class="erjiCate"
                v-for="(item1, i1) in item.children"
                :key="i1"
                @click.stop="erjiCate(item1.value)"
              >
                {{ item1.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ArticleList :queryInfo="queryInfo"></ArticleList>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--分类";
    // let inpVal = this.$route.query.inpVal;
    // this.queryInfo.mark = inpVal == undefined ? "" : inpVal;
    // console.log(inpVal);
  },
  data() {
    return {
      Cate: {
        cate: "",
        mark: "",
        pagenum: 1,
        pagesize: 5,
        hasSelect: true,
      },
    };
  },
  computed: {
    queryInfo() {
      let inpVal = this.$route.query.inpVal;
      let mark = inpVal == undefined ? "" : inpVal;
      console.log(inpVal);
      let queryInfo = {
        cate: "",
        mark: mark,
        pagenum: 1,
        pagesize: 5,
        hasSelect: true,
      };
      console.log(queryInfo);
      // this.queryInfo=queryInfo;
      return queryInfo;
    },
  },
  methods: {
    erjiCate(CateNum) {
      this.queryInfo.cate = CateNum;
      console.log(this.queryInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.CateViewBox {
  .CateViewLeft {
    width: 800px;
    // background-color: #fff;
    .yijiCate {
      padding-bottom: 20px;
      padding-top: 5px;
    }
    .CateBox {
      overflow: hidden;
      background-color: #fff;
      padding: 10px;
      .CateLeft {
        float: left;
      }
      .CateRight {
        float: left;
        position: relative;
        height: 80px;
        width: 400px;
        .CateItem {
          float: left;
          .yijiCate {
            padding: 5px;
            border: 1px solid rgb(43, 173, 243);
            border-radius: 5px;
            margin-right: 5px;
          }
          &:hover .erjiCateBox {
            display: block;
            z-index: 10;
          }
          // &:hover .erjiCate1 {
          //   display: none;
          // }
          // &:focus .erjiCateBox {
          //   display: block;
          // }

          .erjiCateBox {
            position: absolute;
            display: none;
            left: 0;
            top: 15;
            width: 400px;
            height: 40px;
            padding: 10px 0;
            background-color: #fff;
            .erjiCate {
              float: left;
              padding: 5px;
              border: 1px solid rgb(54, 255, 121);
              border-radius: 5px;
              margin-right: 5px;
              // display: block;
            }
          }
          .erjiCate1 {
            display: block;
          }
        }
      }
    }
  }
}
</style>